#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>
#include <map>
#include <algorithm>
#include "doubleLL.h"
using namespace std;

void Bubble_Sort(vector<vector<int>> &unsorted) {
    bool swap_check;
    int n = unsorted.size();
    for (int i = 0; i < n - 1; i++) {
        swap_check = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (unsorted[j][2] > unsorted[j + 1][2]) {
                swap(unsorted[j], unsorted[j + 1]);
                swap_check = true;
            }
        }
        if (!swap_check) {
            break;
        }
    }
}

class Group{
public:
    int root;
    vector <int> members;
}; 

class DSJ{
private:
    vector<Group> groups;
    vector<int> node2Group;
public:
    DSJ(int n){
        for(int i = 0; i < n; i++){
            groups[i].root = i;
            groups[i].members.push_back(i);
            node2Group.push_back(i);
        }
    }
    int find(int node){
        return groups[node2Group[node]].root;
    }
    bool join(int n1, int n2){
        int group_n1 = node2Group[n1];
        int group_n2 = node2Group[n2];

        if(group_n1 == group_n2)
            return false;
        
        if(groups[group_n1].members.size() < groups[group_n2].members.size()){
            int temp = group_n2;
            group_n2 = group_n1;
            group_n1 = temp;
        }
            
        
    }
    
};

// void Select_Edges(vector<vector<int>> &Possible_Edges) {
//     vector <int> Nodes;
//     vector <vector<int>> Selected_Edges;
//     map <int, vector<int>> MyGraph;
//     int counter = 0;
//     for (int i = 0; i < Possible_Edges.size(); i++) {
//         if (find(Nodes.begin(), Nodes.end(), Possible_Edges[i][0]) != Nodes.end()) {
//             break;
//         }
//         else {
//             Nodes.push_back(Possible_Edges[i][0]);
//             cout << "The node: " << Possible_Edges[i][0] << " has been added to the vector" << endl;
//         }
//         if (find(Nodes.begin(), Nodes.end(), Possible_Edges[i][1]) != Nodes.end()) {
//             break;
//         }
//         else {
//             Nodes.push_back(Possible_Edges[i][1]);
//             cout << "The node: " << Possible_Edges[i][1] << " has been added to the vector" << endl;
//         }

//     }
    
//     while (Selected_Edges.size() < Nodes.size() - 1) {
//         bool existing_number = false;
//         if (MyGraph.find(Possible_Edges[counter][1]) != MyGraph.end()) {

//         }
//         else {
//             if (MyGraph.find(Possible_Edges[counter][0]) != MyGraph.end()) {
//                 MyGraph[Possible_Edges[counter][0]].push_back(Possible_Edges[counter][1]);
//                 vector <int> Connected_Numbers2 = { Possible_Edges[counter][0] };
//                 MyGraph.insert(pair<int, vector<int>>(Possible_Edges[counter][1], Connected_Numbers2));
//                 existing_number = true;
//             }
//             if (existing_number)
//                 break;

//             vector <int> Connected_Numbers1 = { Possible_Edges[counter][1] };
//             vector <int> Connected_Numbers2 = { Possible_Edges[counter][0] };

//             MyGraph.insert(pair<int, vector<int>>(Possible_Edges[counter][0], Connected_Numbers1));
//             MyGraph.insert(pair<int, vector<int>>(Possible_Edges[counter][1], Connected_Numbers2));
//         }
//     }
// }

int main() {
    string line;
    vector<vector<int>> edges;

    ifstream f("C:/Users/alex_/Em1Repo/dataStructure2/exercises/Kruskal_tester.txt");
    while (getline(f, line)) {
        stringstream ss(line);
        vector<int> temp;
        string placeholder;
        while (getline(ss, placeholder, ' ')) {
            temp.push_back(stoi(placeholder));
        }
        edges.push_back(temp);
    } 

    Bubble_Sort(edges);
    //Select_Edges(edges);

    cout << "The edges (by weight) in ascending order are: " << endl;
    for(int i = 0;  i < edges.size(); i++)
        cout << edges[i][2] << " ";
    cout << endl;

    return 0;
}