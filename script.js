let gameCanvas = document.getElementById("gameCanvas");
let gameContext = gameCanvas.getContext("2d");
let xTurn = true;
let blocks = Array(9).fill(false);
let gameOver = false;

const zone = [
  {
    x: 0,
    y: 0
  },
  {
    x: 200,
    y: 0
  },
  {
    x: 400,
    y: 0
  },
  {
    x: 0,
    y: 200
  },
  {
    x: 200,
    y: 200
  },
  {
    x: 400,
    y: 200
  },
  {
    x: 0,
    y: 400
  },
  {
    x: 200,
    y: 400
  },
  {
    x: 400,
    y: 400
  }
];

function drawGame() {
  gameContext.beginPath();
  gameContext.moveTo(200, 0);
  gameContext.lineTo(200, 600);
  gameContext.stroke();

  gameContext.beginPath();
  gameContext.moveTo(400, 0);
  gameContext.lineTo(400, 600);
  gameContext.stroke();

  gameContext.beginPath();
  gameContext.moveTo(0, 200);
  gameContext.lineTo(600, 200);
  gameContext.stroke();

  gameContext.beginPath();
  gameContext.moveTo(0, 400);
  gameContext.lineTo(600, 400);
  gameContext.stroke();
}

function process(event) {
  if (!gameOver) {
    let select = getUserSelection(event);
    let x = select.x;
    let y = select.y;
    let block = getBlockNumber(x, y);

    if (isBlockAvailable(blocks, block)) {
      drawXO(xTurn, block);
      blocks[block] = true;
      xTurn = !xTurn;
      if (xTurn) document.getElementById("status").innerHTML = "Player X turn";
      else document.getElementById("status").innerHTML = "Player O turn";
    } else {
      document.getElementById("status").innerHTML =
        "Cannot redraw here. Pick an empty block.";
    }

    let allTrue = !!blocks.reduce(function(a, b) {
      return a === b ? a : NaN;
    });

    if (allTrue) {
      document.getElementById("status").innerHTML = "Game over";
      gameOver = true;
    }
  }
}

function getUserSelection(event) {
  const rect = gameCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

function getBlockNumber(x, y) {
  if (x < 200 && y < 200) return 0;
  else if (x > 200 && x < 400 && y < 200) return 1;
  else if (x > 400 && x < 600 && y < 200) return 2;
  else if (x < 200 && y > 200 && y < 400) return 3;
  else if (x > 200 && x < 400 && y > 200 && y < 400) return 4;
  else if (x > 400 && x < 600 && y > 200 && y < 400) return 5;
  else if (x < 200 && y > 400 && y < 600) return 6;
  else if (x > 200 && x < 400 && y > 400 && y < 600) return 7;
  else if (x > 400 && x < 600 && y > 400 && y < 600) return 8;
  else return -99;
}

function isBlockAvailable(blocks, block) {
  if (!blocks[block]) return true;
  else return false;
}

function drawXO(xTurn, block) {
  if (xTurn) {
    gameContext.beginPath();
    gameContext.moveTo(zone[block].x, zone[block].y);
    gameContext.lineTo(zone[block].x + 200, zone[block].y + 200);
    gameContext.lineWidth = 5;
    gameContext.strokeStyle = "#ffa500";
    gameContext.stroke();

    gameContext.beginPath();
    gameContext.moveTo(zone[block].x + 200, zone[block].y);
    gameContext.lineTo(zone[block].x, zone[block].y + 200);
    gameContext.lineWidth = 5;
    gameContext.strokeStyle = "#ffa500";
    gameContext.stroke();
  } else {
    let centerX = zone[block].x + 100,
      centerY = zone[block].y + 100,
      radius = 100;
    gameContext.beginPath();
    gameContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    gameContext.fillStyle = "green";
    gameContext.fill();
    gameContext.lineWidth = 2;
    gameContext.strokeStyle = "#003300";
    gameContext.stroke();
  }
}

drawGame();
gameCanvas.addEventListener("mousedown", event => process(event));
