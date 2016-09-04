import datetime

def generate_time_dir(now=datetime.datetime.now(), prefix = "/MR_HW_SOURCE_D/"):
    time_delta=datetime.timedelta(hours=-2)
    past=now+time_delta
    past=past.replace(minute=int(past.minute/15)*15,second=0)
    return prefix+past.strftime("%Y%m%d")+"/"+past.strftime("%Y%m%d%H%M")

def generate_date_twohours_ago(now=datetime.datetime.now()):
    date_delta=datetime.timedelta(hours=-2)
    past=now+date_delta
    return past.strftime("%Y%m%d")

def is_foshan_filename(name):
    enodebid=int(name.split('_')[-2])
    return enodebid in range(550912, 552959) or enodebid in range(499712, 503807)

def is_mro_filename(name):
    type=name.split('_')[-4]
    return type=='MRO'