function initialize() {
  const resize = document.getElementById("resize");
  resize.addEventListener("click", resizeGrid);

  // Start page with grid of 16 squares
  const body = document.querySelector("body");
  body.insertBefore(createGrid(16), resize);
}

function createGrid(size) {
  const square = document.createElement("div");
  square.classList.add("square");
  let row = document.createElement("div");
  row.classList.add("row");
  let grid = document.createElement("div");
  grid.id = "grid";

  row = fillWithCopies(row, square, size);
  grid = fillWithCopies(grid, row, size);

  grid.addEventListener("mouseover", changeColor);
  return grid;
}

function deleteGrid() {
  document.getElementById("grid").remove();
}

function resizeGrid(event) {
  const body = document.querySelector("body");
  let size = +prompt("Size of new grid (4-100 squares per side)");
  // Verify valid user input
  if (!Number.isInteger(size) || size < 4) {
    size = 4;
  } else if (size > 100) {
    size = 100;
  }

  deleteGrid();
  body.insertBefore(createGrid(size), event.target);
}

// Fills container with copies of an element (including children)
function fillWithCopies(container, element, amount) {
  for (let i = 0; i < amount; i++) {
    container.appendChild(element.cloneNode(true));
  }
  return container;
}

// Changes square to a random color (with high saturation & average lightness)
function changeColor(event) {
  if (event.target.classList.contains("square")) {
    const hue = random(360);
    const saturation = random(25) + 75;
    const light = random(50) + 25;

    event.target.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${light}%)`;
  }
}

// Returns random number from 0 to num (inclusive)
function random(num) {
  num++;
  num *= Math.random();
  return Math.floor(num);
}

initialize();
