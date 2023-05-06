const width = 500
const height = 500
const gridSize = 3;

let cells = Array(Math.floor(width / gridSize))
  .fill()
  .map(() => {
    return Array(Math.floor(height / gridSize))
      .fill()
      .map(() => {
        return Math.floor(Math.random() * 2)
    })
  })
  

function createNextGen(cells) {
  let nextGeneration = cells.map(row => row.slice())
  let offsets = [
    [-1, -1], 
    [0, -1], 
    [1, -1], 
    [-1, 0], 
    [1, 0], 
    [-1, 1], 
    [0, 1], 
    [1, 1], 
  ]
  for (let row = 0; row < cells.length; row++) {
    for (let column = 0; column < cells[0].length; column++) {
      let neighbors = 0
      for (let i = 0; i < offsets.length; i++) {
        let x = column + offsets[i][0]
        let y = row + offsets[i][1]
        if (!(x < 0 || x >= cells[0].length || y < 0 || y >= cells.length)) {
          neighbors += cells[y][x] 
        }
      }
      if (neighbors < 2 || neighbors > 3) {
        nextGeneration[row][column] = 0
      } else if (neighbors === 3) {
        nextGeneration[row][column] = 1
      }
    }
  }
  return nextGeneration
}

function setup() {
  createCanvas(cells[0].length * gridSize, cells.length * gridSize);
  
  frameRate(10)
}


function draw() {
  clear()
  fill("black");
  let nextGen = createNextGen(cells)
  for (let y = 0; y < nextGen.length; y++) {
    for (let x = 0; x < nextGen[0].length; x++) {
      if (nextGen[y][x]) {
        rect(x * gridSize, y * gridSize, gridSize, gridSize)
      }
    }
  }
  cells = nextGen
}

// let slider = document.querySelector("input") 
// let label = document.querySelector("p")
// slider.addEventListener("change", (event) => {
//   let input = +event.target.value
//   label.innerHTML = "Rule: " + input
//   clear()
//   main(input)
// })

// function generateRule(input) {
//   let bin = input.toString(2).padStart(8, "0")
//   let rule = {
//     111: bin[0],
//     110: bin[1],
//     101: bin[2],
//     100: bin[3],
//     "011": bin[4],
//     "010": bin[5],
//     "001": bin[6],
//     "000": bin[7],
//   };
  
//   return rule
// }



// function createNextGen(currentGen, rule) {
//   let nextGen = [];
//   for (let i = 0; i < currentGen.length; i++) {
//     let binStr = "";
//     if (i === 0) {
//       binStr = "" + currentGen[currentGen.length - 1] + currentGen[i] + currentGen[i + 1];
//     } else if (i === currentGen.length - 1) {
//       binStr = "" + currentGen[i - 1] + currentGen[i] + currentGen[0];
//     } else {
//       binStr = "" + currentGen[i - 1] + currentGen[i] + currentGen[i + 1];
//     }

//     nextGen.push(rule[binStr]);
//   }
//   return nextGen;
// }


// function setup() {
//   createCanvas(width, height);
//   noLoop();
// }


// function draw() {
//   fill("black");
//   main(30);
// }

// function main(input) {
//   let currentGen = Array(Math.floor(width / gridSize))
//     .fill(0)
//   currentGen[Math.floor(currentGen.length / 2)] = 1
    
//   //   Array(Math.floor(width / gridSize))
//   // .fill(0)
//   // .map(() => {
//   //   return Math.floor(Math.random() * 2);
//   // });
  
//   let rule = generateRule(input)
//   drawCA(currentGen, rule)
// }

// function drawCA(currentGen, rule) {
//   for (let j = 0; j < Math.floor(height / gridSize); j++) {
//     for (let i = 0; i < currentGen.length; i++) {
//       if (currentGen[i] == 1) {
//         rect(i * gridSize, j * gridSize, gridSize, gridSize);
//       }
//     }
//     currentGen = createNextGen(currentGen, rule);
//   }
// }