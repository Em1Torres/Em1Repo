- Concurrencia: se refiere a realizar varios procesos por partes y termina con todos los procesos ya terminados. Ej: es como cocinar un platillo, vas haciendo una parte, luego otra y terminas con todo un platillo.
-Paralelismo: si se refiere a realizar múltiples procesos a las vez. (Chercar ejemplos de victor).

**Completar con los apuntes de la clase 6 que fue que falté**

**Ahmdal's Law**

1 / (s + ((1-s/n))) -> speedup de un código
Mientras menos partes seriales del código, más speedup tendremos

Ej: Un porgrama serial 100% toma 5 horas, que pasaría si fuera 30% serial con 8 cores

R: 1 / (.3      +   .7/8)
        *Parte      *Parte
        *serial     *paralela con cores

*Threads*

Sirven más para procesos de API requests.Ej:tiene un hilo para las peticiones y va dando las ejecuciones a otros hilos mientras sigue administrando las peticiones.

**Ejercicios**

*checar python*

