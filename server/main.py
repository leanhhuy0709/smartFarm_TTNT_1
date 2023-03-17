import sys
from datetime import datetime
from Adafruit_IO import MQTTClient

AIO_FEED_IDS = ["humidity", "luminance", "temperature"]
AIO_USERNAME = "leanhhuy"
AIO_KEY = "aio_dpGG30pJwsQiCbMyyFemzXiHhnll"

humidityData = []
luminanceData = []
temperatureData = []
accountData = [["huy", "123", False], ["admin", "123", True]]


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
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

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

@app.route('/authen/signin', methods=['POST'])
def post_data():
    #data = request.get_json()
    # Do something with the data
    body = request.get_json()
    usr = body['username']
    psw = body['password']
    
    print([usr, psw])
    #query data
    for i in accountData:
        if usr == i[0] and psw == i[1]:
            return jsonify({'message': 'True', 'isAdmin': i[2]})        
    else:
        return jsonify({'message': 'Failed', 'isAdmin': False})
    #-----------------------
    
@app.route('/users')
def getUserList():
    body = request.get_json()


if __name__ == '__main__':
    app.run(host='localhost', port=8000)
