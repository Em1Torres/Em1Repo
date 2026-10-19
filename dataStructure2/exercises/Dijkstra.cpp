#include <iostream>
#include <vector>
#include <utility>
#include <algorithm> // Para std::swap

using namespace std;

#define MAX 1000 
#define INF 1e9

template <typename T>
class MinHeap {
private:
    T arr[MAX];
    int currentSize;

    // Reorganiza hacia arriba al insertar un elemento
    void heapifyUp(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;
            // Si el elemento es menor que su padre, los intercambiamos
            if (arr[index] < arr[parent]) {
                swap(arr[index], arr[parent]);
                index = parent;
            } else {
                break;
            }
        }
    }

    // Reorganiza hacia abajo al eliminar la raíz
    void heapifyDown(int index) {
        int minIndex = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;

        if (left < currentSize && arr[left] < arr[minIndex]) {
            minIndex = left;
        }
        if (right < currentSize && arr[right] < arr[minIndex]) {
            minIndex = right;
        }

        if (index != minIndex) {
            swap(arr[index], arr[minIndex]);
            heapifyDown(minIndex);
        }
    }

public:
    MinHeap() {
        currentSize = 0;
    }

    bool isEmpty() const {
        return currentSize == 0;
    }

    bool isFull() const {
        return currentSize == MAX;
    }

    int size() const {
        return currentSize;
    }

    // Insertar elemento: O(log N)
    void push(T x) {
        if (isFull()) {
            cout << "The heap is full!" << endl;
            return;
        }
        arr[currentSize] = x;
        heapifyUp(currentSize);
        currentSize++;
    }

    // Eliminar el elemento mínimo (la raíz): O(log N)
    void pop() {
        if (isEmpty()) {
            cout << "The heap is already empty!" << endl;
            return;
        }
        arr[0] = arr[currentSize - 1]; // Mover el último elemento a la raíz
        currentSize--;
        heapifyDown(0); // Reorganizar el árbol
    }

    // Obtener el elemento mínimo: O(1)
    T top() const {
        if (isEmpty()) {
            return T();
        }
        return arr[0];
    }
};

// Estructura para representar aristas: (nodo_destino, peso)
typedef pair<int, int> Arista;

// Algoritmo de Dijkstra con complejidad temporal óptima O((V + E) log V)
void dijkstra(int nodoOrigen, int numNodos, const vector<vector<Arista>>& grafo) {
    vector<int> dist(numNodos, INF);
    
    // Usamos nuestro MinHeap optimizado: guarda (distancia, nodo)
    MinHeap<pair<int, int>> pq;

    dist[nodoOrigen] = 0;
    pq.push({0, nodoOrigen});

    while (!pq.isEmpty()) {
        pair<int, int> actual = pq.top();
        pq.pop();

        int d = actual.first;
        int u = actual.second;

        // Si ya encontramos un camino más corto hacia 'u', ignoramos esta entrada
        if (d > dist[u]) continue;

        // Explorar los vecinos
        for (const auto& vec : grafo[u]) {
            int v = vec.first;
            int peso = vec.second;

            // Relajación
            if (dist[u] + peso < dist[v]) {
                dist[v] = dist[u] + peso;
                pq.push({dist[v], v}); // Inserta y reorganiza en O(log N)
            }
        }
    }

    // Mostrar distancias mínimas finales
    cout << "Distancias mínimas desde el nodo " << nodoOrigen << ":\n";
    for (int i = 0; i < numNodos; ++i) {
        if (dist[i] == INF) {
            cout << "Nodo " << i << ": Inalcanzable\n";
        } else {
            cout << "Nodo " << i << ": " << dist[i] << "\n";
        }
    }
}

int main() {
    int numNodos = 5;
    vector<vector<Arista>> grafo(numNodos);

    // Definición del grafo de ejemplo:
    grafo[0].push_back({1, 4});
    grafo[0].push_back({2, 2});
    grafo[1].push_back({2, 1});
    grafo[1].push_back({3, 5});
    grafo[2].push_back({3, 8});
    grafo[2].push_back({4, 10});
    grafo[3].push_back({4, 2});

    dijkstra(0, numNodos, grafo);

    return 0;
}