var bg;
var earth, earthIMG;
var rocket, rocketIMG, rocket2IMG;
var bottomBlock, topBlock, leftBlock, rightBlock;
var asteroidIMG;
var enemyGroup, partGroup;
var partsLeft = 7;
var partsIMG;
var lives = 6;
var livesIMG;
var gameState = 0;
var score = 0;
var rate = 193;
var heart, heartGroup;

function preload() {
  
  bg = loadImage("BG.jpg");
  earthIMG = loadImage("Earth.png");
  rocketIMG = loadImage("Rocket.png");
  rocket2IMG = loadImage("Rocket2.png");
  asteroidIMG = loadImage("Meteor.png");
  partsIMG = loadImage("Part.png");
  livesIMG = loadImage("Heart.png");

}

function setup() {
  createCanvas(1000, 560);

  earth = createSprite(500, 1000, 60, 50);
  earth.addImage(earthIMG);
  earth.scale = 2;

  rocket = createSprite(500, 300, 60, 50);
  rocket.addImage(rocketIMG);
  rocket.scale = 0.2;

  topBlock = createSprite(500, -1, 1020, 20);
  bottomBlock = createSprite(500, 565, 1020, 20);
  leftBlock = createSprite(-1, 310, 20, 640);
  rightBlock = createSprite(1001, 310, 20, 640);

  topBlock.visible = false;
  bottomBlock.visible = false;
  leftBlock.visible = false;
  rightBlock.visible = false;

  enemyGroup = new Group();
  partGroup = new Group();
  heartGroup = new Group();
}

function draw() {
  background(bg);

  fill("white");
  text("Break the meteors using your ship, but it comes at a cost! You will lose a part for every hit you take, so collect more! (Keep your parts and lives numbers high)", 60, 35);

  if(gameState === 0){
    score = Math.round(frameCount/5);
  }

  if (enemyGroup.isTouching(rocket)) {
    enemyGroup.destroyEach();
    partsLeft = partsLeft - 1;
  }  

  if (enemyGroup.isTouching(bottomBlock)) {
    enemyGroup.destroyEach();
    lives = lives - 1;
  }  

  if (partGroup.isTouching(rocket)) {
    partGroup.destroyEach();
    partsLeft = partsLeft + 1;
  }  

  if (heartGroup.isTouching(rocket)) {
    heartGroup.destroyEach();
    lives = lives + 1;
  }  

  if(partsLeft === 0 || lives === 0){
    gameState = 1;
    rocket.destroy();

    textFont("impact");
    textSize(45);
    fill("white");
    text("GAME OVER", 400, 270);
    textSize(30);
    text("Score: " + score, 438, 300);
    textSize(13);
    text("Press 'R' to restart!", 446, 360);

    if(lives === 0){
      textSize(15);
      text("The Earth got hit too many times and lost all its lives!", 340, 320);
    }
    if(partsLeft === 0){
      textSize(15);
      text("The rocket lost all it's parts due to getting hit too much and disintegrated in space!", 257, 320);  
    }
  }

  if(gameState === 1 && keyDown("r")){
    rocket = createSprite(500, 300, 60, 50);
    rocket.addImage(rocketIMG);
    rocket.scale = 0.2; 
    
    heartGroup.destroyEach();
    enemyGroup.destroyEach();
    partGroup.destroyEach();

    lives = 6;
    partsLeft = 7;
    score = 0;
    frameCount = 0;

    gameState = 0;
  }

  if(keyDown("right") || keyDown("d")){
    rocket.x = rocket.x + 5.5;
    rocket.addImage(rocketIMG);
    rocket.scale = 0.2;
  }
  if(keyDown("left") || keyDown("a")){
    rocket.x = rocket.x - 5.5;
    rocket.addImage(rocket2IMG);
    rocket.scale = 0.2;
  }

  if(keyDown("up") || keyDown("w")){
    rocket.y = rocket.y - 5;
  }
  if(keyDown("down") || keyDown("s")){
    rocket.y = rocket.y + 5;
  }

  if(rocket.isTouching(topBlock)){
    rocket.y = rocket.y+10;
  }
  if(rocket.isTouching(bottomBlock)){
    rocket.y = rocket.y-10;
  }
  if(rocket.isTouching(leftBlock)){
    rocket.x = rocket.x+10;
  }
  if(rocket.isTouching(rightBlock)){
    rocket.x = rocket.x-10;
  }

  textFont("impact");

  image(partsIMG, 903, 15, 57, 36);
  textSize(30);
  fill("gray");
  text(partsLeft, 971, 47);

  fill("white");
  text(score, 10, 47);

  spawnAsteroids();
  spawnParts();
  spawnHearts();

  drawSprites();

  image(livesIMG, 431, 450, 130, 130);
  textSize(30);
  fill("red");
  text(lives, 530, 526);

}

function spawnParts(){
  
    if(frameCount%rate === 0 && partsLeft <= 6 && gameState === 0){
      parts = createSprite(-15, -15, 20, 20);
      parts.lifetime = 200;
      parts.scale = 0.054;
      parts.addImage(partsIMG);
      if(partsLeft < 4){
        rate = 108;
      }else{
        rate = 193;
      }
      parts.y = Math.round(random(20, 510));
      partX = Math.round(random(1, 2));
      if(partX === 1){
        parts.x = -15;
        parts.velocityX = 5.43;
      }else{
        parts.x = 1015;
        parts.velocityX = -5.43;
      }
      
      partGroup.add(parts);
  }  
  }  

  function spawnAsteroids(){
  
    if(frameCount%103 === 0 && gameState === 0){
    asteroid = createSprite(615, -15, 20, 20);
    asteroid.lifetime = 140;
    asteroid.velocityY = 5.34;
    asteroid.scale = 0.12;
    asteroid.addImage(asteroidIMG);
    asteroid.x = Math.round(random(40, 960));
      
    enemyGroup.add(asteroid);

  }  
  }  

  function spawnHearts(){
  
    if(frameCount%248 === 0 && lives === 1 && gameState === 0){
      heart = createSprite(-15, -15, 20, 20);
      heart.lifetime = 200;
      heart.scale = 0.2;
      heart.addImage(livesIMG);

      heartPos = Math.round(random(1, 3));
      if(heartPos === 1){
        heart.x = -15;
        heart.y = Math.round(random(20, 510));
        heart.velocityX = 6;
      }else if(heartPos === 2){
        heart.y = -15;
        heart.x = Math.round(random(40, 960));
        heart.velocityY = 6;
      }else if(heartPos === 3){
        heart.x = 1015;
        heart.y = Math.round(random(20, 510));
        heart.velocityX = -6;
      }
      
      heartGroup.add(heart);
  }  
  }  