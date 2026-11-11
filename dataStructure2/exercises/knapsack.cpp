#include <iostream>
#include <vector>
using namespace std;


int knapsack(vector<vector<int>> items, int w){
    int n = items.size();
    vector<vector<int>> matriz(n+1,vector<int> (w+1,0));
    for(int i = 1; i<=n;i++){
        for(int x = 1; x<=w;x++){
            int vi = items[i-1][0];
            int wi = items[i-1][1];
            if(x-wi < 0){
                matriz[i][x] = matriz[i-1][x];
            }
            else if(matriz[i-1][x] < matriz[i-1][x-wi] + vi){
                matriz[i][x] = matriz[i-1][x-wi] + vi;
            }
            else{
                matriz[i][x] =  matriz[i-1][x];
            }
                
        }
    }
    return matriz[n][w]; 

}

int main(){
    int maxWeight = 6;
    vector<vector<int>> myItems = {
        {3,4},
        {2,3},
        {4,2},
        {4,3}
    };
    cout << knapsack(myItems, maxWeight);

    return 0;
}

