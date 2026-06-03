import os

base = "C:/Users/Usuario Final/Developer/Em1Repo/CompuTheory/Evidencia2/bigTests"

cpp_content = """
#include <iostream>
using namespace std;

class Calculadora {
private:
    float resultado;
public:
    void sumar(float a, float b) {
        resultado = a + b;
        cout << resultado;
        return;
    }
    void restar(float a, float b) {
        resultado = a - b;
        cout << resultado;
        return;
    }
};

int main() {
    const int limite = 1000;
    float suma = 0.0;
    int contador = 0;
    for (int i = 0; i < limite; i = i + 1) {
        if (true) {
            suma = suma + i;
            contador = contador + 1;
        } else {
            continue;
        }
    }
    while (contador > 0) {
        switch (contador) {
            case 1:
                cout << "uno";
                break;
            case 2:
                cout << "dos";
                break;
            default:
                break;
        }
        contador = contador - 1;
    }
    cout << suma;
    return 0;
}
""" * 300

js_content = """
class Calculadora {
    constructor() {
        this.resultado = 0;
    }
    sumar(a, b) {
        this.resultado = a + b;
        console.log(this.resultado);
    }
}

for (let i = 0; i < 1000; i++) {
    console.log(i);
}
""" * 300

carpetas = [
    base,
    f"{base}/sub1",
    f"{base}/sub2",
    f"{base}/sub1/sub3",
]

for carpeta in carpetas:
    os.makedirs(carpeta, exist_ok=True)

archivos = [
    (f"{base}/a1.cpp",            cpp_content),
    (f"{base}/a2.cpp",            cpp_content),
    (f"{base}/sub1/b1.cpp",       cpp_content),
    (f"{base}/sub1/b2.cpp",       cpp_content),
    (f"{base}/sub2/c1.cpp",       cpp_content),
    (f"{base}/sub2/c2.cpp",       cpp_content),
    (f"{base}/sub1/sub3/d1.cpp",  cpp_content),
    (f"{base}/sub1/sub3/d2.cpp",  cpp_content),
    (f"{base}/fake1.js",          js_content),
    (f"{base}/sub1/fake2.js",     js_content),
    (f"{base}/sub2/fake3.js",     js_content),
]

for path, contenido in archivos:
    with open(path, "w") as f:
        f.write(contenido)

print("Archivos generados en:", base)