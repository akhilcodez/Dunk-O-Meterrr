
const biscuitData = { "Parle-G": 4.5, "Marie Gold": 5.0, "Oreo": 6.2, "Hide & Seek Fab": 4.0 };

const startButton = document.getElementById("startButton"); const biscuitSelect = document.getElementById("biscuitSelect"); const countdownDisplay = document.getElementById("countdownDisplay"); const buzzer = document.getElementById("buzzer");

let countdownInterval = null;

function startTimer() { const biscuit = biscuitSelect.value;

if (!biscuit || !biscuitData[biscuit]) { alert("Please select a valid biscuit."); return; }

if (countdownInterval !== null) { clearInterval(countdownInterval); }

// Disable button during timer startButton.disabled = true; startButton.classList.add("disabled");

// Prepare animation countdownDisplay.classList.remove("pulse"); void countdownDisplay.offsetWidth; // reset animation

let timeLeft = biscuitData[biscuit];
updateDisplay(timeLeft);

countdownInterval = setInterval(() => {
  timeLeft -= 0.1;
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = "Take it out now! 🫖🍪";
    buzzer.play();
    animateBuzzer();
    startButton.disabled = false;
    startButton.classList.remove("disabled");
  } else {
    updateDisplay(timeLeft);
  }
}, 100);
}

function updateDisplay(time) {
  countdownDisplay.textContent = `Time left: ${time.toFixed(1)} sec`;
  countdownDisplay.classList.add("pulse");
}

function animateBuzzer() {
  document.body.classList.add("flash-bg");
  setTimeout(() => {
    document.body.classList.remove("flash-bg");
  }, 1500);
}

startButton.addEventListener("click", startTimer);
// Reset button logic
const resetButton = document.getElementById('resetButton');
if (resetButton) {
  resetButton.addEventListener('click', function() {
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    countdownDisplay.textContent = 'Time left: --';
    startButton.disabled = false;
    startButton.classList.remove('disabled');
    countdownDisplay.classList.remove('pulse');
  });
}

