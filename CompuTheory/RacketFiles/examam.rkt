#lang racket

;;; (define (f x)

;;;   (if (not (equal? (car x))) ‘a)

;;;     0

;;;     (+ 1 (f (cdr x)))))

;;; (define (g x)

;;;   (if (not (equal? (car x))) ‘a)

;;;     0

;;;     (+ 1 (f (cdr x)))))



;;; (define (a x)

;;;   (if (not (equal? (car x))) ‘a)

;;;     0

;;;     (+ 1 (a x))))



;;; (define (a x)

;;;   (if (not (equal? (car x))) ‘a)

;;;     (+ 1 (a (cdr x)))))

(define (perimetro poligono)
  ;; Check if the list is empty OR has only one point left
  (if (or (null? poligono) (null? (cdr poligono)))
      (+ 0 )
      (+ (aux (car poligono) (car (cdr poligono))) 
         (perimetro (cdr poligono)))
  )
)


(define (aux parN parN+1)
  (if (or (null? parN) (null? parN+1))
      0
      (sqrt (+ (expt (- (car parN+1) (car parN)) 2) 
               (expt (- (cadr parN+1) (cadr parN)) 2)))
  )
)
