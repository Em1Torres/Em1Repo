import os
temp = []
for raiz, carpetas, archivos in os.walk("C:/Users/Usuario Final/Developer/Em1Repo/CompuTheory"):
    # print("Raiz:", raiz)
    # print("Carpeta", carpetas)
    
    for archivo in archivos:
        if ".py" in archivo:
            temp.append(os.path.join(raiz, archivo))


for i in temp:
    print(i)