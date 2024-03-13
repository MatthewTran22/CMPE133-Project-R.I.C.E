from dotenv import load_dotenv
from flask import Flask, jsonify, request, session
from supabase import Client
import os

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
        
        # Insert the data into the "users" table
        response = supabase.table("users").insert({"email": email, "password": password}).execute()
        
        # Check if the insertion was successful
        if response['status'] == 201:
            return jsonify({"message": "User registered successfully"})
        else:
            return jsonify({"error": "Failed to register user"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)




