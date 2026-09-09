#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> suffix_list(string s){
    vector<string> suffixes ={};
    s=s+"$"; 
    for(int i=s.size()-1;i>=0;i--){
        string temp = "";
        int j = i;
        while(j<s.size()){
            temp=temp+s[j];
            j++;
        }
        suffixes.push_back(temp);
    }
    return suffixes;
}
void Bubble_Sort(vector<string> &unsorted) {
    bool swap_check;
    int n = unsorted.size();
    for (int i = 0; i < n - 1; i++) {
        swap_check = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (unsorted[j] > unsorted[j + 1]) {
                swap(unsorted[j], unsorted[j + 1]);
                swap_check = true;
            }
        }
        if (!swap_check) {
            break;
        }
    }
}
int main(){
    string x = "ababcabcabababd";
    vector<string> mySuffixes = suffix_list(x);
    Bubble_Sort(mySuffixes);
    for(int i=0;i<mySuffixes.size();i++)
        cout << mySuffixes[i] << "  Suffix-> " << x.size()+1 - mySuffixes[i].size() << endl;
    return 0;
}