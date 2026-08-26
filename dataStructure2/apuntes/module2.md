**Working with string**

- Prefix and sufix (checar en Ipad apuntes de victor)

**Basic/Naive algorithm**

Objective is to find a pattern inside a given string.

**KMP - Knuth-Morris-Pratt alg**

Objective find patters inside a strings

Without backtracking

Constraints: 

if: j+1 = 1 
    
    then move i and j

elif: j=0 AND j+1 != i

    then move i

else:

    return (inside prefix function) char's index first sighting

