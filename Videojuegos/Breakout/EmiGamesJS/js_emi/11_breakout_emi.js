/*
 * Basic implementation of the Breakout
 *
 * Emilio Torres Castillo
 * 2026-03-23
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
        this.position = this.position.plus(this.velocity.times(deltaTime/1000));   //Dividimos deltaTime para pasar a segundos y que la velocidad no sea demasiada
        
    }

    reset(){
        this.position = new Vector(canvasWidth/2, canvasHeight-70);
        this.velocity = new Vector(0,0);

        //Este metodo resetea la posicion de la pelotitia a las coordenandas del vector
        //y la pone en repose poniendo los valores de su velocidad en 0

    }
    serve(){
        let angle = Math.random() * ( Math.PI/2) + (Math.PI/4);  //Genera un angulo random del lanzamiento de la pelota
        let speed = 300; //multiplicamos por un factor más grande ya que está en segundos el tiempo
        this.velocity.x = Math.cos(angle)*speed;  //velocidad en x, mangitud * coseno
        this.velocity.y = -Math.sin(angle)*speed; //velocidad en y, magnitud * seno
        //Este metodo funcionara para inicializar el movimiento de la pelotita
    }
}

// Class for the main character in the game
class Player extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vector(0, 0);

        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
           
            right: {
                axis: "x",
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

//Básicamente hice herencia de GameObject y hace lo mismo pero tiene un atributo extra de 
// contador de vida y un método para poder reducir el contador de vida
class hitPointGameObject extends GameObject{
    constructor(position, width, height, color, type, hitPoints) { //El nuevo constructor recibirá un atributo extra
        super(position, width, height, color, type);  //Llamamos constructor de GameObject
        this.hitPoints = hitPoints;  //Definimos atributo extra
    }

    //Metodo para hacerle daño
    damage(){
        this.hitPoints = this.hitPoints-1;  //reduces 1
        if(this.hitPoints < 0){  //Asegurarnos que el valor del contador no sea menor de 0
            this.hitPoints = 0;
        }
        
    }

}


// Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.createEventListeners();
        this.initObjects();

        this.hitPoints = 3;  //Vida del jugador
        this.gameWon = false;  //Boolean para checar si ya pasó la pantalla de gameWon
        this.levelCount = 1; //Contador de niveles
        this.level2Active = false; //Boolean para checar si ya pasó la pantalla de level 2
        this.level3Active = false; //Boolean para checar si ya pasó la pantalla de level 3
        this.gameOverDipslay = 'GAME OVER: Type 1 to restart';
        this.gameWonDisplay = 'GAME WON: Type 1 to restart';     //Displays que se ponen en cada pantalla
        this.level2Display = 'Level 2: Type 2 to continue';
        this.level3Display = 'Level 3: Type 3 to continue';
    }

    initObjects() {
        // Add another object to draw a background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets_emi/sprites/trak2_plate2b.png");

        this.player = new Player(new Vector( canvasWidth / 2, canvasHeight-50), 125, 10, "red");
        
        //this.player.setSprite("../assets/sprites/blordrough_quartermaster-NESW.png.", new Rect( 48,64*2,48,64));

        this.ball = new Ball(new Vector(canvasWidth/2, canvasHeight-70),20,20, "green");

        this.goalLeft = new GameObject(new Vector(0, canvasHeight/2),10,canvasHeight,"purple");   //Esto es pared izquierda, namas no quite el nombre de variable para no tener que buscarla en todo el codigo
        this.goalRight = new GameObject(new Vector(canvasWidth, canvasHeight/2),10,canvasHeight,"purple"); //Esto es pared derecha, namas no quite el nombre de variable para no tener que buscarla en todo el codigo

        this.upperWall = new GameObject(new Vector(canvasWidth/2, 0),canvasWidth,10,"purple");
        this.lowerWall = new GameObject(new Vector(canvasWidth/2, canvasHeight),canvasWidth,10,"white");

        this.hitPointsText = new TextLabel(canvasWidth/16,canvasHeight-90,"50px Ubuntu Mono","cyan");

        //Game Over Backgroound
        this.gameOver_background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.gameOver_background.setSprite("../assets_emi/sprites/lava_spr_strip45.png");
        

        //Game won  Background
        this.gameWonBackground = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight, "cyan");

        //Level 2 background
        this.level2Background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight, "orange");

        //Level 3 background
        this.level3Background =  new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight, "pink");
        
        this.gameText = new TextLabel(10,canvasHeight/2,"60px Ubuntu Mono","black");

        //Generate crates
        this.addGrid(canvasWidth/4);  //Se llama un método que genera las cajas en el juego
        
    }

    addGrid(rows){  //Hice un nuevo método de generación de cajas para asegurar que se generen nuevas cajas cuando ya se han destruido, ya se 
        // después de perder o pasar de nivel
        this.actors = [];
        for(let i = 0; i < rows; i = i+canvasHeight/6){   //filas
            for(let j = 0; j < canvasWidth -20; j = j+canvasWidth/10){  //columnas
                let crateHitPoints;
                if(Math.random() > 0.5){   //hacemos un 50/50 para darle 1 de vida al contador o 2 de vida al contador
                    crateHitPoints = 2;
                }
                else{
                    crateHitPoints = 1;
                }
                let crate = new hitPointGameObject(new Vector(j+20, i+10),60, 20,"grey",'crate',crateHitPoints);  //en el paramétro de position vamos sumando i y j para mover la posición
                // de las cajas progresivamente con el nested loop
                crate.setSprite("../assets_emi/sprites/RTS_Crate.png");
                this.actors.push(crate);  //subimos cada caja al arreglo
            }
        }
        // for(let i = 0; i < rows; i = i + canvasHeight/6){
        //     let crateHitPoints = 1;
        //     let crate = new hitPointGameObject(new Vector(canvasWidth/2, i+10),60, 20,"grey",'crate',crateHitPoints);  //en el paramétro de position vamos sumando i y j para mover la posición
        //     //         // de las cajas progresivamente con el nested loop
        //     crate.setSprite("../assets_emi/sprites/RTS_Crate.png");
        //     this.actors.push(crate);  //subimos cada caja al arreglo
        //}
            

    }
    //La teoria del draw() cambia bastante para poder hacer las transiciones de las pantallas
    draw(ctx) {
        if(this.actors.length == 0 && this.levelCount == 3){  //primero checa si el arreglo el vacio y el contador de niveles es 3
            // entonces llama el background del game won y activa la bandera 
            this.gameWonBackground.draw(ctx);
            this.gameText.draw(ctx,this.gameWonDisplay);
            this.gameWon = true;
        }
        else if(this.actors.length == 0 && this.levelCount == 2){ // si lo pasado no cumple checa si el contador es 2 y cambia la bandera de ese nivel
            this.level3Background.draw(ctx);
            this.gameText.draw(ctx,this.level3Display);
            this.level3Active = true;
        }
        else if(this.actors.length == 0){  // aquí el jugador está en el primer nivel solo tiene que 
            this.level2Background.draw(ctx);
            this.gameText.draw(ctx,this.level2Display);
            this.level2Active = true;
        
        }
        else if(this.hitPoints > 0){
            
            // Draw the background first, so everything else is drawn on top
            this.background.draw(ctx);

            //Barrita del jugador
            this.player.draw(ctx);
        
            //Paredes
            this.upperWall.draw(ctx);
            this.lowerWall.draw(ctx);
            this.goalLeft.draw(ctx);
            this.goalRight.draw(ctx);

            //Vida del jugador
            this.hitPointsText.draw(ctx,this.hitPoints);
            
            //Pelotita
            this.ball.draw(ctx);

            //Cajitas
            for(let actor of this.actors){
                actor.draw(ctx);
            }

           
        }
        else{
            this.gameOver_background.draw(ctx);
            this.gameText.draw(ctx,this.gameOverDipslay);
        }

        
    }

    update(deltaTime) {
        // Move the player
        this.player.update(deltaTime);
        
        this.ball.update(deltaTime);

        //LLamamos función overlap como antes
        if(boxOverlap(this.ball,this.player)){
            //Hice una nueva función para checar si el paddle choco contra la parte frontal del paddle
            if(hitSurfacePaddle(this.ball, this.player)){
                this.ball.velocity.y = this.ball.velocity.y*-1;     //Detecta colision y se hace cambiando dirección en y
                this.ball.velocity = this.ball.velocity.times(1.025);  // Avances progresivos en la velocidad de juego, puede ir cabiando
            }
            //Aquí sino se cumple la funcion hitSurface pero detecó una colision lateral
            //entonces cambia la direccion en x unicamente
            else{
                console.log("Hit side");
                this.ball.velocity.x = this.ball.velocity.x*-1;  //Aplica lo mismo que en el comment pasado
                this.ball.velocity = this.ball.velocity.times(1.025); 
            }
            
        }
        //El objeto de juego goalLeft funciona como pared izquierda
        if(boxOverlap(this.ball,this.goalLeft)){  
                this.ball.velocity.x = this.ball.velocity.x*-1;
                this.ball.velocity = this.ball.velocity.times(1.025);
        }
        //El objeto de juego goalRight funciona como pared derecha
        if(boxOverlap(this.ball,this.goalRight)){
                this.ball.velocity.x = this.ball.velocity.x*-1;
                this.ball.velocity = this.ball.velocity.times(1.025);
                
        }
        //Pared de arriba
        if(boxOverlap(this.ball,this.upperWall)){
                this.ball.velocity.y = this.ball.velocity.y*-1;
                this.ball.velocity = this.ball.velocity.times(1.025);
        }
        //Pared de abajo que regresa pelota al origen y jugador pierde vida
        //Se ve como la pelota se escapó del paddle
        if(boxOverlap(this.ball,this.lowerWall)){
                this.ball.reset();
                this.hitPoints = this.hitPoints -1;
        }

        //Iteramos para cada caja en arreglo actor
        //Cada caja en objeto de una nueva clase de GameObject con un atributo extra para guardar vida
        //Si detetca colision con funcion boxOverlap entonces le reduce el contador de vida
        //Hay 2 tipos de cajas: las que tienen 1 vida y las que tienene 2 vidas, si llega a cero las elimina del arreglo,
        //pero si hay colision y todavia queda 1 en el contador de vida, significa que tenia 2 vidas
        //entonces le pone color rojo la caja para indicar que esta apunto de romperse
        for(let i = 0; i < this.actors.length;i++){
            if(boxOverlap(this.ball,this.actors[i])){
                this.ball.velocity.y *= -1;
                this.actors[i].damage();
                if(this.actors[i].hitPoints == 0){
                    this.actors.splice(i,1);
                }
                else if(this.actors[i].hitPoints == 1){
                    this.actors[i].setSprite("../assets_emi/sprites/RTS_Crate_red.png");
                }
                
            }
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
            if(this.gameWon){
                if(event.key == '1'){       //Cree un event listener cuando se detecta la bandera juego ganado
                    this.hitPoints = 3;     //Da la opción al jugador de reiniciar y se invierte la bandera
                    this.gameWon = false;   //regresamos la pelota a su posicion original,
                    this.levelCount = 1;    //el contador de nivel se reinicia y vuelve a llamar addGrid() para reiniciar el sistema de cajas
                    this.ball.reset();
                    this.addGrid(canvasHeight/4);  //canvasHeight/3
                }
            }
            else if(this.level3Active){
                if(event.key == '3'){
                    this.hitPoints = 3;         //Funciona con la bandera asignada para este nivel, pone la variable en falso nuevamente
                    this.level3Active = false;   //pero incrementa la cantidad de filas que hay en el método addGrid() para indicar mayor dificultad
                    this.levelCount = this.levelCount + 1;   //aquí no reinicia el contador de nivel sino lo incrementa 
                    this.ball.reset();
                    this.addGrid(canvasHeight - canvasHeight/3); //canvasHeight - canvasHeight/3
                }
            }
            else if(this.level2Active){
                if(event.key == '2'){
                    this.hitPoints = 3;         //Igual que el previo event listener pero con una dificultad previa a la inicial
                    this.level2Active = false;
                    this.levelCount = this.levelCount + 1;
                    this.ball.reset();
                    this.addGrid(canvasHeight/2);
                }
            }
            else if(this.hitPoints > 0){
                if (event.key == 'a') {
                    this.addKey('left',this.player);        //parte del juego activa y mecánica mientras los hitpoints no sean 0
                } else if (event.key == 'd') {
                    this.addKey('right',this.player);
                } 
                if(event.key == " "){
                    if(this.ball.velocity.x == 0 && this.ball.velocity.y == 0){
                        this.ball.serve();   //inicializa la pelota con un metodo serve() que genera un angulo de aprox 45 hacia arriba con una velocidad definida
                    }
                }
            }
            else{
                if(event.key == '1'){
                    this.hitPoints = 3;
                    this.levelCount = 1; 
                    this.addGrid(canvasHeight/4);  //canvasHeight/3
                }
            }



                
        });

        window.addEventListener('keyup', (event) => {
            if(this.hitPoints > 0){
                if (event.key == 'a') {
                    this.delKey('left',this.player);       //parte del sistema de movimiento de la paleta mientras el contador de vida no sea 0
                } else if (event.key == 'd') {
                    this.delKey('right', this.player);
                } 
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
