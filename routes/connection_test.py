from dotenv import load_dotenv
import os

env_file = os.environ.get("dbLogin_env")
load_dotenv(env_file)

import MySQLdb
host=os.getenv("DB_HOST")
user=os.getenv("DB_USERNAME")
passwd=os.getenv("DB_PASSWORD")
db=os.getenv("DB_NAME")
print("Attempting connection")


connection = MySQLdb.connect(
host,
user,
passwd,
db,
autocommit=True,

)
print("connection success")
connection.close()
print("connection closed")





