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

console.log("dino_game.js loaded"); // Log script load

function initializeDinoGame() {
    console.log("initializeDinoGame called"); // Log function call

    // Clear previous game elements if any
    if (dinoGame) {
        dinoGame.innerHTML = '';
        console.log("dinoGame innerHTML cleared."); // Log element clear

        // Add score and game over elements back
        if (dinoScoreElement) dinoGame.appendChild(dinoScoreElement);
        else console.error("Error: dinoScoreElement not found."); // Log error if element is missing

        if (dinoGameOverElement) dinoGame.appendChild(dinoGameOverElement);
         else console.error("Error: dinoGameOverElement not found."); // Log error if element is missing

        console.log("Score and Game Over elements re-appended."); // Log re-append
    } else {
        console.error("Error: dinoGame element not found in initializeDinoGame."); // Log error if element is missing
        return; // Cannot proceed without the game area
    }


    // Set up game area size
    // For mobile, we might want to adjust this or scale
    // For simplicity, let's use fixed dimensions for now and center it with CSS
    if (dinoGame) {
        gameAreaWidth = dinoGame.clientWidth; // Use the container width
        gameAreaHeight = dinoGame.clientHeight; // Use the container height
         console.log(`Game Area dimensions: ${gameAreaWidth}x${gameAreaHeight}`); // Log dimensions
    }


    // Create Dino element
    dino = document.createElement('div');
    dino.id = 'dino';
    dino.style.position = 'absolute';
    dino.style.left = '50px';
    dino.style.width = '40px';
    dino.style.height = '80px';
    dino.style.backgroundColor = 'green';
    dino.style.bottom = `${dinoBottom}px`; // Initial position at the bottom

    if (dinoGame) {
         dinoGame.appendChild(dino);
         console.log("Dino element created and appended."); // Log dino creation
    } else {
         console.error("Error: dinoGame element not found when appending dino."); // Log error if element is missing
    }


    obstacles = [];
    score = 0;
    gameOver = false;
    isJumping = false;
    yVelocity = 0;
    dinoBottom = 0;
    gameSpeed = 5; // Reset game speed

    if (dinoScoreElement) {
        dinoScoreElement.innerText = 'Score: 0';
         console.log("Score reset."); // Log score reset
    } else {
        console.error("Error: dinoScoreElement not found when resetting score."); // Log error if element is missing
    }


    if (dinoGameOverElement) {
        dinoGameOverElement.style.display = 'none';
         console.log("Game Over message hidden."); // Log game over hide
    } else {
         console.error("Error: dinoGameOverElement not found when hiding game over."); // Log error if element is missing
    }


    // Add touch event listener to the game area
    if (dinoGame) {
        dinoGame.removeEventListener('touchstart', handleTouch); // Prevent multiple listeners
        dinoGame.removeEventListener('mousedown', handleTouch); // Prevent multiple listeners
        dinoGame.addEventListener('touchstart', handleTouch);
        dinoGame.addEventListener('mousedown', handleTouch); // Also add mousedown for testing on desktop
         console.log("Touch and mousedown listeners added to dinoGame."); // Log listeners added
    } else {
        console.error("Error: dinoGame element not found when adding event listeners."); // Log error if element is missing
    }


    // Start the game loop
    console.log("Starting game loop..."); // Log game loop start
    gameLoop();

    // Start generating obstacles
    console.log("Starting obstacle generation..."); // Log obstacle generation start
    generateObstacle();
}

function handleTouch(event) {
     console.log("handleTouch called."); // Log function call
    if (!gameOver && !isJumping) {
        console.log("Starting jump."); // Log jump start
        startJump();
    }
     // Prevent default to avoid scrolling on touch devices
    event.preventDefault();
}

function startJump() {
    isJumping = true;
    yVelocity = jumpHeight;
     console.log("Jump started. yVelocity:", yVelocity); // Log jump start
}

function applyGravity() {
    if (isJumping) {
        dinoBottom += yVelocity;
        yVelocity -= gravity;

        if (dinoBottom < 0) {
            dinoBottom = 0;
            isJumping = false;
            yVelocity = 0;
            console.log("Landed. dinoBottom:", dinoBottom); // Log landing
        }
        if (dino) {
            dino.style.bottom = `${dinoBottom}px`;
        } else {
            console.error("Error: dino element not found in applyGravity."); // Log error if element is missing
        }
    }
}

function generateObstacle() {
    if (gameOver) {
        console.log("Game over, stopping obstacle generation."); // Log stop generation
        return;
    }

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.right = '0px'; // Start from the right edge

    if (dinoGame) {
         dinoGame.appendChild(obstacle);
         console.log("Obstacle created and appended."); // Log obstacle creation
    } else {
        console.error("Error: dinoGame element not found when appending obstacle."); // Log error if element is missing
    }


    obstacles.push(obstacle);
    console.log("Obstacles array:", obstacles.length); // Log obstacles array size

    // Generate next obstacle after a random delay
    const randomTime = Math.random() * 2000 + 1000; // Between 1 and 3 seconds
    setTimeout(generateObstacle, randomTime);
     console.log(`Next obstacle in ${randomTime}ms.`); // Log next obstacle time
}

function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        let obstacleRight = parseInt(obstacle.style.right);
        obstacle.style.right = `${obstacleRight + gameSpeed}px`;
         // console.log(`Obstacle ${index} right position: ${obstacle.style.right}`); // Log obstacle position (can be chatty)


        // Remove obstacle if it moves off screen
        if (obstacleRight + obstacle.clientWidth > gameAreaWidth) {
             console.log(`Removing obstacle ${index}. Passed.`); // Log obstacle removal
            obstacle.remove();
            obstacles.splice(index, 1);
            score++; // Increase score when an obstacle is passed
            if (dinoScoreElement) {
                dinoScoreElement.innerText = `Score: ${score}`;
                 console.log("Score:", score); // Log score update
            } else {
                console.error("Error: dinoScoreElement not found in moveObstacles."); // Log error if element is missing
            }


            // Increase game speed gradually
            if (score % 10 === 0) { // Increase speed every 10 points
                gameSpeed += 0.5;
                console.log("Game speed increased:", gameSpeed); // Log speed increase
            }
        }

        // Check for collision
        if (dino && obstacle) { // Ensure elements exist before checking collision
             checkCollision(dino, obstacle);
        } else {
             console.error("Error: dino or obstacle element not found during collision check."); // Log error if element is missing
        }

    });
}

function checkCollision(dinoElement, obstacleElement) {
    // Get the bounding rectangles of the elements
    const dinoRect = dinoElement.getBoundingClientRect();
    const obstacleRect = obstacleElement.getBoundingClientRect();
    const gameAreaRect = dinoGame.getBoundingClientRect();

    // Adjust obstacleRect relative to the game area for more accurate bottom check
    // This part might be tricky depending on CSS positioning. Let's simplify to basic overlap check first.

    // Basic AABB collision detection
    const collision = !(
        dinoRect.bottom < obstacleRect.top ||
        dinoRect.top > obstacleRect.bottom ||
        dinoRect.right < obstacleRect.left ||
        dinoRect.left > obstacleRect.right
    );


    if (collision) {
        console.log("Collision detected!"); // Log collision
        endGame();
    }
}


function endGame() {
    gameOver = true;
     console.log("Game Over!"); // Log game over
    if (dinoGameOverElement) {
        dinoGameOverElement.style.display = 'block';
    } else {
         console.error("Error: dinoGameOverElement not found in endGame."); // Log error if element is missing
    }

    gameSpeed = 0; // Stop game movement
    // Optionally remove event listeners or add a restart button
     if (dinoGame) {
        dinoGame.removeEventListener('touchstart', handleTouch);
        dinoGame.removeEventListener('mousedown', handleTouch);
         console.log("Event listeners removed."); // Log listener removal
     } else {
         console.error("Error: dinoGame element not found when removing event listeners in endGame."); // Log error if element is missing
     }

}


function gameLoop() {
    if (gameOver) return;

    applyGravity();
    moveObstacles();

    requestAnimationFrame(gameLoop);
}

// initializeDinoGame will be called from index.html
