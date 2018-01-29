text = ""
id = 0
for a in range(-5, 7, 1):
    i = a-.5
    text = text + "["
    for j in range(-7, 8, 1):
        text = text+"{x: "+str(j)+", y: 0, z: "+str(i)+", id: "+str(id)+"}, "
        id = id+1
    text = text+"], "
print(text)
    
