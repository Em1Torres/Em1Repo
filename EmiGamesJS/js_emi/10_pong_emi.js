/*
 * Basic implementation of the PONG
 *
 * Gilberto Echeverria
 * 2025-03-13
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

let playerSpeed = 0.1


// Class for the game ball
class Ball extends GameObject{
    constructor(position,width,height,color,sheetCols){
        super(position, width, height, color, "paddle", sheetCols);
        this.velocity = new Vector(0,0);
    }

    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime/1000));
        
    }

    reset(){
        this.position = new Vector(canvasWidth/2, canvasHeight/2);
        this.velocity = new Vector(0,0);

    }

    serve(){
        let angle = Math.random() * Math.PI / 2 - (Math.PI/4);
        let speed = 275;
        this.velocity.x = Math.cos(angle)*speed;
        this.velocity.y = Math.sin(angle)*speed;

        if(Math.random() > 0.5){
            this.velocity = this.velocity.times(-1);
        }
    }
}

// Class for the main character in the game
class Player extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vector(0, 0);

        this.motion = {
            up: {
                axis: "y",
                sign: -1,
            },
           
            down: {
                axis: "y",
                sign: 1,
            }
            
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    update(deltaTime) {
        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;
        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }
        // TODO: Normalize the velocity to avoid greater speed on diagonals

        this.position = this.position.plus(this.velocity.times(deltaTime));

        this.clampWithinCanvas();
    }

    clampWithinCanvas() {
        // Top border
        if (this.position.y - this.halfSize.y < 0) {
            this.position.y = this.halfSize.y;
        // Left border
        }
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        // Bottom border
        }
        if (this.position.y + this.halfSize.y > canvasHeight) {
            this.position.y = canvasHeight - this.halfSize.y;
        // Right border
        }
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.pointsRight = 0;
        this.pointsLeft = 0;
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets_emi/sprites/trak2_plate2b.png");

        this.player = new Player(new Vector(50, canvasHeight / 2), 50, 200, "red");
        this.player2 = new Player(new Vector(canvasWidth-50, canvasHeight / 2), 50, 200, "blue");
        //this.player.setSprite("../assets/sprites/blordrough_quartermaster-NESW.png.", new Rect( 48,64*2,48,64));

        this.ball = new Ball(new Vector(canvasWidth/2, canvasHeight/2),30,30, "green");

        this.goalLeft = new GameObject(new Vector(0, canvasHeight/2),20,canvasHeight,"purple");
        this.goalRight = new GameObject(new Vector(canvasWidth, canvasHeight/2),20,canvasHeight,"purple");

        this.upperWall = new GameObject(new Vector(canvasWidth/2, 0),canvasWidth,20,"yellow");
        this.lowerWall = new GameObject(new Vector(canvasWidth/2, canvasHeight),canvasWidth,20,"yellow");

        this.pointsTextLeft = new TextLabel(canvasWidth/4,80,"50px Ubuntu Mono","white");
        this.pointsTextRight = new TextLabel(canvasWidth/4*3,80,"50px Ubuntu Mono","white");

    }

    draw(ctx) {
        // Draw the background first, so everything else is drawn on top
        this.background.draw(ctx);
        this.player.draw(ctx);
        this.player2.draw(ctx);
        this.goalLeft.draw(ctx);
        this.goalRight.draw(ctx);
        this.pointsTextLeft.draw(ctx, this.pointsLeft);
        this.pointsTextRight.draw(ctx, this.pointsRight);
        this.upperWall.draw(ctx);
        this.lowerWall.draw(ctx);
        this.ball.draw(ctx);
    }

    update(deltaTime) {
        // Move the player
        this.player.update(deltaTime);
        this.player2.update(deltaTime);
        this.ball.update(deltaTime);

        if(boxOverlap(this.ball,this.player)){
                this.ball.velocity.x = this.ball.velocity.x*-1;
                this.ball.velocity = this.ball.velocity.times(1.1);
        }

        if(boxOverlap(this.ball,this.player2)){
                this.ball.velocity.x = this.ball.velocity.x*-1;
                this.ball.velocity = this.ball.velocity.times(1.1);
        }

        if(boxOverlap(this.ball,this.goalLeft)){
                this.pointsRight = this.pointsRight + 1;
                this.ball.reset();
        }

        if(boxOverlap(this.ball,this.goalRight)){
                this.pointsLeft = this.pointsLeft + 1;
                this.ball.reset();
                
        }

        if(boxOverlap(this.ball,this.upperWall)){
                this.ball.velocity.y = this.ball.velocity.y*-1;
                this.ball.velocity = this.ball.velocity.times(1.1);
        }

        if(boxOverlap(this.ball,this.lowerWall)){
                this.ball.velocity.y = this.ball.velocity.y*-1;
                this.ball.velocity = this.ball.velocity.times(1.1);
        }

        

        
            
        

        // Check collision against other objects
        // for (let actor of this.actors) {
        //     if (boxOverlap(this.player, actor)) {
        //         //actor.color = "yellow";
        //         actor.setSprite("../assets_emi/sprites/RTS_Crate_red.png")
        //     } else {
        //         //actor.color = "grey";
        //         actor.setSprite("../assets_emi/sprites/RTS_Crate.png")
        //     }
        // }
    }

    // addBox() {
    //     // TODO: Use the randomRange function to make these values different
    //     // Create boxes with minimum size 50, and up to 50 pixels more
    //     const size = randomRange(50, 50);
    //     // Define a random position for the box, within the canvas
    //     const posX = randomRange(canvasWidth);
    //     const posY = randomRange(canvasHeight);
    //     const box = new GameObject(new Vector(posX, posY), size, size, "grey");
    //     box.setSprite("../assets_emi/sprites/RTS_Crate.png")
    //     // Set a property to indicate if the box should be destroyed or not
    //     box.destroy = false;
    //     this.actors.push(box);
    // }

    createEventListeners() {
        window.addEventListener('keydown', (event) => {
            if (event.key == 'w') {
                this.addKey('up',this.player);
            } else if (event.key == 's') {
                this.addKey('down',this.player);
            } else if (event.key == 'o') {
                this.addKey('up',this.player2);
            } else if (event.key == 'l') {
                this.addKey('down', this.player2);
            }

            if(event.key == " "){
                if(this.ball.velocity.x == 0 && this.ball.velocity.y == 0){
                    this.ball.serve();
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.key == 'w') {
                this.delKey('up',this.player);
            } else if (event.key == 's') {
                this.delKey('down', this.player);
            } else if (event.key == 'o') {
                this.delKey('up', this.player2);
            } else if (event.key == 'l') {
                this.delKey('down', this.player2);
            }
        });
    }

    addKey(direction,paddle) {
        if (!paddle.keys.includes(direction)) {
            paddle.keys.push(direction);
        }
    }

    delKey(direction,paddle) {
        if (paddle.keys.includes(direction)) {
            paddle.keys.splice(paddle.keys.indexOf(direction), 1);
        }
    }
}


// Starting function that will be called from the HTML page
function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {
    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    game.update(deltaTime);

    game.draw(ctx);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
