from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from supabase import Client
import os
import uuid
import datetime
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer
from flask_mail import Mail, Message


app = Flask(__name__)
app.secret_key = "so secret"

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'riceservice.dmmj@gmail.com'
app.config['MAIL_PASSWORD'] = 'temporary@123'

mail = Mail(app)

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
    
@app.route('/logout', methods=['POST'])
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
    response = supabase.table('user_info').update({'username': name, 'monthly_income': monthlyIncome, 'total_needs': needs, 'total_wants': wants, 'total_remaining': monthlyIncome, 'total_savings': savingsLeft, 'First_Login' : False, 'budget_split': budgetPlan}).eq('user_id',id).execute()
    
    return jsonify({"Message": "Done"})

@app.route('/ReportPurchases', methods=['GET', 'POST'])
def ReportPurchases():
    data = request.json
    id = session.get('user_id')
    if not id:
        return "Failed to update tables: User not authenticated"
    
    response = supabase.table('user_info').select('total_remaining').eq('user_id', id).execute()
    current_total = response.data[0]['total_remaining']
    moneyChange = float(data.get('money'))

    category = data.get('chosenCategory').lower() #setup to make category fit the column name
    if category == 'income':
        category = "total_savings"
        new_total = current_total + moneyChange #adds to current total since we are adding money to our budget
        update_response = supabase.table('user_info').update({'total_remaining': new_total}).eq('user_id', id).execute()

    else:
        category = category + "_spent" #gets either the wants or needs category
        new_total = current_total - moneyChange #subtracts money since we are using from our budget
        response = supabase.table('user_info').select(category).eq('user_id', id).execute()
        current_category_spent = response.data[0][category]
        new_category_spent = current_category_spent + moneyChange
        update_response = supabase.table('user_info').update({category: new_category_spent ,'total_remaining': new_total}).eq('user_id', id).execute()
    
    now = datetime.datetime.now()
    date_str = now.strftime("%Y-%m-%d")

    response = supabase.table('transaction_reports').insert({'user_id':id, 'category':data.get('chosenCategory'), 'amount':moneyChange, 'description': data.get('description'), 'date': date_str}).execute()
    
    
    return "Success"

@app.route('/UserSettings', methods=['GET', 'POST'])
def UserSettings():
    data = request.json
    id = session.get('user_id')
    if not id:
        return "Failed to update tables: User not authenticated"
    
    newUsername = data.get('username')
    monthlyIncome = data.get('monthlyIncome')
    newSavingsBudget = data.get('savingsBudget')
    newWantsBudget = data.get('wantsBudget')
    newNeedsBudget = data.get('needsBudget')

    if monthlyIncome == '':
        response = supabase.table('user_info').select('monthly_income').eq('user_id', id).execute()
        monthlyIncome = response.data[0]['monthly_income']
    else:
        monthlyIncome = float(monthlyIncome)
        update_response = supabase.table('user_info').update({'monthly_income': monthlyIncome}).eq('user_id', id).execute()

    if not newUsername == '':
        update_response = supabase.table('user_info').update({'username': newUsername}).eq('user_id', id).execute()

    if not(newSavingsBudget == '' or newWantsBudget == '' or newNeedsBudget == ''):
        if int(newSavingsBudget) + int(newNeedsBudget) + int(newWantsBudget) == 100:
            budgetPlan = newNeedsBudget + "/" + newSavingsBudget + "/" + newWantsBudget
            newTotalNeeds = round(monthlyIncome * int(newNeedsBudget) * 0.01, 2)
            newTotalWants = round(monthlyIncome * int(newWantsBudget) * 0.01, 2)
            newTotalSavings = round(monthlyIncome * int(newSavingsBudget) * 0.01, 2)
            update_response = supabase.table('user_info').update({'budget_split': budgetPlan, 'total_needs': newTotalNeeds, 'total_wants': newTotalWants, 'total_savings': newTotalSavings}).eq('user_id', id).execute()
        else:
            return "Failed to update tables: Invalid budget split"
    else:
        response = supabase.table('user_info').select('budget_split').eq('user_id', id).execute()
        budgetPlan = response.data[0]['budget_split']
        percents = [int(part) for part in budgetPlan.split("/")]
        newTotalNeeds = round(monthlyIncome * int(percents[0]) * 0.01, 2)
        newTotalSavings = round(monthlyIncome * int(percents[1]) * 0.01, 2)
        newTotalWants = round(monthlyIncome * int(percents[2]) * 0.01, 2)
        update_response = supabase.table('user_info').update({'total_needs': newTotalNeeds, 'total_wants': newTotalWants, 'total_savings': newTotalSavings}).eq('user_id', id).execute()


    return "Success"

@app.route('/getTransactions')
def getTransactions():
    id = session.get('user_id')
    response = supabase.table('transaction_reports').select('*').eq('user_id', id).execute()
    return jsonify(response.data)

@app.route('/updateTransaction', methods=['GET', 'POST'])
def updateTransaction():
    data =  request.get_json()
    newAmount = data.get('amount')
    transaction_id = data.get('id')
    id = session.get('user_id')
   
    response = supabase.table('transaction_reports').select('amount').eq('transaction_id', transaction_id).execute()
    oldAmount = response.data[0]['amount']
    newAmount = float(newAmount)
    difference = oldAmount - newAmount
    response = supabase.table('transaction_reports').select('category').eq('transaction_id', transaction_id).execute()
    category = response.data[0]['category']

    if category != 'Income':
        category = category.lower() + "_spent" #gets either the wants or needs category
        response = supabase.table('user_info').select(category).eq('user_id', id).execute()   
        new_spent = response.data[0][category] - difference
        response = supabase.table('user_info').update({category: new_spent}).eq('user_id', id).execute()
        response = supabase.table('user_info').select('total_remaining').eq('user_id', id).execute()
        net_total = response.data[0]['total_remaining'] + difference
    else:
        response = supabase.table('user_info').select('total_remaining').eq('user_id', id).execute()
        net_total = response.data[0]['total_remaining'] - difference

    response = supabase.table('user_info').update({'total_remaining': net_total}).eq('user_id', id).execute()
    response = supabase.table('transaction_reports').update({'amount': newAmount, 'description': data.get('description'), 'date': data.get('date')}).eq('transaction_id', transaction_id).execute()

    return "Success"

@app.route('/deleteTransaction', methods=['GET', 'POST'])
def deleteTransaction():
    data = request.get_json()
    uid = session.get('user_id')
    id = data.get('id')
    response = supabase.table('transaction_reports').select('amount').eq('transaction_id', id).execute()
    amount = response.data[0]['amount']
    response = supabase.table('transaction_reports').select('category').eq('transaction_id', id).execute()
    category = response.data[0]['category']

    if category == 'Income':
        response = supabase.table('user_info').select('total_remaining').eq('user_id', uid).execute()   
        total = response.data[0]['total_remaining']
        total = total - amount
        response = supabase.table('user_info').update({'total_remaining': total}).eq('user_id', uid).execute()
        response = supabase.table('transaction_reports').delete().eq('transaction_id', id).execute()


    else:
        category = category.lower() + "_spent"
        response = supabase.table('user_info').select(category).eq('user_id', uid).execute()   
        spent = response.data[0][category]
        spent = spent - amount
        response = supabase.table('user_info').update({category: spent}).eq('user_id', uid).execute()
        response = supabase.table('user_info').select('total_remaining').eq('user_id', uid).execute()   
        total = response.data[0]['total_remaining']
        total = total + amount
        response = supabase.table('user_info').update({'total_remaining': total}).eq('user_id', uid).execute()

    
    
   
    response = supabase.table('transaction_reports').delete().eq('transaction_id', id).execute()
    return "Success"

@app.route('/getBills')
def getBills():
    id = session.get('user_id')
    response = supabase.table("bills").select("*").eq('user_id', id).execute()
    return jsonify(response.data)
    
    
@app.route('/reset_request', methods=['GET','POST'])
def reset_request():
    try:
        email = request.json.get("email")
        
        if not email:
            return jsonify({"error": "Email is required"}), 400
        
        response = supabase.table("users").select("*").eq("email", email).execute()
        user = response.data[0]
        
        if user:
            token = get_reset_token(email)
            send_email(email, token)
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

def send_email(email, token):
    msg = Message()
    msg.subject = "Password Reset Request"
    msg.recipients = [email]
    msg.html = f'''
    <h1>Password Reset Request</h1>
    <p>Click the link below to reset your password</p>
    <a href="http://localhost:3000/reset/{token}">Reset Password</a>
    '''
    mail.send(msg)
    

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

@app.route('/AddBill', methods=['GET','POST'])
def AddBill():
    data = request.get_json()
    id = session.get('user_id')
    response = supabase.table('bills').insert({'user_id':id, 'description':data.get('description'), 'amount':data.get('amount'), 'paid': False}).execute()
    return 'Success'

@app.route('/DeleteBill', methods=['GET','POST'])
def DeleteBill():
    data = request.get_json()
    bill_id = data.get('id')
    response = supabase.table('bills').delete().eq('bill_id', bill_id).execute()
    return 'Success'

if __name__ == '__main__':
    app.run(debug=True)


 

