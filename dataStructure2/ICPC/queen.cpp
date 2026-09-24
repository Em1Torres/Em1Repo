    #include <iostream>
    #include <vector>
    using namespace std;

    vector<vector<int>> noKillQueensPos(int datasets, vector<vector<int>> initPos){
        
        for(int i=0;i<datasets;i++){
            vector<vector<int>> board(8, vector<int>(8));
            
        }
        vector<vector<int>> result = {{0,1},{2,3}};
        return result;
    }
    int main(){
        int myDatasets;
        vector<vector<int>> positions ={};
        cout << "How much queens' position are you gonna test? ";
        cin >> myDatasets;
        for(int i=0;i<myDatasets;i++){
            int a,b;
            cout << "Give me the " << i << " pair ";
            cin >> a >> b;
            cout << endl;
            positions[i].resize(2);
            positions[i][0]=a;
            positions[i][1]=b;
        }
        return 0;
    }