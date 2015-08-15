#!/usr/bin/python3

import requests
import datetime
import json
import subprocess
import os

# constants
PATH_TO_DATA_PERSISTANT = 'data_persistent.txt'
PATH_TO_DATA_UNSENT = 'data_unsent.txt'
TEMPERATURE_READ_COMMAND = '/usr/local/bin/temper-poll -q -c'
SERVER_URL = 'http://www.y o u r _ s e r v e r/update'
HEADERS = {'Content-Type': 'application/json;charset=UTF-8'}

# create temp file if it does not exist yet
if not os.path.isfile(PATH_TO_DATA_UNSENT):
    open(PATH_TO_DATA_UNSENT,'a').write('')

# read temperature
temperature = float(subprocess.check_output(TEMPERATURE_READ_COMMAND, shell=True, universal_newlines=True).rstrip())

# assemble new data package to be sent
timestamp = datetime.datetime.now().isoformat()
humidity = 0
sensordata = [{'timestamp': timestamp, 'temperature': temperature, 'humidity': humidity}]

# save new data to local file
for item in sensordata:
      open(PATH_TO_DATA_PERSISTANT, 'a').write('%s\n' % item)

# add unsent data if any
data_unsent = [line.strip() for line in open(PATH_TO_DATA_UNSENT, 'r')]
data_to_send = sensordata if not data_unsent else data_unsent+sensordata

# send data
response_code = requests.post(SERVER_URL, data=json.dumps(sensordata), HEADERS=HEADERS).status_code

# check request code: if save on server failed, write it to file and try again next time
if response_code == 200:
    open(PATH_TO_DATA_UNSENT, 'w').write('');
else:
    for item in sensordata:
      open(PATH_TO_DATA_UNSENT, 'a').write('%s\n' % item)
print('Server response: ' + str(response_code))
