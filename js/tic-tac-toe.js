//tham khảo
// export function initGame(container) {
//   // Chèn CSS trực tiếp
//   const style = document.createElement('style');
//   style.textContent = `
//     #ttt-board {
//       display: grid;
//       grid-template-columns: repeat(3, 100px);
//       grid-template-rows: repeat(3, 100px);
//       gap: 5px;
//       margin: 20px 0;
//     }
//     .ttt-cell {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 2.5rem;
//       font-weight: bold;
//       background-color: #f0f0f0;
//       border: 2px solid #333;
//       cursor: pointer;
//       transition: background-color 0.3s;
//     }
//     .ttt-cell:hover {
//       background-color: #d0d0d0;
//     }
//     #ttt-reset {
//       padding: 10px 20px;
//       font-size: 1rem;
//       cursor: pointer;
//       border: none;
//       border-radius: 5px;
//       background-color: #333;
//       color: white;
//       transition: background-color 0.3s;
//     }
//     #ttt-reset:hover {
//       background-color: #555;
//     }
//     #ttt-status {
//       font-size: 1.2rem;
//       font-weight: bold;
//       margin-bottom: 10px;
//     }
//   `;
//   document.head.appendChild(style);

//   // Tạo HTML game
//   container.innerHTML = `
//     <h2>🎲 Tic Tac Toe</h2>
//     <p id="ttt-status">Người chơi X bắt đầu!</p>
//     <div id="ttt-board" class="ttt-board"></div>
//     <button id="ttt-reset">🔄 Chơi lại</button>
//   `;

//   const board = document.getElementById("ttt-board");
//   const status = document.getElementById("ttt-status");
//   const resetBtn = document.getElementById("ttt-reset");

//   let currentPlayer = "X";
//   let gameActive = true;
//   let gameState = Array(9).fill("");

//   function renderBoard() {
//     board.innerHTML = "";
//     gameState.forEach((cell, i) => {
//       const div = document.createElement("div");
//       div.className = "ttt-cell";
//       div.textContent = cell;
//       div.addEventListener("click", () => cellClick(i));
//       board.appendChild(div);
//     });
//   }

//   function cellClick(index) {
//     if (!gameActive || gameState[index] !== "") return;
//     gameState[index] = currentPlayer;
//     renderBoard();
//     if (checkWin()) {
//       status.textContent = `🎉 Người chơi ${currentPlayer} thắng!`;
//       gameActive = false;
//     } else if (!gameState.includes("")) {
//       status.textContent = "🤝 Hòa!";
//       gameActive = false;
//     } else {
//       currentPlayer = currentPlayer === "X" ? "O" : "X";
//       status.textContent = `Lượt của ${currentPlayer}`;
//     }
//   }

//   function checkWin() {
//     const wins = [
//       [0, 1, 2], [3, 4, 5], [6, 7, 8],
//       [0, 3, 6], [1, 4, 7], [2, 5, 8],
//       [0, 4, 8], [2, 4, 6]
//     ];
//     return wins.some(combo =>
//       gameState[combo[0]] &&
//       gameState[combo[0]] === gameState[combo[1]] &&
//       gameState[combo[0]] === gameState[combo[2]]
//     );
//   }

//   function resetGame() {
//     currentPlayer = "X";
//     gameActive = true;
//     gameState = Array(9).fill("");
//     status.textContent = "Người chơi X bắt đầu!";
//     renderBoard();
//   }

//   resetBtn.addEventListener("click", resetGame);
//   renderBoard();
// }
