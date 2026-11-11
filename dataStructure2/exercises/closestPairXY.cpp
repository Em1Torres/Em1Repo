#include <iostream>
#include <vector>
#include <string>
#include <cmath>
using namespace std;

struct Point{
    float x,y;
    string name;
};
class Points{
private:
    vector<Point> coordenates;
public:
    Points(vector<Point> coord){
        this->coordenates=coord;
        this->sortPoints();
    }
    void sortPoints(){
        int n = this->coordenates.size();
        bool check_swap;
        for (int i = 0; i < n - 1; i++) {
            check_swap = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (this->coordenates[ j ].x > this->coordenates[ j + 1].x) {
                    swap(this->coordenates[ j ], this->coordenates[ j + 1 ]);
                    check_swap = true;
                }
            }
            if (!check_swap) break;
        }
    }
    Point find(string n){
        for(int i=0;i<this->coordenates.size();i++){
            if(this->coordenates[i].name == n) 
                return this->coordenates[i];
        }
    }
    float getDistance(Point p1,Point p2){
        float dist = sqrt(pow(p1.x-p2.x,2)+pow(p1.y-p2.y,2));
        return dist;
    }
    float euclideanDistance(){
        string i,j;
        cout << "Gimme the points' name: "; 
        cin >> i >> j;
        cout << endl;
        Point p1=this->find(i); Point p2=this->find(j);
        
        return getDistance(p1,p2);
    }
    int closestPairXY(vector<Point> rightHalf, vector<Point> leftHalf){ // Help me with this method Claude, explain don't give the code
        int left,right;
        left=0;right=this->coordenates.size()-1;
        int mid=(left+right)/2;
        Point midPoint = this->coordenates[mid];
        // Here I have to recursively find the smallest distances
        // in both sub
        return -1;
    }
};
int main(){
    Point test1; test1.x = 0;test1.y=0;test1.name="Emilio";
    Point test2; test2.x = 3;test2.y=4;test2.name="Willie";
    vector<Point> myPoints = {test1,test2};
    Points ps1(myPoints);
    ps1.euclideanDistance();
    return 0;
}

