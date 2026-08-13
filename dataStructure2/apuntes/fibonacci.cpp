#include <iostream>
#include <vector>

using namespace std;

int memoization_Fibonacci(int n) {
//fibonacci with regresion: memoizattion
	if (n <= 1) return n;
	else return memoization_Fibonacci(n - 1) + memoization_Fibonacci(n - 2);
}

int stored_memoization_Fibonacci(int n) {
	vector <int> memo = { 0,1 };
	if (n < memo.size()) {
		return memo[n];
	}

	else {
		int number = stored_memoization_Fibonacci(n - 1) + stored_memoization_Fibonacci(n - 2);
		memo.push_back(number);
		return number;
	}
}

vector <int> stored_tabulation_Fibonacci(int n) {
	vector <int> numbers_Vector = { 0,1 };
	if (n < 1) {
		numbers_Vector.pop_back();
		return numbers_Vector;
	}
	if (n == 1) {
		return numbers_Vector;
	}
	else {
		for (int i = 2; i <= n; i++) {
			numbers_Vector.push_back(numbers_Vector[i - 1] + numbers_Vector[i - 2]);
		}
		return numbers_Vector;
	}

}

int non_stored_tabulation_Fibonacci(int n) {
	int past = 0;
	int present = 1;
	int future = 0;
	if (n == 0) {
		return past;
	}
	if (n == 1) {
		return present;
	}
	for (int i = 2; i <= n; i++) {
		future = past + present;
		past = present;
		present = future;
	}
	return future;
}

int main(){
    int n = 6;
    cout << memoization_Fibonacci(n) << endl;
    cout << stored_memoization_Fibonacci(n) << endl;
    vector <int> result = stored_tabulation_Fibonacci(n);
    for(int i = 0; i < result.size(); i++){
        cout << result[i];
    }
    cout << endl;
    cout << non_stored_tabulation_Fibonacci(n) << endl;
}


// Stored Memoization Complexity:
// Non Stored Memoization Complexity:
// Stored Tabulation Complexity:
// Non Stored Tabulation Complexity:

// Work division:

