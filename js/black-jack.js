const blackjack = {};
function loadGame() {
    blackjack.dealerSum = 0;
    blackjack.yourSum = 0;

    blackjack.dealerAceCount = 0;
    blackjack.yourAceCount = 0;

    blackjack.hidden;
    blackjack.deck;

    blackjack.canHit = true;

    // window.onload = function () {
    //     buildDeck();
    //     shuffleDeck();
    //     startGame();
    // }
    blackjack.buildDeck = function () {
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        let types = ["C", "D", "H", "S"]
        blackjack.deck = [];

        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < values.length; j++) {
                blackjack.deck.push(values[j] + "-" + types[i]);
            }
        }
        console.log(blackjack.deck);
    }

    blackjack.shuffleDeck = function () {
        for (let i = 0; i < blackjack.deck.length; i++) {
            let j = Math.floor(Math.random() * blackjack.deck.length); // (0-1) * 52 => (0-51.9999...)
            let temp = blackjack.deck[i];
            blackjack.deck[i] = blackjack.deck[j];
            blackjack.deck[j] = temp;
        }
        console.log(blackjack.deck);
    }

    blackjack.startGame = function () {
        blackjack.hidden = blackjack.deck.pop();
        blackjack.dealerSum += blackjack.getValue(blackjack.hidden);
        blackjack.dealerAceCount += blackjack.checkAce(blackjack.hidden);

        console.log(blackjack.hidden);
        console.log(blackjack.dealerSum);

        while (blackjack.dealerSum < 17) {
            let cardImg = document.createElement("img");
            let card = blackjack.deck.pop()
            cardImg.src = "/images/cards/" + card + ".png";
            blackjack.dealerSum += blackjack.getValue(card);
            blackjack.dealerAceCount += blackjack.checkAce(card);
            document.getElementById("dealer-cards").append(cardImg);
        }
        console.log(blackjack.dealerSum);

        for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement("img");
            let card = blackjack.deck.pop()
            cardImg.src = "/images/cards/" + card + ".png";
            blackjack.yourSum += blackjack.getValue(card);
            blackjack.yourAceCount += blackjack.checkAce(card);
            document.getElementById("your-cards").append(cardImg)
        }
        console.log(blackjack.yourSum);

    }

    blackjack.hit = function () {
        if (!blackjack.canHit) {
            return;
        }

        let cardImg = document.createElement("img");
        let card = blackjack.deck.pop()
        cardImg.src = "/images/cards/" + card + ".png";
        blackjack.yourSum += blackjack.getValue(card);
        blackjack.yourAceCount += blackjack.checkAce(card);
        document.getElementById("your-cards").append(cardImg)

        if (blackjack.reduceAce(blackjack.yourSum, blackjack.yourAceCount) > 21) { // A, J, K => 11 + 10 + 10 => 1 + 10 + 10
            blackjack.canHit = false;
        }

    }

    blackjack.stay = function () {
        blackjack.dealerSum = blackjack.reduceAce(blackjack.dealerSum, blackjack.dealerAceCount);
        blackjack.yourSum = blackjack.reduceAce(blackjack.yourSum, blackjack.yourAceCount)

        blackjack.canHit = false;
        document.getElementById("hidden-black-jack").src = "/images/cards/" + blackjack.hidden + ".png";

        let message = "";
        if (blackjack.yourSum > 21) {
            message = "You lose!";
        }
        else if (blackjack.dealerSum > 21) {
            message = "You win!";
        }
        else if (blackjack.yourSum == blackjack.dealerSum) {
            message = "Tie!";
        }
        else if (blackjack.yourSum > blackjack.dealerSum) {
            message = "You win!";
        }
        else if (blackjack.yourSum < blackjack.dealerSum) {
            message = "You lose!";
        }

        document.getElementById("dealer-sum").innerText = blackjack.dealerSum;
        document.getElementById("your-sum-black-jack").innerText = blackjack.yourSum;
        document.getElementById("results-black-jack").innerText = message;
    }

    blackjack.getValue = function (card) {
        let data = card.split("-");
        let value = data[0]

        if (isNaN(value)) {
            if (value == "A") {
                return 11;
            }
            return 10; // J Q K
        }
        return parseInt(value);
    }

    blackjack.checkAce = function (card) {
        if (card[0] == "A") {
            return 1;
        }
        return 0;
    }

    blackjack.reduceAce = function (playerSum, playerAceCount) {
        while (playerSum > 21 && playerAceCount > 0) {
            playerSum -= 10;
            playerAceCount -= 1;
        }
        return playerSum
    }
    blackjack.buildDeck();
    blackjack.shuffleDeck();
    blackjack.startGame();

    blackjack.restart = function () {
        // Reset DOM
        document.getElementById("dealer-cards").innerHTML =
            `<img id="hidden-black-jack" src="/images/cards/BACK.png">`;
        document.getElementById("your-cards").innerHTML = "";
        document.getElementById("dealer-sum").innerText = "";
        document.getElementById("your-sum-black-jack").innerText = "";
        document.getElementById("results-black-jack").innerText = "";

        // Reset internal state
        blackjack.dealerSum = 0;
        blackjack.yourSum = 0;
        blackjack.dealerAceCount = 0;
        blackjack.yourAceCount = 0;
        blackjack.hidden = null;
        blackjack.deck = [];
        blackjack.canHit = true;

        // Rebuild game
        blackjack.buildDeck();
        blackjack.shuffleDeck();
        blackjack.startGame();
    }

}
export async function initGame(container) {
    const style = document.createElement('style');
    const res = await fetch("/css/black-jack.css");
    const cssText = await res.text();
    style.textContent = cssText;
    document.body.appendChild(style);

    container.innerHTML = `
    <div class="black-jack">
        <h2>Dealer: <span id="dealer-sum"></span></h2>
        <div id="dealer-cards">
            <img id="hidden-black-jack" src="/images/cards/BACK.png">
        </div>

        <h2>You: <span id="your-sum-black-jack"></span></h2>
        <div id="your-cards"></div>

        <br>
        <button id="hit-black-jack">Hit</button>
        <button id="stay-black-jack">Stay</button>
        <p id="results-black-jack"></p>
        <button id="restart-black-jack">Restart</button>
    </div>
    `;
    const blackjackE1 = document.querySelector(".black-jack");
    loadGame();
    
    document.getElementById("hit-black-jack").onclick = blackjack.hit;
    document.getElementById("stay-black-jack").onclick = blackjack.stay;
    document.getElementById("restart-black-jack").onclick = blackjack.restart;
}