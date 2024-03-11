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

if __name__ == '__main__':
    app.run(debug=True)


