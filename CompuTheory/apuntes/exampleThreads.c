#include <iostream>
#include <cstdlib>      // Para exit()


#define SIZE 100
#define NUMPROCS 10

int a[SIZE][SIZE], b[SIZE][SIZE], c[SIZE][SIZE];

void multiply(int myid);

int main() {
    int myid;
    for (myid = 0; myid < NUMPROCS; ++myid) {
        if (fork() == 0) {
            multiply(myid);
            exit(0);
        }
    }
    for (myid = 0; myid < NUMPROCS; ++myid) {
        wait(0);
    }
    std::cout << "Listo, compilo y corrio correctamente!" << std::endl;
    return 0;
}

void multiply(int myid) {
    int i, j, k;
    for (i = myid; i < SIZE; i += NUMPROCS) {
        for (j = 0; j < SIZE; ++j) {
            c[i][j] = 0;
            for (k = 0; k < SIZE; ++k) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
}

//Hay que correr en linux para que corra, en windows no funciona