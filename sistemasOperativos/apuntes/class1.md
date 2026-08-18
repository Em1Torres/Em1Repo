***Sistemas operativos***

- Arquitetura von neuman: primeras arquitecturas para un SO. Todas las compus basan su arquitectura siguen esta arquitectura.
- Checar más apuntes de von neuman en marta (ipad).
- CPU: ejecuta instrucciones del porgrama. Cada una de las instrucciones tienen señales ya creadas dentro del diseño del CPU. ALU, CU y los registros son los componentes.
- En cada lenguaje se puede ejecutar el mismo programa.
- *Fetch-Decode-Execute*: básicamente del ram a registros del CPU, de allí al CU para decodear las intruscciones, ejecuta la ALU y fetch se regresa al RAM.

**Qué es un SO?**

Es intermediario entre los programas y el hardware. El SO recibe instrucciones y le dice al hardware que hacer.
- Kernel: la parte más importante del SO, se encarga de hacer la comunicación entre los otros componentes dentro del SO. Hablar entre aplicaciones y hardware. Es un código para administrar el hardware y lo que se recibe de las aplicaciones.
- Monolítico: tiene varias funciones en el mismo código.
- Microkernel: le puedes ir agregando a las funciones y bien tienes varias partes que se comunican entre sí (kernel).
- Se encarga de hablar con los dispositivos.
- No se encarga de las GUI (intefaces de usuario). 
- No maneja los elementos de las aplicaciones
- Muchas de las aplicaciones vienen enlazadas al SO, sin embargo, no forman parte del kernel.
- Lo que si representa el kernel son las acciones que vienen de las aplicaciones.
- Capa de sistema de llamadas es como la API del kernel. Lo que el usuario hace pasa primero por esa capa y luego ya al kernel que si se comunica al hardware.
- Shells son como las terminales del SO (GUI).
- *Buffer*: es como un almacenado en el CPU de lo que vas a utilizar, una zona temporal.

**System calls**
- Muchas veces para correr se ocupa el modo kernel por cuestiones de seguridad, entonces si no se usa el kernel, el programa no se corre.


**Storage**
- Hay 2 tipos de storage: volátil y no volátil. Volátil cuando apagas pierde la información, mientras que los no volátiles retienen la información aunque se apague.
- El SO siempre está ocupando espacio en la RAM.
- En el caso de la NV, las intsrucciones del SO pasan a la RAM.
- Los reguistros contienen la infromacion que el cpu va utilizar en ese moemnto, son el almacenamiento mas cercano al CPU
- Son como los x64, x86. Estos se refieren al tamaño de los registros (lo que estás agarrando en las manos)
- Cache es una memoria con mayor espacio en el CPU pero no es tan directa como los registros.

**RAM**
- Es la memoria principal y es una memoria volátil (es tu mochila)
- Es de acceso chica pero sigue siendo chica por eso nos lleva a la siguiente

**Discos duros**
- Es memoria más lenta pero puedes almacenar mucho más y es una memoria NV.
- Surgen los SSD que tienen acceso a la memoria mucho más rápido ya que en vez de esperar a que el disco haga la rotación necesaria a la punta que lee información, va directo a ese punto de la memoria.

**Discos de respaldo**
- Por lo general las memorias de almacenamiento(HDD y SDD) se van dañando con el tiempo, por lo que es recomendable hacer respaldos.

**Devices**
- Drivers: es como el manual de instrucciones de como se hablan con los dispositivos o bien componentes del sistema operativo

**Blocking and synchronous**
- Cuando están corriendo varios problemas y se necesita correr uno primero. Se le indica a ese que se pause y después retomará.
- Synchronous: esperar a la respuesta de una operación en el SO. Si se puede hacer la operación después es non-synchronous.