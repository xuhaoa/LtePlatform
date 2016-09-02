import datetime

def generate_time_dir(now=datetime.datetime.now(), prefix = "/MR_HW_SOURCE_D/"):
    time_delta=datetime.timedelta(hours=-2)
    past=now+time_delta
    past=past.replace(minute=int(past.minute/15)*15,second=0)
    return prefix+past.strftime("%Y%m%d")+"/"+past.strftime("%Y%m%d%H%M")

def generate_date_dir(now=datetime.date.today(), prefix='/ZIP_MR_HW_SOURCE_D/'):
    date_delta=datetime.timedelta(days=-1)
    past=now+date_delta
    return prefix+past.strftime("%Y%m%d")

def is_foshan_filename(name):
    enodebid=int(name.split('_')[-2])
    return enodebid in range(550912, 552959) or enodebid in range(499712, 503807)