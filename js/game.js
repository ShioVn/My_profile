let secretNumber = Math.floor(Math.random() * 100) + 1; // số bí mật từ 1-100
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const mes = document.getElementById("message1");
const attemptsDiv = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");


function makeGuess() {
            const guess = Number(guessInput.value);
            attempts++;

            if (!guess || guess < 1 || guess > 100) {
            mes.textContent = "Hãy nhập số từ 0 đến 100 nhé :>";
            return;
        }

        const diff = Math.abs(guess - secretNumber);

        if (diff === 0) {
        mes.textContent = `Yay!!! Số chính xác là ${secretNumber}. `;
        mes.textContent += `Đã đoán chính xác sau ${attempts} lần thử.`;

        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        attemptsDiv.textContent = "";
        guessInput.value = "";

        } else if (diff <= 10) {
        if (guess > secretNumber) {
            mes.textContent = "Thấp xíu ";
        } else {
            mes.textContent = "Cao lên xíu";
        }
        } else {
        if (guess > secretNumber) {
            mes.textContent = "Cao quá rồi :<";
        } else {
            mes.textContent = "Sao thấp vậy :<";
        }

        attemptsDiv.textContent = `Attempts: ${attempts}`;
        guessInput.value = "";
        }
        guessInput.value = ""; 
        guessInput.focus();
}

function trigger(btn)
{
    btn.classList.add("active");
    setTimeout(() => {
        btn.classList.remove("active");
    }, 150); 
}

guessBtn.addEventListener("click", () => {
    makeGuess();
    trigger(guessBtn)
});


guessInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        makeGuess();
        trigger(guessBtn)
    }
});


restartBtn.addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  mes.textContent = "";
  attemptsDiv.textContent = "";
  guessInput.value = "";
  guessInput.focus();
});
