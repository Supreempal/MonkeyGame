var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided= loadAnimation("sprite_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey = createSprite(50,315,20,20);
  monkey.addAnimation("moving", monkey_running );
  monkey.scale=0.1;

  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
background("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("survival Time:" + survivalTime,100,50);
 
  if (gameState === PLAY){
  if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
  if(keyDown("space") && monkey.y >= 100){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY + 0.8
  
  
  
 survivalTime=Math.ceil(frameCount/frameRate())
  
  spawnBananas();
  spawnObstacles();
  
   if(monkey.isTouching(obstacleGroup)){
   gameState=END;
    }
  } else if (gameState===END) {
 ground.velocityX=0;
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
}
  monkey.collide(ground);
  drawSprites();
}
function spawnBananas(){
   if (frameCount % 90 === 0) {
    banana= createSprite(600, 100, 40, 10);
    banana.y = Math.round(random(100, 150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
  banana.lifetime = 700;
     
     banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  FoodGroup.add(banana);
}
}

function spawnObstacles(){
  if (frameCount % 120 === 0) {
    obstacle= createSprite(600, 330, 10, 40);
   obstacle.addImage(obstacleImage);
    obstacle.x = Math.round(random(600, 600));
    obstacle.scale = 0.1;
    obstacle.velocityX=-4;
    
    obstacle.lifetime = 700;
    obstacleGroup.add(obstacle);
 }
}





