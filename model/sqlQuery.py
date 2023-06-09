import json
import mysql.connector
from datetime import datetime

cnx = mysql.connector.connect(user='root', password='',
                            host='127.0.0.1',port = '3306',
                            database='smartfarmdb',auth_plugin='mysql_native_password')
cursor = cnx.cursor()
cnx.commit()

def loginModel(username, password):
    try:
        query = "SELECT account.userID, position FROM account join user on account.userID = user.userID where username=%s and password=%s;"
        cursor.execute(query, (username, password))
        result = cursor.fetchall() #result = [[1]]
        cnx.commit()
        return result[0]
    except:
        return {"message": False}
        
def getUserDataModel(userID):
    try:
        query = "SELECT * FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID where user.userID = " \
            + str(userID)
        cursor.execute(query)
        result = cursor.fetchall()
        cnx.commit()
        return {"userID": result[0][2], "name": result[0][6],
                    "phone": result[0][4], "email": result[0][5],
                    "position": result[0][7], "location": result[0][8],
                    "dob": result[0][9], "image": result[0][11]}
    except:
        print("getUserDataModel Error")

def signUpModel(data):
    # {'name': 'hoang', 'email': 'hoang@gmail.com', 'phone': '0987654321', 'location': 'hcm', 'dob': '2000-01-01', 'image': 'a', 'username': 'hoang', 'password': '1234'}
    print("Signup")
    # check if username exist
    try:
        query = """SELECT EXISTS(SELECT * FROM account WHERE username = \"""" + str(data['username']) + """\")"""
        cursor.execute(query)
        result = cursor.fetchall()
    except result == 1:
        return {"message": False}


    # add to user table
    try:
        query = """INSERT INTO user (name, email, phoneNumber, location, dob, position)
        values(%s, %s, %s, %s, %s, %s);"""
        cursor.execute(query, (data['name'], data['email'], data['phone'], data['location'], str(data['dob']), "Employee"))
        cnx.commit()
    except Exception as e:
        print("Error: ", e)
        return {"message": False}
    
    # add to faceImage table
    try:
        query = "INSERT INTO faceImage (linkref, userID) values('" + str(data["image"])+ "', (SELECT MAX(userID) from user));"
        cursor.execute(query)
        cnx.commit()
    except Exception as e:
        print("Error: ", e)
        return {"message": False}

    # add to account table
    try:
        query = """INSERT INTO account (username, password, userID)
        values(%s, %s, (SELECT MAX(userID) from user));"""
        cursor.execute(query, (data['username'], data['password']))
        cnx.commit()
    except:
        return {"message": False}
    
    try:
        query = "INSERT INTO employee values((SELECT MAX(userID) from user));"
        cursor.execute(query)
        cnx.commit()
    except Exception as e:
        print("Error: ", e)
        return {"message": False}
    
    return {"message": True}

def getUserListDataModel():
    try:
        query = "SELECT user.userID, email, name, position, location, DOB, linkref, phoneNumber FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID"
        cursor.execute(query)
        result = cursor.fetchall()
        result = list(map(lambda e: {"userID": e[0], "name": e[2],
                    "phone": e[7], "email": e[1],
                    "position": e[3], "location": e[4],
                    "dob": e[5], "image": e[6]}, result))
        cnx.commit()
        return result
    except:
        print("getUserListDataModel Error!")

def setTimeFormat(str):
    #8:9
    if str[1] == ":":
        if len(str) == 3: return "0" + str[0:2] + "0" + str[2]
        else: return "0" + str
    elif len(str) == 4: return str[0:3] + "0" + str[3]
    return str

def getDeviceScheduleModel():
    try:
        query = """SELECT * FROM deviceSchedule join device on deviceSchedule.dID = device.dID"""
        cursor.execute(query)
        result = cursor.fetchall()
        result = list(map(lambda e: {
            "dSID": e[0],
            "startTime": setTimeFormat(str(e[1])),#8:12:12
            "endTime": setTimeFormat(str(e[2])),
            "dOW": e[3],
            "dID": e[4],
            "name": e[6]
            }, result))
        cnx.commit()
        return result
    except Exception as e:
        print("Đã xảy ra lỗi:", e)

def addDeviceScheduleModel(data):
    try:
        query = """INSERT INTO deviceSchedule(startTime, endTime, dOfW, dID)
        VALUES (%s, %s, %s, %s);"""
        cursor.execute(query, (data['startTime'], data['endTime'], data['dOW'], data['dID']))
        cnx.commit()
    except:
        return {"message": False}
    return {"message": True}

def deleteDeviceScheduleModel(data):
    try:
        query = """DELETE FROM deviceSchedule WHERE dSID = """ + str(data["dSID"]) +";"
        cursor.execute(query)
        cnx.commit()
    except:
        return {"message": False}
    return {"message": True}

def getUserAccessModel():
    try:
        query = """SELECT name, position, access_history.datetime, linkref
                FROM access_history 
                LEFT JOIN enter_farm ON access_history.datetime = enter_farm.datetime
                LEFT JOIN user ON enter_farm.userID = user.userID
                LEFT JOIN faceImage ON user.userID = faceImage.userID;"""
        cursor.execute(query)
        result = cursor.fetchall()
        cnx.commit()
        return list(map(lambda x: {"name": x[0], "position": x[1], "datetime": str(x[2]), "linkref": x[3]}, result))
    except KeyError as e:
        print(e)

def getDeviceListModel():
    try:
        query = "select * from device"
        cursor.execute(query)
        result = cursor.fetchall()
        cnx.commit()
        return list(map(lambda x: {"dID": x[0], "name": x[1]}, result))
    except KeyError as e:
        print(e)

def getMessageModel():
    try:
        query = "SELECT * FROM message ORDER BY datetime DESC;"
        cursor.execute(query)
        result = cursor.fetchall()
        cnx.commit()
        return list(map(lambda x: {"type": x[1], "datetime": str(x[2]), "value": x[3]}, result))
    except KeyError as e:
        print(e)
        
def addMessageModel(typ, dt, val):
    try:
        query = "INSERT INTO `message`(type, datetime, value) VALUES(%s, %s, %s);"
        cursor.execute(query, (typ, str(dt), val))
        cnx.commit()
    except KeyError as e:
        print(e)