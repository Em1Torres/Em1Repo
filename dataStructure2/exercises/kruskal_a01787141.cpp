#include <iostream>
#include <vector>
#include <fstream>
#include <sstream>
#include <map>
#include <string>
#include <algorithm>
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

class UnionFind {
private:
    vector<int> parents;
public:
    UnionFind(int n) {
        for (int i = 0; i < n; i++) {
            parents.push_back(i); //creates the vector
        }
    }

    int find(int x) {
        while (parents[x] != x) {/*parents is a vector in which we store which node is the parent of which node, so this goes down the list
            looking until the parent of the number is the number itself, which is when we reach the root*/
            x = parents[x];
        }
        return x;
    }

    bool unite(int a, int b) {
        int root1 = find(a); //check for the root of both numbers
        int root2 = find(b);

        if (root1 == root2) {
            return false;
        }

        parents[root2] = root1; //if they have different roots, make the root of the second node into a child of the root of the first node
        return true;
    }
};


vector <int> Count_Nodes(vector<vector<int>> Possible_Edges) {
    /*This counts the amount of different nodes there are in the graph. It is needed to initiate the Union Find since it works like an
    array. This tells it how many slots it will need*/
    vector <int> Nodes;
    for (int i = 0; i < Possible_Edges.size(); i++) {
        if (find(Nodes.begin(), Nodes.end(), Possible_Edges[i][0]) == Nodes.end()) {/* If find does not find what you are looking for then it
            sends as a result the closing parameter. If it sends anything else that means it found what it was looking for. This is why
            we use == Nodes.end(). If the result is positive it means the node is not in the vector.*/
            Nodes.push_back(Possible_Edges[i][0]);
            cout << "The node: " << Possible_Edges[i][0] << " has been added to the vector" << endl;
        }
        if (find(Nodes.begin(), Nodes.end(), Possible_Edges[i][1]) == Nodes.end()) {
            Nodes.push_back(Possible_Edges[i][1]);
            cout << "The node: " << Possible_Edges[i][1] << " has been added to the vector" << endl;
        }
    }
    return Nodes;
}

vector<vector<int>> Select_Edges(const vector<vector<int>>& Possible_Edges) {
    vector<vector<int>> list_of_Edges;
    int current_index = 0;

    vector<int> number_nodes = Count_Nodes(Possible_Edges); //Here is where the previous function is used

    map<int, int> indexes; /*If the nodes are already little numbers like 1, 2, 3...8 then this is unnecesary, but if they are letters
    the function would break since unite requires integers
    
    This creates a map, which works like a dictionary in python. Since we were originally going to build this using a map, we thought of using
    it to fix this possible error. This way what you send to the unite function is not, for example 'a' but the index associated to 'a'
    in the parents vector*/
    for (int i = 0; i < number_nodes.size(); i++) {
        indexes[number_nodes[i]] = i;
    }

    UnionFind my_Graph(number_nodes.size()); // create the UnioFind object

    for (int i = 0; i < Possible_Edges.size();i++) {
        int node1_index = indexes[Possible_Edges[i][0]]; /*a bit confusing but it is what was explained earlier. 
        Instead of using the name of the node we use the index*/
        int node2_index = indexes[Possible_Edges[i][1]];

        if (my_Graph.unite(node1_index, node2_index)) {
            list_of_Edges.push_back(Possible_Edges[i]);
        }
    }
    
    return list_of_Edges;
}

int main() {
    string line;
    vector<vector<int>> edges;

    ifstream f("C:/Users/alex_/Em1Repo/dataStructure2/exercises/Kruskal_tester.txt"); //reads the file
    while (getline(f, line)) { /*separates the file into lines and the next lines of code break it down into Node1, Node2 and Weight 
        then pushes it back into the array*/
        stringstream ss(line);
        vector<int> temp;
        string placeholder;
        while (getline(ss, placeholder, ' ')) {
            temp.push_back(stoi(placeholder));
        }
        edges.push_back(temp);
    } 

    Bubble_Sort(edges);
    vector<vector<int>> list_of_Edges = Select_Edges(edges);

    int total_weight = 0;
    for (int i = 0; i < list_of_Edges.size(); i++) {
        cout << "The Edge: " << list_of_Edges[i][0] << " to: " << list_of_Edges[i][1] << " with the weight: " << list_of_Edges[i][2] << " was selected\n";
        total_weight += list_of_Edges[i][2];
    }
    cout << "The total weight is: " << total_weight << endl;
    return 0;
}