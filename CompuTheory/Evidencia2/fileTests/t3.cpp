#include <iostream>
using namespace std;

class Persona {
private:
    string nombre;
    int edad;
public:
    void saludar() {
        cout << nombre;
        return;
    }
};