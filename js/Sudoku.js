function loadGame() {
  const boardContainer = document.getElementById("sudoku-board");
  const fillSound = document.getElementById("sudoku-fill-sound");
  const successSound = document.getElementById("sudoku-success-sound");
  const failSound = document.getElementById("sudoku-fail-sound");

  let currentBoard = [];
  let solutionBoard = [];
  let currentPuzzle = [];

  // Mảng dễ
  const easyPuzzle = [
    [0, 4, 6, 9, 5, 8, 0, 0, 7],
    [0, 0, 8, 0, 7, 0, 6, 4, 5],
    [0, 7, 2, 0, 0, 6, 8, 9, 1],
    [0, 0, 0, 0, 0, 3, 0, 0, 9],
    [7, 8, 9, 0, 2, 5, 0, 1, 0],
    [6, 3, 0, 7, 1, 9, 0, 8, 2],
    [4, 1, 0, 8, 0, 0, 0, 0, 6],
    [8, 6, 7, 0, 9, 4, 0, 5, 3],
    [9, 2, 0, 5, 6, 1, 4, 7, 0]
  ];

  const easySolution = [
    [1, 4, 6, 9, 5, 8, 2, 3, 7],
    [3, 9, 8, 1, 7, 2, 6, 4, 5],
    [5, 7, 2, 3, 4, 6, 8, 9, 1],
    [2, 5, 1, 4, 8, 3, 7, 6, 9],
    [7, 8, 9, 6, 2, 5, 3, 1, 4],
    [6, 3, 4, 7, 1, 9, 5, 8, 2],
    [4, 1, 5, 8, 3, 7, 9, 2, 6],
    [8, 6, 7, 2, 9, 4, 1, 5, 3],
    [9, 2, 3, 5, 6, 1, 4, 7, 8]
  ];

  // Mảng bình thường
  const mediumPuzzle = [
    [0, 0, 8, 0, 0, 0, 6, 0, 7],
    [9, 0, 1, 2, 0, 3, 0, 0, 0],
    [0, 2, 0, 8, 0, 0, 3, 0, 9],
    [0, 0, 0, 6, 1, 8, 9, 7, 0],
    [8, 9, 5, 0, 0, 0, 4, 6, 1],
    [0, 7, 6, 5, 4, 9, 0, 0, 0],
    [5, 0, 3, 0, 0, 7, 0, 8, 0],
    [0, 0, 0, 1, 0, 4, 7, 0, 3],
    [7, 0, 9, 0, 0, 0, 2, 0, 0]
  ];

  const mediumSolution = [
    [3, 5, 8, 4, 9, 1, 6, 2, 7],
    [9, 6, 1, 2, 7, 3, 5, 4, 8],
    [4, 2, 7, 8, 6, 5, 3, 1, 9],
    [2, 3, 4, 6, 1, 8, 9, 7, 5],
    [8, 9, 5, 7, 3, 2, 4, 6, 1],
    [1, 7, 6, 5, 4, 9, 8, 3, 2],
    [5, 4, 3, 9, 2, 7, 1, 8, 6],
    [6, 8, 2, 1, 5, 4, 7, 9, 3],
    [7, 1, 9, 3, 8, 6, 2, 5, 4]
  ];

  // Mảng khó
  const hardPuzzle = [
    [0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 3, 0, 2, 6, 0, 0, 0],
    [6, 2, 0, 0, 5, 1, 0, 4, 0],
    [0, 0, 9, 6, 0, 8, 0, 3, 0],
    [0, 3, 0, 0, 0, 0, 0, 8, 0],
    [0, 8, 0, 5, 0, 9, 2, 0, 0],
    [0, 6, 0, 1, 9, 0, 0, 5, 4],
    [0, 0, 0, 8, 4, 0, 9, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  const hardSolution = [
    [9, 4, 5, 7, 8, 3, 6, 2, 1],
    [7, 1, 3, 4, 2, 6, 8, 9, 5],
    [6, 2, 8, 9, 5, 1, 7, 4, 3],
    [2, 5, 9, 6, 1, 8, 4, 3, 7],
    [1, 3, 6, 2, 7, 4, 5, 8, 9],
    [4, 8, 7, 5, 3, 9, 2, 1, 6],
    [8, 6, 2, 1, 9, 7, 3, 5, 4],
    [3, 7, 1, 8, 4, 5, 9, 6, 2],
    [5, 9, 4, 3, 6, 2, 1, 7, 8]
  ];

  // Mảng chuyên gia
  const expertPuzzle = [
    [0, 0, 0, 0, 0, 8, 0, 0, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 2],
    [9, 6, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 7, 6, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 8, 0, 4, 0, 9, 0, 7],
    [6, 9, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 0, 0, 1, 2, 0, 0],
    [0, 1, 0, 0, 0, 2, 0, 8, 4]
  ];

  const expertSolution = [
    [2, 4, 5, 1, 9, 8, 7, 3, 6],
    [3, 8, 1, 7, 6, 4, 5, 9, 2],
    [9, 6, 7, 5, 2, 3, 1, 4, 8],
    [5, 2, 9, 8, 7, 6, 4, 1, 3],
    [4, 7, 6, 3, 1, 9, 8, 2, 5],
    [1, 3, 8, 2, 4, 5, 9, 6, 7],
    [6, 9, 2, 4, 8, 7, 3, 5, 1],
    [8, 5, 4, 6, 3, 1, 2, 7, 9],
    [7, 1, 3, 9, 5, 2, 6, 8, 4]
  ];

  // Mảng cực kỳ
  const extremePuzzle = [
    [3, 0, 0, 0, 7, 0, 5, 0, 0],
    [1, 0, 9, 8, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0, 2, 0],
    [0, 6, 4, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 6, 0, 7],
    [0, 0, 0, 9, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0]
  ];

  const extremeSolution = [
    [3, 4, 8, 2, 7, 9, 5, 6, 1],
    [1, 7, 9, 8, 5, 6, 3, 4, 2],
    [2, 5, 6, 4, 3, 1, 9, 7, 8],
    [9, 1, 3, 5, 6, 8, 7, 2, 4],
    [7, 6, 4, 1, 9, 2, 8, 5, 3],
    [5, 8, 2, 7, 4, 3, 1, 9, 6],
    [4, 9, 1, 3, 2, 5, 6, 8, 7],
    [6, 3, 7, 9, 8, 4, 2, 1, 5],
    [8, 2, 5, 6, 1, 7, 4, 3, 9]
  ];

  // Load board
  function loadBoard(puzzle) {
    boardContainer.innerHTML = "";
    currentBoard = JSON.parse(JSON.stringify(puzzle));
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    for (let r = 0; r < 9; r++) {
      const row = document.createElement("tr");
      for (let c = 0; c < 9; c++) {
        const cell = document.createElement("td");
        if (puzzle[r][c] !== 0) {
          cell.textContent = puzzle[r][c];
          cell.classList.add("fixed");
        } else {
          const input = document.createElement("input");
          input.type = "text";
          input.maxLength = 1;
          input.classList.add("cell", "user-input");
          input.addEventListener("input", (e) => {
            let val = e.target.value.replace(/[^1-9]/, "");
            e.target.value = val;
            currentBoard[r][c] = parseInt(val) || 0;
            fillSound.currentTime = 0;
            fillSound.play();
            updateRemainingCounts();
          });
          cell.appendChild(input);
        }
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    boardContainer.appendChild(table);
    updateRemainingCounts();
  }

  // Cập nhật số số chưa được điền cho mỗi số
  function updateRemainingCounts() {
    const counts = Array(10).fill(9);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = currentBoard[r][c];
        if (val >= 1 && val <= 9) {
          counts[val]--;
        }
      }
    }
    for (let i = 0; i <= 9; i++) {
      const container = document.getElementsByClassName("sudoku-number-buttons");
      const el = container[0].querySelector(`#remain-${i}`);
      if (el) {
        el.textContent = counts[i];
      }
    }
  }

  // Kiểm tra kết quả
  document.getElementById("sudoku-check-btn").addEventListener("click", () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] !== solutionBoard[r][c]) {
          failSound.currentTime = 0;
          failSound.play();
          alert("Thật tiếc quá! Hãy thử lại nhé!");
          return;
        }
      }
    }
    successSound.currentTime = 0;
    successSound.play();
    alert("Chính xác rồi! Xin chúc mừng bạn!");
  });

  // Làm lại từ đầu
  document.getElementById("sudoku-reset-btn").addEventListener("click", () => {
    loadBoard(solutionBoard.map(row => row.map(() => 0)));
    loadBoard(currentPuzzle);
  });

  // Chọn độ khó
  document.getElementById("sudoku-easy-btn").addEventListener("click", () => {
    currentPuzzle = easyPuzzle;
    solutionBoard = easySolution;
    loadBoard(currentPuzzle);
  });

  document.getElementById("sudoku-medium-btn").addEventListener("click", () => {
    currentPuzzle = mediumPuzzle;
    solutionBoard = mediumSolution;
    loadBoard(currentPuzzle);
  });

  document.getElementById("sudoku-hard-btn").addEventListener("click", () => {
    currentPuzzle = hardPuzzle;
    solutionBoard = hardSolution;
    loadBoard(currentPuzzle);
  });

  document.getElementById("sudoku-expert-btn").addEventListener("click", () => {
    currentPuzzle = expertPuzzle;
    solutionBoard = expertSolution;
    loadBoard(currentPuzzle);
  });

  document.getElementById("sudoku-extreme-btn").addEventListener("click", () => {
    currentPuzzle = extremePuzzle;
    solutionBoard = extremeSolution;
    loadBoard(currentPuzzle);
  });

  // Khởi tạo
  currentPuzzle = easyPuzzle;
  solutionBoard = easySolution;
  loadBoard(easyPuzzle);
}

export async function initGame(container) {
  const style = document.createElement('style');
  const res = await fetch("/css/Sudoku.css");
  const cssText = await res.text();
  style.textContent = cssText;
  document.body.appendChild(style);

  container.innerHTML = `
    <div class="Sudoku">
        <!-- Phần header (chứa logo sudoku và tiêu đề) -->
        <header>
            <img src="images/Sudoku_img/unnamed.jpg" alt="Left Logo" class="logo">
            <img src="images/Sudoku_img/sudoku_logo1.png" alt="Left Logo" class="logo">
            <h1> BASIC SUDOKU </h1>
            <img src="images/Sudoku_img/sudoku_logo1.png" alt="Right Logo" class="logo">
            <img src="images/Sudoku_img/unnamed.jpg" alt="Right Logo" class="logo">
        </header>

        <!-- Phần main (chứa thanh menu độ khó, bảng sudoku, số số còn lại chưa điền, nút "Kiểm tra" "Làm lại") -->
        <main>
            <div class="menu">
                <span> <strong> Độ khó: </strong> </span>
                <button id="sudoku-easy-btn"> Dễ </button>
                <button id="sudoku-medium-btn"> Bình thường </button>
                <button id="sudoku-hard-btn"> Khó </button>
                <button id="sudoku-expert-btn"> Chuyên gia</button>
                <button id="sudoku-extreme-btn"> Cực kỳ </button>
            </div>
            <div id="sudoku-board">
                <table>
                    <tbody id="board"> </tbody>
                </table>
            </div>
            <div class="sudoku-number-buttons">
                <button class="number-button" data-number="1"> 1 <small id="remain-1"> 1 </small> </button>
                <button class="number-button" data-number="2"> 2 <small id="remain-2"> 2 </small> </button>
                <button class="number-button" data-number="3"> 3 <small id="remain-3"> 3 </small> </button>
                <button class="number-button" data-number="4"> 4 <small id="remain-4"> 4 </small> </button>
                <button class="number-button" data-number="5"> 5 <small id="remain-5"> 5 </small> </button>
                <button class="number-button" data-number="6"> 6 <small id="remain-6"> 6 </small> </button>
                <button class="number-button" data-number="7"> 7 <small id="remain-7"> 7 </small> </button>
                <button class="number-button" data-number="8"> 8 <small id="remain-8"> 8 </small> </button>
                <button class="number-button" data-number="9"> 9 <small id="remain-9"> 9 </small> </button>
            </div>
            <div class="action-buttons">
                <button id="sudoku-check-btn"> Kiểm tra </button>
                <button id="sudoku-reset-btn"> Làm lại </button>
            </div>
        </main>

        <!-- Phần footer (chứa quy tắc chơi và lưu ý) -->
        <footer>
            <p>
                <strong> Quy tắc chơi: </strong>
                Điền các số từ 1 đến 9 vào các ô còn trống trong bảng, sao cho trên mỗi hàng, mỗi cột và
                mỗi khối 3x3
                không có bất kỳ một số nào được lặp lại (tức chỉ xuất hiện 1 lần).
                <em> Lưu ý: </em>
                Trong mỗi ô chỉ được nhập vào một chữ số duy nhất.
            </p>
        </footer>

        <!-- Chèn thêm âm thanh cho sinh động (âm thanh khi nhập số, âm thanh kiểm tra đúng và sai) -->
        <audio id="sudoku-fill-sound" src="sound/Sudoku_audio/mouse-click-5-381777.mp3"> </audio>
        <audio id="sudoku-success-sound" src="sound/Sudoku_audio/goodresult-82807.mp3"> </audio>
        <audio id="sudoku-fail-sound" src="sound/Sudoku_audio/cartoon-fail-trumpet-278822.mp3"> </audio>

        <!-- Chèn script -->
        <script src="Sudoku.js"> </script>
    </div>
  `;
  loadGame();
}

