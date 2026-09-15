#include <iostream>
#include <vector>
#define pi 3.1416
using namespace std;

vector<int> pattern_indexes(string s, string pattern){
    string concat_s = pattern+"$"+s;
    vector<int> indexes={};
    for(int j=1;j<concat_s.size();j++){
        int i=0;
        int k=j;
        while(concat_s[i] == concat_s[k]){
            i++;
            k++;
        }
        if(i == pattern.size()) 
            indexes.push_back(j-(pattern.size()+1));
    }
    return indexes;
}

int main() {
    string myStr = "aaaaaaaaaabaaaaaaaaa";
    string myPattern = "aaaab";
    vector<int> myIndexes = pattern_indexes(myStr, myPattern);
    cout << "The pattern is found: " << myIndexes.size() << " times" << endl;
    for(int i=0;i<myIndexes.size();i++){
        cout << "Pattern start at index: " << myIndexes[i] << " and ends at: " << myIndexes[i]+myPattern.size()-1<< endl;
    }
    cout << pi << endl;
    return 0;
}
