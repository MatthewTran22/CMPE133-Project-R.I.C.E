from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from supabase import Client
import os
import uuid

app = Flask(__name__)
app.secret_key = "so secret"

load_dotenv("supa.env")
URL = os.getenv("SUPABASE_URL")
KEY = os.getenv("SUPABASE_KEY")

supabase = Client(URL, KEY)
print("connection success")

@app.route('/getInfo')
def getInfo():
    # Execute the query to retrieve user info from Supabase
    id = session.get('user_id')
    response = supabase.table("user_info").select("*").eq('user_id', id).execute()
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


if __name__ == '__main__':
    app.run(debug=True)


 

