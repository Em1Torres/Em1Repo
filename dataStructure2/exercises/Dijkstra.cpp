#include <iostream>
#include <vector>
#include <string>
#define infinite 10000 // cambiar a const long long = 10^9;
using namespace std;

void printDist(vector<int> dist){
    vector<string> nodeNames={"A","B","C","D","E","F","G"};
    for(int i=0;i<nodeNames.size();i++){
        cout << nodeNames[i] << " ";
    }
    cout << endl;
    for(int i=0;i<dist.size();i++){
        cout << dist[i] << " ";
    }
    cout << endl << endl;
}

void Dijkstra(vector<vector<int>> g, int Vstart){
    int n=g.size();
    vector<int> dist(n, infinite);
    vector<bool> visited(n, false);
    
    dist[Vstart] = 0;
    for(int i = 0; i<n;i++){
        int pastBest=infinite;
        int winner=-1;
        for(int j=0;j<n;j++){
            if(visited[j]) continue;
            if(dist[j] < pastBest){
                pastBest=dist[j];
                winner=j;
            }   
        }
        
        if(winner == -1) break;
        visited[winner]=true;
        for(int j=0;j<n;j++){
            if(visited[j]) continue;
            if(g[winner][j] == infinite) continue;
            if(dist[winner] + g[winner][j] < dist[j]){
                dist[j] = dist[winner] + g[winner][j];
            }

        }
        printDist(dist);
    }    
    printDist(dist);
    
}

int main(){
    int myVstart = 5;  // Starting Node picked F
    vector<vector<int>> myGraph={
        {0,2,4,6,infinite,infinite,infinite}, // A
    //   A B C D   E        F         G        
        {2,0,3,infinite,6,infinite,infinite}, // B
        {4,3,0,1,5,infinite,infinite}, //C
        {6,infinite, 1,0,4,3,infinite}, // D
        {infinite,6,5,4,0,infinite,2}, //E
        {infinite,infinite,infinite,3,infinite,0,5}, //F
        {infinite,infinite,infinite,infinite,2,5,0}, //G
    };
    
    Dijkstra(myGraph,myVstart);
    return 0;
}