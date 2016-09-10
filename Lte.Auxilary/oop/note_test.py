from note import Note, Notebook

n1=Note("hello first")
n2=Note("hello again")
print(n1.id)
print(n2.id)
print(n1.match('hello'))
print(n2.match('second'))


n=Notebook()
n.new_note("hello world")
n.new_note("hello again")
print(n.notes)
print(n.notes[0].id)
print(n.notes[1].id)
print(n.notes[0].memo)

print(n.search("hello"))
print(n.search("world"))
n.modify_memo(3,"hi world")
print(n.notes[0].memo)