#lang racket
; Cond: es como el switch en c++
(define A 2)
(cond
    [(= A 1)(write '(es uno))]
    [(= A 2)(write '(es dos))]
)

; Hacer ejercicio de clase:

(define (fx x)
    (cond 
        [(< x -1)(+ x 2)]
        [(and (>= x -1)(< x 0))(/ x x)]
        [(>= x 0)(+ (* x x -1) 1)]
    )
)
(newline)
(fx -4)

; Usando let

;;; (let*
;;;     ([x 1]
;;;     [y 2]
;;;     [z (+ x y)]))

; Funciones anónimas
(define suma(lambda (a b)(+ a b)))
(suma 67 67)

(define (opera f a b)
    (f a b))
(define (x+y+1 a b)
    (+ a b 1))

(opera x+y+1 5 6)
(opera (lambda (a b)(+ a b 1)) 6 6)

; Ciclos: aquí no existen, solo se puede usar recursion
; Ejercicio: funcion factorial en scheme
; fact(n) = { n == 0 => 1 , n < 0 => n*fact(n-1) }

(define (fact n)
    (if (= n 0)
        1
        (* n (fact (- n 1)))
    )
)
(fact 6)

; Ejercicio: hacer multiplicacion con sumas recursivamente

(define (mult a b)
    (if (= b 0)
        0
        (+ a (mult a (- b 1)))
    )
)

(mult 3 4)

; Ejercicio: sumar elementos de una lista
; suma-lista(lista) = { lista == nul => 0, 
; car(lista) + suma-lista(cdr(lista)) }

(define (SumaLista l)
    (if (null? l)
        0
        (+ (car l)(SumaLista (cdr l)))    
    )
)

(SumaLista '(1 2 3 4 5 6))

; Ejercicio: te regresa si un elemento pertenece a una lista
(define (miembro n l)
    (if (null? l)
        #f
        (if (equal? n (car l)) ; Cambia a equal para letras, = para numeros
            #t
            (miembro n (cdr l))
        )
    
    )
)

;;; (miembro 3 '(1 2 3 4 5))



(define (cuantas-vocales l)
    (if (null? l)
        0
        (if (miembro (car l) '(a e i o u A E I O U))
            (+ 1 (cuantas-vocales (cdr l)))
            (+ 0 (cuantas-vocales (cdr l)))
        )
    )   
)

(cuantas-vocales '(x y z a b c e))

;;; (define (reversa l)
;;;     (if (null? l)
    
;;;     )
;;; )

(define (mapea l f)
    (if (null? l)
        '()
        (cons (f (car l)) (mapea (cdr l) f))
    )
)
pi
(mapea '(11 22 33) cos)

(define (reduce Op V l)
    (if (null? l)
        (if (or(equal? Op +)(equal? Op -))
            (Op 0 V)
            (Op 1 V)
        )
        (Op (car l) (reduce Op V (cdr l)))
    )
)

(reduce * 4 '(1 2 3))

