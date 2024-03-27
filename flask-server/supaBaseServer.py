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
                return jsonify({"Message": "Login Successful"}), 200
            else:
                return jsonify({"error": "Invalid password"}), 401
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e.code)}), 500
    
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


if __name__ == '__main__':
    app.run(debug=True)


 

