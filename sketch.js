var PLAY = 1;
var END = 0;

var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7;
var ob1Img, ob2Img, ob3Img, ob4Img, ob5Img, ob6Img;
var finish, finishImg;

var gameOver, gameOverImg;
var restart, restartImg;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  obstacle5Img = loadImage("obstacle5.png");
  obstacle6Img = loadImage("obstacle6.png");

  finishImg = loadImage("finish.png");

  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(displayWidth-700, 200);

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addImage("collided", trex_collided);

  ground = createSprite(300,180,800,20);
  ground.addImage("ground",groundImage);

  trex.depth = ground.depth + 1;

  gameOver = createSprite(displayWidth/4.5,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  invisibleGround = createSprite(displayWidth/2,210,displayWidth,50);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  background(240);


  obstacle1 = createSprite(295,165,10,40);
  obstacle1.addImage(obstacle1Img);

  obstacle2 = createSprite(590,165,10,40);
  obstacle2.addImage(obstacle2Img);

  obstacle3 = createSprite(970,165,10,40);
  obstacle3.addImage(obstacle6Img);
  
  obstacle4 = createSprite(1355,165,10,40);
  obstacle4.addImage(obstacle4Img);

  obstacle5 = createSprite(1720,165,10,40);
  obstacle5.addImage(obstacle5Img);

  obstacle6 = createSprite(2025,165,10,40);
  obstacle6.addImage(obstacle3Img);

  obstacle7 = createSprite(2275,165,10,40);
  obstacle7.addImage(obstacle1Img);


  obstaclesGroup.add(obstacle1);
  obstaclesGroup.add(obstacle2);
  obstaclesGroup.add(obstacle3);
  obstaclesGroup.add(obstacle4);
  obstaclesGroup.add(obstacle5);
  obstaclesGroup.add(obstacle6);
  obstaclesGroup.add(obstacle7);


  finish = createSprite(2600, 110, 10, 40);
  finish.addImage(finishImg);
  finish.scale = 0.3;
  finish.lifetime = -1;

  finish.depth = trex.depth;
  trex.depth = trex.depth + 1;

  if(gameState === PLAY) {
    camera.position.x = trex.x+250;
    camera.position.y = displayHeight-670;

    trex.velocityY = trex.velocityY + 0.8;
  }

  obstaclesGroup.setScaleEach(0.5);
  obstaclesGroup.setLifetimeEach(-1);

  trex.collide(invisibleGround);
  

  if (obstaclesGroup.isTouching(trex) || finish.isTouching(trex)){
    gameState = END;
  }
  else if (gameState === END) {
    gameOver.visible = true;

    ground.velocityX = 0;
    
    trex.velocityY = 0;
    trex.velocityX = 0;

    trex.changeImage("collided");
  }

  drawSprites();
}

function keyPressed() {
  if (keyCode === 32 && trex.y > 150) {
    trex.velocityY = -15;
  }

  if (keyCode === 68 || keyCode === 100) {
    trex.velocityX = 4;
  }

  if (keyCode === 65 || keyCode === 97) {
    trex.velocityX = -4;
  }
}