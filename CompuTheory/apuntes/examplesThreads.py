import threading
import datetime
import time

def consultar(id_persona):
    print('Hola 1')
    time.sleep(2)
    print('Mundo 1')


def guardar(id_persona, data):
    print(data[:5]+ "2")
    time.sleep(6)
    print(data[5:]+ " 2")


inicio = datetime.datetime.now()
# consultar(1)  # Sin usar hilos
# guardar(1, "Hola Mundo")
t1 = threading.Thread(name = 'Thread1', target= consultar, args=(1,))
t2 = threading.Thread(name = 'Thread2', target= guardar, args=(1,"Hola Mundo"))
t1.start()
t2.start()
t1.join()  #Aquí sin el join no espera el procedimiento de la función
t2.join()   # Aquí lo mismo, y el Thread arranca ambos procesos al mismo tiempo
# Y espera a que acaben los para finalizar, sin ellos no espera las funciones y se sigue, y las funciones se quedan allí procesando
fin = datetime.datetime.now()
print('Tiempo transcurrido: ' + str(fin.second-inicio.second))