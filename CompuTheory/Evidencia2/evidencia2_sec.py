import os #Librería para poder iterar todo un folder 
import time

categorias = {
    'letra': 0,
    'digito': 1,
    'punto': 2,
    'comilla_simple': 3,
    'comilla_doble': 4,
    'operador': 5,
    'delimitador': 6,
    'slash': 7,
    'gato': 8,
    'espacio': 9,
    'otro': 10
}

reservadas = {
    "int", "float", "if", "else", "while", "for",
    "return", "class", "public", "private", "void",
    "const", "switch", "case", "break", "continue",
    "true", "false", "using", "namespace", "char", "string", "std", "cout", "cin"
}

tabla_transicion = [
[ 1,   2,  -1,  5,  8,  9, 10, 11, 13,  0, -1], # 0 Inicial
[ 1,   1,  -1, -1, -1, -1, -1, -1, -1, -1, -1], # 1 Identificador
[-1,   2,   3, -1, -1, -1, -1, -1, -1, -1, -1], # 2 Entero
[-1,   4,  -1, -1, -1, -1, -1, -1, -1, -1, -1], # 3 Punto
[-1,   4,  -1, -1, -1, -1, -1, -1, -1, -1, -1], # 4 Real
[ 6,   6,   6,  7,  6,  6,  6,  6,  6,  6,  6], # 5 Inicio char
[-1,  -1,  -1,  7, -1, -1, -1, -1, -1, -1, -1], # 6 Char válido
[-1,  -1,  -1, -1, -1, -1, -1, -1, -1, -1, -1], # 7 Fin char
[ 8,   8,   8,  8, 14,  8,  8,  8,  8,  8,  8], # 8 String
[-1,  -1,  -1,  -1, -1, -1, -1, -1, -1, -1, -1], # 9 Operador
[-1,  -1,  -1,  -1, -1, -1, -1, -1, -1, -1, -1], # 10 Delimitador
[-1, -1, -1, -1, -1, -1, -1, 12, -1, -1, -1], # 11 /
[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12], # 12 Comentario
[13, 13, 13, 13, 13, 13, 13, 13, 13, -1, 13], # 13 Librería o Definir
[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], #14 Fin de String
]

alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
digito = "0123456789"

def determinar_categoria(c):
    if c in " \n\t": return categorias['espacio']
    if c in alfabeto: return categorias['letra']
    if c == '_': return categorias['letra']
    if c in digito: return categorias['digito']
    if c == '.': return categorias['punto']
    if c == "'": return categorias['comilla_simple']
    if c == '"': return categorias['comilla_doble']
    if c == '/': return categorias['slash']
    if c in '+-=*<>!&|%^<<>>:': return categorias['operador']
    if c in ";,()[]{}": return categorias['delimitador']
    if c == '#':return categorias['gato']
    return categorias['otro']

def lexerCppHTML(archivo):
    with open(archivo, 'r') as f:
        contenido = f.read()

    html = """
<html>
<head>
    <meta charset="UTF-8">
    <title>Resaltado Léxico C++</title>
</head>
<body>
<pre>
"""

    i = 0

    while i < len(contenido):
        estado = 0
        placeholder = ""

        while i < len(contenido):
            c = contenido[i]
            columna = determinar_categoria(c)
            nuevo_estado = tabla_transicion[estado][columna]

            # Si no hay transición válida
            if nuevo_estado == -1:
                if estado == 0:
                    html += c
                    i += 1
                break

            # Para comentarios y librerias: terminar en salto de línea
            if estado == 12 and c == '\n':
                break

            if estado == 12 and c == '\n':
                break

            estado = nuevo_estado
            placeholder += c
            i += 1

        if estado == 1:
            if placeholder.strip() in reservadas:
                html += f'<font color="blue">{placeholder}</font>'
            else:
                html += f'<font color="black">{placeholder}</font>'

        elif estado == 2:
            html += f'<font color="#D97700">{placeholder}</font>'

        elif estado in [3, 4]:
            html += f'<font color="#FF00DD">{placeholder}</font>'

        elif estado == 7:
            html += f'<font color="#00EB00">{placeholder}</font>'

        elif estado == 14:
            html += f'<font color="#033D03">{placeholder}</font>'

        elif estado == 9 or estado == 11:
            html += f'<font color="#FF1A00">{placeholder}</font>'

        elif estado == 10:
            html += f'<font color="gray">{placeholder}</font>'

        elif estado == 12:
            html += f'<font color="gray">{placeholder}</font>'

        elif estado == 13:
            html += f'<font color="purple">{placeholder}</font>'

        else:
            html += placeholder

    html += """
</pre>
</body>
</html>
"""

    # Replace lo unico que hace es cambiar el nombre de la primera parte del archivo
    # por el de la segunda parte. En este caso hace que se cree un archivo prueba.html ya que el original
    # es prueba.cpp
    salida = archivo.replace(".cpp", ".html")


    with open(salida, 'w') as f:
        f.write(html)

    print("Archivo HTML generado:", salida)


def getCppFiles(path):
    temp = []
    for raiz, carpetas, archivos in os.walk(path):
        
        for archivo in archivos:
            if ".cpp" in archivo:
                temp.append(raiz + "/" + archivo)
    return temp

#Aquí de manera secuencial hacemos "traversing" de cada string en el arreglo y lo llamamos en 
# la función del lexer
inicio = time.time()
files = getCppFiles("C:/Users/gking/Desktop/Em1Repo/CompuTheory/Evidencia2");
for file in files:
    lexerCppHTML(file)
fin = time.time()
print("Tiempo: ", fin-inicio)