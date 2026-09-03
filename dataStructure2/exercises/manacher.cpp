#include <iostream>
#include <string>
#include <vector>
using namespace std;

string money_adder(string x){
    string my_string;
    for(int i=0;i<x.size();i++){
        my_string.push_back('$');
        my_string.push_back(x[i]);
    }
    my_string.push_back('$');
    return my_string;
}
vector <int> longestPattern(string my_string){
    vector<int> final_values;
    int long_pattern=0;
    int position=0;
    for(int i=0;i<my_string.size();i++){
        int count = 0;
        int left = i-1;
        int right=i+1;
        while(left >= 0 && right < (int)my_string.size() && my_string[left] == my_string[right]){
            count++;
            left--;
            right++;
        }
        if(count > long_pattern){
            long_pattern=count;
            position=i;
        }
    }
    return final_values = {position, long_pattern};
}
vector<int> noMoneyValues(vector<int> final_values){
    vector<int> actual_positions;
    int first=final_values[0]-final_values[1];
    int last=final_values[0]+final_values[1];
    for(int i=first+1;i<=last;i=i+2){
        actual_positions.push_back(i);
    }
    return actual_positions;
}
int main(){
    string x = "abdcbcdab";
    string new_x = money_adder(x);
    vector<int> fv = longestPattern(new_x);
    vector<int> nMoneyv = noMoneyValues(fv);
    cout << "The string starts in the index: " << nMoneyv[0] << endl;
    for(int i = 0; i < nMoneyv.size(); i++)
        cout << new_x[nMoneyv[i]];
    cout << endl;
    return 0;
}