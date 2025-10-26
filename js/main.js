async function loadGames() {
  const res = await fetch("/data/games.json")
  const games = await res.json();
  const list = document.getElementById("game-list")
  list.innerHTML = "";
  console.log(games);
  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
    <img src="${game.image}" alt="${game.name}"/>
    <h3>${game.name}</h3>`;
    card.addEventListener("click", () => {
      openGame(game);
    });
    list.appendChild(card);
  });
}
async function openGame(game) {
  const overlay = document.getElementById("game-overlay");
  const container = document.getElementById("game-container");
  container.innerHTML = "";
  overlay.style.display = "flex";
  const module = await import(game.module);
  if (typeof module.initGame === "function") {
    module.initGame(container);
  }
}
document.getElementById("overlay-close").addEventListener("click", () => {
  document.getElementById("game-overlay").style.display = "none";
  document.getElementById("game-container").innerHTML = "";
});

loadGames();