var score = 0;
var DA = {
  1: 'B',
  2: 'C',
  3: 'A',
  4: 'D',
  5: 'A',
  6: 'C',
  7: 'B',
  8: 'D',
  9: 'A',
  10: 'C',
  11: 'B',
  12: 'D'
};

var total = 12;

// ======== HIỂN THỊ CÂU HỎI ========
function showQuestion(num) {
  var main = document.body.children[1]; // <main> là phần tử thứ 2 trong body
  var all = main.children; // chứa tất cả section

  var i = 0;
  while (i < all.length) {
    var s = all[i];
    var cls = s.className;

    // Xóa "active" nếu có
    var j = 0, newCls = "";
    while (j < cls.length) {
      // nếu phát hiện chuỗi "active"
      if (cls[j] === 'a') {
        j += 6; // bỏ qua từ "active"
      } else {
        newCls += cls[j];
      }
      j++;
    }
    s.className = newCls;

    // nếu id là số hiện tại thì bật active
    var id=s.id
    if (id == num ) {
      s.className += " active";
    }
    i++;
  }
}

function playClick() {
  // truy cập audio dựa vào thứ tự trong body (giả sử audio nằm cuối cùng)
  var all = document.body.children;
  var i = 0;
  var sound = null;

  // duyệt tìm phần tử có id là "clickSound" mà không dùng getElementById
  while (i < all.length) {
    var el = all[i];
    if (el.id === "clickSound") {
      sound = el;
      break;
    }
    i++;
  }

  // phát âm thanh nếu tìm thấy
  if (sound) {
    sound.currentTime = 0;
    sound.playbackRate = 1.5;
    sound.play();
  }
}
document.onclick = function () {
  playClick();
};
// ======== NÚT TIẾP ========
function next(current) {
  if (current < total) {
    showQuestion(current + 1);
  } else {
    showFinish();
  }
}

// ======== NÚT LÙI ========
function prev(current) {
  if (current > 1) {
    showQuestion(current - 1);
  }
}

// ======== CHẤM ĐIỂM ========
function checkAnswer(questionNum, answer, element) {
  var correct = DA[questionNum];
  var ul = element.parentNode;
  var children = ul.children;

  // Không cho chọn lại
  var i = 0;
  while (i < children.length) {
    children[i].onclick = null; // bỏ sự kiện click
    i++;
  }

  if (answer === correct) {
    element.className += " correct";
    score++;
  } else {
    element.className += " wrong";
  }

  // Cập nhật điểm
  var headers = document.body.children[1].children[0].children; // <header> trong <main>
  var j = 0;
  while (j < headers.length) {
    if (headers[j].id === "score") {
      headers[j].innerHTML = "Điểm: " + score;
      break;
    }
    j++;
  }
}

function restartGame() {
  playClick(); // phát âm thanh click nếu có
  location.reload(); // tải lại trang
}





// ======== MÀN KẾT ========
function showFinish() {
  var main = document.body.children[1];
  var all = main.children;
  var i = 0;
  while (i < all.length) {
    var s = all[i];
    var cls = s.className;
    var j = 0, newCls = "";
    while (j < cls.length) {
      if (cls[j] === 'a' && cls[j+1] === 'c' && cls[j+2] === 't') {
        j += 6;
      } else {
        newCls += cls[j];
      }
      j++;
    }
    s.className = newCls;

    if (s.getAttribute("id") === "finish") {
      s.className += " active";
      // cập nhật điểm cuối
      var ps = s.children;
      var k = 0;
      while (k < ps.length) {
        if (ps[k].id === "final-score") {
          ps[k].innerHTML = "Điểm của bạn: " + score;
        }
        k++;
      }
    }
    i++;
  }
}
