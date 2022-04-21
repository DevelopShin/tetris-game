const playground = document.querySelector(".playground > ul");

//setting
const GAME_ROWS = 20;
const GAME_COLS = 10

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
  square: [
  [[0,0],[0,1],[1,0],[1,1]], //좌, 우, 위, 아래
  [[],[],[],[]],
  [[],[],[],[]],
  [[],[],[],[]],
  ],

  tree: [
    [[4,1],[5,1],[6,1],[5,0]], //좌, 우, 위, 아래
    [[],[],[],[]],
    [[],[],[],[]],
    [[],[],[],[]],
    ]


}

const movingItem ={
  type:"tree",
  direction:0,
  top:0,
  left:0,
}




function init(){
  tempMovingItem ={...movingItem}

  for(let i=0; i < GAME_ROWS; i++) {
    prependNewLine()
  }
  renderBlocks()
}
init()

// matrix
function prependNewLine(){
  const li = document.createElement("li")
  const ul = document.createElement("ul")
  for(let j=0; j<GAME_COLS; j++){
    const matrix = document.createElement("li")
    ul.prepend(matrix)
  }
  li.prepend(ul)
  playground.prepend(li)
}

function renderBlocks(){
  const {type, direction, top, left} = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving")
  movingBlocks.forEach(v=>{
    v.classList.remove(".moving", type)
  })
  BLOCKS[type][direction].forEach(block => {
    const x = block[0]+left;
    const y = block[1]+top;
    // console.log(playground)
    const target = playground.childNodes[y].childNodes[0].childNodes[x];
    target.classList.add(type, "moving") ;
  });
}

function moveBlock(moveType, amount){
  tempMovingItem[moveType] += amount;
  renderBlocks()
}

document.addEventListener("keydown", e=>{
  switch (e.keyCode){
    case 39:
      moveBlock("left",1);
      break;
    case 37:
      moveBlock("left",-1);
      break;
    case 40:
      moveBlock("top",1);
      break;

    case 38:
      moveBlock("top",-1);
      break;
    default:
      break;
  }
})