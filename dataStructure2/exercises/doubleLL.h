#include <iostream>
using namespace std;

class Node {
public:
	int value;
	Node* next;
	Node* prev;

	Node() {
		value = 0;
		next = nullptr;
		prev = nullptr;
	}

	Node(int v) {
		value = v;
		next = nullptr;
		prev = nullptr;
	}
};

class DoubleLinkedList {
private:
	Node* head;

public:
	DoubleLinkedList() {
		head = nullptr;
	}

	void push_front(int value) {
		Node* new_node = new Node(value);
		if (head == nullptr) {
			head = new_node;
		}
		else {
			new_node->next = head;
			head = new_node;
			new_node->next->prev = new_node;
		}
	}

	void push_back(int value) {
		if (head == nullptr) {
			push_front(value);
		}
		else {
			Node* new_node = new Node(value);
			Node* ptr = head;

			while (ptr->next != nullptr) {
				ptr = ptr->next;
			}
			ptr->next = new_node;
			new_node->prev = ptr;
		}
	}
	void printForward() {
		Node* ptr = head;
		cout << "Head <--> ";
		while (ptr != nullptr) {
			cout << ptr->value << " <--> ";
			ptr = ptr->next;
		}
		cout << "NULL" << endl;
	}
	void printBackward() {
		Node* ptr = head;
		while (ptr->next != nullptr) {
			ptr = ptr->next;
		}

		cout << "NULL <--> ";
		while (ptr != nullptr) {
			cout << ptr->value << " <--> ";
			ptr = ptr->prev;
		}
		cout << "NULL (head)" << endl;  
	}

	int size() {
		Node* ptr = head;
		int s = 0;
		while (ptr != NULL) {
			s++;
			ptr = ptr->next;
		}
		return s;
	}

	void insert(int index, int value) {
		if (head == NULL) {
			cout << "Linked List is empty" << endl;
		}
		else if (index > size()) {
			cout << "Index off of range!!" << endl;
		}
		else if (index == size()) {
			push_back(value);
		}
		else {
			Node* new_node = new Node(value);
			Node* ptr = head;
			Node* ptr2 = head;
			for (int i = 1; i < index; i++) {
				ptr = ptr->next;
			}
			for (int i = 1; i < index - 1; i++) {
				ptr2 = ptr2->next;
			}
			new_node->next = ptr;
			ptr->prev = new_node;
			new_node->prev = ptr2;
			ptr2->next = new_node;
		}
	}


};

// int main() {
// 	DoubleLinkedList d;
// 	d.push_back(20);
// 	d.push_back(30);
// 	d.push_back(40);
// 	d.push_back(50);
// 	d.push_front(10);
// 	d.insert(3, 67);
// 	d.printForward();
// 	d.printBackward();
// }