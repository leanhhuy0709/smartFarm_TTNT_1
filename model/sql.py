import json
import mysql.connector

cnx = mysql.connector.connect(user='root', password='',
                            host='127.0.0.1',port = '3306',
                            database='smartfarmdb',auth_plugin='mysql_native_password')
cursor = cnx.cursor()

def loginModel(username, password):
    try:
        query = "SELECT account.userID, position FROM account join user on account.userID = user.userID where username=%s and password=%s;"
        cursor.execute(query, (username, password))
        result = cursor.fetchall() #result = [[1]]
        return result[0]
    except KeyError:
        print(KeyError)
        
def getUserDataModel(userID):
    try:
        query = "SELECT * FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID where user.userID = " \
            + str(userID)
        cursor.execute(query)
        result = cursor.fetchall()
        return {"userID": result[0][2], "name": result[0][6],
                    "phone": result[0][4], "email": result[0][5],
                    "position": result[0][7], "location": result[0][8],
                    "dob": result[0][9], "image": result[0][12]}
    except KeyError:
        print(KeyError)

def signUpModel(data):
    # {'name': 'hoang', 'email': 'hoang@gmail.com', 'phone': '0987654321', 'location': 'hcm', 'dob': '2000-01-01', 'image': 'a', 'username': 'hoang', 'password': '1234'}
    
    # add to user table
    try:
        query = """INSERT INTO user (name, email, phoneNumber, location, dob, position)
        values(%s, %s, %s, %s, %s, %s);"""
        cursor.execute(query, (data['name'], data['email'], data['phone'], data['location'], data['dob'], "Staff"))
    except KeyError:
        print(KeyError)
    
    # add to faceImage table
    try:
        query = """INSERT INTO faceImage (label, linkref, userID)
        values(%s, %s, (SELECT MAX(userID) from user));"""
        cursor.execute(query, (data['name'], data['image']))
    except KeyError:
        print(KeyError)
    
    # add to account table
    try:
        query = """INSERT INTO account (username, password, userID)
        values(%s, %s, (SELECT MAX(userID) from user));"""
        cursor.execute(query, (data['username'], data['password']))
    except KeyError:
        print(KeyError)
    return "Sign up success"

def getUserListDataModel():
    try:
        query = "SELECT user.userID, email, name, position, location, DOB, linkref, phoneNumber FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID"
        cursor.execute(query)
        result = cursor.fetchall()
        result = list(map(lambda e: {"userID": e[0], "name": e[2],
                    "phone": e[7], "email": e[1],
                    "position": e[3], "location": e[4],
                    "dob": e[5], "image": e[6]}, result))
        return result
    except KeyError:
        print(KeyError)

def getDeviceScheduleModel():
    try:
        query = """SELECT * FROM deviceSchedule join device on deviceSchedule.dID = device.dID"""
        cursor.execute(query)
        result = cursor.fetchall()
        result = list(map(lambda e: {
            "dSID": e[0],
            "startTime": str(e[1])[0:5],
            "endTime": str(e[2])[0:5],
            "dOW": e[3],
            "dID": e[4],
            "name": e[6]
            }, result))
        return result
    except KeyError:
        print(KeyError)

def addDeviceScheduleModel(data):
    try:
        query = """INSERT INTO deviceSchedule(startTime, endTime, dOfW, dID)
        VALUES (%s, %s, %s, %s);"""
        cursor.execute(query, (data['startTime'], data['endTime'], data['dOW'], data['dID']))
    except KeyError:
        print(KeyError)
    return "Add success"

def deleteDeviceScheduleModel(data):
    try:
        query = """DELETE FROM deviceSchedule WHERE dSID = """ + str(data["dSID"]) +";"
        cursor.execute(query)
    except:
        print("something")
    return "Del success"

def getUserAccessModel():
    pass

def getDeviceListModel():
    try:
        query = "select * from device"
        cursor.execute(query)
        result = cursor.fetchall()
        return list(map(lambda x: {"dID": x[0], "name": x[1]}, result))
    except KeyError:
        print(KeyError)