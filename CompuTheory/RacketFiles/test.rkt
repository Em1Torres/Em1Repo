#lang racket

(display "Hello World")
(newline)
(display (< 5 6))
(newline)
(display(* 2 (* 6 (+ 17 34))))
(newline)   
(display (/ 20 6))
(newline)
(define (factorial n)
    (if (= n 0)
        1
        (* n (factorial (- n 1))))) ; <-- El '*' espera el resultado
(display (factorial 6))