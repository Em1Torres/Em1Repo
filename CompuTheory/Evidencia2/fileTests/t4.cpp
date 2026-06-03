#include <iostream>
using namespace std;

int main() {
    int x = 2;
    switch (x) {
        case 1:
            cout << "uno";
            break;
        case 2:
            cout << "dos";
            break;
        default:
            continue;
    }
    return 0;
}