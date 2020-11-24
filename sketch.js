var jungle, banana, stone, monkey;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0;

function preload() {
  backImage = loadImage("jungle.jpg")
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  bananaimg = loadImage("banana.png")
  stoneimg = loadImage("stone.png")
}


function setup() {
  createCanvas(600, 400);

  ground = createSprite(0, 0, 600, 400);
  ground.addImage("ground", backImage)

  ground.velocityX = -4;
  ground.scale = 1.5
  monkey = createSprite(50, 300);
  monkey.addAnimation("running", player_running);
  monkey.scale = 0.1
  banana = createSprite(300, 200);

  banana.scale = 0.05

  stone = createSprite(1000, 1000);

  stone.scale = 0.1

  invisibleGround = createSprite(200, 355, 800, 1);
  invisibleGround.visible = false;

  ObstaclesGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(220);

  if (gamestate === PLAY) {


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space") && monkey.y >= 320) {
      monkey.velocityY = -16;

      //console.log (monkey.y);
    }



    monkey.velocityY = monkey.velocityY + 0.8;

    switch (score) {
      case 10:
        player.scale = 0.12;
      case 20:
        player.scale = 0.14
      case 30:
        player.scale = 0.16
      case 40:
        player.scale = 0.18
        break;
      default:
        break;
    }



    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
      score = score + 2;
    }
    spawnObstacles();
    spawnBanana();
  }

  if (ObstaclesGroup.isTouching(monkey)) {

    gamestate = END;

  }
  if (gamestate === END) {


    //set velcity of each game object to 0
    ground.velocityX = 0;
    banana.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

  }


  monkey.collide(invisibleGround);
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

}

function spawnObstacles() {
  if (World.frameCount % 100 === 0) {
    stone = createSprite(600, 328, 10, 40);
    stone.addImage("stone", stoneimg)
    stone.scale = 0.1

    stone.velocityX = -6;
    //generate random obstacles

    //assign scale and lifetime to the obstacle           

    stone.lifetime = 224;
    //add each obstacle to the group
    ObstaclesGroup.add(stone);
  }
}

function spawnBanana() {

  if (World.frameCount % 100 === 0) {
    var banana = createSprite(600, 420, 40, 10);
    banana.addImage("banana", bananaimg)

    banana.y = random(200, 300);

    banana.scale = 0.05;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 224;

    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    bananaGroup.add(banana);



  }

}