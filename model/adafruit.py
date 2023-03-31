import sys
from datetime import datetime
from Adafruit_IO import MQTTClient
import time
import random

from sqlQuery import *



AIO_FEED_IDS = []
AIO_USERNAME = "vanhung4320"
AIO_KEY = "" #Key cua Hung
GROUP_NAME = 'smart-farm-ttnt'

def  connected(client):
    print("Ket noi thanh cong...")
    
def subscribe(client,userdata,mid,granted_qos) :
    print("Subscribe " + str(mid) + " thanh cong ...")
    #print("Subscribe thanh cong ...")
    

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit(1)

def  message(client , feed_id , payload):
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S %D")
    print("Nhan du lieu tu " + feed_id + ": " + payload + " at " + current_time)
    

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
    print("Got data from database!")
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
            print("Added 1 to " + feedsName)
        else:
            client.publish(feedsName, 0, GROUP_NAME)
            print("Added 0 to " + feedsName)

print("Adafruit python server is running!")
while True:
    scheduleData = loadSchedule()
    addData()
    time.sleep(60)

    