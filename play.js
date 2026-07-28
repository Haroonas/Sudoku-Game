const boardE1 = document.getElementById("board");
const solutionBoardE1 = document.getElementById("solution-board");
const solutionContainer = document.getElementById("solution-container");
const newGameBtn = document.getElementById("newGameBtn");
const resetBtn = document.getElementById("resetBtn");
const solveBtn = document.getElementById("solveBtn");
const messageE1 = document.getElementById("message");
let cells = [];
let solutionCells = [];
for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const cell = document.createElement("input");
    cell.className = "cell";
    cell.maxLength = 1;
    cell.inputMode = "numeric";
    cell.addEventListener("input", () => {
        cell.value = cell.value.replace(/[^1-9]/g, "");
        clearHighlights();
        showMessage("", "");        
        const grid = readBoard();
        const conflicts = findConflicts(grid);        
        if (conflicts.length > 0) {
            for (const [r, c] of conflicts) {
                cells[r][c].classList.add("invalid");
            }
            showMessage("Conflicting number entered!", "error");
        } else {
            checkWinCondition(grid);
        }
    });   
    cell.addEventListener("focus", () => {
        if (!cell.classList.contains("invalid")) showMessage("", "");
    });
    if (col == 2 || col == 5) cell.classList.add("border-right");
    if (row == 2 || row == 5) cell.classList.add("border-bottom");
    boardE1.appendChild(cell);
    if (!cells[row]) cells[row] = [];
    cells[row][col] = cell;
}
for (let i = 0; i < 81; i++) {
    const row = Math.floor(i / 9);
    const col = i % 9;
    const cell = document.createElement("input");
    cell.className = "cell";
    cell.readOnly = true;
    if (col == 2 || col == 5) cell.classList.add("border-right");
    if (row == 2 || row == 5) cell.classList.add("border-bottom");
    solutionBoardE1.appendChild(cell);
    if (!solutionCells[row]) solutionCells[row] = [];
    solutionCells[row][col] = cell;
}
newGameBtn.addEventListener("click", generatePuzzle);
resetBtn.addEventListener("click", () => {
    clearBoard(false);
    solutionContainer.style.display = "none";
});
solveBtn.addEventListener("click", () => {
    const grid = [];
    for (let r = 0; r < 9; r++) {
        const rowValues = [];
        for (let c = 0; c < 9; c++) {
            if (cells[r][c].classList.contains("clue")) {
                rowValues.push(parseInt(cells[r][c].value, 10));
            } else {
                rowValues.push(0);
            }
        }
        grid.push(rowValues);
    }
    if (solve(grid)) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                solutionCells[r][c].value = grid[r][c];
                if (cells[r][c].classList.contains("clue")) {
                    solutionCells[r][c].className = "cell clue";
                } else {
                    solutionCells[r][c].className = "cell solved-text";
                }
                if (c == 2 || c == 5) solutionCells[r][c].classList.add("border-right");
                if (r == 2 || r == 5) solutionCells[r][c].classList.add("border-bottom");
            }
        }
        solutionContainer.style.display = "block";
        showMessage("Solution displayed below. Compare it with your board!", "success");
    }
});
function generatePuzzle() {
    clearBoard(true);
    solutionContainer.style.display = "none"; 
    let grid = readBoard();
    let firstRow = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    for (let i = 0; i < 9; i++) grid[0][i] = firstRow[i];
    solve(grid); 
    let cellsToRemove = 45; 
    while (cellsToRemove > 0) {
        let r = Math.floor(Math.random() * 9), c = Math.floor(Math.random() * 9);
        if (grid[r][c] !== 0) {
            grid[r][c] = 0;
            cellsToRemove--;
        }
    }
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] !== 0) {
                cells[row][col].value = grid[row][col];
                cells[row][col].readOnly = true;
                cells[row][col].classList.add("clue");
            }
        }
    }
    showMessage("Good luck!", "success");
}
function clearBoard(clearClues = true) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (clearClues || !cells[row][col].classList.contains("clue")) {
                cells[row][col].value = "";
                if (clearClues) {
                    cells[row][col].readOnly = false;
                    cells[row][col].classList.remove("clue");
                }
            }
        }
    }
    clearHighlights();
    showMessage("", "");
}
function checkWinCondition(grid) {
    let isFull = true;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (grid[r][c] === 0) { isFull = false; break; }
        }
    }
    if (isFull) showMessage("Congratulations! You solved the puzzle!", "success");
}
function readBoard() {
    const grid = [];
    for (let row = 0; row < 9; row++) {
        const rowValues = [];
        for (let col = 0; col < 9; col++) {
            const val = parseInt(cells[row][col].value, 10);
            rowValues.push(Number.isInteger(val) ? val : 0);
        }
        grid.push(rowValues);
    }
    return grid;
}
function isValidPlacement(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[row][i] === num) return false;
        if (grid[i][col] === num) return false;
    }
    const boxRowStart = Math.floor(row / 3) * 3, boxColStart = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (grid[boxRowStart + r][boxColStart + c] === num) return false;
        }
    }
    return true;
}
function solve(grid) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (grid[r][c] == 0) {
                for (let n = 1; n <= 9; n++) {
                    if (isValidPlacement(grid, r, c, n)) {
                        grid[r][c] = n;
                        if (solve(grid)) return true;
                        grid[r][c] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function findConflicts(grid) {
    const conflicts = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const num = grid[r][c];
            if (num == 0) continue;
            grid[r][c] = 0;
            if (!isValidPlacement(grid, r, c, num)) conflicts.push([r, c]);
            grid[r][c] = num;
        }
    }
    return conflicts;
}
function clearHighlights() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) cells[r][c].classList.remove("invalid");
    }
}
function showMessage(text, type) {
    messageE1.textContent = text;
    messageE1.className = type;
}
generatePuzzle();