var bg,bgImg;
var player, shooterImg, shooter_shooting, shooter_Img;
var Zombie;
var Heart1,Heart2,Heart3;
var bullets=70;
var score=0;
var life=3;
var gameState="fight";
function preload(){
  
  shooter1Img= loadImage("assets/shooter_1.png")
  shooter2Img = loadImage("assets/shooter_2.png")
  shooter3Img = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  heartImg = loadImage("assets/heart_1.png")
  heart1Img = loadImage("assets/heart_2.png")
  heart2Img = loadImage("assets/heart_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  loosingsound = loadSound("assets/lose.mp3")
  explosionsound = loadSound("assets/explosion.mp3")
  winsound = loadSound("assets/win.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooter1Img)
   player.scale = 0.3




   heart1 = createSprite(displayWidth-1159, displayHeight-400,50,50)
   heart1.addImage(heartImg)
   heart1.scale=0.1

   heart2 = createSprite(displayWidth-1155, displayHeight-400,50,50)
   heart2.addImage(heart1Img)
   heart2.scale=0.1

   heart3 = createSprite(1366, 657,50,50)
   heart3.addImage(heart2Img)
   heart3.scale=0.1

  zombiegroup = createGroup();
  bulletsgroup = createGroup();
     // player.debug = true
  //  player.debug = false
    // player.Debug =false
    // Player.debug = true

   //player.Collider("rectagle",0,0,300,300)
   //player.setcollider("rectangle",0,0)
    player.setCollider("rectangle",0,0,300,300)
  // player.Setcollider("rectangle",0,0,300,300)

}

function draw() {
  background(0); 
  if (gameState==="fight"){
    if(life===1){
      heart1.visible=true;
      heart2.visible=false
      heart3.visible=false
    
    }
    if(life===2){
    heart2.visible=true
    heart1.visible=false
    heart3.visible=false
    }
    if(life===3){
      heart3.visible=true
      heart1.visible=false
      heart2.visible=false
      }
      if(life===0){
        gameState="lost";
      }
      if(score===100){
        gameState="won";
      }
  }

enemy();

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter3Img)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyDown("space")){
  //player.addImage( shooter_shooting )
 // player.addImage()
  //player.addImage(shooterImg)
 player.addImage(shooter3Img)
}
if(zombiegroup.isTouching(player)){
  for(var i=0;i<zombiegroup.length;i++){
    if(zombiegroup[i].isTouching(player)){
      zombiegroup[i].destroy();
    }
  }
}
if(keyWentDown("space")&&bullets>=0){
bullet=createSprite(displayWidth-1150,player.y-30,20,10);
bullet.velocityX=20;
bulletsgroup.add(bullet);
player.addImage(shooter3Img)
bullets=bullets-1;
}
else if(keyWentUp("space")){
player.addImage(shooter2Img);
}
drawSprites();

}
function enemy(){
if (frameCount%69===0){
  zombie=createSprite(random(500,1100),random(100,500),40,40);
  zombie.addImage(zombieImg);
  zombie.scale=0.2;
  zombie.velocityX=-5;
  zombie.lifetime=400;
  zombiegroup.add(zombie);
}

}