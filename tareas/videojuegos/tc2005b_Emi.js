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
    let new_arr = "";
    return new_str;
}



export {
    firstNonerepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize
    /*
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
    sortDescending,
    */
};
