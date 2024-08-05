function initialize() {
  const reset = document.getElementById("reset");
  reset.addEventListener("click", resetGrid);

  const resize = document.getElementById("resize");
  resize.addEventListener("click", resizeGrid);

  // Start page with grid of 16 squares
  createGrid(16);
}

function createGrid(size) {
  const square = document.createElement("div");
  square.classList.add("square");
  let row = document.createElement("div");
  row.classList.add("row");
  let grid = document.createElement("div");
  grid.id = "grid";
  grid.dataset.size = size;

  row = fillWithCopies(row, square, size);
  grid = fillWithCopies(grid, row, size);

  grid.addEventListener("mouseover", sketch);
  
  const body = document.querySelector("body");
  const buttons = document.getElementById("buttons");
  body.insertBefore(grid, buttons);
}

function deleteGrid() {
  document.getElementById("grid").remove();
}

function resetGrid() {
  const size = getGridSize();
  deleteGrid();
  createGrid(size);
}

function resizeGrid(event) {
  const body = document.querySelector("body");
  let size = +prompt("Enter size of new grid (4-100 squares per side)");
  // Verify valid user input
  if (!Number.isInteger(size) || size < 4) {
    size = 4;
  } else if (size > 100) {
    size = 100;
  }

  deleteGrid();
  body.insertBefore(createGrid(size), event.target);
}

function getGridSize() {
  return document.getElementById("grid").dataset.size;
}

function sketch(event) {
  if (event.target.classList.contains("square")) {
    fadeColor();
    changeColor(event);
  }
}

// Changes square to a random color (with high saturation & average lightness)
function changeColor(event) {
  const hue = random(360);
  const saturation = random(25) + 75;
  const light = random(50) + 25;

  event.target.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${light}%)`;
  event.target.style.opacity = "1";
  event.target.classList.add("trail");
}

// Reduce opacity of trail elements
// Maximum trail length is equal to the length of the grid sides
function fadeColor() {
  const size = getGridSize();
  const trail = document.getElementsByClassName("trail");

  for (let square of trail) {
    let opacity = +square.style.opacity;
    opacity -= 1 / size;
    if (opacity <= 0) {
      square.style.opacity = 0;
      square.classList.remove("trail");
    } else {
      square.style.opacity = opacity;
    }
  }
}

// Fills container with copies of an element (including children)
function fillWithCopies(container, element, amount) {
  for (let i = 0; i < amount; i++) {
    container.appendChild(element.cloneNode(true));
  }
  return container;
}

// Returns random number from 0 to num (inclusive)
function random(num) {
  num++;
  num *= Math.random();
  return Math.floor(num);
}

initialize();
