#Define all common used functions
import datetime
import time


def dt():
    ts = time.time()
    dts = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')
    return(dts)

def log_err(log_str):
    log_file = open('log_file.txt','a+',encoding = 'utf')
    log_file.write(log_str)
    log_file.close()
