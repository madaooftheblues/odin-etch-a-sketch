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
let mode = "color";

function grid(n) {
  canvas.style.gridTemplateColumns = `repeat(${n},1fr)`;
  for (let i = 0; i < n * n; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    canvas.appendChild(square);
  }
}

function select(e) {
  return e.target.classList.add("selected");
}

function etch(e) {
  return (e.target.style.backgroundColor = color);
}

colorWell.addEventListener("input", (e) => (color = e.target.value));
colorWell.addEventListener("click", (e) => {
  select(e);
  return (color = e.target.value);
});
canvas.addEventListener("mousedown", etch);
canvas.addEventListener("mousedown", () =>
  canvas.addEventListener("mouseover", etch)
);

canvas.addEventListener("mouseup", () =>
  canvas.removeEventListener("mouseover", etch)
);

eraser.addEventListener("click", () => (color = CANVAS_COLOR));
clear.addEventListener("click", () => {
  const squares = canvas.querySelectorAll("div");
  squares.forEach((square) => (square.style.backgroundColor = CANVAS_COLOR));
});

slider.addEventListener("input", (e) => {
  canvas.textContent = "";
  pixels.textContent = `${e.target.value} x ${e.target.value}`;
  return grid(e.target.value);
});

random.addEventListener("click", () => (randomClicked = true));

grid(16);
