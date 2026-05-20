#include <iostream> 
#include <list> 
using namespace std; 

class Hashing { 
private: 
    int buckets; 
    list <int>* table; 
public: 
    Hashing(int buckets) { 
        this->buckets = buckets; 
        table = new list<int>[this->buckets]; 
    } 

    void insert(int value) { 
        int index = value % buckets; 
        table[index].push_back(value); 
    } 

    void print() { 
        for (int i = 0; i < buckets; i++) { 
            cout << "Buckets: " << i << "|"; 
            for (auto j : table[i])  
            cout << j << "->"; 
            cout << "NULL" << endl; 
        } 
    } 
}; 
int main() { 
    Hashing ht(10); 
    ht.insert(100); 
    ht.insert(95); 
    ht.insert(50); 
    ht.insert(112); 
    ht.insert(75); 
    ht.insert(25); 
    ht.insert(150); 
    ht.print(); 

    return 0;
} 