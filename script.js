function initialize() {
  const body = document.querySelector("body");
  body.appendChild(createGrid(16));
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

function changeColor(event) {
  if (event.target.classList.contains("square")) {
    event.target.classList.toggle("filled");
  }
}

initialize();
