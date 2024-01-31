"use strict";
const app = new PIXI.Application
({	//gives the application its parameters
    width: 800,
    height: 600
});
document.body.appendChild(app.view);
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;
let startScene=new PIXI.Container();
let gameScene=new PIXI.Container();
let pauseScene=new PIXI.Container();
let gameOverScene=new PIXI.Container();
let creditsScene=new PIXI.Container();
let countdownScene=new PIXI.Container();
let scenes=[startScene,gameScene,pauseScene,gameOverScene,creditsScene];
let bgImages=["images/BGtitle.jpg","images/BGplay.jpg","images/static.png","images/BGfail.jpg","images/BGcredits.jpg"];
let bgScales=[0.5,0.7,1,0.3,0.5];
let head,scoreLabel,lifeLabel;
let playBGM = new Howl({
	src: ['sounds/bgm.mp3'],
	autoplay:false,
	loop:true
});//gameplay music
let pauseBGM= new Howl({
	src: ['sounds/pause.mp3'],
	autoplay:false,
	loop:true
});//paused music
let failBGM = new Howl({
	src: ['sounds/goy.mp3'],
	autoplay:false,
	loop:true
});//game over music
let titleBGM = new Howl({
	src: ['sounds/title.mp3'],
	autoplay:false,
	loop:true
});//title screen music
let hitSound = new Howl({
	src: ['sounds/fireball.mp3']
});//the sound that plays when you get hit
let startButton,creditsButton,titleButton,retryButton,returnButton;
let bubbles = [];
let dolphins = [];
let score = 0;
let life = 10;
let paused = true;
let totalSeconds = 0;
window.onload = init;
function init()
{	//allows the clicks to pause and unpause the game
	document.querySelector("canvas").onclick = pauseGame;
}
function setup()
{	//sets up the whole game
	for (let s=0;s<scenes.length;s++){//adds the scenes to the game
		if (s>0){//sets all scenes as invisible except the title scene
			scenes[s].visible=false;
		};//the next two lines add the scenes themselves and then their backgrounds
		app.stage.addChild(scenes[s]);
		scenes[s].addChild(new BG(bgImages[s],bgScales[s]));
	};// Creates the head
	startButton=generateButton("images/startButton.png","images/startHover.png",sceneWidth*0.3,500,startGame);
	startScene.addChild(startButton);
	creditsButton=generateButton("images/creditsButton.png","images/creditsHover.png",sceneWidth*0.7,500,viewCredits);
	startScene.addChild(creditsButton);
	retryButton=generateButton("images/retryButton.png","images/retryHover.png",sceneWidth*0.3,400,startGame);
	gameOverScene.addChild(retryButton);
	titleButton=generateButton("images/titleButton.png","images/titleHover.png",sceneWidth*0.7,400,returnToTitle);
	gameOverScene.addChild(titleButton);
	returnButton=generateButton("images/titleButton.png","images/titleHover.png",sceneWidth/2,500,returnToTitle);
	creditsScene.addChild(returnButton);
	head = new Head();
	gameScene.addChild(head);
	createLabels();
	app.ticker.add(gameLoop);
	titleBGM.play();
}
function generateStaticText(words,yPos,size,font,wordScene)
{//generates text that does not change
	let newText=new PIXI.Text(words);
	newText.style=new PIXI.TextStyle({
		fill: 0xDDDDDD,
		fontSize: size,
		fontFamily: font
	});
	newText.anchor.set(0.5);
	newText.x=sceneWidth/2;
	newText.y=yPos;
	wordScene.addChild(newText);
}
function createLabels()
{	// sets up startScene
	generateStaticText("v a p o r b r a v e",60,60,"VCR",startScene);
	generateStaticText("Move the statue with your mouse.",300,30,"VCR",startScene);
	generateStaticText("Avoid obstacles for as long as you can.",330,30,"VCR",startScene);
	generateStaticText("Click the screen to pause the game.",360,30,"VCR",startScene);
	generateStaticText("p a u s e d",sceneHeight/2,60,"VCR",pauseScene);
	generateStaticText("g a m e  o v e r",200,60,"VCR",gameOverScene);
	generateStaticText("c r e d i t s",80,60,"VCR",creditsScene);
	generateStaticText("Made with PixiJS",150,30,"VCR",creditsScene);
	lifeLabel = new PIXI.Text();
	lifeLabel.style = new PIXI.TextStyle({
		fill: 0xEEEEEE,
		fontSize: 30,
		fontFamily: 'VCR',
	});
	lifeLabel.x = 5;
	lifeLabel.y = 5;
	gameScene.addChild(lifeLabel);
	decreaseLifeBy(0);
}
function generateButton(buttonSprite,hoverSprite,buttonX,buttonY,buttonFunction)
{
	let newButton=new PIXI.Sprite.from(app.loader.resources[buttonSprite].texture);
	newButton.anchor.set(0.5);
	newButton.scale.set(0.3);
	newButton.x=buttonX;
	newButton.y=buttonY;
	newButton.interactive=true,
	newButton.buttonMode=true;
	newButton.on("pointerover",function(){
		this.texture=app.loader.resources[hoverSprite].texture;
	});
	newButton.on("pointerout",function(){
		this.texture=app.loader.resources[buttonSprite].texture;
	});
	newButton.on("pointerdown",buttonFunction);
	return newButton;
}
function createObstacles(obst)
{//creates the obstacles
	for(let i=0;i<obst;i++)
	{	//creates the bubbles
		let c = new Bubble(5);
		c.damage = 1;
		c.speed = Math.random() * 100 + 50;
		c.x = Math.random() * (sceneWidth - 50) + 25;
		c.y = Math.random() * (sceneHeight - 400) + 25;
		bubbles.push(c);
		gameScene.addChild(c);
	}
	for(let i=0;i<obst; i++)
	{	//creates the dolphins
		let c = new Dolphin(5);
		c.damage = 2;
		c.speed = Math.random() * 100 + 50;
		c.x = Math.random() * (sceneWidth - 50) + 25;
		c.y = Math.random() * (sceneHeight - 400) + 25;
		c.fwd = {x:3,y:1}
		dolphins.push(c);
		gameScene.addChild(c);
	}
}
function decreaseLifeBy(value)
{	//deals damage to the player
	life -= value;
	life = parseInt(life);
	lifeLabel.text = `Life:	${life}`;
}
function gameLoop()
{	//allows the game as a whole to run
	if (paused) return;
	// Calculates "delta time"
	let dt = 1/app.ticker.FPS;
	if (dt > 1/12) dt=1/12;
	// Moves the head
	let mousePosition = app.renderer.plugins.interaction.mouse.global;
	let amt = 6 * dt; // at 60 FPS would move about 10% of distance per update
	// lerp (linear interpolate) the x & y values with lerp()
	let newX = lerp(head.x, mousePosition.x, amt);
	let newY = lerp(head.y, mousePosition.y, amt);
	// keep the head on the screen with clamp
	let w2 = head.width/2;
	let h2 = head.height/2;
	head.x = clamp(newX, 0+w2, sceneWidth-w2);
	head.y = clamp(newY, 0+h2, sceneHeight-h2);
	for (let c of bubbles)
	{	// Moves the bubbles
		c.move(dt);
		if (c.x <= c.radius || c.x >= sceneWidth-c.radius)
		{	//horizontal bouncing
			c.fwd.x *= -1;
		}
		if (c.y <= c.radius || c.y >= sceneHeight-c.radius)
		{	//vertical bouncing
			c.fwd.y *= -1;
		}
	}	// Checks for collisions
	for (let c of bubbles)
	{
		if (c.isAlive && rectsIntersect(c,head))
		{	//makes it sound like a constant burn
			hitSound.play();
			decreaseLifeBy(c.damage);
		}
	}
	bubbles=bubbles.filter(c=>c.isAlive);
	if (life <= 0)
	{	// Is game over?
		end();
		return;
	}
	for (let c of dolphins)
	{	// Moves the dolphins
		c.move(dt);
		if (c.x <= c.radius || c.x >= sceneWidth-c.radius)
		{	//horizontal bouncing
			c.fwd.x *= -1;
		}
		if (c.y <= c.radius || c.y >= sceneHeight-c.radius)
		{	//vertical bouncing
			c.fwd.y *= -1;
		}
	}	// Checks for collisions
	for (let c of dolphins)
	{
		if (c.isAlive && rectsIntersect(c,head))
		{	//makes it sound like a constant burn
			hitSound.play();
			decreaseLifeBy(c.damage);
		}
	}
	for (let c of dolphins)
	{
		if (c.isAlive && rectsIntersect(c,head))
		{	//makes it sound like a constant burn
			hitSound.play();
			decreaseLifeBy(c.damage);
		}
	}
	dolphins=dolphins.filter(c=>c.isAlive);
	if (life <= 0)
	{	// Is game over?
		end();
		return;
	}
}