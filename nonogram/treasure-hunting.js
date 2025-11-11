// =======================
// Nonogram Treasure Game
// Kích thước: 6x6 — 15 bản đồ chủ đề “Truy tìm kho báu”
// =======================
const solutions = [
    // 💎 1. RƯƠNG KHO BÁU
    [
        [0,1,1,1,1,0],
        [1,1,0,0,1,1],
        [1,1,1,1,1,1],
        [1,0,1,1,0,1],
        [1,1,0,0,1,1],
        [0,1,1,1,1,0],
    ],

    // ☠️ 2. ĐẦU LÂU
    [
        [0,1,1,1,1,0],
        [1,0,1,1,0,1],
        [1,1,1,1,1,1],
        [1,0,1,1,0,1],
        [1,0,1,1,0,1],
        [0,1,0,0,1,0],
    ],

    // ⚡ 3. TIA SÉT
    [
        [0,0,0,1,1,0],
        [0,0,1,1,0,0],
        [0,1,1,0,0,0],
        [1,1,1,1,1,0],
        [0,0,1,1,0,0],
        [0,1,1,0,0,0],
    ],

    // ❤️ 4. TRÁI TIM
    [
        [0,1,0,0,1,0],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [0,1,1,1,1,0],
        [0,0,1,1,0,0],
        [0,0,0,1,0,0],
    ],

    // 🛡️ 5. KHIÊN
    [
        [0,0,1,1,0,0],
        [0,1,1,1,1,0],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [0,1,1,1,1,0],
        [0,0,1,1,0,0],
    ],

    // 🏴‍☠️ 6. CỜ HẢI TẶC
    [
        [1,0,0,0,0,1],
        [0,1,0,0,1,0],
        [0,0,1,1,0,0],
        [0,0,1,1,0,0],
        [0,1,0,0,1,0],
        [1,0,0,0,0,1],
    ],

    // 🪙 7. ĐỒNG XU
    [
        [0,1,1,1,1,0],
        [1,1,0,0,1,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,1,0,0,1,1],
        [0,1,1,1,1,0],
    ],

    // 🗺️ 8. BẢN ĐỒ KHO BÁU
    [
        [1,0,0,1,0,1],
        [0,1,1,0,1,0],
        [0,0,1,1,0,0],
        [0,1,1,1,1,0],
        [1,0,1,1,0,1],
        [0,1,0,0,1,0],
    ],

    // ⚔️ 9. KIẾM
    [
        [0,0,0,1,0,0],
        [0,0,1,1,1,0],
        [0,0,0,1,0,0],
        [0,1,1,1,1,0],
        [0,0,1,1,0,0],
        [0,0,1,1,0,0],
    ],

    // 👑 10. VƯƠNG MIỆN
    [
        [1,0,0,0,0,1],
        [1,1,0,0,1,1],
        [1,1,1,1,1,1],
        [0,1,1,1,1,0],
        [0,1,1,1,1,0],
        [0,0,1,1,0,0],
    ],

    // 🔥 11. NGỌN LỬA
    [
        [0,0,1,0,0,0],
        [0,1,1,1,0,0],
        [0,1,1,1,1,0],
        [1,1,1,1,1,1],
        [0,1,1,1,0,0],
        [0,0,1,0,0,0],
    ],

    // 🕷️ 12. NHỆN
    [
        [1,0,1,0,1,0],
        [0,1,1,1,0,1],
        [1,1,1,1,1,0],
        [0,1,1,1,0,1],
        [1,0,1,0,1,0],
        [0,1,0,1,0,0],
    ],

    // 🌊 13. SÓNG BIỂN
    [
        [0,0,0,1,0,1],
        [0,0,1,1,1,0],
        [0,1,1,0,1,0],
        [1,1,0,0,1,1],
        [0,1,1,1,1,0],
        [1,0,1,0,0,0],
    ],

    // 🧭 14. LA BÀN
    [
        [0,1,0,1,0,0],
        [1,1,1,1,1,0],
        [0,1,0,1,0,0],
        [0,1,1,1,0,0],
        [0,1,0,1,0,0],
        [1,1,1,1,1,0],
    ],

    // 💰 15. TÚI VÀNG
    [
        [0,0,1,1,0,0],
        [0,1,1,1,1,0],
        [1,1,1,1,1,1],
        [0,1,1,1,1,0],
        [0,1,0,0,1,0],
        [0,0,1,1,0,0],
    ],
];


let isGameActive = false; 
let solution = randomSolution();
const rows = 6, cols = 6;
let grid = Array(rows).fill().map(() => Array(cols).fill(-1));
let filledCorrect = 0;
let totalCorrect = countCorrect(solution);

let startTime;
let timerInterval;

// Lấy các phần tử DOM
const gridDiv = document.getElementById("grid");
const colCluesDiv = document.getElementById("col-clues");
const rowCluesDiv = document.getElementById("row-clues");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const restartBtn = document.getElementById("restart-btn");
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const body = document.body;

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const soundWin = document.getElementById("sound-win");

// --- HÀM HỖ TRỢ ---

function randomSolution() {
    return solutions[Math.floor(Math.random() * solutions.length)];
}

function countCorrect(sol) {
    return sol.flat().filter(v => v === 1).length;
}

function calculateLineClues(line) {
    const clues = [];
    let currentBlock = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === 1) {
            currentBlock++;
        } else {
            if (currentBlock > 0) {
                clues.push(currentBlock);
            }
            currentBlock = 0;
        }
    }
    if (currentBlock > 0) {
        clues.push(currentBlock);
    }
    return clues.length > 0 ? clues : [0];
}


// --- LOGIC TIMER ---

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerDisplay.textContent = `⏱ Thời gian: ${formatTime(elapsedTime)}`;
}

function startTimer() {
    stopTimer(); 
    startTime = Date.now();
    updateTimer(); 
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}


// --- HÀM RENDER VÀ LOGIC GAME ---

function renderGrid() {
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
}

function calculateAndRenderClues() {
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
}


function handleClick(e) {
    if (!isGameActive) return; 

    const r = parseInt(e.target.dataset.row);
    const c = parseInt(e.target.dataset.col);
    if (grid[r][c] !== -1) return;

    if (solution[r][c] === 1) {
        e.target.classList.add("correct");
        grid[r][c] = 1;
        filledCorrect++;
        if (soundCorrect) {
            soundCorrect.currentTime = 0;
            soundCorrect.play();
        }
        if (filledCorrect === totalCorrect) {
            setTimeout(() => winGame(), 800);
        }
    } else {
        e.target.classList.add("wrong");
        grid[r][c] = 0;
        if (soundWrong) {
            soundWrong.currentTime = 0;
            soundWrong.play();
        }
        stopTimer(); 
        isGameActive = false; 
        setTimeout(() => showPopup("💀 Bạn bị quái vật tấn công! 💀"), 400);
    }
}

function showPopup(msg) {
    popup.classList.remove("hidden");
    popupMessage.textContent = msg;
    restartBtn.classList.remove("hidden"); 
}

function winGame() {
    stopTimer();
    isGameActive = false; 
    const finalTime = timerDisplay.textContent.replace('⏱ Thời gian: ', '');
    popup.classList.remove("hidden");
    popupMessage.textContent = `🎉 Bạn là tỷ phú kho báu! Thời gian: ${finalTime} 🎉`;
    restartBtn.classList.remove("hidden");
    if (soundWin) soundWin.play();
}

function setupInitialState() {
    solution = randomSolution();
    grid = Array(rows).fill().map(() => Array(cols).fill(-1));
    filledCorrect = 0;
    totalCorrect = countCorrect(solution);
    isGameActive = false; 
    
    // Khởi tạo lưới và gợi ý
    renderGrid();
    calculateAndRenderClues();
    
    // Đặt lại Timer
    stopTimer();
    timerDisplay.textContent = '⏱ Thời gian: 00:00';
    
    // Đặt trạng thái CSS là Paused
    body.classList.add('game-paused');
    body.classList.remove('game-started');
}

// Xử lý khi nhấn nút BẮT ĐẦU
startBtn.addEventListener("click", () => {
    isGameActive = true;
    startTimer();
    body.classList.remove('game-paused');
    body.classList.add('game-started');
});

// Xử lý Restart
restartBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    setupInitialState();
});

// Khởi tạo game lần đầu
setupInitialState();