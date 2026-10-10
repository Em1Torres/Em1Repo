#include <iostream>
#include "zValues.h"   
#include "manacher.h"
#include <fstream>
using namespace std;
//Function to read starting .txt files
string readTxTFiles(string path){
	string line;
	string wholeText;
	ifstream f(path); //reads the file
	while (getline(f, line)) {
		wholeText += line;
	}
	f.close();
	return wholeText;
}
//class for Part 1.
class TransmissionResults{
protected:
	string transmission;
	vector <bool> contains;
	// vector <vector<int>> indexes;
	vector <string> mcodes;
public:
	TransmissionResults(string transmission){
		this->transmission=transmission;
	}
	void getMcodes(string pattern){
		mcodes.push_back(pattern);
	}
	void check(){
		for(int i=0;i<mcodes.size();i++){
			vector<int> idx = pattern_indexes(transmission,mcodes[i]);
			contains.push_back(!idx.empty());
		}	
	}
	void checkMaliciousCode(){  // metodo para la parte 2
		vector<int> malicious = manacher(transmission);
		cout << malicious[0];
		cout << " " << malicious.back() << endl;
	}
	void printResults(){
		for(int i=0;i<mcodes.size();i++){
			cout << "(" << contains[i] << ")";
			if(contains[i] == false){
				cout << " transmission doens't contains any sequence inside mcode " << i << endl; 
			}
			else{
				cout << " transmission contains sequence inside mcode " << i << endl;
			}
		}
	}
};

int main() {
	vector<string> wholeTexts;
	vector<string> mcodes;

	wholeTexts.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/transmission1.txt"));
	wholeTexts.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/transmission2.txt"));
	mcodes.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/pattern1.txt"));
	mcodes.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/pattern2.txt"));
	mcodes.push_back(readTxTFiles("C:/Users/alex_/Em1Repo/dataStructure2/Evidence1/pattern3.txt"));

	//Part 1.
	for(int i=0;i<wholeTexts.size();i++){
		TransmissionResults tr(wholeTexts[i]);
		for(int j=0;i<mcodes.size();j++)
			tr.getMcodes(mcodes[i]);
		tr.check();
		tr.printResults();
		//Part 2.
		cout << endl;
		tr.checkMaliciousCode();
	}
	return 0;
}
