const arrowFunction = (arr) => {
    let total = 0;
    for(let number of arr){
        total += number;
    }
    return total;
}

let array = [5,7,2,4,5];
arrowFunction(array);