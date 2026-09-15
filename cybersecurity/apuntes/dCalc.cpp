#include <iostream>
using namespace std;

int getD(int totient, int e){
	for(int i=0;i<10000;i++){
		if((i*e) % totient == 1)
			return i;
	}
	return -1;
}

int main(){
	int totient, e;
	cout << "Enter totient: ";
	cin >> totient;
	cout << endl;
	cout << "Enter E: ";
	cin >> e;
	cout << endl;
	cout << "D value: " << getD(totient,e);
}
