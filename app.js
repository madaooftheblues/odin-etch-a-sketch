const CANVAS_COLOR = "beige";

const canvas = document.querySelector(".canvas");
const colorWell = document.querySelector("#colorWell");
const eraser = document.querySelector("#eraser");
const slider = document.querySelector("#slider");
const pixels = document.querySelector("#pixels");
const random = document.querySelector("#random");
const clear = document.querySelector("#clear");
const toolkit = document.querySelector(".toolkit");

let color = "black";
let mode = "normal";

function grid(n) {
  canvas.style.gridTemplateColumns = `repeat(${n},1fr)`;
  for (let i = 0; i < n * n; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    canvas.appendChild(square);
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
}

function etch(e) {
  return (e.target.style.backgroundColor =
    mode === "random" ? randomColor() : color);
}

function deactivate() {
  if (mode === "normal") return colorWell.classList.remove("selected");
  if (mode === "random") return random.classList.remove("selected");
  if (mode === "eraser") return eraser.classList.remove("selected");
}

function activate(element) {
  return element.classList.add("selected");
}

colorWell.addEventListener("input", (e) => (color = e.target.value));
colorWell.addEventListener("click", (e) => {
  color = e.target.value;
  deactivate();
  mode = "normal";
  activate(colorWell);
});

canvas.addEventListener("mousedown", etch);
canvas.addEventListener("mousedown", () =>
  canvas.addEventListener("mouseover", etch)
);

canvas.addEventListener("mouseup", () =>
  canvas.removeEventListener("mouseover", etch)
);

eraser.addEventListener("click", () => {
  deactivate();
  mode = "eraser";
  activate(eraser);
  return (color = CANVAS_COLOR);
});

clear.addEventListener("click", () => {
  const squares = canvas.querySelectorAll(".square");
  squares.forEach((square) => (square.style.backgroundColor = CANVAS_COLOR));
});

slider.addEventListener("input", (e) => {
  canvas.textContent = "";
  pixels.textContent = `${e.target.value} x ${e.target.value}`;
  return grid(e.target.value);
});

random.addEventListener("click", () => {
  deactivate();
  mode = "random";
  activate(random);
});

grid(16);
