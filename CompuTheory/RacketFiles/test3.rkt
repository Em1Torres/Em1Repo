
; FUNCIONES
#lang racket
(require racket/enter)

(display "Hello world")
(newline)
(sin (/ pi 2))
(cos (/ pi 2))

; Librerias
; se usa (require racket/nombreLibreria)
; Modulos:
; 
; car y cdr:
; car -> funcion que busca el primer y saca elemento de una lista
; cdr -> guarda la lista ya que se le quitó un elemento de su arreglo

(car '(a b c))
(cdr '(a b c))

; Car: Content of the Address of a Register
; cdr: content decremented of a register
; Ejemplos:
(display "1.")
(newline)
(car '(a b c d e))
(cdr '(a b c d e))
(display "2.")
(newline)
(car '( (1 2 3) a b c d e))
(cdr '( (1 2 3) a b c d e))

; Otras funciones:
; cons-> pegar un elemento a una lista es el append
; append -> no es lo mismo que pushBack de c++ y append de python
;           es básicamente juntar 2 arreglos
; Ejemplos:
(append '(1 2 3) '(a b c))
(cons 'x '(y z))

;También juntar más listas con append es possible

; Ejemplos más complejos
(+ (car '(1 2 3 x y z)) 4)

; Función LIST (list <elem> <elem> <elem>) -> regresa la lista formada por esos elementos
; Ejemplos complejos:



; Booleans: (and x y) ,(or x y) ,(not x)

; Más funciones: (regresan boolean)
; number? -> verifica si el argumento es un numero
; symbol? -> verifica si argumento es un símbolo
; equal? -> verifica si los argumentos son iguales == y jala no solo con números como =
; null? -> regresa #t si la lista está vacía

(define (opera f a b)
    (f a b))

; Funciones adicionales
; member -> te dice con boolean si hay un elemento dentro de una lista

(define A '(1 2 3 4))
(length A) ; length -> size de una lista

; reverse -> invierte la lista

; Funciones útiles
; map -> aplica la función F a todos los elementos de la lista L y regresa
;        la lista con los resultados de dicha aplicación

; Ejemplos cmplejos:
; (map sin '(0.5 pi 0.25))
'((a b c) (1 2 3))

(define (duplica a)
    (* 2 a))

;;; ("Ejemplo map:")
;;; (newline)
; (map duplica '(1 2 3 4))

; Quda pendiente aprender usar map
; foldl -> (fold Op V L), aplica el operador Op a todos los elementos de la lista L,
;           como valor inicial V (como reduce)

(foldl * '1 '(1 2 3 4))