from model.sql import *
#import jwt

#secret_key = "TTNT_1"
'''
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
'''


def loginController(username, password):
    userID = loginModel(username, password)

    # Tạo payload của token, bao gồm userID
    payload = {"userID": userID}

    # Mã hóa payload bằng secret key
    
    token = jwt.encode(payload, secret_key, algorithm="HS256")

    # Gán token vào biến temp
    temp = token
    
    return {token: temp}

def getUserDataController(token):
    userID = encodeToken(token)
    result = getUserDataModel(userID)
    return  {"userID": result[0][2], "name": result[0][6],
                    "phone": result[0][4], "email": result[0][5],
                    "position": result[0][7], "location": result[0][8],
                    "dob": result[0][9], "image": result[0][12]}
    
    
