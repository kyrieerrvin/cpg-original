import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

# Constants
DATA_PATH = 'data/users.json'
PORT = 8080

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Serve the main HTML files
        if self.path in ('/', '/home.html'):
            self.serve_file('home.html', 'text/html')
        elif self.path == '/articles.html':
            self.serve_file('articles.html', 'text/html')
        elif self.path == '/article3.html':
            self.serve_file('article3.html', 'text/html')
        elif self.path.startswith('/static/'):
            self.send_static_file(self.path[1:])  # Serve static files
        elif self.path.startswith('/assets/'):
            self.send_static_file(self.path[1:])  # Serve asset files
        elif self.path.startswith('/data/'):
            self.send_static_file(self.path[1:])  # Serve data files
        else:
            self.send_error(404, "File Not Found {}".format(self.path))

    def do_POST(self):
        if self.path == '/login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            credentials = json.loads(post_data.decode('utf-8'))
            if self.authenticate(credentials):
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'success'}).encode('utf-8'))
            else:
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'fail'}).encode('utf-8'))

    def serve_file(self, file_path, content_type):
        try:
            with open(file_path, 'rb') as file:
                self.send_response(200)
                self.send_header('Content-type', content_type)
                self.end_headers()
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_error(404, "File Not Found {}".format(file_path))

    def send_static_file(self, path):
        try:
            with open(path, 'rb') as file:
                self.send_response(200)
                self.send_header('Content-type', self.guess_type(path))
                self.end_headers()
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_error(404, "File Not Found {}".format(path))

    def guess_type(self, path):
        if path.endswith('.css'):
            return 'text/css'
        if path.endswith('.js'):
            return 'application/javascript'
        if path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        if path.endswith('.png'):
            return 'image/png'
        if path.endswith('.mp4'):
            return 'video/mp4'
        if path.endswith('.json'):
            return 'application/json'
        return 'application/octet-stream'

    def authenticate(self, credentials):
        if not os.path.exists(DATA_PATH):
            return False

        with open(DATA_PATH, 'r') as file:
            users = json.load(file)

        return users.get(credentials['username']) == credentials['password']

def run():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Starting server on port {PORT}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
