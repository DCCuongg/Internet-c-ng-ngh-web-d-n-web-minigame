export async function initGame(container, account) {
  container.innerHTML = `
    <div><h1 style="padding:0 3rem; background-color: rgba(112, 204, 234);">Account</h1></div>
    <div id = "achievements"></div>
  `
  const games = await fetch("/data/games.json").then(res => res.json())
  const acc = account
  const achieves = document.getElementById("achievements")
  Object.keys(acc.achievements).forEach(id => {
    const game = games.find(g => g.id === id)
    if (!game) return;
    const title = game?.achievements?.[Object.keys(acc.achievements[id])[0]]?.title || "Unknown Achievement"
    console.log(game?.achievements?.[Object.keys(acc.achievements[id])[0]])
    const des = game?.achievements?.[Object.keys(acc.achievements[id])[0]]?.description || "No description available."
    console.log(game?.achievements?.[Object.keys(acc.achievements[id])[0]]);
    const div = document.createElement("div")
    div.className = "achievement-card"
    div.innerHTML = `
      <div class="game-card game-achievement-img">
        <img src="${game.image}" alt="${game.name}"/>
        <h3>${game.name}</h3>
      </div>
      <h3>${title}</h3>
      <p>${des}</p>
    `
    achieves.appendChild(div)
  })

}