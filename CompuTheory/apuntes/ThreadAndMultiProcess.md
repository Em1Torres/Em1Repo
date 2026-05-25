**Sistema operativo**

Generar procesos paralelos y juntarlo todo al final (idea general y es un genialidad de sistemas operativos). Y necesita proveer:
- Crear o destruir procesos
- Más de un núcleo de procesadores dentro del CPU
- Sistema de memoria compartida, que implica un mecanismos que garantiza exclusión mutua de los procesos de la misma. Mecanismos de sincronización y comunicación de procesos. (Dos procesos no pueden leer de un mismo pedazo de memoria)
- Sistema de memoria distribuida.

**Procesamiento paralelo en lenguajes de programación**

Tiene mismos criterios que un sistema operativo. Es decir, dar instrucciones para:
- Crear procesos
- Sincronización y comunicación

*Requerimientos aparte de SO*
- Tiene que funcionar independientemente de la máquina

**Diseñador de lenguajes**

- Java fue el primero en permitir hilos en programación -> implica procesos paralelos

*Lenguajes paralelos*

- Creación y destrucción de procesos (hilos)
- Mecanimos de sincronización (semáforos)

**Dos problemas muestra**

- Buffer limitado (acordarse que buffer es pedazo de memoria temporal y creo ubicado en la memoria RAM o caches del CPU)
- Multipliación de matrices (clásico problema a resolver en paralelo)

**Lenguajes sin paralelismo**

Posibles soluciones:

- Dar directivas al compilador (#define, #include) áreas del código donde se puede aplicar paralelismo
- Uso de librerías, que pasa facilidades del SO directamente al programador (#include <cuda_runtime-h>)

***Creación y destrucción de procesos***

*Crear procesos*
: separar procesos actual en 2 diferentes, o un segmento de código se asocia con un tipo de dato, otro segmento a otro tipo de datos (MPMD) -> que diferentes procesos tengan diferente código.

*Alternativa en la creación*

- Granularidad de procesos: enfocarse en tamaño de código que puede convertirse en un procesos separado (instrucciones individuales)
- Hay varias capas (low, medium, high levels of graniularity).

**Hilos (Threads)**

- Java hizo su POO en base a una clase Thread
- Java corre en máquina virtual y no directamente en la compu como C++
- Ofrece 2 paquetes de Threads: Green threads (no usa SO y ocupa máquina virtual) y Native threads (hilos nativos del SO).

**Global Interpreter Lock (GIL)**

Es un mutex (candado) que permite solo un hilo tener control del intérprete de python. 
Esto puede generar cuello de botella ya que como está en un solo hilo ya que está atado a un sólo CPU bound.

**Programas con hilos**

Hay que incluir en code instrucciones para hilos como en python, depende de nuestra programación. Aunque hay veces que no se puede.

- Correr I/O bounds en hilos (input y output)
- Correr CPU bounds en multiprocesos
*Ver ejemplo de multiprocesos en python*

*Ejemplo de programa CPU-bound:* hacer un contador de 50,000,000 hacia abajo (se tendrán 3 archivos en series, paralelo con hilos, paralelo con multiprocesadores).

- Si tu programa ocupa muchas operaciones matemáticas tu programa es más CPU bound (multiprocesos)
- Si tu programa ocupa mucho input y output es IO bound (threads)