const boardE1=document.getElementById("board"); 
const solveBtn=document.getElementById("solveBtn");
const clearBtn=document.getElementById("clearBtn");
let cells=[];
for(let i=0;i<81;i++){
    const row=Math.floor(i/9);
    const col=i%9;
    const cell=document.createElement("input");
    cell.className="cell";
    cell.maxLength=1;
    cell.inputMode="numeric";
    cell.addEventListener("input",()=> {
        cell.value=cell.value.replace(/[^1-9]/g,"");
        clearHighlights();
        showMessage("", "");
        const grid=readBoard();
        const conflicts=findConflicts(grid);
        if(conflicts.length>0) {
            for(const [r,c] of conflicts){
                cells[r][c].classList.add("invalid");
            }
            showMessage("Conflicting number entered!", "error");
        }
    });
    cell.addEventListener("focus",()=>{
        cell.classList.remove("invalid");
        showMessage("", "");
    });
    if(col==2||col==5)cell.classList.add("border-right");
    if(row==2||row==5)cell.classList.add("border-bottom");
    boardE1.appendChild(cell);
    if(!cells[row])cells[row]=[];
    cells[row][col]=cell;
}
function readBoard(){
    const grid=[];
    for(let row=0;row<9;row++){
        const rowValues=[];
        for(let col=0;col<9;col++){
            const value=cells[row][col].value;
            const number=parseInt(value,10);
            if(Number.isInteger(number)) {
                rowValues.push(number);
            } else {
                rowValues.push(0);
            }
        }
        grid.push(rowValues);
    }
    return grid;
}
clearBtn.addEventListener("click",()=>{
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            cells[row][col].value="";
        }
    }
    clearHighlights();
    showMessage("", "");
});
function isValidPlacement(grid,row,col,num){
    for(let i=0;i<9;i++){
        if(grid[row][i]===num)return false;
        if(grid[i][col]===num)return false;
    }
    const boxRowStart=Math.floor(row/3)*3;
    const boxColStart=Math.floor(col/3)*3;
    for(let r=0;r<3;r++){
        for(let c=0;c<3;c++){
            if(grid[boxRowStart+r][boxColStart+c]===num)return false;
        }
    }
    return true;
}
solveBtn.addEventListener("click",()=>{
    clearHighlights();
    const grid=readBoard();
    const conflicts=findConflicts(grid);
    if(conflicts.length>0) {
        for(const[row,col] of conflicts){
            cells[row][col].classList.add("invalid");
        }
        showMessage("There are conflicting numbers on the board - check the highlighted cells.", "error");
        return;
    }
    if(solve(grid)) {
        writeBoard(grid);
        showMessage("Solved!", "success");
    }
    else {
        showMessage("No solution exists for the given Sudoku puzzle.", "error");
    }
});
function findEmptyCell(grid){
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            if(grid[row][col]==0){
                return [row,col];
            }
        }
    }
    return null;
}
function solve(grid){
    const emptyCell=findEmptyCell(grid);
    if(emptyCell==null){
        return true;
    }
    const [row,col]=emptyCell;
    for(let num=1;num<=9;num++){
        if(isValidPlacement(grid,row,col,num)) {
            grid[row][col]=num;
            if(solve(grid)) {
                return true;
            }
            grid[row][col]=0;
        }
    }
    return false;
}
function writeBoard(grid){
    for(let row=0;row<9;row++) {
        for(let col=0;col<9;col++) {
            const value=grid[row][col];
            cells[row][col].value=value === 0? "":value;
        }
    }
}
function findConflicts(grid){
    const conflicts=[];
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            const num=grid[row][col];
            if(num==0)continue;
            grid[row][col]=0;
            const stillValid=isValidPlacement(grid,row,col,num);
            grid[row][col]=num;
            if(!stillValid){
                conflicts.push([row,col]);
            }
        }
    }
    return conflicts;
}
function clearHighlights(){
    for(let row=0;row<9;row++){
        for(let col=0;col<9;col++){
            cells[row][col].classList.remove("invalid");
        }
    }
}
const messageE1=document.getElementById("message");
function showMessage(text, type){
    messageE1.textContent=text;
    messageE1.className=type;
}