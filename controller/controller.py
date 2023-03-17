from model.sql import *
import jwt
from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

secret_key = "TTNT_1"

def encodeToken(token):
    try:
        # Giải mã token bằng secret_key
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        
        # Lấy thông tin từ payload
        user_id = payload["userID"]
        
        # Trả về user_id hoặc xử lý tiếp theo tùy theo logic của bạn
        return user_id
    except jwt.ExpiredSignatureError:
        # Xử lý khi token đã hết hạn
        return {"message": "Phiên đăng nhập của bạn đã hết hạn!"}
    except jwt.InvalidTokenError:
        # Xử lý khi token không hợp lệ
        return {"message": "Token không hợp lệ!"}

@app.route('/')
def homeAPI():
    return jsonify({'message': 'Welcome to backend server'})

@app.route('/login', methods=['POST'])
def loginController():
    body = request.get_json()
    username = body['username']
    password = body['password']
    userID = loginModel(username, password)
    print(userID)
    # Tạo payload của token, bao gồm userID
    payload = {"userID": userID}

    # Mã hóa payload bằng secret key
    
    token = jwt.encode(payload, secret_key, algorithm="HS256")

    # Gán token vào biến temp
    temp = token
    
    return jsonify({"token": temp})

@app.route('/user')
def getUserDataController():
    token = request.headers.get('token')
    userID = encodeToken(token)
    result = getUserDataModel(userID)
    return  jsonify({"userID": result[0][2], "name": result[0][6],
                    "phone": result[0][4], "email": result[0][5],
                    "position": result[0][7], "location": result[0][8],
                    "dob": result[0][9], "image": result[0][12]})
   
@app.route('/signup', methods=['POST']) 
def signUpController():
    '''
    body['name'] = "Le Anh Huy"
    ...
    Tui đặt tên giống các biến trong mySQL luôn
    '''
    body = request.get_json()
    print(body)
    
    signUpModel()

@app.route('/userlist') 
def getUserListController():
    #Kiểm tra userID có phải người dùng hay không?
    token = request.headers.get('token')
    userID = encodeToken(token)
    pass

@app.route('/schedule') 
def getDeviceScheduleController():
    token = request.headers.get('token')
    userID = encodeToken(token)
    pass

@app.route('/add-schedule', methods=['PUT']) 
def addDeviceScheduleController(data):
    #data = ["humidity", "17/03/2022", "07:00", "09:00"]
    token = request.headers.get('token')
    userID = encodeToken(token)
    pass

@app.route('/del-schedule', methods=['PUT']) 
def deleteDeviceScheduleController(deviceScheduleID):
    token = request.headers.get('token')
    userID = encodeToken(token)
    body = request.get_json() 
    print(body['id']) #body['id'] = Là id của device schedule
    pass

@app.route('/user-face-detect', methods=['GET']) 
def getUserAccessController():
    token = request.headers.get('token')
    userID = encodeToken(token)
    #Trả về danh sách người dùng đã đi vào (xử lý ảnh AI)
    pass

@app.route('/ai-system', methods=['POST'])
def f():
    body = request.get_json() 
    #print(body['humidity'])#True or False
    #print(body['temperature'])#True or False
    #print(body['luminance'])#True or False
