const container = document.querySelector(".container");

function grid(n) {
  container.style.gridTemplateColumns = `repeat(${n},1fr)`;
  for (let i = 0; i < n * n; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);
  }
}

function etch(e) {
  e.target.style.backgroundColor = "black";
}

container.addEventListener("mousedown", (e) =>
  container.addEventListener("mouseover", etch)
);

container.addEventListener("mouseup", (e) =>
  container.removeEventListener("mouseover", etch)
);

grid(16);
