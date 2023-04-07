function lookForMouse() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.addEventListener("mouseleave", () => {
      const currentColor = square.style.backgroundColor;
      if (currentColor === "") {
        // Set initial color to white
        square.style.backgroundColor = "rgb(255, 255, 255)";
      } else {
        // Extract current RGB values
        const [red, green, blue] = currentColor
          .slice(4, -1)
          .split(",")
          .map((val) => Number(val.trim()));

        if (red === 0 && green === 0 && blue === 0) {
          // Square is already completely black, do nothing
        } else if (red <= 25 && green <= 25 && blue <= 25) {
          // Increase black component to 100%
          square.style.backgroundColor = "black";
        } else {
          // Add 10% black to current color
          const newRed = Math.max(red - 25, 0);
          const newGreen = Math.max(green - 25, 0);
          const newBlue = Math.max(blue - 25, 0);
          square.style.backgroundColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
        }
      }
    });
  });
}

const board = document.querySelector("#board");
const columnsInput = document.getElementById("columns-input");
const columns = columnsInput.value || 16;
board.style.setProperty("--columns", columns);

for (let i = 0; i < columns * columns; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  board.appendChild(square);
}
lookForMouse();

columnsInput.addEventListener("input", () => {
  const newColumns = columnsInput.value;
  board.style.setProperty("--columns", newColumns);
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
  for (let i = 0; i < newColumns * newColumns; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    board.appendChild(square);
  }

  lookForMouse();
});
