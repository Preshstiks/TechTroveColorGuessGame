let score = 0;
let targetColor = "";
let shades = [];

function generateRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateShades(baseColor) {
  let shades = [];
  for (let i = 0; i < 6; i++) {
    let factor = 1 - i * 0.15;
    let rgb = baseColor.match(/\d+/g).map((num) => Math.floor(num * factor));
    shades.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  }
  return shades.sort(() => Math.random() - 0.5);
}

function setupGame() {
  let baseColor = generateRandomColor();
  shades = generateShades(baseColor);
  targetColor = shades[Math.floor(Math.random() * shades.length)];
  document.getElementById("color-box").style.backgroundColor = targetColor;

  let buttonsContainer = document.getElementById("buttons");
  buttonsContainer.innerHTML = "";
  shades.forEach((color) => {
    let btn = document.createElement("button");
    btn.classList.add("color-btn");
    btn.style.backgroundColor = color;
    btn.addEventListener("click", () => checkGuess(color));
    buttonsContainer.appendChild(btn);
  });

  document.getElementById("message").textContent = "";
}

function checkGuess(color) {
  if (color === targetColor) {
    score++;
    document.getElementById("message").textContent = "Correct!";
    document.getElementById("score").textContent = "Score: " + score;
    setupGame();
  } else {
    document.getElementById("message").textContent = "Wrong!";
  }
}

document.getElementById("new-game").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").textContent = "Score: 0";
  setupGame();
});

setupGame();
