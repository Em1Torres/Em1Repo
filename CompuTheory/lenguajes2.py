#Programa que recibe un string x y regresa True si pertence al lenguaje L
#y False en caso contrario.
# L = (a|b)*bb*(a|b)*

tabla = [[0,1],[0,2],[2,2]]
dick = {'a':0, 'b':1}

def reconoce(w):
    
    estado = 0
    for c in w:
        if c in 'ab$':
            if c == '$':
                if estado == 2:
                    return True
                else:
                    return False
            estado = tabla[estado][dick[c]]
        else:
            return False



ws = ["bb$","ababbab$","abab$", "aaababa$","aaabbacba$"]
for w in ws:
    print(reconoce(w))

#Continuación de clase:

#Lexer o Scanner

