#include <iostream>
#include "zValues.h"   
#include "manacher.h"
#include <fstream>
using namespace std;

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

class TransmissionResults{
public:
	string transmission;
	vector <bool> contains;
	vector <vector<int>> indexes;
	vector <string> mcodes;
private:
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
			if(contains[i]){
				for(int j=0;j<idx.size();j++){
					indexes[i].push_back(idx[j]);
				}
			}
		}	
	}

	void printResults(){
		for(int i=0;i<mcodes.size();i++){
			cout << "(" << contains[i] << ")";
			if(contains[i] == false){
				cout << " transmission doens't contains any sequence inside mcode " << i << endl; 
			}
			else{
				cout << " transmission contains indexes: ";
				for(int j=0;j<indexes[i].size();j++){
					cout << indexes[i][j] << " ";
				}
				cout << "from mcode " << i+1 << endl;
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


	return 0;
}
