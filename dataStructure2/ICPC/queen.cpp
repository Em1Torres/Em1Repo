    #include <iostream>
    #include <vector>
    using namespace std;

    vector<vector<int>> noKillQueensPos(int chessboards, vector<vector<int>> initPos){
        for(int i=0;i<chessboards;i++){
            vector<vector<bool>> board(8, vector<bool>(8)); //chess board
            for(int k=0;k<8;k++){
                for(int j=0;j<8;j++)
                    board[k][j]=true;
            }  //Hasta acá incializar el board
            int row,col;
            row = initPos[i][0];
            col = initPos[i][1];
            bool queenpos = true;
            int counter = 1;
            for(int k=0;k<8;k++){
                if(!queenpos){
                    board[row][k] = false;
                    board[k][col] = false;
                    if(counter + row < 8 && counter + col < 8){
                        board[row+counter][k] = false;
                        board[k][col+counter] = false;
                        counter++;
                    }
                }
                queenpos=false;
            }
            

            //printing boards
            cout << "Board " << i << endl;
            for(int k=0;k<8;k++){       
                for(int j=0;j<8;j++){
                    cout << board[k][j] << " ";
                }
                cout << endl;
            }
        }
        vector<vector<int>> result = {{0,1},{2,3}};
        return result;
    }
    int main(){
        int myDatasets;
        cout << "How much queens' position are you gonna test? ";
        cin >> myDatasets;
        vector<vector<int>> positions(myDatasets,vector<int>(2));
        for(int i=0;i<myDatasets;i++){
            int a,b;
            cout << "Give me the " << i << " pair ";
            cin >> a >> b;
            cout << endl;
            positions[i][0]=a-1;
            positions[i][1]=b-1;
            
        }
        for(int i=0;i<myDatasets;i++){
            cout << positions[i][0] << " " << positions[i][1] << endl;
        }
        noKillQueensPos(myDatasets,positions);
        return 0;
    }