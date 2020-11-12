
var monkey , monkey_running;
var ground, ground_moving;
var bananaImage, obstacleImage, obstacle1Image, obstacle2Image;
var bananaGroup, obstacleGroup,obstacle1, obstacle2;
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacle1Image = loadImage("obstacle.png");
 // obstacle2Image = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4
  ground.x = ground.width/2;
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
}


function draw() {
        background(220);
  
   if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
   if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites();  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score, 500,50);
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetime = -1;
    obstacleGroup.setLifetime = -1;
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50);
}
function spawnBananas(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(500,120,40,10);
    banana.y = Math.round(random(190,250));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(500,328,40,10);
    obstacle.velocityX = -(6 + 3*survivalTime/100);
    
  /*  var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }*/
    
    obstacle.addImage(obstacle1Image);
            
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
  
    obstacleGroup.add(obstacle);
  }
}







