@echo off
cd /d D:\1PROFESSIONAL WEBSITE
start cmd /k "python server.py"
start cmd /k "node server.js"

cd /d D:\1PROFESSIONAL WEBSITE\article-5
start cmd /k "npm start"

start "" "http://localhost:8080"
