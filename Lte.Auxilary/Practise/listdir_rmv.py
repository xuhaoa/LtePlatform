import os

for file in os.listdir('/root'):
    if file.endswith('.pdf'):
        os.remove(os.path.join('/root', file))
        print(file, ' is removed')