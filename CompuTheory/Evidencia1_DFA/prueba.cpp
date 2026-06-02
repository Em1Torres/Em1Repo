#include <iostream>
using namespace std;

// Programa de prueba para el analizador léxico

int main() {
    // Variables enteras
    int edad = 20;
    int numero = -25;
    int contador = 0;
    int division = 20/4;

    // Variables reales
    float pi = 3.14;
    float promedio = 2.50;
    float decimal = 0.001;

    // Caracteres
    char letra = 'a';
    char inicial = 'Z';
    char digito = '9';

    // Strings
    string saludo = "Hola";
    string nombre = "Guillermo";

    // Operadores y condicionales
    if (edad > 18 && contador == 0) {
        cout << saludo << " " << nombre << endl;
    }
    else {
        cout << "Menor de edad" << endl;
    }

    // Ciclo for
    for (int i = 0; i < 5; i++) {
        contador += i;
    }

    // Return
    return 0;
}