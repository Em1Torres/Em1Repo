# Algorithms II — Learning Guide (C++)

**Topics:** Divide and Conquer · Dynamic Programming · Greedy Algorithms · Backtracking · Branch and Bound

Every section follows the same structure:

1. **Explanation of the method / strategy**
2. **Examples with C++ code** of algorithms that use the method

All code compiles with `g++ -std=c++17`.

---

## Table of Contents

1. [Divide and Conquer](#1-divide-and-conquer)
2. [Dynamic Programming](#2-dynamic-programming)
3. [Greedy Algorithms](#3-greedy-algorithms)
4. [Backtracking](#4-backtracking)
5. [Branch and Bound](#5-branch-and-bound)
6. [Quick Comparison and How to Choose](#6-quick-comparison-and-how-to-choose)

---

# 1. Divide and Conquer

## 1.1 Explanation

**Idea:** Break a problem into smaller *independent* subproblems of the same kind, solve each recursively, then **combine** the answers.

The three steps:

1. **Divide** — split the input into `a` subproblems, each of size roughly `n/b`.
2. **Conquer** — solve each subproblem recursively (base case: the problem is small enough to solve directly).
3. **Combine** — merge the sub-answers into the answer for the full problem.

**Key property:** subproblems do **not overlap**. If they do overlap, you are likely looking at dynamic programming instead.

### Analyzing the running time

The cost is described by a recurrence:

```
T(n) = a·T(n/b) + f(n)
```

where `f(n)` is the cost of dividing + combining. The **Master Theorem** gives the solution. Let `c = log_b(a)`:

| Case | Condition | Result |
|------|-----------|--------|
| 1 | `f(n) = O(n^(c-ε))` | `T(n) = Θ(n^c)` |
| 2 | `f(n) = Θ(n^c)` | `T(n) = Θ(n^c · log n)` |
| 3 | `f(n) = Ω(n^(c+ε))` and regularity holds | `T(n) = Θ(f(n))` |

Examples:

- Merge sort: `T(n) = 2T(n/2) + n` → Case 2 → `Θ(n log n)`
- Binary search: `T(n) = T(n/2) + 1` → Case 2 → `Θ(log n)`
- Fast exponentiation: `T(n) = T(n/2) + 1` → `Θ(log n)`

### When to use it

- The problem can be split into independent pieces of the same type.
- Combining partial answers is cheap relative to solving from scratch.
- Bonus: it parallelizes naturally and tends to have good cache behavior.

## 1.2 Examples in C++

### Example 1 — Merge Sort

Divide the array in half, sort each half, merge the two sorted halves in linear time.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void merge(vector<int>& a, int l, int m, int r) {
    vector<int> tmp;
    tmp.reserve(r - l + 1);
    int i = l, j = m + 1;

    while (i <= m && j <= r)
        tmp.push_back(a[i] <= a[j] ? a[i++] : a[j++]);   // <= keeps it stable
    while (i <= m) tmp.push_back(a[i++]);
    while (j <= r) tmp.push_back(a[j++]);

    copy(tmp.begin(), tmp.end(), a.begin() + l);
}

void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) return;                 // base case: 0 or 1 element
    int m = l + (r - l) / 2;            // divide
    mergeSort(a, l, m);                 // conquer left
    mergeSort(a, m + 1, r);             // conquer right
    merge(a, l, m, r);                  // combine
}

int main() {
    vector<int> a = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(a, 0, (int)a.size() - 1);
    for (int x : a) cout << x << ' ';   // 3 9 10 27 38 43 82
    cout << '\n';
}
```

**Complexity:** `O(n log n)` time, `O(n)` extra space.

---

### Example 2 — Maximum Subarray Sum

Find the contiguous subarray with the largest sum. The best subarray is either entirely in the left half, entirely in the right half, or **crosses the midpoint**.

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

long long maxSub(const vector<int>& a, int l, int r) {
    if (l == r) return a[l];
    int m = l + (r - l) / 2;

    long long leftBest  = maxSub(a, l, m);
    long long rightBest = maxSub(a, m + 1, r);

    // best sum crossing the midpoint
    long long sum = 0, bestL = LLONG_MIN, bestR = LLONG_MIN;
    for (int i = m; i >= l; --i) { sum += a[i]; bestL = max(bestL, sum); }
    sum = 0;
    for (int i = m + 1; i <= r; ++i) { sum += a[i]; bestR = max(bestR, sum); }

    return max({leftBest, rightBest, bestL + bestR});
}

int main() {
    vector<int> a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << maxSub(a, 0, (int)a.size() - 1) << '\n';   // 6  (4, -1, 2, 1)
}
```

**Complexity:** `T(n) = 2T(n/2) + O(n)` → `O(n log n)`.
*(Kadane's algorithm solves it in `O(n)`, but this version shows the D&C pattern clearly.)*

---

### Example 3 — Fast Exponentiation (Modular)

Compute `b^e mod m` by using `b^e = (b^(e/2))^2` (times `b` if `e` is odd).

```cpp
#include <iostream>
using namespace std;

long long power(long long b, long long e, long long mod) {
    if (e == 0) return 1 % mod;
    long long half = power(b, e / 2, mod);      // solve ONE subproblem
    long long res = (half * half) % mod;
    if (e % 2 == 1) res = (res * (b % mod)) % mod;
    return res;
}

int main() {
    cout << power(2, 30, 1000000007) << '\n';   // 73741817
}
```

**Complexity:** `O(log e)`. Note the trick: only **one** recursive call, reused (`half`). Calling `power` twice would destroy the speedup.

---

### Other classic D&C algorithms to study

- Quick sort / Quickselect (k-th smallest in expected `O(n)`)
- Binary search
- Closest pair of points (`O(n log n)`)
- Karatsuba multiplication (`O(n^1.585)`)
- Strassen matrix multiplication (`O(n^2.81)`)
- Counting inversions (merge sort variant)

---

# 2. Dynamic Programming

## 2.1 Explanation

**Idea:** Solve a problem by combining solutions to **overlapping subproblems**, and store each result so it is computed only once.

A problem is a good DP candidate when it has both:

1. **Optimal substructure** — an optimal solution is built from optimal solutions of subproblems.
2. **Overlapping subproblems** — the same subproblems appear again and again in a naive recursion.

### The recipe

1. **Define the state:** what does `dp[i]` (or `dp[i][j]`) *mean*? Write it in words.
2. **Find the recurrence:** how does a state depend on smaller states?
3. **Set base cases.**
4. **Choose an evaluation order** so dependencies are computed first.
5. **Locate the answer** (which cell holds it?).
6. *(Optional)* **Reconstruct the solution** by walking back through the table.
7. *(Optional)* **Optimize space** if a row only depends on the previous row.

### Two implementation styles

| | Top-down (Memoization) | Bottom-up (Tabulation) |
|---|---|---|
| How | Recursion + cache | Loops filling a table |
| Pros | Easy to write; only computes needed states | No recursion overhead; easy space optimization |
| Cons | Recursion depth / stack | Must figure out the order |

### DP vs. Divide and Conquer vs. Greedy

- **D&C:** subproblems are independent.
- **DP:** subproblems overlap, and you consider *all* choices (via the recurrence).
- **Greedy:** commit to one choice without looking back.

## 2.2 Examples in C++

### Example 1 — Fibonacci (memoization vs. tabulation)

The gentlest introduction: naive recursion is `O(2^n)`, DP makes it `O(n)`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Top-down
long long fibMemo(int n, vector<long long>& memo) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
}

// Bottom-up with O(1) space
long long fibTab(int n) {
    if (n <= 1) return n;
    long long prev = 0, cur = 1;
    for (int i = 2; i <= n; ++i) {
        long long next = prev + cur;
        prev = cur;
        cur = next;
    }
    return cur;
}

int main() {
    int n = 50;
    vector<long long> memo(n + 1, -1);
    cout << fibMemo(n, memo) << '\n';   // 12586269025
    cout << fibTab(n) << '\n';          // 12586269025
}
```

---

### Example 2 — 0/1 Knapsack

Given `n` items with weights `wt[i]` and values `val[i]`, and capacity `W`, maximize total value. Each item is taken **at most once**.

- **State:** `dp[w]` = best value achievable with capacity `w` (using the items processed so far).
- **Recurrence:** for each item, `dp[w] = max(dp[w], dp[w - wt] + val)`.
- **Trick:** iterate `w` **downwards** so each item is used at most once.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int knapsack(const vector<int>& wt, const vector<int>& val, int W) {
    int n = wt.size();
    vector<int> dp(W + 1, 0);

    for (int i = 0; i < n; ++i)
        for (int w = W; w >= wt[i]; --w)          // downwards: 0/1 behavior
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);

    return dp[W];
}

int main() {
    vector<int> wt  = {1, 3, 4, 5};
    vector<int> val = {1, 4, 5, 7};
    cout << knapsack(wt, val, 7) << '\n';   // 9  (items of weight 3 and 4)
}
```

**Complexity:** `O(n·W)` time, `O(W)` space. This is **pseudo-polynomial** (depends on the *value* of `W`, not just the input length).

> If you iterate `w` **upwards**, you get *unbounded* knapsack (unlimited copies of each item).

---

### Example 3 — Longest Common Subsequence (LCS)

Given strings `X` and `Y`, find their longest common subsequence (characters in order, not necessarily contiguous).

- **State:** `dp[i][j]` = LCS length of `X[0..i-1]` and `Y[0..j-1]`.
- **Recurrence:**
  - if `X[i-1] == Y[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1`
  - otherwise: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

string lcs(const string& X, const string& Y) {
    int n = X.size(), m = Y.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for (int i = 1; i <= n; ++i)
        for (int j = 1; j <= m; ++j)
            if (X[i - 1] == Y[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else                      dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);

    // reconstruct one LCS by walking back
    string res;
    int i = n, j = m;
    while (i > 0 && j > 0) {
        if (X[i - 1] == Y[j - 1]) { res += X[i - 1]; --i; --j; }
        else if (dp[i - 1][j] >= dp[i][j - 1]) --i;
        else --j;
    }
    reverse(res.begin(), res.end());
    return res;
}

int main() {
    string r = lcs("AGGTAB", "GXTXAYB");
    cout << r << " (length " << r.size() << ")\n";   // GTAB (length 4)
}
```

**Complexity:** `O(n·m)` time and space.

---

### Example 4 — Coin Change (minimum number of coins)

Given coin denominations and a target amount, find the **fewest coins** that sum to it (or report impossible).

- **State:** `dp[a]` = minimum coins to make amount `a`.
- **Recurrence:** `dp[a] = 1 + min(dp[a - c])` over all coins `c <= a`.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int minCoins(const vector<int>& coins, int target) {
    const int INF = 1e9;
    vector<int> dp(target + 1, INF);
    dp[0] = 0;

    for (int a = 1; a <= target; ++a)
        for (int c : coins)
            if (c <= a && dp[a - c] != INF)
                dp[a] = min(dp[a], dp[a - c] + 1);

    return dp[target] == INF ? -1 : dp[target];
}

int main() {
    cout << minCoins({1, 3, 4}, 6) << '\n';   // 2  (3 + 3)
    cout << minCoins({2}, 3) << '\n';         // -1 (impossible)
}
```

**Complexity:** `O(target · #coins)`.

Note that greedy (always take the largest coin) would give `4 + 1 + 1 = 3` coins for `{1,3,4}` and target `6` — **wrong**. This is the standard example of why greedy fails here but DP works.

---

### Other classic DP problems to study

- Longest Increasing Subsequence (`O(n²)` or `O(n log n)`)
- Edit Distance (Levenshtein)
- Matrix Chain Multiplication
- Floyd–Warshall (all-pairs shortest paths)
- Bellman–Ford
- Subset Sum / Partition
- Rod cutting
- Optimal Binary Search Tree

---

# 3. Greedy Algorithms

## 3.1 Explanation

**Idea:** Build a solution step by step, always making the choice that looks **best right now** (locally optimal), and **never reconsider** it.

Greedy is fast and simple, but it is only *correct* for problems with two properties:

1. **Greedy-choice property:** some globally optimal solution contains the greedy choice.
2. **Optimal substructure:** after making the greedy choice, what remains is a smaller instance of the same problem.

### The recipe

1. Define the **selection criterion** (the "best" choice: earliest finish, best ratio, smallest weight…). Choosing the right criterion is the whole problem.
2. Often **sort** the candidates by that criterion.
3. **Iterate**, accepting each candidate if it keeps the solution feasible.

### Proving a greedy algorithm correct

Two standard techniques:

- **Exchange argument:** take any optimal solution and show you can swap its first choice for the greedy choice without making it worse.
- **"Greedy stays ahead":** show that after each step, the greedy solution is at least as good as any other.

### Warning

A greedy algorithm that *looks* right is often wrong (see the coin change counterexample in the DP section). Always test against small counterexamples or prove it.

## 3.2 Examples in C++

### Example 1 — Activity Selection

Given `n` activities with start and finish times, choose the **maximum number** of non-overlapping activities.

**Greedy criterion:** always pick the compatible activity that **finishes earliest** (it leaves the most room for the rest).

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Activity { int start, finish; };

vector<Activity> selectActivities(vector<Activity> acts) {
    sort(acts.begin(), acts.end(),
         [](const Activity& a, const Activity& b) { return a.finish < b.finish; });

    vector<Activity> chosen;
    int lastFinish = -1;
    for (const auto& a : acts) {
        if (a.start >= lastFinish) {        // compatible with what we picked
            chosen.push_back(a);
            lastFinish = a.finish;
        }
    }
    return chosen;
}

int main() {
    vector<Activity> acts = {{1,4},{3,5},{0,6},{5,7},{3,9},{5,9},{6,10},{8,11},{8,12},{2,14},{12,16}};
    auto res = selectActivities(acts);
    cout << res.size() << " activities:\n";      // 4 activities
    for (auto& a : res) cout << "[" << a.start << "," << a.finish << ") ";
    cout << '\n';                                // [1,4) [5,7) [8,11) [12,16)
}
```

**Complexity:** `O(n log n)` (sorting dominates).

---

### Example 2 — Fractional Knapsack

Same as knapsack, but you may take **fractions** of items.

**Greedy criterion:** highest **value / weight** ratio first.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

struct Item { double weight, value; };

double fractionalKnapsack(vector<Item> items, double capacity) {
    sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return a.value / a.weight > b.value / b.weight;   // best ratio first
    });

    double total = 0.0;
    for (const auto& it : items) {
        if (capacity <= 0) break;
        double take = min(it.weight, capacity);           // whole item or fraction
        total += it.value * (take / it.weight);
        capacity -= take;
    }
    return total;
}

int main() {
    vector<Item> items = {{10, 60}, {20, 100}, {30, 120}};
    cout << fixed << setprecision(2)
         << fractionalKnapsack(items, 50) << '\n';        // 240.00
}
```

**Complexity:** `O(n log n)`.

> Greedy is **optimal** for fractional knapsack but **not** for 0/1 knapsack. With the same items and capacity 50, greedy on 0/1 would take items 1 and 2 (value 160), but the optimum is items 2 and 3 (value 220). That's why 0/1 needs DP (or B&B).

---

### Example 3 — Huffman Coding

Build an optimal **prefix-free binary code** for characters based on their frequencies.

**Greedy criterion:** repeatedly merge the **two least frequent** nodes into one.

```cpp
#include <iostream>
#include <queue>
#include <vector>
#include <map>
#include <string>
using namespace std;

struct Node {
    char ch;
    int freq;
    Node *left, *right;
    Node(char c, int f, Node* l = nullptr, Node* r = nullptr)
        : ch(c), freq(f), left(l), right(r) {}
};

struct Compare {
    bool operator()(Node* a, Node* b) { return a->freq > b->freq; }   // min-heap
};

void buildCodes(Node* root, const string& code, map<char, string>& codes) {
    if (!root) return;
    if (!root->left && !root->right) {                 // leaf
        codes[root->ch] = code.empty() ? "0" : code;   // single-symbol edge case
        return;
    }
    buildCodes(root->left,  code + "0", codes);
    buildCodes(root->right, code + "1", codes);
}

void freeTree(Node* root) {
    if (!root) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

map<char, string> huffman(const map<char, int>& freq) {
    priority_queue<Node*, vector<Node*>, Compare> pq;
    for (auto& [c, f] : freq) pq.push(new Node(c, f));

    while (pq.size() > 1) {
        Node* a = pq.top(); pq.pop();     // two smallest
        Node* b = pq.top(); pq.pop();
        pq.push(new Node('\0', a->freq + b->freq, a, b));
    }

    map<char, string> codes;
    Node* root = pq.top();
    buildCodes(root, "", codes);
    freeTree(root);
    return codes;
}

int main() {
    map<char, int> freq = {{'a',45},{'b',13},{'c',12},{'d',16},{'e',9},{'f',5}};
    for (auto& [c, code] : huffman(freq))
        cout << c << ": " << code << '\n';
    // Frequent symbols get short codes (e.g. 'a' gets 1 bit);
    // the exact bit patterns may vary, but the total cost is optimal.
}
```

**Complexity:** `O(n log n)` with a heap.

---

### Other classic greedy algorithms to study

- Kruskal's and Prim's (minimum spanning tree)
- Dijkstra's shortest path (non-negative weights)
- Job scheduling with deadlines / minimizing lateness
- Interval partitioning
- Coin change with *canonical* coin systems (e.g. 1, 5, 10, 25)

---

# 4. Backtracking

## 4.1 Explanation

**Idea:** Build a solution **incrementally**, one decision at a time. If a partial solution cannot possibly lead to a valid complete solution, **abandon it (prune)** and **undo** the last decision (backtrack) to try another option.

Think of it as a **depth-first search over the tree of all possible decisions** (the *state-space tree*), cutting off dead branches early. It is smarter than brute force because pruning avoids exploring entire subtrees.

### The template

```
solve(partial_solution):
    if partial_solution is complete:
        record / return it
    for each candidate choice c:
        if c is feasible (constraint check):   # pruning
            make choice c                       # choose
            solve(partial_solution + c)         # explore
            undo choice c                       # un-choose (backtrack)
```

The three key ingredients:

1. **Choice** — what options exist at each step.
2. **Constraints** — the feasibility test that prunes.
3. **Goal** — when a partial solution counts as complete.

### Characteristics

- Worst-case complexity is still exponential (or factorial), but pruning often makes it practical.
- Best for **constraint satisfaction** and **enumeration** problems: find *all* solutions or *any* valid one.
- Good pruning tests, and good **ordering** of choices, matter enormously.
- Backtracking looks for *feasible* solutions; when you need the *best* one and can bound it, use branch and bound.

## 4.2 Examples in C++

### Example 1 — N-Queens

Place `N` queens on an `N×N` board so no two attack each other (same row, column, or diagonal).

- **Choice:** at row `r`, which column to place the queen in.
- **Constraint:** column and both diagonals must be free.
- Diagonals are identified in `O(1)`: `r - c + (N-1)` for `\` and `r + c` for `/`.

```cpp
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
    int n = 6;
    auto sols = NQueens(n).run();
    cout << "N=" << n << " has " << sols.size() << " solutions\n";   // 4

    // print the first solution
    for (int r = 0; r < n; ++r) {
        for (int c = 0; c < n; ++c)
            cout << (sols[0][r] == c ? "Q " : ". ");
        cout << '\n';
    }
}
```

Known solution counts: N=4 → 2, N=6 → 4, N=8 → 92.

---

### Example 2 — Subset Sum

Find all subsets of a set of positive integers whose sum equals `target`.

Pruning rules (after sorting ascending):

- if the current sum **exceeds** the target → stop;
- if the current sum plus **everything remaining** can't reach the target → stop.

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

void subsetSum(const vector<int>& a, int idx, int curSum, int remaining,
               int target, vector<int>& cur, vector<vector<int>>& out) {
    if (curSum == target) { out.push_back(cur); return; }
    if (idx == (int)a.size()) return;
    if (curSum > target) return;                    // prune: too big
    if (curSum + remaining < target) return;        // prune: can't reach

    // choice 1: include a[idx]
    cur.push_back(a[idx]);
    subsetSum(a, idx + 1, curSum + a[idx], remaining - a[idx], target, cur, out);
    cur.pop_back();                                 // backtrack

    // choice 2: exclude a[idx]
    subsetSum(a, idx + 1, curSum, remaining - a[idx], target, cur, out);
}

int main() {
    vector<int> a = {10, 7, 5, 18, 12, 20, 15};
    sort(a.begin(), a.end());
    int target = 35;

    vector<vector<int>> out;
    vector<int> cur;
    subsetSum(a, 0, 0, accumulate(a.begin(), a.end(), 0), target, cur, out);

    for (auto& s : out) {
        for (int x : s) cout << x << ' ';
        cout << '\n';
    }
    // e.g. 5 10 20 / 5 12 18 / 7 10 18 / 15 20
}
```

---

### Example 3 — Generating Permutations

The simplest illustration of the choose / explore / un-choose template.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void permute(vector<int>& cur, vector<bool>& used, const vector<int>& nums) {
    if (cur.size() == nums.size()) {
        for (int x : cur) cout << x << ' ';
        cout << '\n';
        return;
    }
    for (int i = 0; i < (int)nums.size(); ++i) {
        if (used[i]) continue;          // constraint: each element only once
        used[i] = true;                 // choose
        cur.push_back(nums[i]);
        permute(cur, used, nums);       // explore
        cur.pop_back();                 // un-choose
        used[i] = false;
    }
}

int main() {
    vector<int> nums = {1, 2, 3};
    vector<int> cur;
    vector<bool> used(nums.size(), false);
    permute(cur, used, nums);           // prints all 6 permutations
}
```

---

### Other classic backtracking problems to study

- Sudoku solver
- Graph (m-)coloring
- Hamiltonian cycle
- Rat in a maze / knight's tour
- Word search / combination sum
- Generating all subsets / combinations

---

# 5. Branch and Bound

## 5.1 Explanation

**Idea:** An extension of backtracking for **optimization problems** (find the *best* solution, minimum or maximum). It explores the state-space tree but uses a **bound** to discard branches that provably cannot beat the best solution found so far.

Two pieces:

1. **Branch** — split a problem (node) into smaller subproblems (children).
2. **Bound** — for each node, compute an estimate of the best value any solution in its subtree could achieve:
   - for **maximization**: an **upper bound**;
   - for **minimization**: a **lower bound**.

**Pruning rule:**

- *Maximization:* discard a node if `upperBound <= bestSoFar`.
- *Minimization:* discard a node if `lowerBound >= bestSoFar`.

### How it differs from backtracking

| | Backtracking | Branch and Bound |
|---|---|---|
| Goal | Any / all feasible solutions | The **optimal** solution |
| Pruning by | Infeasibility (constraints) | Infeasibility **and** bound vs. best-so-far |
| Search order | DFS | DFS, BFS, or **best-first** (priority queue) |

### Search strategies

- **DFS:** low memory, finds a first solution quickly (good initial bound).
- **BFS (FIFO queue):** explores level by level.
- **Best-first (priority queue on the bound):** always expands the most promising node. Usually prunes the most, but uses more memory. **This is the standard choice.**

### The quality of the bound is everything

- A **tight** bound prunes a lot, but is more expensive to compute.
- A **loose** bound is cheap, but prunes little (approaches brute force).
- A common technique is a **relaxation**: drop a hard constraint to get an easy problem whose optimal value bounds the real one (e.g. allow fractions in knapsack).

### Template

```
best = initial value (−∞ for max, +∞ for min)
push root into the live-node structure
while it is not empty:
    take node u
    if bound(u) cannot beat best: skip (prune)
    for each child v of u:
        if v is a complete solution: update best
        else if bound(v) can beat best: push v
```

## 5.2 Examples in C++

### Example 1 — 0/1 Knapsack with Branch and Bound

- Sort items by `value/weight` descending.
- Each node represents a decision on item `level`: **take it** or **skip it**.
- **Upper bound:** take the remaining items greedily, allowing a **fraction** of the first one that doesn't fit (the fractional-knapsack relaxation from the greedy section!).
- Use a **max-priority-queue** on the bound (best-first).

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct Item { int weight, value; };

struct Node {
    int level;        // index of the last item decided (-1 = root)
    int profit;       // value accumulated so far
    int weight;       // weight accumulated so far
    double bound;     // optimistic estimate for this subtree
};

struct CompareBound {
    bool operator()(const Node& a, const Node& b) const { return a.bound < b.bound; }
};

// Upper bound via the fractional knapsack relaxation
double computeBound(const Node& u, int n, int W, const vector<Item>& items) {
    if (u.weight >= W) return 0;                 // no room left: nothing to gain
    double bound = u.profit;
    int totalWeight = u.weight;
    int j = u.level + 1;

    while (j < n && totalWeight + items[j].weight <= W) {   // take whole items
        totalWeight += items[j].weight;
        bound += items[j].value;
        ++j;
    }
    if (j < n)                                              // take a fraction
        bound += (W - totalWeight) * (double)items[j].value / items[j].weight;
    return bound;
}

int knapsackBB(vector<Item> items, int W) {
    int n = items.size();
    sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return (double)a.value / a.weight > (double)b.value / b.weight;
    });

    priority_queue<Node, vector<Node>, CompareBound> pq;
    Node root{-1, 0, 0, 0};
    root.bound = computeBound(root, n, W, items);
    pq.push(root);

    int maxProfit = 0;
    while (!pq.empty()) {
        Node u = pq.top(); pq.pop();

        if (u.bound <= maxProfit || u.level == n - 1) continue;   // prune / leaf

        Node v;
        v.level = u.level + 1;

        // Branch 1: TAKE item v.level
        v.weight = u.weight + items[v.level].weight;
        v.profit = u.profit + items[v.level].value;
        if (v.weight <= W && v.profit > maxProfit) maxProfit = v.profit;
        v.bound = computeBound(v, n, W, items);
        if (v.weight <= W && v.bound > maxProfit) pq.push(v);

        // Branch 2: SKIP item v.level
        v.weight = u.weight;
        v.profit = u.profit;
        v.bound = computeBound(v, n, W, items);
        if (v.bound > maxProfit) pq.push(v);
    }
    return maxProfit;
}

int main() {
    vector<Item> items = {{2, 40}, {3, 50}, {5, 100}, {4, 95}, {1, 30}};
    cout << knapsackBB(items, 10) << '\n';   // 225  (items with weights 1 + 4 + 5)
}
```

> **Try it yourself:** compare the output against the DP solution from Section 2 on random inputs. **If B&B ever returns something smaller than DP, your bound is not a true upper bound.**

**Complexity:** worst case `O(2^n)`, but in practice far fewer nodes are visited because of pruning.

---

### Example 2 — Traveling Salesman Problem (TSP)

Find the **shortest tour** visiting every city exactly once and returning to the start.

- **Branch:** choose the next unvisited city.
- **Lower bound:** current cost + for the current city and every unvisited city, the cheapest edge leaving it. Any completion of the tour must leave each of those cities through *some* edge, so it costs at least this much.
- **Prune** if `lowerBound >= best`.

```cpp
#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class TSP {
    int n;
    vector<vector<int>> dist;
    vector<int> minOut;          // cheapest edge leaving each city
    vector<bool> visited;
    vector<int> path, bestPath;
    int best = INT_MAX;

    int lowerBound(int cur, int cost) {
        int lb = cost + minOut[cur];
        for (int i = 0; i < n; ++i)
            if (!visited[i]) lb += minOut[i];
        return lb;
    }

    void solve(int cur, int count, int cost) {
        if (count == n) {                                   // all cities visited
            int total = cost + dist[cur][0];                // return to start
            if (total < best) { best = total; bestPath = path; }
            return;
        }
        for (int next = 0; next < n; ++next) {
            if (visited[next]) continue;
            int newCost = cost + dist[cur][next];

            visited[next] = true;
            path.push_back(next);
            if (lowerBound(next, newCost) < best)           // bound check
                solve(next, count + 1, newCost);
            path.pop_back();                                // backtrack
            visited[next] = false;
        }
    }

public:
    TSP(vector<vector<int>> d) : n(d.size()), dist(move(d)), visited(n, false) {
        minOut.assign(n, INT_MAX);
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                if (i != j) minOut[i] = min(minOut[i], dist[i][j]);
    }

    int run() {
        visited[0] = true;
        path = {0};
        solve(0, 1, 0);
        return best;
    }

    const vector<int>& tour() const { return bestPath; }
};

int main() {
    vector<vector<int>> d = {
        { 0, 10, 15, 20},
        {10,  0, 35, 25},
        {15, 35,  0, 30},
        {20, 25, 30,  0}
    };
    TSP tsp(d);
    cout << "Shortest tour cost: " << tsp.run() << '\n';   // 80
    for (int c : tsp.tour()) cout << c << " -> ";
    cout << "0\n";                                          // e.g. 0 -> 1 -> 3 -> 2 -> 0
}
```

**Complexity:** worst case `O(n!)`; the bound cuts many branches. For stronger pruning, textbook B&B for TSP uses a **reduced cost matrix** (row/column reduction) as the lower bound, which is tighter than the one used here.

---

### Other classic B&B problems to study

- Job assignment problem
- 15-puzzle / sliding puzzles
- Integer linear programming (LP relaxation as the bound)
- Vertex cover / maximum clique (exact solvers)

---

# 6. Quick Comparison and How to Choose

| Method | Subproblems | Decisions | Typical use | Guarantee |
|--------|-------------|-----------|-------------|-----------|
| **Divide & Conquer** | Independent | Split, then combine | Sorting, searching, fast arithmetic | Exact |
| **Dynamic Programming** | Overlapping | Try all, store results | Optimization with optimal substructure | Exact (optimal) |
| **Greedy** | One remaining subproblem | Commit to the locally best | Scheduling, MST, shortest paths, compression | Optimal *only if proven* |
| **Backtracking** | Implicit tree (DFS) | Try, prune, undo | Constraint satisfaction, enumeration | Finds feasible / all solutions |
| **Branch & Bound** | Implicit tree (best-first) | Try, prune by bound | Hard optimization (NP-hard) | Exact (optimal) |

### Decision flow

1. Can the problem split into **independent** pieces? → **Divide and Conquer**
2. Do the pieces **overlap** and does it have optimal substructure? → **Dynamic Programming**
3. Does a **local choice** provably lead to the global optimum? → **Greedy** (fastest)
4. Do you need to **enumerate/find feasible** solutions under constraints? → **Backtracking**
5. Do you need the **optimum** of a hard problem and can compute a good bound? → **Branch and Bound**

### The knapsack family: one problem, three methods

| Variant | Best approach |
|---------|---------------|
| Fractional knapsack | Greedy (`O(n log n)`) |
| 0/1 knapsack (small `W`) | Dynamic programming (`O(nW)`) |
| 0/1 knapsack (large `W` or hard variants) | Branch and Bound |

This is a great study example: the same problem changes its best algorithm depending on the constraints.

---

## Study Tips

- **Trace by hand.** For each algorithm, run a tiny input on paper (draw the DP table, the recursion tree, the state-space tree).
- **Write the recurrence first** for DP, and the **pruning condition first** for backtracking and B&B.
- **Test against brute force.** Generate random small inputs and compare your solution with a simple exhaustive one.
- **Practice classifying.** For each new problem, ask: *Which method applies, and why do the others fail?*
- **Know your complexities.** Be ready to explain why each algorithm has the running time it does (recurrence, table size, or tree size).

---

*Good luck with Algorithms II!*
