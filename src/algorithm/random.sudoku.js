// // random row and col
var matRandom;

function isSave(i,col){
    // box
    let colBox = col - col%3
    for(let c = colBox; c < colBox+3; c++){
        if(matRandom[0][c] === i )return false
    }
    return true
}

function creatematRandomrix(){
    return Array(9).fill(0).map(() => Array(9).fill(0));
}

function swapLastCol(num,i,times){
    let j = 0
    while (true){
        if (isSave(num[i],j) && isSave(matRandom[times][j],8)){
            num[i] = matRandom[times][j]
            matRandom[times][j] = num[i]
            return 
        }
        j += 1
    }
}

function randomNumber(){
    let times = 0
    let n = 1
    while (times <= n){
        let queue = [];
        let num = [];
        // add 1-9 to queqe
        for(let i = 1 ; i < 10; i++) queue.push(i);
        // random number from queue 0 - 8 at first
        while (queue.length){
            let pos = Math.floor(Math.random()*queue.length)
            num.push(queue[pos])
            queue.splice(pos,1)
        }
        // insert num to first row of matRandomrix
        let i = 0
        for(let col = 0 ; col < 9; col++){   
            if(times > 0){
                while (!isSave(num[i],col)){
                    if (col === 6 || col === 7 || col === 8) {
                        swapLastCol(num,i,times);
                    }
                    else { // push and goto next i
                        num.push(num[i])
                        i += 1 
                    }
                }
            }
            matRandom[times][col] = num[i];
            i += 1  
        }
        times += 1
    }
}

export function randomSudoku(){
    matRandom = creatematRandomrix();
    randomNumber();
    return matRandom;
}
