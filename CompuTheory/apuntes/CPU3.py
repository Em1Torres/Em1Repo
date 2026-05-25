#Multiprocess example of decrement counter of 5 million (paralel
import time 
from multiprocessing import Process

counter = 50000000

def cuenta_abajo(n):
    while n > 0:
        n -= 1


if __name__ == '__main__':
    t1 = Process(target = cuenta_abajo, args = (counter // 2,))
    t2 = Process(target = cuenta_abajo, args = (counter // 2,))
    inicio = time.time()
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    fin = time.time()
    print(f"Tiempo: {fin-inicio}")