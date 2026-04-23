#lang racket

(display "Hello World")
(newline)
(+ 2 4)

; Cuando hacemos arreglos tipo (a b c) scheme lo interpreta como funciones
; Las funciones tienen que estar dentro del paréntesis SUM(a,b) => scheme: (SUM a b)
; Funciones trig: (sin x) (cos x)

(sin (/ pi 2))
(+ 1 2 3 4 5 6 7 8)
(+ pi 4)
(* (* 3 5) 6)
"Hello World"

; Scheme es lenguaje interpretado entonces todos los objetos que recibe los quiere evaluar
; átomos los interpreta como variables e intenta extraer valor y marca errr
; Marca error en las listas porque las quiere evaluar como funciones

; ÁTOMOS_
; Átomos: numeros, strings,simbólicos
; Átomos especiales: átomos que se evaluan
; -> #t, #f, null
; significa que los evalua luego luego porque representa un numero, string o boolean
; y eso ya no puede ser una variable

; Átomos simbólicos: son liberales pero hay algunos que no son válidos
; -> () [] {} , '' ;' # | \
; Listas: conjunto ordenado (tupla) de átomos o listas, van en paréntesis
; y se separan con " " espacios NADA de comas.

'contador
pi
'pi 
(cos (/ pi 2))
'(tan pi)

; Siempre usaremos racket como si fuera un lenguaje funcional puro
; No usar LOOPS ni VARIABLES

; DECLARAMIENTO DE FUNCIONES Y NOMBRES 
; Entender que solo lo usamos para crear apodos para las expresiones
; no crear variables como tal y reasignarlas

; Nombres
(define cont 67)
cont
(expt cont 2)

; Funciones
(define (sumaYMamadas a b) 
    (+ a b)
    (display "This player is dying")
    )

(sumaYMamadas 67 67)
