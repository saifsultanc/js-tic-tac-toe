let gameCanvas = document.getElementById("gameCanvas");
let gameContext = gameCanvas.getContext("2d");

const ticTacColumns = [
  {
    x1: 0,
    y1: 0,
    x2: 200,
    y2: 200
  },
  {
    x1: 200,
    y1: 0,
    x2: 400,
    y2: 200
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

function startGame(event) {
  drawGame();

  let xTurn = true;
  let blocks = Array(9).fill(false);
  do {
    const { x, y } = getUserSelection(event);

    let block;
    do {
      block = getBlockNumber(x, y);
    } while (isBlockAvailable(blocks, block));

    blocks[block] = true;
    drawXO(xTurn, block);

    xTurn = !xTurn;
  } while (blocks.indexOf(false) !== -1);
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
  if (xTrue) {
    console.log(" x turn ");
  } else {
    console.log(" o turn ");
  }
}

gameCanvas.addEventListener("mousedown", event => startGame(event));

// copy
