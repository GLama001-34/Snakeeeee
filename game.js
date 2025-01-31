
let canvas = document.getElementById('sf');
let ctx = canvas.getContext('2d');
let rows = 20;
let cols = 20;
let snake = [{ x:20, y:3}];
let food;
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let lastDirection = '';
let foodCollected = false;


placeFood();

setInterval(gameLoop, 200);
document.addEventListener('keydown', keyDown);

draw();

function draw() {
    ctx.fillStyle = 'rgb(5, 5, 5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgb(0, 200, 50)';


    snake.forEach(part => add(part.x, part.y));

    ctx.fillStyle = 'rgb(200, 20,20)';
    add(food.x, food.y); // Food

    requestAnimationFrame(draw);
}

function testGameover() {
    
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

    // 1. schlange läuft gegen wand
    if(snake[0].x < 0 ||
       snake[0].x > cols - 1 ||
       snake[0].y < 0 ||
       snake[0].y > rows - 1 ||
       duplicatePart
    ) {
        placeFood();
        snake = [{ x:20, y:3}];
        direction = 'LEFT';
    }

}


function placeFood() {
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);


    food = {
        x: randomX,
        y: randomY
    };
}

function add(x, y) {
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 2.5, cellHeight - 2.5);
}

function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;

    }
}

function gameLoop() {
    testGameover()
    if (foodCollected) {
        snake = [{
        x: snake[0].x,
        y: snake[0].y
        }, ...snake ];

        foodCollected = false;
    }

    shiftSnake();

    

        if (direction == 'UP'){
            snake[0].y--;
        }

        if (direction == 'LEFT'){
            snake[0].x--;
        }

        if (direction == 'DOWN'){
            snake[0].y++;
        }

        if (direction == 'RIGHT'){
            snake[0].x++;
        }
   
    lastDirection = direction;

    if(snake[0].x == food.x &&
        snake[0].y == food.y) {
            foodCollected = true;

            placeFood();
    }

}

function keyDown(e) {

    
    if (e.keyCode == 87) {
        direction = 'UP';
    }
    if (e.keyCode == 65) {
        direction = 'LEFT';
    }
    if (e.keyCode == 83) {
        direction = 'DOWN';
    }
    if (e.keyCode == 68) {
        direction = 'RIGHT';
    }

    if ((direction == 'UP' && lastDirection == 'DOWN') || 
        (direction == 'DOWN' && lastDirection == 'UP') || 
        (direction == 'LEFT' && lastDirection == 'RIGHT') || 
        (direction == 'RIGHT' && lastDirection == 'LEFT')) {

            direction = lastDirection;
        }


    }


