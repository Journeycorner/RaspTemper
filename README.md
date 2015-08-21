# RaspTemper
Reads temperature data from Raspberry Pi2, pushes it to a server to make the data available for a web application.
## Install
### Data Server / Web Application
1. Clone this project.
2. Install java on your server.
3. Forward port 8081 to be accessible from outside.
4. Put the data-server directory on your server and execute it:
```
sh gradlew run
```
You should now see "[]" in your browser when accessing your server with http://YOUR_SERVER/get from outside.
5. Put the contents of web-application in a folder accessible from outside, e.g. http://YOUR_SERVER/chart.html
It should show an empty chart when accessed from outside.
### Sensor Reader
6. * (a) If you use a TEMPer USB Thermometer clone https://github.com/Journeycorner/temper-python and following the installation instructions
   * (b) In case of any other sensor you are on your own, just keep in mind that my current script needs a floating point value to be parsed from command line.
7. Install Python3 on your Raspberry Pi.
8. Install the Requests-Libary for Python: http://www.python-requests.org/en/latest/user/install/#install
9. Modify "sensor-reader/sensor_reader.py" to match your server url.
10. * (a) check subroutine path for script installed in step 2a
   * (b) modify subroutine path to match code for your own sensor
11. Put "sensor-reader/sensor_reader.py" to your Raspberry in a directory accessible for your user
12. Create a cronjob by executing:
```
cron -e
```
and adding (for every 15min)
```
*/15 * * * * python3 /home/YOUR_USER/DIR_OF_SCRIPT/sensor_reader.py 2>&1 | logger
```
13. If it works you should see something like this in syslog:
```
sudo tail -f /var/log/syslog
Aug 21 12:15:03 raspberrypi kernel: [736607.396576] usb 1-1.3: reset low-speed USB device number 5 using dwc_otg
Aug 21 12:15:03 raspberrypi kernel: [736607.711202] input: RDing TEMPerV1.2 as /devices/platform/bcm2708_usb/usb1/1-1/1-1.3/1-1.3:1.0/0003:0C45:7401.060E/input/input1548
Aug 21 12:15:03 raspberrypi kernel: [736607.711676] hid-generic 0003:0C45:7401.060E: input,hidraw0: USB HID v1.10 Keyboard [RDing TEMPerV1.2] on usb-bcm2708_usb-1.3/input0
Aug 21 12:15:04 raspberrypi logger: Trying to send 1 sensor reading(s)...
Aug 21 12:15:04 raspberrypi logger: SUCCESS: Server response: 200
```
If you see this output, you are done! You can now access the data from your server by either calling the rest-service directly .../get or loading the chart.html.
