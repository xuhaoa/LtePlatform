import os
from customize_utilities import *

os.chdir('huawei_mro')
date_dir=generate_date_twohours_ago()

for root_no, dirs_no, files in os.walk(date_dir):
    for name in files:
        print(name)