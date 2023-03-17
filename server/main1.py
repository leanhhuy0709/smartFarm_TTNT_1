import sys
from datetime import datetime
from Adafruit_IO import MQTTClient
from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import mysql.connector

cnx = mysql.connector.connect(user='root', password='0397190274',
                            host='127.0.0.1',port = '3306',
                            database='smartfarmdb',auth_plugin='mysql_native_password')
cursor = cnx.cursor()

AIO_FEED_IDS = ["humidity", "luminance", "temperature"]
AIO_USERNAME = "leanhhuy"
AIO_KEY = "aio_sNIp33jRMtm1pN0NE57pt4I6lNhR"

humidityData = []
luminanceData = []
temperatureData = []
accountData = []

def  connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_IDS:
        client.subscribe(feed)

def subscribe(client,userdata,mid,granted_qos) :
    print("Subscribe " + AIO_FEED_IDS[mid - 1] + " thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)

def  message(client , feed_id , payload):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S %D")
    print("Nhan du lieu tu " + feed_id + ": " + payload + " at " + current_time)
    if feed_id == "humidity":
        humidityData.append([payload, current_time])
        data = (current_time,'A1','humidity',payload)
        sql = "INSERT INTO sensor(timestamp,location,type,value) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql,data)
        cnx.commit()
    if feed_id == "luminance":
        luminanceData.append([payload, current_time])
    if feed_id == "temperature":
        temperatureData.append([payload, current_time])

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


#--------------------------------------------------


app = Flask(__name__)
CORS(app)



@app.route('/')
def hello():
    return jsonify({'message': 'Hello, world!'})

@app.route('/humidity')
def humidityFunc():
    return json.dumps(humidityData)

@app.route('/luminance')
def luminanceFunc():
    return json.dumps(luminanceData)

@app.route('/temperature')
def temperatureFunc():
    return json.dumps(temperatureData)


@app.route('/login', methods=['POST'])
def login():
    # data = request.get_json()
    # Do something with the data
    body = request.get_json()
    usr = body['username']
    psw = body['password']

    print([usr, psw])
    # query data
    data = (usr, psw)
    sql = "SELECT userID FROM account where username=%s and password=%s"
    cursor.execute(sql, data)
    result = cursor.fetchall()
    # -----------------------
    if len(result) == 0:
        return jsonify({"userID": -1})
    return jsonify({"userID": result[0][0]})

@app.route('/user')
def getUserData():
    body = request.get_json()
    print(body)
    try:
        value = body['userID']
    except KeyError:
        return jsonify({"message": False})
    sql = "SELECT * FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID where user.userID = " + str(body['userID'])
    cursor.execute(sql)
    result = cursor.fetchall()
    if len(result) == 0:
        return jsonify({"message": False})
    return jsonify({"userID": result[0][2], "name": result[0][6],
                    "phone": result[0][4], "email": result[0][5],
                    "position": result[0][7], "location": result[0][8],
                    "dob": result[0][9], "image": result[0][12]})


@app.route('/users')
def getUserList():
    # data = request.get_json()
    # Do something with the data
    #body = request.get_json()
    #usr = body['username']

    #Check usr valid!!!
    # query data
    sql = "SELECT * FROM account join user on account.userID = user.userID"
    cursor.execute(sql)
    result = cursor.fetchall()
    # -----------------------
    return jsonify(result)


app.run(host='localhost', port=8000)


cursor.close()
cnx.close()