bob=['Bob Smith', 42,30000,'software']
sue=['Sue Jones',45,40000,'hardware']
print(bob[0],sue[1])
print(bob[0].split()[-1])

sue[2]*=1.25
print(sue)

people=[bob,sue]
for person in people:
    print(person)

for person in people:
    print(person[0].split()[-1])
    person[2]*=1.20

for person in people: print(person[2])

pays = [person[2] for person in people]
print(pays)

pays=map((lambda x: x[2]), people)
print(list(pays))

print(sum(person[2] for person in people))

people.append(['Tom', 50, 0, None])
print(len(people))
print(people[-1][0])