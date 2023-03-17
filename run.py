from flask import Flask, jsonify, request
from flask_cors import CORS

from controller.controller import *

app = Flask(__name__)
CORS(app)

@app.route('/')
def homeAPI():
    return jsonify({'message': 'Welcome to backend server'})

@app.route('/login')
def loginAPI():
    body = request.get_json()
    usr = body['username']
    psw = body['password']
    return jsonify(loginController(usr, psw)) #token để người dùng đăng nhập!
    