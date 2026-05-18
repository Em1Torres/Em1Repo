#lang racket
; Actividad 2.1 Programación funcional, parte 1

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
;;; (define (invert-pairs l)
;;;     (if (null? l)
;;;         '()
;;;         (cons (caar l))
;;;     )
;;; )
