import sys
from datetime import datetime
from Adafruit_IO import MQTTClient
import time
import random
import requests
import json
sys.path.insert(1, '../systemAI/')
from automatic_system import load_dt, predict
from sqlQuery import *


auto_waterpump = False
auto_tarpaulin = False

AIO_FEED_IDS = []
#AIO_USERNAME = "vanhung4320"
AIO_USERNAME = "vanhung4320"
AIO_KEY = "aio_CLTY71yuD7jMEOr1zZMsHssfE29H" 
GROUP_NAME = 'smart-farm-ttnt'
#GROUP_NAME = ''

def connected(client):
    print("Ket noi thanh cong...")
    
def subscribe(client,userdata,mid,granted_qos) :
    print("Subscribe " + str(mid) + " thanh cong ...")
    #print("Subscribe thanh cong ...")
    
def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)



url_humi = "https://io.adafruit.com/api/v2/vanhung4320/feeds/smart-farm-ttnt.humidity"
url_temp = "https://io.adafruit.com/api/v2/vanhung4320/feeds/smart-farm-ttnt.temperature"
url_lumi = "https://io.adafruit.com/api/v2/vanhung4320/feeds/smart-farm-ttnt.luminance"
def message(client , feed_id , payload):

    global auto_waterpump
    global auto_tarpaulin

    now = datetime.now()
    current_time = now.strftime("%Y-%m-%d %H:%M:%S")
    print("Nhan du lieu tu " + feed_id + ": " + payload + " at " + current_time)
    payload = float(payload)
    if feed_id == "smart-farm-ttnt.humidity": 
        if payload > 90 or payload < 10:
            addMessageModel(feed_id, current_time, payload)
    elif feed_id == "smart-farm-ttnt.temperature": 
        if payload > 40 or payload < 15:
            addMessageModel(feed_id, current_time, payload)
    elif feed_id == "smart-farm-ttnt.luminance": 
        if payload > 200 or payload < 100:
            addMessageModel(feed_id, current_time, payload)

    elif feed_id == "smart-farm-ttnt.auto-waterpump":
        if payload == 1:
            auto_waterpump = True
        else:
            auto_waterpump = False
    elif feed_id == "smart-farm-ttnt.auto-tarpaulin":
        if payload == 1:
            auto_tarpaulin = True
        else:
            auto_tarpaulin = False
        
    

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

scheduleData = []

def loadSchedule():
    data = getDeviceScheduleModel()
    # print("Got data from database!")
    return list(map(lambda e: {
        "name": e["name"], 
        "dOW": e["dOW"], 
        "startTime": e["startTime"], 
        "endTime": e["endTime"]
        }, data))

def timeLessOrEqualThan(t1, t2):
    h1 = t1[0:2]
    h2 = t2[0:2]
    m1 = t1[3:5]
    m2 = t2[3:5]
    if int(h1) != int(h2): return int(h1) <= int(h2)
    return int(m1) <= int(m2)

weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

def addData():
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    dOW = weekdays[datetime.today().weekday()]
    for i in scheduleData:
        #Water pump, Tarpaulin, Light
        if i["name"] == "Water pump": feedsName = "water-pump"
        elif i["name"] == "Tarpaulin": feedsName = "tarpaulin"
        elif i["name"] == "Light": feedsName = "led-rgb"
        else: print(i)
        if i["dOW"] == dOW and timeLessOrEqualThan(i["startTime"], current_time) and timeLessOrEqualThan(current_time, i["endTime"]):
            client.publish(feedsName, 1, group_id = GROUP_NAME)
            #print("Added 1 to " + feedsName)
        else:
            client.publish(feedsName, 0, GROUP_NAME)
            #print("Added 0 to " + feedsName)

print("Adafruit python server is running!")

client.subscribe('smart-farm-ttnt.temperature')
client.subscribe('smart-farm-ttnt.humidity')
client.subscribe('smart-farm-ttnt.luminance')
client.subscribe('smart-farm-ttnt.auto-waterpump')
client.subscribe('smart-farm-ttnt.auto-tarpaulin')
client.subscribe('smart-farm-ttnt.water-pump')
client.subscribe('smart-farm-ttnt.tarpaulin')

while True:
    if not auto_tarpaulin and not auto_waterpump:
        scheduleData = loadSchedule()
        addData()
    #Cos gia tri ko hop le
    #Tao 1 tin nhan trong dtb
    if auto_waterpump:
        # Get last data
        res_humi = requests.get(url_humi)
        json_data_humi = json.loads(res_humi.content)
        value_humi = json_data_humi['last_value']

        res_temp = requests.get(url_temp)
        json_data_temp = json.loads(res_temp.content)
        value_temp = json_data_temp['last_value']

        res_lumi = requests.get(url_lumi)
        json_data_lumi = json.loads(res_lumi.content)
        value_lumi = json_data_lumi['last_value']

        # Load model to predict
        cls_wp = load_dt('../systemAI/water_pump_dt.pkl')
        value = predict(cls_wp, [float(value_temp), float(value_humi), float(value_lumi)])
        # print(value)
        client.publish("water-pump", value, GROUP_NAME)

    if auto_tarpaulin:
        # Get last data
        res_humi = requests.get(url_humi)
        json_data_humi = json.loads(res_humi.content)
        value_humi = json_data_humi['last_value']

        res_temp = requests.get(url_temp)
        json_data_temp = json.loads(res_temp.content)
        value_temp = json_data_temp['last_value']

        res_lumi = requests.get(url_lumi)
        json_data_lumi = json.loads(res_lumi.content)
        value_lumi = json_data_lumi['last_value']

        # Load model to predict
        cls_motor = load_dt('../systemAI/motor_dt.pkl')
        value = predict(cls_motor, [float(value_temp), float(value_humi), float(value_lumi)])

        client.publish("tarpaulin", value, GROUP_NAME)

    time.sleep(10) #10 phut kiem tra 1 lan
