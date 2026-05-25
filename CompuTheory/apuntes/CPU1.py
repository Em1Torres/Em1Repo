# Linear example of decremetn counter of 50 millions
import time 

counter = 50000000

def cuenta_abajo(n):
    while n > 0:
        n -= 1


inicio = time.time()
cuenta_abajo(counter)
fin = time.time()
print(f"Tiempo: {fin-inicio}")