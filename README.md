Installation Guide

Requirements:
Python
Node.js
Git Bash Terminal (Windows Users only)
Supabase database

Backend imports
pip install supabase
pip install dotenv
pip install flask
pip install flask-mail
pip install --force-reinstall itsdangerous==2.0.1

Frontend imports
npm install react
npm install react-router-dom
npm install react-icons
npm install recharts
npm install @tailwindcss/typography

How to setup:
1. Place the dotenv containing your supabase url and supabase key into the flask-server directory
2. In Git Bash Terminal, enter CMPE133-Project-R.I.C.E directory
3. Split the terminal into two Git Bash terminals, terminal one enter client directory and terminal two enter flask-server directory
4. In terminal one, execute the command npm start to run the front end code
5. In terminal two, execute source RICE/bin/activate for Mac, RICE-win/scripts/activate for Windows
6. execute the command python supaBaseServer.py to activate the server connection 
