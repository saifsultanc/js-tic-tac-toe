let gameCanvas = document.getElementById("gameCanvas");
let gameContext = gameCanvas.getContext("2d");

function drawGame() {
  gameContext.beginPath();
  gameContext.moveTo(20, 0);
  gameContext.lineTo(120, 90);
  gameContext.stroke();
}

function startGame() {
  drawGame();
}

// copy
