# 🧩 Sudoku Game & Solver

A clean, modern, and interactive Sudoku web application built entirely with HTML, CSS, and Vanilla JavaScript. 

**[🔗 Play the Live Demo Here](https://[Haroonas].github.io/sudoku-game/)**

## ✨ Features

This application includes two distinct modes:

### 1. Play Sudoku
* **Endless Puzzles:** Generates a unique, valid Sudoku puzzle every time you click "New Puzzle".
* **Real-time Validation:** Instantly highlights conflicting numbers (rows, columns, or 3x3 grids) in red as you type.
* **Show Solution:** Get stuck? Click the solution button to generate a read-only solved board beneath your game, allowing you to compare answers without losing your progress.
* **Win Detection:** Automatically detects when the board is completely and correctly filled.

### 2. Sudoku Solver
* **Instant Solutions:** Have a puzzle from a newspaper or book? Type the clues into the blank grid and hit "Solve".
* **Backtracking Algorithm:** Uses an efficient, recursive backtracking algorithm under the hood to calculate the solution instantly.
* **Error Prevention:** Alerts you if you input an impossible puzzle with existing conflicts.

## 🛠️ Built With
* **HTML5:** Semantic structure and layout.
* **CSS3:** Custom styling, CSS Grid for the board layout, modern UI/UX design, hover states, and animations.
* **Vanilla JavaScript:** DOM manipulation, game logic, board generation, and the recursive solver algorithm—no external libraries or frameworks.

## 🚀 How to Run Locally
Because this project uses no external dependencies, running it locally is incredibly simple:
1. Clone the repository: `git clone https://github.com/[your-username]/sudoku-game.git`
2. Open the folder on your computer.
3. Double-click `index.html` to run it in any web browser.
