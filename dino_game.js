const dinoGame = document.getElementById('dino-game');
const dinoScoreElement = document.getElementById('dino-score');
const dinoGameOverElement = document.getElementById('dino-game-over');

let gameAreaWidth = 600;
let gameAreaHeight = 200; // Standard Dino game height

let dino;
let obstacles = [];
let gameSpeed = 5;
let score = 0;
let gameOver = false;
let isJumping = false;
let jumpHeight = 15;
let gravity = 0.9;
let yVelocity = 0;
let dinoBottom = 0; // Dino's vertical position from the bottom

function initializeDinoGame() {
    // Clear previous game elements if any
    dinoGame.innerHTML = '';

    // Add score and game over elements back
    dinoGame.appendChild(dinoScoreElement);
    dinoGame.appendChild(dinoGameOverElement);

    // Set up game area size
    // For mobile, we might want to adjust this or scale
    // For simplicity, let's use fixed dimensions for now and center it with CSS
    gameAreaWidth = dinoGame.clientWidth; // Use the container width
    gameAreaHeight = dinoGame.clientHeight; // Use the container height

    // Create Dino element
    dino = document.createElement('div');
    dino.id = 'dino';
    dino.style.position = 'absolute';
    dino.style.left = '50px';
    dino.style.width = '40px';
    dino.style.height = '80px';
    dino.style.backgroundColor = 'green';
    dino.style.bottom = `${dinoBottom}px`; // Initial position at the bottom
    dinoGame.appendChild(dino);


    obstacles = [];
    score = 0;
    gameOver = false;
    isJumping = false;
    yVelocity = 0;
    dinoBottom = 0;
    gameSpeed = 5; // Reset game speed
    dinoScoreElement.innerText = 'Score: 0';
    dinoGameOverElement.style.display = 'none';

    // Add touch event listener to the game area
    dinoGame.addEventListener('touchstart', handleTouch);
    dinoGame.addEventListener('mousedown', handleTouch); // Also add mousedown for testing on desktop

    // Start the game loop
    gameLoop();

    // Start generating obstacles
    generateObstacle();
}

function handleTouch(event) {
    if (!gameOver && !isJumping) {
        startJump();
    }
     // Prevent default to avoid scrolling on touch devices
    event.preventDefault();
}

function startJump() {
    isJumping = true;
    yVelocity = jumpHeight;
}

function applyGravity() {
    if (isJumping) {
        dinoBottom += yVelocity;
        yVelocity -= gravity;

        if (dinoBottom < 0) {
            dinoBottom = 0;
            isJumping = false;
            yVelocity = 0;
        }
        dino.style.bottom = `${dinoBottom}px`;
    }
}

function generateObstacle() {
    if (gameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.right = '0px'; // Start from the right edge
    dinoGame.appendChild(obstacle);

    obstacles.push(obstacle);

    // Generate next obstacle after a random delay
    const randomTime = Math.random() * 2000 + 1000; // Between 1 and 3 seconds
    setTimeout(generateObstacle, randomTime);
}

function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        let obstacleRight = parseInt(obstacle.style.right);
        obstacle.style.right = `${obstacleRight + gameSpeed}px`;

        // Remove obstacle if it moves off screen
        if (obstacleRight + obstacle.clientWidth > gameAreaWidth) {
            obstacle.remove();
            obstacles.splice(index, 1);
            score++; // Increase score when an obstacle is passed
            dinoScoreElement.innerText = `Score: ${score}`;

            // Increase game speed gradually
            if (score % 10 === 0) { // Increase speed every 10 points
                gameSpeed += 0.5;
            }
        }

        // Check for collision
        checkCollision(dino, obstacle);
    });
}

function checkCollision(dinoElement, obstacleElement) {
    // Get the bounding rectangles of the elements
    const dinoRect = dinoElement.getBoundingClientRect();
    const obstacleRect = obstacleElement.getBoundingClientRect();
    const gameAreaRect = dinoGame.getBoundingClientRect();

    // Adjust obstacleRect relative to the game area for more accurate bottom check
    const obstacleBottom = gameAreaRect.bottom - obstacleRect.bottom;

    // Check for overlap
    if (
        dinoRect.left < obstacleRect.left + obstacleRect.width &&
        dinoRect.left + dinoRect.width > obstacleRect.left &&
        dinoBottom < obstacleBottom + obstacleRect.height && // Use adjusted bottom position
        dinoBottom + dinoRect.height > obstacleBottom
    ) {
        // Collision detected
        endGame();
    }
}


function endGame() {
    gameOver = true;
    dinoGameOverElement.style.display = 'block';
    gameSpeed = 0; // Stop game movement
    // Optionally remove event listeners or add a restart button
    dinoGame.removeEventListener('touchstart', handleTouch);
    dinoGame.removeEventListener('mousedown', handleTouch);
}


function gameLoop() {
    if (gameOver) return;

    applyGravity();
    moveObstacles();

    requestAnimationFrame(gameLoop);
}

// initializeDinoGame will be called from index.html
