#!/usr/bin/env python
import socket
import requests
import json
import math
from time import sleep
#from sense_hat import SenseHat
#from spidev import SpiDev
from datetime import time


roomTitle = 'Room Two'
roomID = 2
ServerPort = 5000
ServerIP='192.168.1.146'
duration = 10
private_key = 'CNNU9FMSO7DJ2S00LZ95VDQ7VF4ELLQ5KDL5YR58N6BTT70FASDTAGFN6E7Y'

req_headers = {
    "Key": private_key
}

server_url = f"http://{ServerIP}:{ServerPort}/rooms/{roomID}/measurement"

#initializing sensors
#sense = SenseHat()


class MCP:
    def __init__(self, bus = 0, device = 0):
        self.bus, self.device = bus, device
        self.spi = 1#SpiDev()
        self.open()
        self.spi.max_speed_hz = 1000000
        
    def open(self):
        self.spi.open(self.bus, self.device)
        self.spi.max_speed_hz = 1000000
        
    def read(self, channel = 0):
        adc = self.spi.xfer2([1, (8 + channel) << 4, 0])
        data = ((adc[1] & 3) << 8) + adc[2]
        return data
    def close(self):
        self.spi.close()


while True:
    
    #adc = MCP()
    #Temperature
    temp = 25 #round(sense.get_temperature(), 2)
    #Humidity
    hum = 50 #round(sense.get_humidity(), 2)
    #Light
    light = 3  #adc.read(channel = 0)
    #AirPressure
    pres = 895  #round(sense.get_pressure(), 2)

    #Dataset
    dataSet = {'temperature': temp,
                'humidity': hum,
                'light': light,
                'pressure': pres}

    # print(dataSet['Temperature'])
    # print(dataSet['Humidity'])
    # print(dataSet['Lighting'])
    # print(dataSet['AirPressure'])

    post_measurement = requests.post(server_url, headers=req_headers, json=dataSet)

    print(post_measurement.status_code)
    print(post_measurement.headers)
    print(post_measurement.text)

    server_data = json.loads(post_measurement.text)
    sleep(int(server_data["duration"]))

