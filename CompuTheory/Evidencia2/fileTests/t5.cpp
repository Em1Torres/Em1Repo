#include <iostream>
using namespace std;

int main() {
    const int limite = 5;
    float suma = 0.0;
    for (int i = 0; i < limite; i = i + 1) {
        if (true) {
            suma = suma + i;
        } else {
            continue;
        }
    }
    cout << suma;
    return 0;
}