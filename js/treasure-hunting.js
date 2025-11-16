// =======================
// Nonogram Treasure Game
// Kích thước: 6x6 — 15 bản đồ chủ đề “Truy tìm kho báu”
// =======================
const solutions = [
  // 💎 1. RƯƠNG KHO BÁU
  [
    [0, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 0],
  ],

  // ☠️ 2. ĐẦU LÂU
  [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0],
  ],

  // ⚡ 3. TIA SÉT
  [
    [0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 0],
  ],

  // ❤️ 4. TRÁI TIM
  [
    [0, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
  ],

  // 🛡️ 5. KHIÊN
  [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
  ],

  // 🏴‍☠️ 6. CỜ HẢI TẶC
  [
    [1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
  ],

  // 🪙 7. ĐỒNG XU
  [
    [0, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 0],
  ],

  // 🗺️ 8. BẢN ĐỒ KHO BÁU
  [
    [1, 0, 0, 1, 0, 1],
    [0, 1, 1, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0],
  ],

  // ⚔️ 9. KIẾM
  [
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
  ],

  // 👑 10. VƯƠNG MIỆN
  [
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0],
  ],

  // 🔥 11. NGỌN LỬA
  [
    [0, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
  ],

  // 🕷️ 12. NHỆN
  [
    [1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0],
  ],

  // 🌊 13. SÓNG BIỂN
  [
    [0, 0, 0, 1, 0, 1],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0, 0],
  ],

  // 🧭 14. LA BÀN
  [
    [0, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0],
  ],

  // 💰 15. TÚI VÀNG
  [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
  ],
];

globalThis.randomSolution = function () {
  return solutions[Math.floor(Math.random() * solutions.length)];
};
globalThis.countCorrect = function (sol) {
  return sol.flat().filter(v => v === 1).length;
};
let isGameActive = false;
let solution = randomSolution();
const rows = 6, cols = 6;
let grid = Array(rows).fill().map(() => Array(cols).fill(-1));
let filledCorrect = 0;
let totalCorrect = countCorrect(solution);

let startTime;
let timerInterval;

function loadGame() {
  // --- Biến global ---
  globalThis.gridDiv = document.getElementById("grid");
  globalThis.colCluesDiv = document.getElementById("col-clues");
  globalThis.rowCluesDiv = document.getElementById("row-clues");
  globalThis.popup = document.getElementById("popup");
  globalThis.popupMessage = document.getElementById("popup-message");
  globalThis.restartBtn = document.getElementById("restart-btn");
  globalThis.timerDisplay = document.getElementById("timer-display");
  globalThis.startBtn = document.getElementById("start-btn");
  globalThis.body = document.body;

  globalThis.soundCorrect = document.getElementById("sound-correct");
  globalThis.soundWrong = document.getElementById("sound-wrong");
  globalThis.soundWin = document.getElementById("sound-win");

  // --- HÀM HỖ TRỢ ---
  globalThis.calculateLineClues = function (line) {
    const clues = [];
    let currentBlock = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === 1) {
        currentBlock++;
      } else {
        if (currentBlock > 0) clues.push(currentBlock);
        currentBlock = 0;
      }
    }
    if (currentBlock > 0) clues.push(currentBlock);
    return clues.length > 0 ? clues : [0];
  };

  // --- TIMER ---
  globalThis.formatTime = function (totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  globalThis.updateTimer = function () {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = `⏱ Thời gian: ${formatTime(elapsedTime)}`;
  };

  globalThis.startTimer = function () {
    stopTimer();
    startTime = Date.now();
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  };

  globalThis.stopTimer = function () {
    clearInterval(timerInterval);
  };

  // --- RENDER & LOGIC ---
  globalThis.renderGrid = function () {
    gridDiv.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener("click", handleClick);
        gridDiv.appendChild(cell);
      }
    }
  };

  globalThis.calculateAndRenderClues = function () {
    colCluesDiv.innerHTML = "";
    rowCluesDiv.innerHTML = "";
    for (let r = 0; r < rows; r++) {
      const rowClue = calculateLineClues(solution[r]);
      const clueDiv = document.createElement("div");
      clueDiv.textContent = rowClue.join(" ");
      rowCluesDiv.appendChild(clueDiv);
    }
    for (let c = 0; c < cols; c++) {
      const columnData = Array(rows).fill(0).map((_, r) => solution[r][c]);
      const colClue = calculateLineClues(columnData);
      const clueDiv = document.createElement("div");
      clueDiv.innerHTML = colClue.join("<br>");
      colCluesDiv.appendChild(clueDiv);
    }
  };

  globalThis.handleClick = function (e) {
    if (!isGameActive) return;

    const r = parseInt(e.target.dataset.row);
    const c = parseInt(e.target.dataset.col);
    if (grid[r][c] !== -1) return;

    if (solution[r][c] === 1) {
      e.target.classList.add("correct");
      grid[r][c] = 1;
      filledCorrect++;
      if (soundCorrect) { soundCorrect.currentTime = 0; soundCorrect.play(); }
      if (filledCorrect === totalCorrect) setTimeout(() => winGame(), 800);
    } else {
      e.target.classList.add("wrong");
      grid[r][c] = 0;
      if (soundWrong) { soundWrong.currentTime = 0; soundWrong.play(); }
      stopTimer();
      isGameActive = false;
      setTimeout(() => showPopup("💀 Bạn bị quái vật tấn công! 💀"), 400);
    }
  };

  globalThis.showPopup = function (msg) {
    popup.classList.remove("hidden");
    popupMessage.textContent = msg;
    restartBtn.classList.remove("hidden");
  };

  globalThis.winGame = function () {
    stopTimer();
    isGameActive = false;
    const finalTime = timerDisplay.textContent.replace('⏱ Thời gian: ', '');
    popup.classList.remove("hidden");
    popupMessage.textContent = `🎉 Bạn là tỷ phú kho báu! Thời gian: ${finalTime} 🎉`;
    restartBtn.classList.remove("hidden");
    if (soundWin) soundWin.play();
  };

  globalThis.setupInitialState = function () {
    solution = randomSolution();
    grid = Array(rows).fill().map(() => Array(cols).fill(-1));
    filledCorrect = 0;
    totalCorrect = countCorrect(solution);
    isGameActive = false;

    renderGrid();
    calculateAndRenderClues();

    stopTimer();
    timerDisplay.textContent = '⏱ Thời gian: 00:00';

    body.classList.add('game-paused');
    body.classList.remove('game-started');
  };

  // --- Event Listeners ---
  startBtn.addEventListener("click", () => {
    isGameActive = true;
    startTimer();
    body.classList.remove('game-paused');
    body.classList.add('game-started');
  });

  restartBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    setupInitialState();
  });

  // Khởi tạo lần đầu
  setupInitialState();
}
export async function initGame(container) {
  const style = document.createElement('style');
  const res = await fetch("/css/treasure-hunting.css");
  const cssText = await res.text();
  style.textContent = cssText;
  document.body.appendChild(style);

  container.innerHTML = `
    <div class="treasure-hunting">
      <h1>💎 Trò chơi Tìm Rương Kho Báu 💎</h1>
      
      <div id="timer-display">⏱ Thời gian: 00:00</div>

      <div id="main-content-wrapper">
          
          <div id="treasure-hunting-game-container">
              <div id="clues"></div> 
              
              <div id="col-clues"></div> 
              
              <div id="row-clues"></div> 
              
              <div id="grid"></div>
          </div>

          <div id="legend">
              <h2>Chú giải</h2>
              <div class="legend-item">
                  <span class="legend-box correct"></span>
                  <span>Ô Đúng (Kho Báu)</span>
              </div>
              <div class="legend-item">
                  <span class="legend-box wrong"></span>
                  <span>Ô Sai (Quái Vật)</span>
              </div>
          </div>

      </div>
      
      <button id="start-btn">BẮT ĐẦU TÌM KHO BÁU!</button>

      <div id="popup" class="hidden">
          <div id="popup-content">
              <p id="popup-message"></p>
              <button id="restart-btn">Chơi lại</button>
          </div>
      </div>

      <audio id="sound-correct" src="/sound/treasure-hunting/correct.mp3"></audio>
      <audio id="sound-wrong" src="/sound/treasure-hunting/wrong.mp3"></audio>
      <audio id="sound-win" src="/sound/treasure-hunting/win.mp3"></audio>
    </div>
  `;
  loadGame();
}
