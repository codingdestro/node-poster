import json
import requests
import sys



#arguments from terminal
argv = sys.argv

filePath = "config.json"
userReq = ""

if len(argv) > 1:
    filePath = argv[1]
    print(filePath)

#default properties of config file
properties = {
    "default":{
        "hostname":"localhost",
        "port":"3000",
        "protocol":"http"
    }
}

#instructions how to use
def instruction():
    print("close to exit ")

try:
    file = open(filePath,'r')
    config = json.load(file)
    default_conf = config['default']
    for x in config:
        print(x)
    instruction()
    while True:
        req = input("select request\t")
        if req == "close":
            file.close()
            sys.exit()

except FileNotFoundError:
    print("config.json not found!")
    print("please create config.json file to make request")


