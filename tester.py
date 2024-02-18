from flask import Flask, render_template
#Note: keep this file out of the routes folder, this takes us to our first page
#TODO: look for fix to put this python file back into routes. IMPORTANT FOR OTHER ROUTING ISSUES

#Create a flask instance
app = Flask(__name__)

#Create a route decorator
@app.route('/')

def index():
    return render_template("index.html") #change when renaming file or creating new file