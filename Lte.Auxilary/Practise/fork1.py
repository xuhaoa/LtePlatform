import os

def child():
    print('Hello from child', os.getpid())
    os._exit(0)

def parent():
    while True:
        newpid=os.fork() #this cannot be runned under the windows system!!!
        if newpid==0:
            child()
        else:
            print('Hello form parent', os.getpid(), newpid)
        if input()=='q': break

parent()