#include <iostream>
#include<vector>
#include <fstream>
#include <string>
using namespace std;


string readTxTFiles(string path) { //Function to read starting .txt files
	string line;
	string wholeText;
	ifstream f(path); 
	while (getline(f, line)) {
		wholeText += line; //concatenates all lines of the file into one string
	}
	f.close(); 
	return wholeText;
}

class TransmissionResults { 
public:
	string transmission;
	vector <string> mcodes;
	vector <bool> mcodes_in_transmission; /* here you store whether the mcodes are in the transmission as a boolean, there can be at most 3 elements in the array
	if there are more you have made a mistake*/
	vector <vector<int>> indexes; /* store where the mcodes were found inside the transmission, if they are not in the transmission you store an empty vector*/
	int longest_substring_size = 0;
	int longest_substring_position = 0;

	TransmissionResults(string transmission) {
		this->transmission = transmission;
	}

	void getMcodes(string pattern) {
		mcodes.push_back(pattern);
	}

	void zFunction(int index) {// receive an index as an input to be able to call the function on a for loop instead of calling it once per mcode
		string concatenated_string = mcodes[index] + '$' + transmission;
		vector <int> mcodeiIndex;
		for (int j = 1; j < concatenated_string.size(); j++) {
			int i = 0;
			int j_count = j;
			while (concatenated_string[i] == concatenated_string[j_count]) {
				i++;
				j_count++;
			}
			if (i == mcodes[index].size())
				mcodeiIndex.push_back(j - mcodes[index].size());
		}
		indexes.push_back(mcodeiIndex);
	}

	void check() {
		for (int i = 0; i < mcodes.size(); i++) {// checks all mcodes in a zFunction to verify if they are in the transmission
			zFunction(i);
			if (indexes[i].empty()) {
				mcodes_in_transmission.push_back(false);
			}
			else {
				mcodes_in_transmission.push_back(true);
			}
		}

		for (int i = 0; i < mcodes.size(); i++) {// prints the results
			if (mcodes_in_transmission[i]) {
				cout << "true ";
			}
			else {
				cout << "false ";
			}
			if (mcodes_in_transmission[i] == false) {
				cout << "transmission doens't contain the sequence inside mcode " << i + 1 << endl;
			}
			else {
				cout << indexes[i][0] << endl;
			}
		}
	}

	void checkMaliciousCode() {
		string moneyString; //create a new string to store the string with $ signs
		for (int i = 0; i < transmission.size(); i++) {// the loop adds a $ in between characters
			moneyString.push_back('$'); 
			moneyString.push_back(transmission[i]);
		}
		moneyString.push_back('$');

		int long_pattern = 0;
		int position = 0;
		for (int i = 0; i < moneyString.size(); i++) {
			int count = 0; //the count represents the z value of each character, so it resets every for loop
			int left = i - 1;
			int right = i + 1;
			while (left >= 0 && right < moneyString.size() && moneyString[left] == moneyString[right]) { /*check whether or not the characters
				to the right and left of the previous value are equal and whether or not you have reached the end of the string to either side*/
				count++;
				left--;
				right++;
			}
			if (count > long_pattern) {
				long_pattern = count; //update the longest pattern if the z value of the current character is greater than the previous longest
				position = i;
			}
		}
		
		//divide by two so that they are the positions in the original string
		int start = (position - long_pattern)/2 + 1; 
		/* manacher always ends at the $, since it ends at the $ before the actual start of the palindrome when you
		divide by 2 to get the position in the original string it points to the number just behind the start of the palindrome, so we add 1 to compensate*/
		int end = (position + long_pattern)/2;
		cout << start << " " << end << endl; //divide by two so that they are the positions in the original string
	}

	void zFunctionLongestString(string trans, string pattern) {/* you use an additional trans string instead of the original transmission to be able to use
		the substr method in the for loop on main*/
		string concatenated_string = trans + '$' + pattern;
		int counter = 0;
		int starting_position = 0;
		for (int j = 1; j < concatenated_string.size(); j++) {
			int i = 0;
			int j_count = j;
			while (concatenated_string[i] == concatenated_string[j_count]) {
				i++;
				j_count++;
			}
			if (i > counter)
				counter = i;
		}
		if (counter > longest_substring_size) {// store the largest value of the zFunction inside the class to access it when the for loop is finished
			longest_substring_size = counter;
			longest_substring_position = transmission.size() - trans.size();
		}
	}
};

int main() {
	vector<string> wholeTexts;
	vector<string> mcodes;

	TransmissionResults transmission1 = readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/transmission1.txt"); // insert your own file paths in these lines of code
	TransmissionResults transmission2 = readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/transmission2.txt");
	mcodes.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/mcode1.txt"));
	mcodes.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/mcode2.txt"));
	mcodes.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/mcode3.txt"));
	
	for (int i = 0; i < mcodes.size(); i++) {
		transmission1.getMcodes(mcodes[i]);
	}
	transmission1.check();

	for (int i = 0; i < mcodes.size(); i++) {
		transmission2.getMcodes(mcodes[i]);
	}
	transmission2.check();

	transmission1.checkMaliciousCode(); //use manacher to check for the longest palindrome
	transmission2.checkMaliciousCode();

	for (int i = 0; i < transmission1.transmission.size(); i++) {
		transmission1.zFunctionLongestString(transmission1.transmission.substr(i), transmission2.transmission);
	}

	cout << transmission1.longest_substring_position + 1 << " " << transmission1.longest_substring_position + transmission1.longest_substring_size << endl;
	// add 1 to the position since it is in 0 index andd the problem asks for 1 index
	return 0;
}