tabla = [[1,6,7,8,0,8],
         [1,4,4,2,4,8],
         [3,8,8,8,8,8],
         [3,5,5,8,5,8]]

s = "125+243.56    +    97.042 +    25$"
b = " \n\t$"
d = "0123456789"

estado = 0
p = 0
lexema = ''
token = ''

while (s[p] != '$' or (s[p] == '$' and estado != 0)) and (estado != 8):
    c = s[p]
    print(p)
 
    #diccionario para la columna
    if c in d:
        col = 0
    elif c == '+':
        col = 1
    elif c == '-':
        col = 2
    elif c == '.':
        col = 3
    elif c in b:
        col = 4
    else: 
        col = 5
    
    estado = tabla[estado][col]

    if estado == 4:
        print(lexema, "ENTERO")
        lexema = ''
        token = ''
        p = p - 1
        estado = 0
    elif estado == 5:
        print(lexema, "REAL")
        lexema = ''
        token = ''
        p = p - 1
        estado = 0
    elif estado == 6:
        print('+', "SUMA")
        lexema = ''
        token = ''
        estado = 0
    elif estado == 7:
        print('+', "RESTA")
        lexema = ''
        token = ''
        estado = 0
    elif estado == 8:
        print("ERROR")
    p = p+1

    if estado != 0:
        lexema = lexema + c
        token = c

    