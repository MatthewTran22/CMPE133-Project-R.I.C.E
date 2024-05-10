Installation Guide

Requirements:
1. Python
2. Node.js
3. Git Bash Terminal (Windows Users only)
4. Supabase database

Backend imports
1. pip install supabase
2. pip install dotenv
3. pip install flask
4. pip install flask-mail
5. pip install --force-reinstall itsdangerous==2.0.1



Frontend imports
1. npm install react
2. npm install react-router-dom
3. npm install react-icons
4. npm install recharts
5. npm install @tailwindcss/typography

How to setup:
1. Place the dotenv containing your supabase url and supabase key into the flask-server directory
2. In Git Bash Terminal (for MacOS users just enter terminal), enter CMPE133-Project-R.I.C.E directory
3. Split the terminal into two Git Bash terminals, terminal one enter client directory and terminal two enter flask-server directory
4. In terminal one, execute the command npm start to run the front end code
5. In terminal two, execute source RICE/bin/activate for Mac, RICE-win/scripts/activate for Windows
6. execute the command python supaBaseServer.py to activate the server connection 
