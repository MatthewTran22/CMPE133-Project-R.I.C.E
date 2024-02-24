from flask import Flask, jsonify
from dotenv import load_dotenv
import os

app = Flask(__name__)

env_file = os.environ.get("dbLogin_env")
load_dotenv(env_file)

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

@app.route("/test")
def test():
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

        return jsonify(users_data)

    except MySQLdb.Error as e:
        return jsonify({"error": f"MySQL error: {e}"}), 500

    finally:
        # Close the cursor only if it was successfully created
        if cursor:
            cursor.close()

if __name__ == '__main__':
    app.run(debug=True)