#include <iostream>
using namespace std;

int sum(a,b){
    return (a + b);
}

int main(){
    int a;
    int b;
    cout << "First number: ";
    cin >> a;
    cout << endl;
    cout << "Second number: ";
    cin >> b;
    cout << endl;
    cout << "\nFuncionalidad scheme: " << sum(a,b) << endl;
}
