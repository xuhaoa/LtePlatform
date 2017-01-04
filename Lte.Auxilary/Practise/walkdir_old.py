import os
import time
import datetime
one_year_ago=datetime.datetime.now()+datetime.timedelta(days=-365)
totaloldfiles=0
for (dirname,subshere,fileshare) in os.walk('/root'):
    for fname in fileshare:
        if fname.endswith('.pdf'):
            mtime=os.path.getmtime(os.path.join(dirname,fname))
            mtime_local=time.localtime(mtime)
            print(os.path.join(dirname,fname))
            mtime_datetime=datetime.datetime(year=mtime_local.tm_year,month=mtime_local.tm_mon,day=mtime_local.tm_mday)
            if mtime_datetime<one_year_ago:
                print("This is an old file. last modified:",mtime_datetime)
                totaloldfiles+=1

print('Total old files:', totaloldfiles)