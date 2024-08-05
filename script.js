function initialize() {
  const resize = document.getElementById("resize");
  resize.addEventListener("click", resizeGrid);
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
  grid.addEventListener("mouseover", changeColor);

  row = fillWithCopies(row, square, size);
  grid = fillWithCopies(grid, row, size);
  return grid;
}

function fillWithCopies(container, element, amount) {
  for (let i = 0; i < amount; i++) {
    container.appendChild(element.cloneNode(true));
  }

  return container;
}

function deleteGrid() {
  document.getElementById("grid").remove();
}

function changeColor(event) {
  if (event.target.classList.contains("square")) {
    event.target.classList.toggle("filled");
  }
}

function resizeGrid(event) {
  const body = document.querySelector("body");
  let size = +prompt("Size of new grid (4-100 squares per side)");
  if (!Number.isInteger(size) || size < 4) {
    size = 4;
  } else if (size > 100) {
    size = 100;
  }

  deleteGrid();
  body.insertBefore(createGrid(size), event.target);
}

initialize();
