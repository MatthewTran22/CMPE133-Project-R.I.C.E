from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from supabase import Client
import os
import uuid
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

app = Flask(__name__)
app.secret_key = "so secret"

load_dotenv("supa.env")
URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")

supabase = Client(URL, KEY)
print("connection success")

@app.route('/users')
def users():
    # Execute the query to retrieve users from Supabase
    response = supabase.table("users").select("*").execute()
    return jsonify(response.data)

@app.route('/register', methods=['GET', 'POST'])
def register():
    try:
        # Get email and password from the request body
        data = request.json
        email = data.get('email')
        password = data.get('pwd')
        myuuid = uuid.uuid4()
        info_start = supabase.table("user_info").insert({"user_id": str(myuuid)}).execute()


        
        # Insert the data into the "users" table
        response = supabase.table("users").insert({"user_id": str(myuuid),"email": email, "password": password}).execute()
        
        # Check if the insertion was successful
        
        return jsonify({"message": "User registered successfully"})
        
    except Exception as e:
        return jsonify({"error": str(e.code)}), 500

@app.route('/login', methods=['GET', 'POST'])
def login():
    try:
        email = request.json.get("email")
        password = request.json.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        response = supabase.table("users").select("*").eq("email", email).execute()
        user = response.data[0]

        if user:
            if user["password"] == password:
                id = user.get("user_id")
                session["user_id"] = id
                firstLogin = info_check()
                if(firstLogin):
                    return jsonify({"Nav":"/InfoInput"}),200
                else:
                    return jsonify({"Nav":"/Dashboard"}),200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e.code)}), 500
    
def info_check():
    table = 'user_info'
    id = session.get('user_id')
    response = supabase.table(table).select('First_Login').eq('user_id', id).execute()
    data = response.data
    ans = data[0]['First_Login']
    return ans
    
@app.route('/check_session')
def check_session():
    if 'user_id' in session:
        return jsonify({'Login': True})
    else:
         return jsonify({"error": "Session not found"}), 404
    
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify(message='Logout successful')

@app.route('/infoInput', methods=['GET', 'POST'])
def infoInput():
    data = request.json
    id = session.get('user_id')
    name = data.get('name')
    monthlyIncome = data.get('income')
    budgetPlan = data.get('budgetPlan')
    percents = numbers = [int(part) for part in budgetPlan.split("/")]
    needs = (percents[0]/100) * float(monthlyIncome)
    wants = (percents[2]/100) * float(monthlyIncome)
    savingsLeft = (percents[1]/100) * float(monthlyIncome)

    #Sets up all the starting info for user
    response = supabase.table('user_info').update({'username': name, 'monthly_income': monthlyIncome, 'total_needs': needs, 'total_wants': wants, 'total_remaining': monthlyIncome, 'total_savings': savingsLeft, 'First_Login' : False}).eq('user_id',id).execute()
    

    return jsonify({"Message": "Done"})



@app.route('/reset_request', methods=['GET','POST'])
def reset_request():
    try:
        email = request.json.get("email")
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        response = supabase.table("users").select("*").eq("email", email).execute()
        user = response.data[0]
        
        if user:
            send_email(email)
            return jsonify({"message": "Reset email sent"}), 200
        
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500
    
@app.route('/reset_password/<token>', methods=['GET','POST'])
def reset_password(token):
    try:
        user = verify_reset_token(token)
        if not user:
            return jsonify({"error": "Invalid or expired token"}), 400
        
        password = request.json.get("password")
        
        if not password:
            return jsonify({"error": "Password is required"}), 400
        
        response = supabase.table("users").update({"password": password}).eq("user_id", user["user_id"]).execute()
        
        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

def send_email(email):
    pass

def get_reset_token(email, expire_time = 3600):
    s = Serializer(app.secret_key, expire_time)
    token = s.dumps({'email': email}).decode('utf-8') 
    return token

def verify_reset_token(token):
    s = Serializer(app.secret_key)
    try:
        email = s.loads(token)['email']
    except:
        return None
    return get_user_by_email(email)
    

def get_user_by_email(email):
    try:
        response = supabase.table("users").select("*").eq("email", email).execute()
        user = response.data[0]
        return user
    except Exception as e:
        return None
    
def get_user_by_id(id):
    try:
        response = supabase.table("users").select("*").eq("user_id", id).execute()
        user = response.data[0]
        return user
    except Exception as e:
        return None

if __name__ == '__main__':
    app.run(debug=True)


 

