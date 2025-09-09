let currentLevelIndex = 0; // Tracks the index of the current level in the predefined levels array
let playerPosition = { x: 0, y: 0 };
let currentMaze = []; // Holds the currently active maze

const mazeContainer = document.getElementById('maze-container');
const mazeStatus = document.getElementById('maze-status');

const predefinedLevels = [
    // Level 1: Easy
    {
        maze: [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 5, y: 5 }
    },
    // Level 2: Easy
    {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 6, y: 5 }
    },
    // Level 3: Normal
    {
         maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 7, y: 7 }
    },
    // Level 4: Normal
     {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 8, y: 8 }
    },
    // Level 5: Hard
     {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 9, y: 9 }
    },
    // Level 6: Hard
     {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 10, y: 10 }
    },
    // Level 7: Hell
     {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 11, y: 11 }
    },
    // Level 8: Hell
     {
        maze: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        start: { x: 1, y: 1 },
        exit: { x: 12, y: 12 }
    }
];

function renderMaze() {
    mazeContainer.innerHTML = ''; // Clear previous maze
    const level = predefinedLevels[currentLevelIndex];
    currentMaze = level.maze; // Set the current maze to the selected predefined level
    mazeContainer.style.gridTemplateColumns = `repeat(${currentMaze[0].length}, 30px)`; // Adjust grid columns based on maze width

    for (let y = 0; y < currentMaze.length; y++) {
        for (let x = 0; x < currentMaze[y].length; x++) {
            const cell = document.createElement('div');
            cell.classList.add('maze-cell');
            if (currentMaze[y][x] === 1) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('path');
            }

            if (x === playerPosition.x && y === playerPosition.y) {
                cell.classList.add('player');
            }

            if (x === level.exit.x && y === level.exit.y) {
                cell.classList.add('exit');
            }

            mazeContainer.appendChild(cell);
        }
    }
}

function movePlayer(dx, dy) {
    const newPlayerPosition = { x: playerPosition.x + dx, y: playerPosition.y + dy };
    const maze = currentMaze; // Use the current loaded maze

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
    const currentLevelData = predefinedLevels[currentLevelIndex];
    if (playerPosition.x === currentLevelData.exit.x && playerPosition.y === currentLevelData.exit.y) {
        if (currentLevelIndex < predefinedLevels.length - 1) {
            currentLevelIndex++; // Move to the next predefined level
            const nextLevelData = predefinedLevels[currentLevelIndex];
            playerPosition = { ...nextLevelData.start }; // Set player position to the start of the next level
            mazeStatus.innerText = `Level ${currentLevelIndex + 1} started!`;
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
    currentLevelIndex = 0; // Start from the first predefined level
    const initialLevelData = predefinedLevels[currentLevelIndex];
    currentMaze = initialLevelData.maze;
    playerPosition = { ...initialLevelData.start }; // Set player position to the start of the first level

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
