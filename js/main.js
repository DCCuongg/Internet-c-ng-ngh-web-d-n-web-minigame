async function loadGames(name = "", category = "") {
  /** Là hàm xử lý dữ liệu giả lập (tải từ server đã xử lý từ BE) 
  Danh sách game sẽ được tải từ file .json và lọc theo tên và thể loại*/
  const res = await fetch("/data/games.json")
  const games = await res.json();
  const list = document.getElementById("game-list")
  list.innerHTML = "";
  console.log(games);
  games.forEach(game => {
    if (game.name.toLowerCase().includes(name.toLowerCase()) && game.category.some(cate => cate.toLowerCase().includes(category.toLowerCase()))) {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
      <img src="${game.image}" alt="${game.name}"/>
      <h3>${game.name}</h3>`;
      card.addEventListener("click", () => {
        openGame(game);
      });
      list.appendChild(card);
    }
  });
}
async function openGame(game) {
  /** Hàm định nghĩa cho phần code khi có sự kiện mở game
   * sử dụng thông tin của games.json để load module tương ứng
    */
  const overlay = document.getElementById("game-overlay");
  const container = document.getElementById("game-container");
  document.documentElement.style.overflow = "hidden";// muốn tập trung vào game cản điều khiên ngoài lề
  container.innerHTML = "";
  overlay.style.display = "flex";
  const module = await import(game.module);
  if (typeof module.initGame === "function") {
    module.initGame(container);
  }
}
document.getElementById("overlay-close").addEventListener("click", () => {
  document.getElementById("game-overlay").style.display = "none";
  document.documentElement.style.overflow = "";//Tảt lại css của cssom, vì đã xóa css của style(inline)
  document.getElementById("game-container").innerHTML = "";
});

document.querySelector(".filter-bar input").addEventListener("input", (e) => {
  const name = e.target.value;
  const category = document.querySelector(".filter-bar select").value;
  loadGames(name, category);
}
)
document.querySelector(".filter-bar select").addEventListener("change", (e) => {
  const category = e.target.value;
  const name = document.querySelector(".filter-bar input").value;
  loadGames(name, category);
})
loadGames();