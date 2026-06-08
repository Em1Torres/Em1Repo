import multiprocessing
import time

def task():
    time.sleep(0.5)


if __name__ == "__main__":
    inicio = time.perf_counter()
    p1 = multiprocessing.Process(target = task)
    p2 = multiprocessing.Process(target = task)
    p1.start()
    p2.start()
    p1.join()
    p2.join()
    fin = time.perf_counter()
    print(f"Tiempo: {fin-inicio} segundos")

# inicio = time.perf_counter()
# task()
# task()
# fin = time.perf_counter()
# print(f"Tiempo: {fin-inicio} segundos")