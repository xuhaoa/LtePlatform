# coding=utf8
from random import randint, uniform
student = open('Student.txt', 'w+')
scores = open('Scores.txt', 'w+')

for i in range(100):
	ri = randint(1, 100)
	sno = 'sno' + str(i)
	name = 'name' + str(i)
	sex = 'male' if ri % 2 == 0 else 'female'
	age = randint(18, 25)
	classroom = 'classroom' + '0' if ri % 2 == 0 else 'classroom' + '1'
	print(','.join([sno, name, sex, str(age), classroom]), file=student)

	semester = randint(1, 2)
	math = randint(50, 100)
	en = randint(50, 100)
	c = randint(50, 100)
	os = randint(50, 100)
	print(','.join([sno, str(semester), str(math), str(en), str(c), str(os)]), file=scores)