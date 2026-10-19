#include <iostream>
#define Max 1000
using namespace std;

template <typename T>
class Queue {
private:
    T arr[Max];
    int front;
    int rear;
public:
    Queue() {
        front = -1;
        rear = -1;
    }
    bool isEmpty() {
        return (front == -1 || front > rear);
    }
    bool isFull() {
        return (rear == Max - 1);
    }
    void enqueue(T x) {
        if (isFull())
            cout << "The queue is full!" << endl;
        else {
            if (front == -1) {
                front = 0;
            }
            rear++;
            arr[rear] = x;
        }
    }
    void dequeue() {
        if (isEmpty())
            cout << "The queue is already empty!" << endl;
        else
            front++;
    }
    T Front() {
        if (isEmpty()) {
            cout << "The queue is empty" << endl;
            return T();
        }
        else
            return arr[front];
    }
    T Rear() {
        if (isEmpty()) {
            cout << "The queue is empty" << endl;
            return T();
        }
        else
            return arr[rear];
    }
    int size() {
        if (isEmpty()) {
            cout << "The queue is empty!!" << endl;
            return 0;
        }
        else
            return (rear - front) + 1;
    }
    void printQ() {
        while (!isEmpty()) {
            cout << Front() << " ";
            dequeue();
        }
        cout << endl;
    }
};
// int main() {
//     Queue <char> q;
//     q.enqueue('A');
//     q.enqueue('B');
//     q.enqueue('C');
//     q.enqueue('D');
//     q.enqueue('E');
//     q.printQ();
//     /*cout << "Front-->" << q.Front() << endl;
//     cout << "Rear-->" << q.Rear() << endl;
//     q.dequeue();
//     cout << "Front-->" << q.Front() << endl;
//     cout << "Queue size: " << q.size() << endl;*/
//     return 0;
// }