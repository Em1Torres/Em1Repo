#include <iostream>
#include <vector>
using namespace std;

class NQueens {
    int n;
    vector<bool> col, diag1, diag2;
    vector<int> pos;                      // pos[r] = column of queen in row r
    vector<vector<int>> solutions;

    void solve(int r) {
        if (r == n) {                     // all queens placed
            solutions.push_back(pos);
            return;
        }
        for (int c = 0; c < n; ++c) {
            int d1 = r - c + n - 1, d2 = r + c;
            if (col[c] || diag1[d1] || diag2[d2]) continue;   // prune

            col[c] = diag1[d1] = diag2[d2] = true;            // choose
            pos[r] = c;
            solve(r + 1);                                     // explore
            col[c] = diag1[d1] = diag2[d2] = false;           // un-choose
        }
    }

public:
    NQueens(int n) : n(n), col(n), diag1(2 * n - 1), diag2(2 * n - 1), pos(n) {}

    vector<vector<int>> run() { solve(0); return solutions; }
};

int main() {
    int n = 1;
    auto sols = NQueens(n).run();
    cout << "N=" << n << " has " << sols.size() << " solutions\n";   // 4

    // print the first solution
    for (int r = 0; r < n; ++r) {
        for (int c = 0; c < n; ++c)
            cout << (sols[0][r] == c ? "Q " : ". ");
        cout << '\n';
    }
}