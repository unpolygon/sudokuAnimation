export function removeSudoku(mat,level){
    let mated = mat.map(row => {return row.slice()});
    let row,col,zeroCells = [];
    let cells = [10,20,30,40,50]
    while(cells[level]){
        row = Math.floor(Math.random()*9)
        col = Math.floor(Math.random()*9)
        mated[row][col] = 0
        zeroCells.push([row,col]);
        cells[level] -= 1
    }
    return [mated,zeroCells];
}