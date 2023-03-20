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
        return result
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

def getUserListDataModel(userID):
    pass

def getDeviceScheduleModel():
    pass

def addDeviceScheduleModel(data):
    #data = ["humidity", "17/03/2022", "07:00", "09:00"]
    pass

def deleteDeviceScheduleModel(deviceScheduleID):
    pass

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