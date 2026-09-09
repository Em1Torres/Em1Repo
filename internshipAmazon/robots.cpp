#include <iostream>
#include <vector>
using namespace std;

bool robotMove(vector<vector <int>> positions, int robots){
	if(positions.size() != 2) return false;
	int robotCount=0;
	vector<int> robotsPos;
	for(int i = 0; i<positions[0].size();i++){
		if(positions[0][i] == 1){
			robotCount++;
			robotsPos.push_back(i);
		}
		robotCount=robotCount;
	}
	if(robotCount != robots) return false;
	for(int i=0; i<robotsPos.size(); i++){
    	bool found = false;
		for(int j=0; j<positions[1].size(); j++){
			if(positions[1][j] == 1){
				if(robotsPos[i] == j || robotsPos[i] + 1 == j || robotsPos[i] - 1 == j){
					found = true;
					break;   // no need to keep scanning row 1 for this robot
				}
			}
		}
    	if(!found) return false;   // this robot had no adjacent match anywhere
	}
	return true;
}

int main(){
	vector<vector <int>> example = {{1,0,0,1},{0,1,1,0}};
	int exRobots = 2;
	cout << robotMove(example,exRobots);
	return 0;
}
