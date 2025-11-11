export function initGame(container) {
  // Chèn CSS trực tiếp
  const style = document.createElement('style');
  style.textContent = `
    #memory-board {
      display: grid;
      grid-template-columns: repeat(4, 80px);
      grid-gap: 10px;
      justify-content: center;
      margin: 20px 0;
    }
    .memory-card {
      width: 80px;
      height: 80px;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      cursor: pointer;
      border-radius: 8px;
      border: 2px solid #333;
      transition: transform 0.3s, background-color 0.3s;
      user-select: none;
    }
    .memory-card.flipped {
      background-color: #ffd700;
      transform: rotateY(10deg);
    }
    #memory-reset {
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: #333;
      color: white;
      transition: background-color 0.3s;
    }
    #memory-reset:hover {
      background-color: #555;
    }
    #memory-status {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
    }
  `;
  document.head.appendChild(style);

  // Tạo HTML game
  container.innerHTML = `
    <h2>🧠 Memory Game</h2>
    <p id="memory-status">Lật 2 thẻ giống nhau để ăn điểm!</p>
    <div id="memory-board" class="memory-board"></div>
    <button id="memory-reset">🔄 Chơi lại</button>
  `;

  const board = document.getElementById("memory-board");
  const status = document.getElementById("memory-status");
  const resetBtn = document.getElementById("memory-reset");

  const icons = ["🍎", "🍌", "🍒", "🍇", "🍉", "🥝"];
  let cards, flipped, matched;

  function setupGame() {
    const deck = [...icons, ...icons] // nhân đôi để thành 12 lá
      .sort(() => Math.random() - 0.5);

    board.innerHTML = "";
    cards = [];
    flipped = [];
    matched = 0;

    deck.forEach((icon, idx) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.dataset.icon = icon;
      card.dataset.index = idx;
      card.textContent = "?";
      card.addEventListener("click", () => flipCard(card));
      board.appendChild(card);
      cards.push(card);
    });

    status.textContent = "Lật 2 thẻ giống nhau để ăn điểm!";
  }

  function flipCard(card) {
    if (flipped.length === 2 || card.classList.contains("flipped")) return;
    card.textContent = card.dataset.icon;
    card.classList.add("flipped");
    flipped.push(card);

    if (flipped.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }

  function checkMatch() {
    const [c1, c2] = flipped;
    if (c1.dataset.icon === c2.dataset.icon) {
      matched += 2;
      status.textContent = "✅ Ghép đúng!";
      if (matched === cards.length) {
        status.textContent = "🎉 Bạn đã hoàn thành trò chơi!";
      }
    } else {
      c1.textContent = "?";
      c2.textContent = "?";
      c1.classList.remove("flipped");
      c2.classList.remove("flipped");
      status.textContent = "❌ Sai, thử lại!";
    }
    flipped = [];
  }

  resetBtn.addEventListener("click", setupGame);
  setupGame();
}
