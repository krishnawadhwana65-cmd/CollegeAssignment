let currentLevel = 0; // Tracks number of generated levels
let playerPosition = { x: 0, y: 0 };
let currentMaze = []; // Holds the currently active maze

const mazeContainer = document.getElementById('maze-container');
const mazeStatus = document.getElementById('maze-status');

// Function to generate a random maze using Recursive Backtracking
function generateRandomMaze(width, height) {
    // Ensure dimensions are odd for easier generation
    width = width % 2 === 0 ? width + 1 : width;
    height = height % 2 === 0 ? height + 1 : height;

    const maze = Array.from({ length: height }, () => Array(width).fill(1)); // Initialize with walls

    function isValid(x, y) {
        return x > 0 && x < width - 1 && y > 0 && y < height - 1;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function carvePassages(cx, cy) {
        const directions = shuffle([
            [0, -2], // Up
            [0, 2],  // Down
            [-2, 0], // Left
            [2, 0]   // Right
        ]);

        for (const [dx, dy] of directions) {
            const nx = cx + dx;
            const ny = cy + dy;

            if (isValid(nx, ny) && maze[ny][nx] === 1) {
                maze[cy + dy / 2][cx + dx / 2] = 0; // Carve path between cells
                maze[ny][nx] = 0; // Carve current cell
                carvePassages(nx, ny); // Recurse
            }
        }
    }

    // Start carving from a random odd cell (ensure it's within bounds for recursion start)
    const startX = Math.floor(Math.random() * ((width - 2) / 2)) * 2 + 1;
    const startY = Math.floor(Math.random() * ((height - 2) / 2)) * 2 + 1;
    maze[startY][startX] = 0;
    carvePassages(startX, startY);


    // Set a clear start and exit (adjust if needed based on algorithm's output)
    // Ensure start (1,1) and exit (width-2, height-2) are within path cells after carving
     if (maze[1][1] === 1) {
         // If start is a wall, find the nearest path cell to make it the start.
         // For simplicity, force it to be a path if it's a wall after carving.
         maze[1][1] = 0;
     }

     if (maze[height - 2][width - 2] === 1) {
         // If exit is a wall, force it to be a path.
         maze[height - 2][width - 2] = 0;
     }


    return maze;
}


function renderMaze() {
    mazeContainer.innerHTML = ''; // Clear previous maze
    const maze = currentMaze; // Use the current generated maze
    mazeContainer.style.gridTemplateColumns = `repeat(${maze[0].length}, 30px)`; // Adjust grid columns based on maze width

    // Determine exit position for rendering
    const exitX = maze[0].length - 2;
    const exitY = maze.length - 2;

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            const cell = document.createElement('div');
            cell.classList.add('maze-cell');
            if (maze[y][x] === 1) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('path');
            }

            if (x === playerPosition.x && y === playerPosition.y) {
                cell.classList.add('player');
            }

            // Use dynamically determined exit
            if (x === exitX && y === exitY) {
                cell.classList.add('exit');
            }

            mazeContainer.appendChild(cell);
        }
    }
}

function movePlayer(dx, dy) {
    const newPlayerPosition = { x: playerPosition.x + dx, y: playerPosition.y + dy };
    const maze = currentMaze; // Use the current generated maze

    // Check boundaries
    if (newPlayerPosition.y < 0 || newPlayerPosition.y >= maze.length ||
        newPlayerPosition.x < 0 || newPlayerPosition.x >= maze[0].length) {
        return;
    }

    // Check for wall collision
    if (maze[newPlayerPosition.y][newPlayerPosition.x] === 1) {
        return;
    }

    playerPosition = newPlayerPosition;
    renderMaze();
    checkWin();
}

function checkWin() {
    const exitX = currentMaze[0].length - 2;
    const exitY = currentMaze.length - 2;

    if (playerPosition.x === exitX && playerPosition.y === exitY) {
        currentLevel++; // Increment generated level count
        if (currentLevel < 5) { // Play 5 random levels (adjust as needed)
            mazeStatus.innerText = `Level ${currentLevel + 1} started!`;
            // Generate a new random maze (adjust size for difficulty increase)
            const newMazeWidth = 7 + currentLevel * 2; // Increase size
            const newMazeHeight = 7 + currentLevel * 2; // Increase size
            currentMaze = generateRandomMaze(newMazeWidth, newMazeHeight);
            playerPosition = { x: 1, y: 1 }; // Reset player position to start of new maze
            renderMaze();
        } else {
            mazeStatus.innerText = 'You won the maze game!';
            // Optionally disable movement or show a final message/button
             // Remove touch event listeners
            if (mazeContainer) {
                mazeContainer.removeEventListener('touchstart', handleTouchStart, false);
                mazeContainer.removeEventListener('touchmove', handleTouchMove, false);
                mazeContainer.removeEventListener('touchend', handleTouchEnd, false);
            }
        }
    }
}


let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    // Prevent scrolling while swiping
    event.preventDefault();
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    // Determine swipe direction based on the larger movement
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0) {
            movePlayer(1, 0); // Swipe right
        } else {
            movePlayer(-1, 0); // Swipe left
        }
    } else {
        // Vertical swipe
        if (dy > 0) {
            movePlayer(0, 1); // Swipe down
        } else {
            movePlayer(0, -1); // Swipe up
        }
    }
}


function initializeMazeGame() {
    // Generate the first random maze
    const initialMazeWidth = 7;
    const initialMazeHeight = 7;
    currentMaze = generateRandomMaze(initialMazeWidth, initialMazeHeight);

    playerPosition = { x: 1, y: 1 }; // Start position for generated mazes
    mazeStatus.innerText = '';
    renderMaze();

    // Add touch event listeners to the maze container
    // Remove existing listeners first to prevent duplicates if initialize is called multiple times
    if (mazeContainer) {
        mazeContainer.removeEventListener('touchstart', handleTouchStart, false);
        mazeContainer.removeEventListener('touchmove', handleTouchMove, false);
        mazeContainer.removeEventListener('touchend', handleTouchEnd, false);

        mazeContainer.addEventListener('touchstart', handleTouchStart, false);
        mazeContainer.addEventListener('touchmove', handleTouchMove, false);
        mazeContainer.addEventListener('touchend', handleTouchEnd, false);
    } else {
        console.error("Maze container element not found.");
    }
}
