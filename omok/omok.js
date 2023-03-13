let turn = 1;
let win = 0;

const size = 15;
const check = [];

for(let i=0; i<size; i++) {
  const temp = [];

  for(let j=0; j<size; j++) {
    temp.push(0);
  }
  
  check.push(temp);
}

const board = document.querySelector(".board");
const block = [];
for(let i=0; i<size; i++) {
  const temp = [];

  for(let j=0; j<size; j++) {
    temp[j] = document.createElement("div");
    temp[j].setAttribute("class", "block");
    temp[j].setAttribute("id", `block${i}/${j}`);

    board.append(temp[j]);
  }

  block.push(temp);
}

board.addEventListener("click", e => {
  const id = e.target.getAttribute("id");
  let isCheck = markBlock(id);

  let isEnd = isGameEnd();
  if(isEnd) {
    alert(`PLAYER${win} WIN!`);
    location.reload();
  }

  if(isCheck) {
    turn = turn==1? 2: 1;
  }
})

function markBlock(id) {
  let y = 0;
  let x = 0;

  for(let i=0; i<size; i++) {
    for(let j=0; j<size; j++) {
      if(block[i][j].getAttribute("id")==id) {
        y = i;
        x = j;
      }
    }
  }

  if(check[y][x]===0) {
    check[y][x] = turn;

    let stone = document.createElement("img");
    stone.setAttribute("class", "stone");
    
    if(check[y][x]===1) {
      stone.setAttribute("src", "https://em-content.zobj.net/thumbs/240/apple/325/black-circle_26ab.png");
    } else if(check[y][x]===2) {
      stone.setAttribute("src", "https://em-content.zobj.net/thumbs/240/apple/325/white-circle_26aa.png");
    }
    
    block[y][x].append(stone);
    return true;

  } else {
    return false;
  }
}

function isGameEnd() {
  let isEnd = checkHori();
  isEnd = isEnd? isEnd: checkVerti();
  isEnd = isEnd? isEnd: checkDiagonal();
  isEnd = isEnd? isEnd: checkReverse();

  return isEnd;
}

function checkHori() {
  for(let i=0; i<size; i++) {
    let count = 0;

    for(let j=0; j<size; j++) {
      if(check[i][j]==turn) {
        count++;
      } else {
        count = 0;
      }

      if(count>=5) {
        win = turn;
        return true;
      }
    }
  }
  return false;
}

function checkVerti() {
  for(let i=0; i<size; i++) {
    let count = 0;

    for(let j=0; j<size; j++) {
      if(check[j][i]==turn) {
        count++;
      } else {
        count = 0;
      }

      if(count>=5) {
        win = turn;
        return true;
      }
    }
  }
  return false;
}

function checkDiagonal() {
  let y = 0;
  let x = 0;

  for(let i=0; i<size-4; i++) {
    for(let j=0; j<size-4; j++) {
      if(check[i][j]===turn) {
        y = i;
        x = j;

        let isWin = true;

        for(let k=0; k<5; k++) {
          if(check[y+k][x+k]!==turn) {
            isWin = false;
          }
        }

        if(isWin) {
          win = turn;
          return true;
        }
      }
    }
  }

  return false;
}

function checkReverse() {
  let y = 0;
  let x = 0;

  for(let i=size-1; i>=4; i--) {
    for(let j=0; j<size; j++) {
      if(check[i][j]===turn) {
        y = i;
        x = j;

        let isWin = true;

        for(let k=0; k<5; k++) {
          if(check[y-k][x+k]!==turn) {
            isWin = false;
          }
        }

        if(isWin) {
          win = turn;
          return true;
        }
      }
    }
  }

  return false;
}