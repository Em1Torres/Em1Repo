#lang racket
; Actividad 2.1 Programación funcional, parte 1
; Autor: Emilio Torres Castillo
; Matrícula: a01787141
; Fecha: 18 de mayo, 2026

; 1. Definir una función que pase de fahrenheit a Celsius.
(define (fahrenheit-to-celsius f)
    (/ (* 5 (- f 32)) 9)
)
; Ejemplos:
(fahrenheit-to-celsius 212)
(fahrenheit-to-celsius 32)
(fahrenheit-to-celsius -40)

; 2. Definir una función que diga si un número es positivo o negativo
(define (sign n)
    (if (= n 0)
        0
        (if (> n 0)
            1
            -1
        )
    )
)

; Ejemplos:
(sign -5)
(sign 10)
(sign 0)

; 3. Definir una función que regresa una de las raíces de una función cuadrática
(define (roots a b c)
    (/ (+ (* -1 b)(sqrt (- (sqr b) (* 4 a c)))) (* 2 a))
)

; Ejemplos:
(roots 2 4 2)
(roots 1 0 0)
(roots 4 5 1)   

; 4. Definir una función que determine si tu peso es ok o no en relación a tu altura
(define (BMI w h)
    (/ w (sqr h))
)
(define (bmi weight height)
    (if (< (BMI weight height) 20)
        (write '(underweight))
        (if (and (>= (BMI weight height) 20)(< (BMI weight height) 25))
            (write '(normal))
            (if (and (>= (BMI weight height) 25)(< (BMI weight height) 30))
                (write '(obese1))
                (if (and (>= (BMI weight height) 30)(< (BMI weight height) 40))
                    (write '(obese2))
                    (if (>= (BMI weight height) 40)
                        (write '(obese3))
                        0
                    )
                )
            )
        )
    )
)

; Ejemplos:
(bmi 45 1.7)
(bmi 55 1.5)
(bmi 76 1.7)
(bmi 81 1.6)
(bmi 120 1.6)
(bmi 73 1.8)

; 5. Definir una funcion recursiva factorial
(define (factorial n)
    (if (= n 0)
        1
        (if (> n 0)
            (* n (factorial (- n 1)))
            0
        )
    )
)
; Ejemplos:
(newline)
(factorial 0)
(factorial 5)
(factorial 40)
; (factorial 500)

; 6. Definir una función recursiva que duplique los elementos de un array numérico en orden
(define (duplicate lst)
    (if (null? lst)
        '()
        (cons (cons (car lst) (car lst)) (duplicate (cdr lst)))
    )
)
; Ejemplos:
(duplicate '())
(duplicate '(1 2 3 4 5))
(duplicate '(a b c d e f g h))

; 7. Definir una función recursiva que eleve un numero a la potencia de b
(define (pow a b)
    (if (= b 0)
        (* 1 1)
        (* a (pow a (- b 1)))
    )
)
; Ejemplos:
(pow 5 0)
(pow -5 3)
(pow 15 12)

; 8. Definir una función recursiva usando la serie de Fibonacci
(define (fib n)
    (if (<= n 1)
        n
        (+ (fib (- n 1)) (fib (- n 2)))
    )
)
; Ejemplos:
(fib 6)
(map fib (range 10))
(fib 42)

; 9. Definir una función que regresa cada elemento de una lista como listas dentro de lista
(define (enlist l)
    (if (null? l)
        '()
        (cons (list (car l)) (enlist (cdr l)))
    )
)
; Ejemplso:
(enlist '())
(enlist '(a b c))
(enlist '((1 2 3) 4 (5) 7 8))

; 10. Definir una función que regresa una lista
(define (positives lst)
    (if (null? lst)
        '()
        (if (> (car lst) 0)
            (cons (car lst) (positives (cdr lst)))
            (positives (cdr lst))
        )
    )
)
; Ejemplos:
(positives '())
(positives '(12 -4 3 -1 -10 -13 6 -5))
(positives '(-4 -1 -10 -13 -5))

; 11. Funcion recursiva que suma los elementos de una lista
(define (add-list l)
    (if (null? l)
        (+ 0 0)
        (+ (car l)(add-list (cdr l)))
    )
)
; Ejemplos:
(add-list '())
(add-list '(2 4 1 3))
(add-list '(1 2 3 4 5 6 7 8 9 10))

; 12. Función que recibe listas con sub-listas de parejas e invierte las parejas en otra lista
(define (invert-pairs l)
    (if (null? l)
        '()
        (cons (cons (car (cdar l))(caar l)) (invert-pairs (cdr l)))
    )
)
; Ejemplos: 
(invert-pairs '())
(invert-pairs '((a 1)(a 2)(b 1)(b 2)))
(invert-pairs '((January 1)(February 2)(March 3)))

; 13. Funció booleana que determina si todos los elementos de una lista son símbolos
(define (list-of-symbols? lst)
    (if (null? lst)
        #t
        (if (symbol? (car lst))
            (list-of-symbols? (cdr lst))
            #f
        )
    )
)
; Ejemplos: 
(list-of-symbols? '())
(list-of-symbols? '(a b c d e))
(list-of-symbols? '(a b c d 42 e))

; 14. Función que recibe a b y lst, cada que a esta en lst cambia a b y viceversa
(define (swapper a b lst)
    '()
    (cond
        [(null? lst) '()]
        [(equal? (car lst) a)(cons b (swapper a b (cdr lst)))]
        [(equal? (car lst) b)(cons a (swapper a b (cdr lst)))]
        [(= 1 1)(cons (car lst) (swapper a b (cdr lst)))]
    )
)
; Ejemplos
(swapper 1 2 '())
(swapper 1 2 '(4 4 5 2 4 8 2 5 6 4 5 1 9 5 9 9 1 2 2 4))
(swapper 1 2 '(4 3 4 9 9 3 3 3 9 9 7 9 3 7 8 7 8 4 5 6))
(swapper 'purr
        'kitty
'(soft kitty warm kitty little ball
of fur happy kitty sleepy kitty
purr purr purr))

; 15. Función que calcula el producto punto de dos listas de igual longitud

; Pendiente

; Ejemplos:
;;; (dot-product '() '())
;;; (dot-product '(1 2 3) '(4 5 6))
;;; (dot-product '(1.3 3.4 5.7 9.5 10.4) '(-4.5 3.0 1.5 0.9 0.0))

; 16. Función average en racket que recibe una lst como entrada
(define (suma-lista l) ; Función de profe victor
    (if (null? l)
        0
        (+ (car l)(suma-lista (cdr l)))    
    )
)
(define (average lst)
    (if (null? lst)
        0
        (/ (suma-lista lst) (length lst))
    )
)

; Ejemplos:
(average '())
(average '(4))
(average '(5 6 1 6 0 1 2))
(average '(1.7 4.5 0 2.0 3.4 5 2.5 2.2 1.2))

; 17. Función que calcula la desviación estándar de población de una lista
; Auxiliar: suma de (xi - media)^2 para cada elemento
(define (sum-sq-diff lst media)
    (if (null? lst)
        0
        (+ (expt (- (car lst) media) 2)
           (sum-sq-diff (cdr lst) media))
    )
)
(define (standard-deviation lst)
    (if (null? lst)
        0
        (sqrt (/ (sum-sq-diff lst (average lst))
                 (length lst)))
    )
)
; Ejemplos:
(standard-deviation '())
(standard-deviation '(4 8 15 16 23 42))
(standard-deviation '(110 105 90 100 95))
(standard-deviation '(9 2 5 4 12 7 8 11 9 3 7 4 12 5 4 10 9 6 9 4))


; 18. Función que replica n veces cada elemento de una lista
; Auxiliar: repite un solo elemento x exactamente n veces
(define (aux-replic n e)
    (if (= n 0)
        '()
        (cons e (aux-replic (- n 1) e))
    )
)

(define (replic n lst)
    (if (null? lst)
        '()
        (cons (aux-replic n (car lst)) (replic n (cdr lst)))
    )

)

; Ejemplos:
(replic 7 '())
(replic 0 '(a b c))
(replic 3 '(a))
(replic 4 '(1 2 3 4))


; 19. Función que expande cada elemento i de la lista repitiéndolo i veces
; Auxiliar: igual que repeat-elem, reutilizamos la de arriba

(define (expand lst)
    (if (null? lst)
        '()
        (cons (aux-replic (+ n 1) (car lst)) (expand (cdr lst)))
    )
)

; Ejemplos:
(expand '())
(expand '(a))
(expand '(1 2 3 4))
(expand '(a b c d e))


; 20. Función que convierte un entero n a su representación binaria como lista
; Auxiliar: construye la lista en orden correcto usando recursión

; Pendiente

; Ejemplos:
;;; (binary 0)
;;; (binary 30)
;;; (binary 45123)