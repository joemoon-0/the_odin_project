let gridSize    = 16;       // default start size
const maxGrid   = 100;
let rainbowMode = false;

const clear     = document.getElementById("clearGrid");
const rainbow   = document.getElementById("rainbow");
const resize    = document.getElementById("resize");
const sketch    = document.getElementById('sketch');
const wrapper   = document.getElementById('wrapper');

const clearGrid = () => {
    sketch.innerHTML = "";
};

const createGrid = () => {
    clearGrid();

    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("div");
        row.classList.add("grid-row");
        for (let i = 0; i < gridSize; i++) {
            const grid = document.createElement("div");
            grid.classList.add("grid");
            row.appendChild(grid);
        }
        sketch.appendChild(row);
    }

    // Grid event listener
    const gridSpace = document.querySelectorAll(".grid");
    gridSpace.forEach(grid => grid.addEventListener('mouseover', highlight));
};

function highlight() {
    if (rainbowMode) {
        this.style.backgroundColor = `hsl(${randomColorValue()}, ${randomColorPercent()}%, ${randomColorPercent()}%)`;
    }
    else {
        this.style.backgroundColor = "#000";
    }
};

const randomColorValue = () => {
    return Math.floor(Math.random() * 255);
};

const randomColorPercent = () => {
    return Math.floor(Math.random() * 100);
};

const resizeGrid = () => {
    do {
        gridSize = window.prompt("Enter a new grid size (max 100):");
    } while (gridSize > maxGrid)
    createGrid();
};

const toggleRainbow = () => {
    rainbowMode ? rainbowMode = false : rainbowMode = true;
};

const main = () => {
    createGrid();
};

main();

// Event Listeners
clear.addEventListener("click", createGrid);
rainbow.addEventListener("click", toggleRainbow);
resize.addEventListener("click", resizeGrid);
