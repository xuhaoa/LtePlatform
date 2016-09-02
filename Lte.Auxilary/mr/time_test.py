import datetime
from customize_utilities import *

now = datetime.datetime.now()
print(now)

time_struct=now.timetuple()
print(time_struct)
print(time_struct.tm_year)

past=datetime.datetime(time_struct.tm_year,time_struct.tm_mon,time_struct.tm_mday,time_struct.tm_hour-1,15)
print(past)
print(past.strftime("%Y%m%d%H%M%S"))

time_delta=datetime.timedelta(hours=-1)
past=now+time_delta
print(past)
print(past.minute)
past=past.replace(minute=int(past.minute/15),second=0)
print(past.strftime("%Y%m%d%H%M%S"))

print(generate_time_dir(prefix = "/MR_HW_SOURCE_D/"))
print(generate_time_dir(now=datetime.datetime(2016,5,4,17,17,0)))
print(generate_time_dir(now=datetime.datetime(2016,5,4,0,17,0)))
print(generate_time_dir(now=datetime.datetime(2016,5,3,17,59,0)))
print(generate_time_dir(now=datetime.datetime(2016,5,1,0,17,0)))
print(generate_time_dir(now=datetime.datetime(2016,1,1,0,23,0)))
print(generate_time_dir(now=datetime.datetime(2016,3,1,0,17,0)))