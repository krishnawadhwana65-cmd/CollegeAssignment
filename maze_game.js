let currentLevel = 0;
let playerPosition = { x: 0, y: 0 };
const mazeContainer = document.getElementById('maze-container');
const mazeStatus = document.getElementById('maze-status');

const levels = [
    [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ]
];

const startPositions = [
    { x: 1, y: 1 },
    { x: 1, y: 1 }
];

const exitPositions = [
    { x: 5, y: 5 },
    { x: 6, y: 5 }
];

function renderMaze() {
    mazeContainer.innerHTML = ''; // Clear previous maze
    const maze = levels[currentLevel];
    mazeContainer.style.gridTemplateColumns = `repeat(${maze[0].length}, 30px)`; // Adjust grid columns based on maze width

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

            if (x === exitPositions[currentLevel].x && y === exitPositions[currentLevel].y) {
                cell.classList.add('exit');
            }

            mazeContainer.appendChild(cell);
        }
    }
}

function movePlayer(dx, dy) {
    const newPlayerPosition = { x: playerPosition.x + dx, y: playerPosition.y + dy };
    const maze = levels[currentLevel];

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
    if (playerPosition.x === exitPositions[currentLevel].x && playerPosition.y === exitPositions[currentLevel].y) {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            playerPosition = { ...startPositions[currentLevel] };
            mazeStatus.innerText = `Level ${currentLevel + 1} started!`;
            renderMaze();
        } else {
            mazeStatus.innerText = 'You won the maze game!';
            // Optionally disable movement or show a final message/button
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
    currentLevel = 0;
    playerPosition = { ...startPositions[currentLevel] };
    mazeStatus.innerText = '';
    renderMaze();

    // Add touch event listeners to the maze container
    mazeContainer.addEventListener('touchstart', handleTouchStart, false);
    mazeContainer.addEventListener('touchmove', handleTouchMove, false);
    mazeContainer.addEventListener('touchend', handleTouchEnd, false);
}
