/*
 * Example functions to practice JavaScript
 *
 * Emilio Torres
 * 18/02/2026
 */

"use strict";

function firstNonerepeating(str){
    //Create an empty array to store the candidates
    const candidates = [];
    // Check every character in string
    for(let i=0; i<str.length;i++){
        //Compare against the candidates
        let found = false;
        for(let cand of candidates){
            if(cand.char == str[i]){
                cand.count += 1;
                found = true;
            }
        }
        if(!found){
            candidates.push({char: str[i],count: 1});
        }
    }

    for(let index in candidates){
        if (candidates[index].count == 1){
            return candidates[index].char;
        }
    }

    return "";
}

function bubbleSort(arr){
    let size = arr.length;
    let check_swap = false;
    for(let i = 0; i<size;i++){
        check_swap = false;
        for(let j = 0; j < size-i-1;j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                check_swap = true;
            }
        }
        if(!check_swap){
            break;
        }
    }
    return arr;
}

function invertArray(arr){
    let size = arr.length;
    let new_arr = new Array(size);
    let k = 0;
    for(let i = size-1; i >= 0;i--){
        new_arr[k] = arr[i];
        k++;
    }
    return new_arr;
}

function invertArrayInplace(arr){
    let size = arr.length;
    for(let i = 0; i < size/2; i++){
        [arr[i], arr[size-i-1]] = [arr[size-i-1], arr[i]];
    }
    return arr;
}

function capitalize(str){
    let new_str = "";
    let size = str.length;
    let next;
    new_str = new_str + str.charAt(0).toUpperCase();
    for(let i = 1; i < size; i++){
        
        if(str.at(i) == " "){
            next = str.charAt(i+1);
            new_str = new_str + str.charAt(i)+ next.toUpperCase();
        }
        else{
            if(str.at(i) == next){
                new_str = new_str + "";
            }
            else{
                new_str = new_str + str.charAt(i);
            }
        }
    }
    return new_str;
}

function mcd(x, y){
    let x_facts = [];
    let y_facts = [];
    let max = 0;
    for (let i = 1; i <= x; i++){
        if (x%i == 0){
            x_facts.push(i)
        }
    }
    for (let i = 1; i <= y; i++){
        if (y%i == 0){
            y_facts.push(i)
        }
    }
    for (let i = 0; i < x_facts.length; i++){
        for (let j = 0; j < y_facts.length; j++){
            if(x_facts[i] == y_facts[j]){
                max = x_facts[i];
            }
        }
    }
    return max;
}

function hackerSpeak(str){
    let new_str = "";
    let size = str.length;
    for(let i = 0; i < size; i++){
        if(str.at(i) == "a" || str.at(i) == "A"){
            new_str = new_str + "4";
        }
        else if(str.at(i) == "s" || str.at(i) == "S"){
            new_str = new_str + "5";
        }
        else if(str.at(i) == "i" || str.at(i) == "I"){
            new_str = new_str + "1";
        }
        else if(str.at(i) == "e" || str.at(i) == "E"){
            new_str = new_str + "3";
        }
        else if(str.at(i) == "o" || str.at(i) == "O"){
            new_str = new_str + "0";
        }
        else{
            new_str = new_str + str.charAt(i);
        }
    }
    return new_str;
}

function factorize(x){
    let arr = [];
    for (let i = 1; i <= x; i++){
        if (x%i == 0){
            arr.push(i)
        }
    }

    return arr;
}

function deduplicate(arr){
    const candidates = [];
    let new_arr = [];
    // Check every character in string
    for(let i=0; i<arr.length;i++){
        //Compare against the candidates
        let found = false;
        for(let cand of candidates){
            if(cand.num == arr[i]){
                cand.count += 1;
                found = true;
            }
        }
        if(!found){
            candidates.push({num: arr[i],count: 1});
        }
    }

    for(let index in candidates){
        
        new_arr.push(candidates[index].num);
        
    }

    return new_arr;
}

function findShortestString(arr){
    let size = arr.length;
    let count = Infinity;
    let swap = false;
    
    for(let i = 0; i < size; i++){
        let k = 0;
        for(let j = 0; j < arr[i].length; j++){
            k++;
        }
        if(count > k){
            swap = true;
            count = k;
        }
    }

    if(!swap)
        return 0;


    return count;
}

function isPalindrome(str){
    let size = str.length;
    let new_str = "";
    
    for(let i = size-1; i >= 0;i--){
        new_str = new_str + str[i];
    }
    if(new_str == str){
        return true;
    }
    return false;
}

function sortStrings(arr){
    let swap;
    let size = arr.length;
    for(let i = 0; i < size; i++){
        swap = false;
        for (let j=0; j< size - i - 1; j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                swap = true;
            }
        }
        if(!swap){
            break;
        }
    }
    return arr;
}

function stats(arr){
    const candidates = [];
    
    // Check every character in string
    for(let i=0; i<arr.length;i++){
        //Compare against the candidates
        let found = false;
        for(let cand of candidates){
            if(cand.num == arr[i]){
                cand.count += 1;
                found = true;
            }
        }
        if(!found){
            candidates.push({num: arr[i],count: 1});
        }
    }

    let mode = 0;
    let count = 0;
    for(let index in candidates){
        if(candidates[index].count > count){
            mode = candidates[index].num;
            count = candidates[index].count;
        }
    }

    let sum = 0;
    let k = 0;
    for(let i = 0; i < arr.length; i++){
        sum = sum + arr[i];
        k++;
    }
    if(sum == 0 && k == 0){
        return [0,0];
    }

    return [sum/k,mode];


}

function popularString(arr){
    const candidates = [];
    
    // Check every character in string
    for(let i=0; i<arr.length;i++){
        //Compare against the candidates
        let found = false;
        for(let cand of candidates){
            if(cand.str == arr[i]){
                cand.count += 1;
                found = true;
            }
        }
        if(!found){
            candidates.push({str: arr[i],count: 1});
        }
    }

    let mode = "";
    let count = 0;
    for(let index in candidates){
        if(candidates[index].count > count){
            mode = candidates[index].str;
            count = candidates[index].count;
        }
    }

    return mode;
}

function isPowerOf2(num){
    if (num == 0){
        return false;
    }
    while(num>1){
        if (num%2 != 0){
            return false;
        }
        num = num/2;
    }
    return true;
}

function sortDescending(arr){
    let size = arr.length;
    let new_arr = new Array(size);
    let check_swap = false;
    for(let i = 0; i<size;i++){
        check_swap = false;
        for(let j = 0; j < size-i-1;j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                check_swap = true;
            }
        }
        if(!check_swap){
            break;
        }
    }

    let k = 0;
    for(let i = size-1; i >= 0;i--){
        new_arr[k] = arr[i];
        k++;
    }
    return new_arr;
}


export {
    firstNonerepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    
    isPowerOf2,
    sortDescending
    
};
