**BreakOut de Emi Torres**
-

***Explicación general del codigo para el profe***

Esta implementación del breakout funciona a partir de las funciones del profesor que han sido puestas en el repositorio de clase.

Las principales modificaciones fueron crear una nueva clase GameObject que básicamente cuenta con un atributo extra que funciona como contador de vida y un método adicional para poder reducir el contador de daño o bien generar "daño"

Implementé un método addCrates() con un nested loop para la generación de cajas con un input para poder cambiar la cantidad de filas

También hice una funcionalidad a base de banderas y contadores para la parte de screens de niveles con diferentes eventlistener que llaman addCrates() con inputs crecientes para dar el toque de dificultad

Las demás implementaciones son basadas en el juego 10_pong.js

Para el jugador
-
*Controles*: 

- a -> la paleta se mueve a la izquierda
- b -> la paleta se mueve a la derecha
- barra espaciadora -> incializar el movimiento de la pelotita
- 1 -> Reiniciar juego en caso de ganar o perder
- 2 -> Pasar al segundo nivel después de completar el primero
- 3 -> Pasar al último nivel después de completar el segundo


*Objetivo*:

El juego está basado en el BreakOut original, en caso de no conocerlo el juego consiste en usar un paleta para rebotar una pelotita y destruir todas las cajas que se encuentran en la parte superior.

El jugador deberá poner atención a la pelota e intentar siempre contactar con la paleta móvil con los controles. El jugador cuenta con 3 vidas y en caso de tocar la parte inferior de la pantalla el jugador perderá 1 vida.

Hay 3 niveles y cada uno será progresivamente más difícl con más filas añadidas.

*Reglas*:

- Jugador cuenta con 3 vidas
- Deberá romper todas las cajas antes de avanzar
- Debe completar los 3 niveles para ganar
- La velocidad irá aumentando progresivamente
- Si la bola pasa por debajo de la pelota el jugador pierde una vida y la bola regresa a su posición original en reposo

*Cambios al gameplay*:

El juego sigue la idea original, pero tiene algunos cambios que ya han sido implementados previamente. Lo único que cambia es que las cajas pueden tener 1 vida o 2 vidas que se indicará cambiando la caja de color en caso de tener 2 vidas, indicando que está a punto de romperse.

Finalmente, hay 3 niveles en los cuales se aumenta la dificultad en cada nivel tras progresar al añadir más filas de cajas.





