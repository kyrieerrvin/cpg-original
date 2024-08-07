# server.py

import http.server
import socketserver
import json
import urllib.parse

PORT = 8080

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')

            form_data = urllib.parse.parse_qs(post_data)
            username = form_data['username'][0]
            password = form_data['password'][0]

            try:
                with open('data/users.json') as user_file:
                    users = json.load(user_file)
            except FileNotFoundError:
                self.send_error(500, "Server error: Users data not found.")
                return

            if username in users and users[username] == password:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = json.dumps({"status": "success", "redirect_url": "/home.html"})
                self.wfile.write(response.encode('utf-8'))
            else:
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = json.dumps({"status": "error", "error": "Invalid User ID or Password."})
                self.wfile.write(response.encode('utf-8'))
        else:
            super().do_POST()

Handler = CustomHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Serving at port {PORT}")
httpd.serve_forever()
