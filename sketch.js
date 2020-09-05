//variable names
var Gamestate = "Play";
var BatGroup,TreeGroup;
var bird,ground,obstacles,clouds,r1,bat,r2,grass,GameOver;
var score = 0;

//to load all images
function preload(){
 //the bird
  birdie = loadImage("Bird.jpg");
//the obstacles
  Ob1img = loadImage("ob1.png");
  Ob2img = loadImage("ob2.png");
  Ob3img = loadImage("ob3.png");
  Ob4img = loadImage("ob4.png");
  //the bat
  Batimg = loadImage("Bat1.png");
  //the grass and ground
  Grassimg = loadImage("greenGrass.jpg");
  g = loadImage("ground.png");
  //the shocked bird and lose text
  Endgame = loadImage("Endb.jpg");
  lostC = loadImage("lose.png");
}

function setup() {

//creating a canvas of given dimensions
  createCanvas(1536,721);

//random variable
r1 = Math.round(random(150,190));

//GameOver as global variable
GameOver = createSprite(700,300,10,10);
GameOver.addImage(lostC);

//creating a bird sprite
 bird =  createSprite(400, 200, 50, 50);
 bird.addImage(birdie);
//decreasing the bird's forcefield
 bird.setCollider("rectangle",0,0,10,10);

//creating a ground sprite
 ground = createSprite(620,850,1536,20);
 ground.addImage(g);
//increasing the ground scale 
 ground.scale = 6;

//creating a grassscape
 grass = createSprite(720,20,1600,10);
 grass.addImage(Grassimg);

 //decreasing the grass scale
 grass.scale = 0.7

//creating groups
 BatGroup = createGroup();
 TreeGroup = createGroup();


}

function draw() {
  //giving and ebony background
  background("black");

//text details
textSize(20);
textFont("Showcard Gothic");
text("score:"+score,50,600);
//gamestate play details
if(Gamestate === "Play"){

//to increase score
score = score+Math.round(World.frameRate/60);

//to call function Obstacle and Enemy in function draw
  Obstacle();  
  Enemy();
  
  //if up arrow pressed details
if(keyDown(UP_ARROW)){
bird.velocityY = -3
}
//if down arrow pressed details 
if(keyDown(DOWN_ARROW)){
  bird.velocityY = 3
  }
  //to increase grass and ground velocity every hundred
  ground.velocityX = -(2+2*score/100);
  grass.velocityX = -(2+2*score/100);

//to create infinite ground
if (ground.x < 60){
 ground.x = ground.width/2;
  }
//to create infinite grassscape
  if (grass.x < 300){
    grass.x = 720;
      }
//to initially give it no velocity
  bird.VelocityY = 0;

  //to create edge sprites and make the bird bounceoff them
  edges = createEdgeSprites();
  bird.bounceOff(ground);
  bird.bounceOff(edges);
  
//to end the game details
  if(bird.isTouching(TreeGroup)){
    bird.addImage(Endgame);
    Gamestate = "End";
  }

  //to end the game details
  if(bird.isTouching(BatGroup)){
    bird.addImage(Endgame);
    Gamestate = "End";
  }
//to hide lose image when
GameOver.visible = false;
}
if(Gamestate === "End"){

  textFont("Showcard Gothic")
  textSize(25);
  fill("lightcyan");
  text("Press Space to Restart",600,200);
bird.velocityY = 0;
ground.velocityX = 0;
grass.velocityX = 0;
BatGroup.setVelocityXEach(0);
TreeGroup.setVelocityXEach(0);
GameOver.visible = true;
 



}

  

//bird.velocityY = bird.velocityY+0.05
reset();
  drawSprites();
  
}
function Obstacle(){

  if(World.frameCount % r1 === 0){
  var obstacles = createSprite(1300,600,100,10);
  obstacles.velocityX = -(3+2*score/100)
  obstacles.scale = 0.3;
  var rand =Math.round( random(1,4));
  //obstacles.addImage(ob+);
 switch(rand){
   case 1:obstacles.addImage(Ob1img);
   break;
   case 2:obstacles.addImage(Ob2img);
   break;
   case 3:obstacles.addImage(Ob3img);
   break;
   case 4:obstacles.addImage(Ob4img);
   break;
   ;
 }
 //obstacles.debug = true;
 TreeGroup.add(obstacles);
 TreeGroup.setLifetimeEach(-1);
 obstacles.setCollider("rectangle",0,0,300,1000)
  //obstacles.height = rand;
  //obstacles.scale = 0.5;
  }
 
}
function Enemy(){

  if(World.frameCount % Math.round(random(150,200)) === 0){

    //to create a bat 
    var bat = createSprite(1300,Math.round(random(200,400)),10,10);
    bat.addImage(Batimg);

    //to increase velocity by hundred
    bat.velocityX = -(3+2*score/100);
    bat.scale = 1.2
    
    //to add bat to its group
    BatGroup.add(bat)

    //to add it a mortal life
    BatGroup.setLifetimeEach(-1);

//to decrease the bat's force field
    bat.setCollider("rectangle",0,0,20,20)
  }
}
function reset(){

  //if key down space details
  if(keyDown("space")){

    Gamestate = "Play";
    bird.addImage(birdie);
    BatGroup.destroyEach();
    TreeGroup.destroyEach();
    score = 0;
    GameOver.visible = false;

  }
}