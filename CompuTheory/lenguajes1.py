#Programa que recibe un string x y regresa True si pertence al lenguaje L
#y False en caso contrario.
# L = (a|b)*bb*(a|b)*

def reconoce (w):
    estado = 0
    for c in w:

        if estado == 0:
            if c == 'a':
                estado = 0
            elif c == 'b':
                estado = 1
            else:
                return False
            
        elif estado == 1:
            if c == 'a':
                estado = 0
            elif c == 'b':
                estado = 2
            else:
                return False
            
        elif estado == 2:
            if c == '$':
                return True
            elif c == 'a':
                estado = 2
            elif c == 'b':
                estado = 2
            else:
                return False
            

ws = ["bb$","ababbab$","abab$", "aaababa$","aaabbacba$"]

for w in ws:
    print(reconoce(w))

