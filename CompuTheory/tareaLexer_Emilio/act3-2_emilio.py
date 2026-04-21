tabla = [
    [ 1,  7,  8,  0, 15, 16,  9, 18, 19, 20, 21,  7, 21, 21], # Estado 0
    [ 1, 21, 10, 10, 10, 10, 10, 10, 10, 10,  2, 21, 21, 21], # Estado 1
    [ 3, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21], # Estado 2
    [ 3, 21, 11, 11, 11, 11, 11, 11, 11, 11, 21,  4, 21, 21], # Estado 3
    [ 6, 21, 21, 21, 21, 21,  5, 21, 21, 21, 21, 21, 21, 21], # Estado 4
    [ 6, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21], # Estado 5
    [ 6, 21, 11, 11, 11, 11, 11, 11, 11, 11, 21, 21, 21, 21], # Estado 6
    [ 7,  7, 12, 12, 12, 12, 12, 12, 12, 12, 21,  7,  7, 21], # Estado 7
    [14, 14, 13, 14, 14, 14, 14, 14, 14, 14, 21, 14, 21, 21], # Estado 8
    [ 1, 17, 17, 17, 17, 17, 17, 17, 17, 17, 21, 17, 21, 21]  # Estado 9
]

def alfabetoMayus(x):
    mayusAlfa = ''
    for i in x:
        change = i.upper()
        if change == 'E':
            change = ''
            mayusAlfa = mayusAlfa + change
        else:
            mayusAlfa = mayusAlfa + change  
    return mayusAlfa


d = "0123456789"
b = " \n\t$"
alfabeto = 'abcdefghijklmnopqrstuvwxyz'
alfabeto += alfabetoMayus(alfabeto)


def tareaLexer(s):
    estado = 0
    p = 0
    lexema = ''
    tokens = []

    while p < len(s) and estado != 21:
        c = s[p]

        if c == '$' and estado == 0:
            break

        if c in d:
            col = 0 
        elif c in alfabeto:
            col = 1
        elif c == '/':
            col = 2
        elif c in b:
            col = 3
        elif c in '()':
            col = 4
        elif c == '+':
            col = 5
        elif c == '-':
            col = 6
        elif c == '*':
            col = 7
        elif c == '^':
            col = 8
        elif c == '=':
            col = 9
        elif c == '.':
            col = 10
        elif c == 'E':
            col = 11
        elif c == '_':
            col = 12
        else:
            col = 13

        estado = tabla[estado][col]


        if estado == 10:
            tokens.append({"lexema": lexema, "tipo": "INTEGER"})
            lexema = ''
            p -= 1
            estado = 0

        elif estado == 11:
            tokens.append({"lexema": lexema, "tipo": "FLOAT"})
            lexema = ''
            p -= 1
            estado = 0

        elif estado == 12:
            tokens.append({"lexema": lexema, "tipo": "VARIABLE"})
            lexema = ''
            estado = 0

        elif estado == 13:
            lexema += c
            while p < len(s) and s[p] not in '\n$':
                p += 1
                if p < len(s):
                    lexema += s[p]

            tokens.append({"lexema": lexema, "tipo": "COMMENT"})
            lexema = ''
            estado = 0
            continue

        elif estado == 14:
            tokens.append({"lexema": lexema, "tipo": "DIVISION"})
            lexema = ''
            estado = 0

        elif estado == 15:
            tokens.append({"lexema": lexema, "tipo": "CESPECIAL"})
            lexema = ''
            estado = 0

        elif estado == 16:
            tokens.append({"lexema": lexema, "tipo": "SUMA"})
            lexema = ''
            estado = 0

        elif estado == 17:
            tokens.append({"lexema": lexema, "tipo": "RESTA"})
            lexema = ''
            estado = 0

        elif estado == 18:
            tokens.append({"lexema": lexema, "tipo": "MULT"})
            lexema = ''
            estado = 0

        elif estado == 19:
            tokens.append({"lexema": lexema, "tipo": "EXP"})
            lexema = ''
            estado = 0

        elif estado == 20:
            tokens.append({"lexema": lexema, "tipo": "EQUAL"})
            lexema = ''
            estado = 0

        elif estado == 21:
            tokens.append({"lexema": lexema + c, "tipo": "ERROR"})
            lexema = ''
            estado = 0
            return tokens

        else:
            lexema += c

        p += 1

    return tokens


def leerArchivo(nombre):
    with open(nombre, 'r') as f:
        contenido = f.read()

    casos = contenido.split('$')

    for caso in casos:
        caso = caso.strip()
        if caso != '':
            print("\n--- NUEVO CASO ---")
            tokens = tareaLexer(caso + '$')

            print(f"{'LEXEMA':<15} | TIPO")
            print("-"*30)
            for t in tokens:
                print(f"{t['lexema']:<15} | {t['tipo']}")



leerArchivo("pruebas.txt")