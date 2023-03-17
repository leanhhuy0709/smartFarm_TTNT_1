import json
import mysql.connector

cnx = mysql.connector.connect(user='root', password='',
                            host='127.0.0.1',port = '3306',
                            database='smartfarmdb',auth_plugin='mysql_native_password')
cursor = cnx.cursor()

def loginModel(username, password):
    try:
        query = "SELECT userID FROM account where username=%s and password=%s"
        cursor.execute(query, (username, password))
        result = cursor.fetchall() #result = [[1]]
        return result[0][0] 
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


