const canvas = document.querySelector(".canvas");
const colorWell = document.querySelector("#colorWell");

let color = "black";

function grid(n) {
  canvas.style.gridTemplateColumns = `repeat(${n},1fr)`;
  for (let i = 0; i < n * n; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    canvas.appendChild(square);
  }
}

function etch(e) {
  return (e.target.style.backgroundColor = color);
}

colorWell.addEventListener("input", (e) => (color = e.target.value));
canvas.addEventListener("mousedown", etch);
canvas.addEventListener("mousedown", () =>
  canvas.addEventListener("mouseover", etch)
);

canvas.addEventListener("mouseup", () =>
  canvas.removeEventListener("mouseover", etch)
);

grid(64);
