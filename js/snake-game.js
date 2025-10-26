export function initGame(container) {
  container.innerHTML = `
    <h2>🐍 Snake Game</h2>
    <canvas id="snake-canvas" width="400" height="400"></canvas>
    <div class="info">
      <span>Điểm: <span id="snake-score">0</span></span>
      <button id="snake-reset">Chơi lại</button>
    </div>
  `;

  const canvas = document.getElementById("snake-canvas");
  const ctx = canvas.getContext("2d");
  const scoreText = document.getElementById("snake-score");
  const resetBtn = document.getElementById("snake-reset");

  let box = 20, snake, food, dx, dy, score, game;

  function initSnake() {
    snake = [{ x: 9 * box, y: 9 * box }];
    dx = box; dy = 0; score = 0;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
    scoreText.textContent = 0;
    if (game) clearInterval(game);
    game = setInterval(draw, 100);
  }

  function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "lime" : "white";
      ctx.fillRect(s.x, s.y, box, box);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreText.textContent = score;
      food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
      };
    } else {
      snake.pop();
    }

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some(s => s.x === head.x && s.y === head.y)) {
      clearInterval(game);
      alert("Game Over! Điểm: " + score);
      return;
    }

    snake.unshift(head);
  }

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
    else if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
    else if (e.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
    else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
  });

  resetBtn.addEventListener("click", initSnake);
  initSnake();
}
