#/usr/bin/python3

import requests
import datetime
import json
import subprocess
import sys
import os

# constants
PATH_TO_DATA_PERSISTANT = 'data_persistent.txt'
PATH_TO_DATA_UNSENT = 'data_unsent.txt'
TEMPERATURE_READ_COMMAND = '/usr/local/bin/temper-poll -q -c'
SERVER_URL = 'http://YOURSERV.ER/update'
HEADER = {'Content-Type': 'application/json;charset=UTF-8'}

# create temp file if needed
if not os.path.isfile(PATH_TO_DATA_UNSENT):
    open(PATH_TO_DATA_UNSENT,'a').write('')

# read temperature
temperature = float(subprocess.check_output(TEMPERATURE_READ_COMMAND, shell=True, universal_newlines=True).rstrip())

# assemble new data package to be sent
timestamp = datetime.datetime.now().isoformat()
humidity = 0
sensordata = [{'timestamp': timestamp, 'temperature': temperature, 'humidity': humidity}]

# add unsent data if any
data_unsent = json.loads('[]')
for row in open(PATH_TO_DATA_UNSENT, 'r'):
    data_unsent.append(json.loads(row))
data_to_send = sensordata if not data_unsent else data_unsent+sensordata

# save new data to both persistant and temp file
for item in sensordata:
    open(PATH_TO_DATA_PERSISTANT, 'a').write('%s\n' % json.dumps(item))
    open(PATH_TO_DATA_UNSENT, 'a').write('%s\n' % json.dumps(item))

# send data and check request code: if sending to server failed, write it to file and try again next ti$
try:
    print('Trying to send %i sensor reading(s)...' % len(data_to_send))
    response_code = requests.post(SERVER_URL, data=json.dumps(data_to_send), headers=HEADER).status_code
    if response_code == 200:
        # SUCCESS remove sent data from temp file
        open(PATH_TO_DATA_UNSENT, 'w').write('');
        print('SUCCESS: Server response: ' + str(response_code))
    else:
        print('FAILURE: Server response: ' + str(response_code))
except:
    print('FAILURE: Unexpected error:', sys.exc_info()[0])
