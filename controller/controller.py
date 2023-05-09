from model.sqlQuery import *
import jwt
from flask import Flask, jsonify, request, send_from_directory
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
    temp = loginModel(username, password)
    if temp == {"message": False}: return jsonify(temp)
    [userID, position] = temp
    # Tạo payload của token, bao gồm userID
    payload = {"userID": userID}

    # Mã hóa payload bằng secret key
    
    token = jwt.encode(payload, secret_key, algorithm="HS256")

    # Gán token vào biến temp
    temp = token
    isAdmin = (position == "Owner")
    return jsonify({"token": temp, "isAdmin": isAdmin})

@app.route('/user', methods=['GET'])
def getUserDataController():
    token = request.headers.get('token')
    userID = encodeToken(token)
    result = getUserDataModel(userID)
    return  jsonify(result)
   
@app.route('/signup', methods=['POST']) 
def signUpController():
    '''
    body['name'] = "Le Anh Huy"
    ...
    Tui đặt tên giống các biến trong mySQL luôn
    '''
    body = request.get_json()
    #print(body["data"])
    return jsonify(signUpModel(body["data"]))
    
    

@app.route('/userlist', methods = ['GET']) 
def getUserListController():
    #Kiểm tra userID có phải người dùng hay không?
    token = request.headers.get('token')
    userID = encodeToken(token)
    return jsonify(getUserListDataModel())

@app.route('/schedule', methods = ['POST']) 
def getDeviceScheduleController():
    token = request.headers.get('token')
    userID = encodeToken(token)
    return jsonify(getDeviceScheduleModel())

@app.route('/add-schedule', methods=['POST']) 
def addDeviceScheduleController():
    #data = ["humidity", "17/03/2022", "07:00", "09:00"]
    
    token = request.headers.get('token')
    userID = encodeToken(token)
    body = request.get_json()
    temp = addDeviceScheduleModel(body["data"])
    if temp == {"message": False}: return jsonify(temp)
    return jsonify(temp)

@app.route('/del-schedule', methods=['POST']) 
def deleteDeviceScheduleController():
    token = request.headers.get('token')
    userID = encodeToken(token)
    body = request.get_json()
    temp = deleteDeviceScheduleModel(body['data'])
    if temp == {"message": False}: return jsonify(temp)
    return jsonify(temp)

@app.route('/user-access', methods=['GET']) 
def getUserAccessController():
    token = request.headers.get('token')
    userID = encodeToken(token)
    #Trả về danh sách người dùng đã đi vào (xử lý ảnh AI)
    return json.dumps(getUserAccessModel())

@app.route('/devicelist', methods=['GET'])
def getDeviceListController():
    token = request.headers.get('Authorization')
    userID = encodeToken(token)
    return json.dumps(getDeviceListModel())

@app.route('/message', methods = ['GET'])
def getMessageController():
    return json.dumps(getMessageModel())


@app.route('/images/<path:filename>')
def get_image(filename):
    return send_from_directory("../systemAI/images", filename)