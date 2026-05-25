#Threads example of 50 million counter (paralel)
import time 
from threading import Thread

counter = 50000000

def cuenta_abajo(n):
    while n > 0:
        n -= 1


t1 = Thread(target = cuenta_abajo, args = (counter // 2,))
t2 = Thread(target = cuenta_abajo, args = (counter // 2,))
inicio = time.time()
t1.start()
t2.start()
t1.join()
t2.join()
fin = time.time()
print(f"Tiempo: {fin-inicio}")