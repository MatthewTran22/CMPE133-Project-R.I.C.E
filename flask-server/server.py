from flask import Flask, jsonify, request, session
from dotenv import load_dotenv
import os

app = Flask(__name__)
app.secret_key = "so secret"

#env_file = os.environ.get("dbLogin_env")
load_dotenv(dotenv_path = "dbLogin.env")

import MySQLdb
host = os.getenv("DB_HOST")
user = os.getenv("DB_USERNAME")
passwd = os.getenv("DB_PASSWORD")
db = os.getenv("DB_NAME")
print("Attempting connection")


# Initialize MySQL connection outside of the route
connection = MySQLdb.connect(
    host=host,
    user=user,
    passwd=passwd,
    db=db,
    autocommit=True,
)
print("Connection success")

cursor = None
try:
    # Create a cursor to interact with the database
    cursor = connection.cursor()

    # Execute a SELECT query on the users table
    cursor.execute("SELECT * FROM users")

    # Fetch all rows from the result set
    rows = cursor.fetchall()

    # Convert the data to a list of dictionaries
    users_data = [{'user_id': row[0], 'password': row[1], 'email': row[2]} for row in rows]

except MySQLdb.Error as e:
    print(jsonify({"error": f"MySQL error: {e}"}), 500)

finally:
    # Close the cursor only if it was successfully created
    if cursor:
        cursor.close()


@app.route("/test")
def test():
        return jsonify(users_data)
    

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email")
    password = request.json.get("password")
    
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE user_id = %s", (email,))
    user = cursor.fetchone()
    
    if user is None:
        return jsonify({"error": "Unauthorized"}), 401
    
    if password != user[1]:
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user[0]
    
    return jsonify({"user_id": user[0], "email": user[2]})

    
if __name__ == '__main__':
    app.run(debug=True)