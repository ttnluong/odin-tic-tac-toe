# Tic Tac Toe

A classic Tic Tac Toe game built as part of The Odin Project JavaScript curriculum. The project focuses on applying JavaScript fundamentals to create interactive game logic and a dynamic user interface.

## Live Demo

[View Demo](https://ttnluong.github.io/odin-tic-tac-toe/)

## Features

- Two-player gameplay in the browser
- Players can enter their names before starting
- Clickable game board — marks are placed by clicking squares
- Prevents overwriting already-taken squares
- Detects all win conditions (rows, columns, diagonals) and ties
- Displays the result when the game ends
- Start / restart button to reset the game

## Built With

- HTML
- CSS
- JavaScript (vanilla)

## Concepts Practiced

- **Factory functions** for creating Player and Gameboard objects
- **Module pattern (IIFE)** to encapsulate single-instance objects (e.g. `Gameboard`, `DisplayController`)
- Minimal global scope — nearly all logic lives inside objects
- Separation of concerns: game logic vs. DOM/display logic