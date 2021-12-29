var fondo, fondoImg;
var gallina, gallinaImg, gallinaRunImg;
var sueloImg, suelo, sueloInvisible;
var lobo, loboQuietoImg, loboCorriendoImg;
var obs1Img, obs2Img, obs3Img, obs4Img, obstaculos;

function preload(){
	fondoImg = loadImage("images/bg.jpg");
	gallinaImg = loadImage("images/g2.png");
	gallinaRunImg = loadAnimation("images/g2.png", "images/g1.png", "images/g1.png");
	sueloImg = loadImage("images/suelos.jpg");

	loboQuietoImg = loadImage("images/lobo4.png");
	loboCorriendoImg = loadAnimation("images/lobo1.png", "images/lobo2.png", "images/lobo2.png");

	obs1Img = loadImage("images/obj2.png");
	obs2Img = loadImage("images/obj4.png");
	obs3Img = loadImage("images/obj5.png");
	obs4Img = loadImage("images/serpiente.png");


}

function setup(){
	suelo = createSprite(700, 672, 700, 50);
	suelo.addImage("suelo",sueloImg);

	gallina = createSprite(350, 605, 50, 50);
	gallina.addAnimation("esperando", gallinaImg);
	gallina.addAnimation("corriendo", gallinaRunImg);
	gallina.setCollider("rectangle",-5,10,100,150);
	gallina.scale = 0.6;

	lobo = createSprite(100, 600, 50, 50);
	lobo.addAnimation("quieto", loboQuietoImg);
	lobo.addAnimation("corriendo", loboCorriendoImg);
	lobo.scale = 0.5;

	sueloInvisible = createSprite(250, 677, 500, 30);
	sueloInvisible.visible = false;

	obstaculos = new Group();
	
}

function draw(){
	createCanvas(1300, 700);
	background(fondoImg);

	textSize(15);
	fill(0);
	text("Presiona la tecla derecha para iniciar", 50, 103);
	text("Salta con espacio", 110, 128)

	if(suelo.x < 600){
		suelo.x = suelo.width/2;
	}

	if(keyDown("RIGHT_ARROW")){
		gallina.changeAnimation("corriendo", gallinaRunImg);
		lobo.changeAnimation("corriendo", loboCorriendoImg);
		lobo.scale = 0.85;
		lobo.y = 585;
		lobo.setCollider("rectangle",0,0,200,200);
		suelo.velocityX = -4;
	}

	if(keyDown("SPACE")){
		gallina.velocityY = -17;
	}

	gallina.velocityY = gallina.velocityY +0.7;
	gallina.collide(sueloInvisible);
	gallina.collide(obstaculos);

	obstacles();

	drawSprites();
}

function obstacles(){
	if(frameCount % 120 === 0){
		var obst = createSprite(1400, 640, 50, 50);
		obst.velocityX = -5;
		var rand = Math.round(random(1,4))
		switch(rand){
			case 1: obst.addImage(obs1Img);
			obst.y = 643;
			obst.setCollider("rectangle",0,0,100,50);
			break;
			case 2: obst.addImage(obs2Img);
			obst.y = 630;
			obst.setCollider("rectangle",0,0,100,50);
			break;
			case 3: obst.addImage(obs3Img);
			obst.y = 610;
			obst.scale = 0.8;
			obst.setCollider("rectangle",-5,2,90,120);
			break;
			case 4: obst.addImage(obs4Img);
			obst.scale = 0.17;
			obst.y = 625;
			obst.setCollider("rectangle",-70,0,300,400);
			break;
			default: break;
		}
		obst.lifetime = 700;
		obstaculos.add(obst);
	}

}