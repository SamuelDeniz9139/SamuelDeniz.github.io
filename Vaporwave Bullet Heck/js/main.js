"use strict";
const app = new PIXI.Application
({	//gives the application its parameters
    width: 1000,
    height: 650
});
document.body.appendChild(app.view);
// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;
let stage;
let startScene;
let gameScene;
let ship,scoreLabel,lifeLabel,hitSound,backDrop,backDropGO,background,backgroundGO,bgm,goy,pauseSound,titleSound;
let gameOverScene;
let pauseScene;
let circles = [];
let aliens = [];
let score = 0;
let life = 500;
let paused = true;
let totalSeconds = 0;
window.onload = init;
function setup()
{	//sets up the whole game
	stage = app.stage;
	// Creates the start scene
	startScene=new PIXI.Container();
	stage.addChild(startScene);
	// Creates the main game scene and makes it invisible
	gameScene=new PIXI.Container();
	gameScene.visible=false;
	stage.addChild(gameScene);
	// Create the Game Over scene and makes it invisible
	gameOverScene=new PIXI.Container();
	gameOverScene.visible=false;
	stage.addChild(gameOverScene);
	// Creates the pause scene and makes it invisible
	pauseScene=new PIXI.Container();
	pauseScene.visible=false;
	stage.addChild(pauseScene);
	// Loads the background for the Game Over scene
	backDropGO=new BackdropGO();
	gameOverScene.addChild(backDropGO);
	// Loads the start background
	background=new Background();
	startScene.addChild(background);
	// Loads the background for the pause screen
	backDrop=new Backdrop();
	pauseScene.addChild(backDrop);
	// Creates labels for all 4 scenes
	backgroundGO=new BackgroundGO();
	gameScene.addChild(backgroundGO);
	createLabels();
	// Creates the ship
	ship = new Ship();
	gameScene.addChild(ship);
	// Loads the sounds
	hitSound = new Howl({
		src: ['sounds/fireball.mp3']
	});// burning sound. plays as you rapidly take damage
	goy = new Howl({
		src: ['sounds/goy.mp3'],
		autoplay:false,
		loop:true		
	});// game over sound
	bgm = new Howl({
		src: ['sounds/bgm.mp3'],
		autoplay:false,
		loop:true
	});// background music
	titleSound = new Howl({
		src: ['sounds/title.mp3'],
		autoplay:false,
		loop:true
	});// title screen tune
	pauseSound = new Howl({
		src: ['sounds/pause.mp3'],
		autoplay:false,
		loop:true
	});	// pause screen's theme
	app.ticker.add(gameLoop);
	titleSound.play();
	// Now 'startScene' is visible. Clicking calls startGame()
}
function init()
{	//allows the clicks to pause and unpause the game
	document.querySelector("canvas").onclick = pauseGame;
}
function createCircles(numCircles)
{	// standard bouncing circles
	for(let i=0;i<numCircles/8;i++)
	{	//creates the green orbs
		let c = new Circle(5);
		c.damage=5;
		c.speed = Math.random() * 100 + 50;
		c.x = Math.random() * (sceneWidth - 50) + 25;
		c.y = Math.random() * (sceneHeight - 400) + 25;
		circles.push(c);
		gameScene.addChild(c);
	}	// orthogonal circles
	for(let i=0;i<numCircles/10; i++)
	{	//creates the blue orbs
		let c = new Elcric(5);
		c.damage = 2;
		c.speed = Math.random() * 100 + 50;
		c.x = Math.random() * (sceneWidth - 50) + 25;
		c.y = Math.random() * (sceneHeight - 400) + 25;
		c.fwd = {x:4,y:1}
		circles.push(c);
		gameScene.addChild(c);
	}
	for(let i=0;i<numCircles/10; i++)
	{	//creates the pink orbs
		let c = new Clecir(5);
		c.damage = 2;
		c.speed = Math.random() * 100 + 50;
		c.x = Math.random() * (sceneWidth - 50) + 25;
		c.y = Math.random() * (sceneHeight - 400) + 25;
		c.fwd = {x:1,y:4};
		circles.push(c);
		gameScene.addChild(c);
	}
	for(let i=0;i<1;i++)
	{	//creates the white orb
		let c=new Sphere(20);
		c.damage=500;
		c.x = Math.random() * (sceneWidth - 50) + 25;
		c.y = Math.random() * (sceneHeight - 400) + 25;
		circles.push(c);
		gameScene.addChild(c);
	}
}
function createLabels()
{
	// sets up startScene
	let startLabel1 = new PIXI.Text("Bullet Heck!");
	startLabel1.style = new PIXI.TextStyle({
		fill: 0xDDDDDD,
		fontSize: 70,
		fontFamily: 'VCR',
	});
	startLabel1.x = 250;
	startLabel1.y = 120;
	startScene.addChild(startLabel1);
	// Sets up gameScene
	let startLabel2 = new PIXI.Text("Click on the game screen to play.");
	startLabel2.style = new PIXI.TextStyle({
		fill: 0xDDDDDD,
		fontSize: 32,
		fontFamily: 'Alien',
	});
	startLabel2.x = 180;
	startLabel2.y = 520;
	startScene.addChild(startLabel2);
	let textStyle = new PIXI.TextStyle({
		fill: 0xDDDDDD,
		fontSize: 18,
		fontFamily: 'Alien',
	});	// Makes the time label
	// Makes the life label
	lifeLabel = new PIXI.Text();
	lifeLabel.style = textStyle;
	lifeLabel.x = 5;
	lifeLabel.y = 5;
	gameScene.addChild(lifeLabel);
	decreaseLifeBy(0);
	let pauseText = new PIXI.Text("PAUSED");
	textStyle = new PIXI.TextStyle({
		fill: 0xDDDDDD,
		fontSize: 96,
		fontFamily: 'VCR',
	});
	pauseText.style = textStyle;
	pauseText.x = sceneWidth/2 - 220;
	pauseText.y = sceneHeight/2 - 50;
	pauseScene.addChild(pauseText);
	// Sets up the Game Over Scene
	let gameOverText = new PIXI.Text("Game Over!");
	textStyle = new PIXI.TextStyle({
		fill: 0xBBBBBB,
		fontSize: 70,
		fontFamily: 'VCR',
	});
	gameOverText.style = textStyle;
	gameOverText.x = 300;
	gameOverText.y = sceneHeight/2 - 230;
	gameOverScene.addChild(gameOverText);
	let gameOverLabel = new PIXI.Text("Click on the game screen to try again.");
	gameOverLabel.style = new PIXI.TextStyle({
		fill: 0x000000,
		fontSize: 32,
		fontFamily: 'Alien',
	});
	gameOverLabel.x = 130;
	gameOverLabel.y = 220;
	gameOverScene.addChild(gameOverLabel);
}
function pauseGame()
{
	if(paused)
	{	// unpauses the game
		if(pauseScene.visible==true)
		{	//resumes the game if you paused it
			pauseScene.visible=false;
			gameScene.visible=true;
			paused=false;
			bgm.play();
			pauseSound.pause();
			pauseSound.currentTime=0;
		}
		else
		{	//starts the game up if on the start screen or the game over screen
			startGame();
		}
	}
	else
	{	// pauses the game
		gameScene.visible=false;
		pauseScene.visible=true;
		paused=true;
		backDrop.x=sceneWidth/2;
		backDrop.y=sceneHeight/2;
		bgm.pause();
		bgm.currentTime=0;
		pauseSound.play();
	}
}
function startGame()
{	// Starts the game up
	let mousePosition = app.renderer.plugins.interaction.mouse.global;
	titleSound.pause();
	goy.pause();
	startScene.visible = false;
	gameOverScene.visible = false;
	gameScene.visible = true;
	pauseScene.visible = false;
	life=500;
	backgroundGO.x=sceneWidth/2;
	backgroundGO.y=sceneHeight/2;
	decreaseLifeBy(0);
	ship.x = mousePosition.x;
	ship.y = mousePosition.y;
	createCircles(Math.random()*120+100);
	bgm.play();
	paused = false;
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
	let newX = lerp(ship.x, mousePosition.x, amt);
	let newY = lerp(ship.y, mousePosition.y, amt);
	// keep the head on the screen with clamp
	let w2 = ship.width/2;
	let h2 = ship.height/2;
	ship.x = clamp(newX, 0+w2, sceneWidth-w2);
	ship.y = clamp(newY, 0+h2, sceneHeight-h2);
	for (let c of circles)
	{	// Moves the orbs
		c.move(dt);
		if (c.x <= c.radius || c.x >= sceneWidth-c.radius)
		{	//horizontal bouncing
			c.reflectX();
		}
		if (c.y <= c.radius || c.y >= sceneHeight-c.radius)
		{	//vertical bouncing
			c.reflectY();
		}
	}	// Checks for collisions
	for (let c of circles)
	{
		if (c.isAlive && rectsIntersect(c,ship))
		{	//makes it sound like a constant burn
			hitSound.play();
			decreaseLifeBy(c.damage);
		}
	}
	circles=circles.filter(c=>c.isAlive);
	if (life <= 0)
	{	// Is game over?
		end();
		return;
	}
}
function end()
{	//kills the game
	pauseScene.visible=false;
	paused = true;
	bgm.pause();
	bgm.currentTime=0;
	goy.play();
	circles.forEach(c=>gameScene.removeChild(c)); // concise arrow function with no brackets and no return
	circles = [];
	gameOverScene.visible = true;
	gameScene.visible = false;
	backDropGO.x=sceneWidth/2;
	backDropGO.y=sceneHeight/2;
}