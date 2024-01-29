"use strict";
const app = new PIXI.Application
({	//gives the application its parameters
    width: 800,
    height: 600
});
document.body.appendChild(app.view);
// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;
let startScene=new PIXI.Container();
let gameScene=new PIXI.Container();
let gameOverScene=new PIXI.Container();
let pauseScene=new PIXI.Container();
let creditsScene=new PIXI.Container();
let scenes=[startScene,gameScene,pauseScene,gameOverScene,creditsScene];
let bgImages=["images/BGtitle.jpg","images/BGplay.jpg","images/static.png","images/BGfail.jpg","images/BGcredits.jpg"];
let bgScales=[0.5,0.7,1,0.3,0.5];
let head,scoreLabel,lifeLabel,hitSound,bgm,goy,pauseSound,titleSound;
let bubbles = [];
let dolphins = [];
let score = 0;
let life = 100;
let paused = true;
let totalSeconds = 0;
window.onload = init;
function setup()
{	//sets up the whole game
	for (let s=0;s<scenes.length;s++){//adds the scenes to the game
		if (s>0){//sets all scenes as invisible except the title scene
			scenes[s].visible=false;
		};//the next two lines add the scenes themselves and then their backgrounds
		app.stage.addChild(scenes[s]);
		scenes[s].addChild(new BG(bgImages[s],bgScales[s]));
	};
	// Creates the head
	head = new Head();
	gameScene.addChild(head);
	// Loads the sounds
	hitSound = new Howl({
		src: ['sounds/fireball.mp3']
	});// burning sound. currently plays as you rapidly take damage
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
	createLabels();
	app.ticker.add(gameLoop);
	titleSound.play();
	// Now 'startScene' is visible. Clicking calls startGame()
}
function init()
{	//allows the clicks to pause and unpause the game
	document.querySelector("canvas").onclick = pauseGame;
}
function createObstacles(obst)
{
	for(let i=0;i<obst/8;i++)
	{	//creates the bubbles
		let c = new Bubble(5);
		c.damage=5;
		c.speed = Math.random() * 100 + 50;
		c.x = Math.random() * (sceneWidth - 50) + 25;
		c.y = Math.random() * (sceneHeight - 400) + 25;
		bubbles.push(c);
		gameScene.addChild(c);
	}
	for(let i=0;i<obst/12; i++)
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
function createLabels()
{	// sets up startScene
	let wordStyle = new PIXI.TextStyle({
		fill: 0xDDDDDD,
		fontSize: 60,
		fontFamily: 'VCR',
	});
	let sentStyle= new PIXI.TextStyle({
		fill: 0xDDDDDD,
		stroke: 0x444444,
		strokeThickness: 2,
		fontSize: 30,
		fontFamily: 'Alien',
	});
	let title = new PIXI.Text("v a p o r b r a v e");
	title.style = wordStyle;
	title.anchor.set(0.5);
	title.x = app.screen.width/2;
	title.y = 60;
	startScene.addChild(title);
	let instructions = new PIXI.Text("Move the statue with your mouse.\n\nAvoid obstacles for as long as you can.\n\nClick on the screen to pause.");
	instructions.style = sentStyle;
	instructions.anchor.set(0.5);
	instructions.x = app.screen.width/2;
	instructions.y = 300;
	startScene.addChild(instructions);
	lifeLabel = new PIXI.Text();
	lifeLabel.style = sentStyle;
	lifeLabel.x = 5;
	lifeLabel.y = 5;
	gameScene.addChild(lifeLabel);
	decreaseLifeBy(0);
	let paused = new PIXI.Text("p a u s e d");
	paused.style = wordStyle;
	paused.anchor.set(0.5);
	paused.x = sceneWidth/2;
	paused.y = sceneHeight/2;
	pauseScene.addChild(paused);
	// Sets up the Game Over Scene
	let gameOver = new PIXI.Text("g a m e   o v e r");
	gameOver.style = wordStyle;
	gameOver.anchor.set(0.5);
	gameOver.x = sceneWidth/2;
	gameOver.y = 100;
	gameOverScene.addChild(gameOver);
	let tryAgain = new PIXI.Text("Click the game screen to try again.");
	tryAgain.style = sentStyle;
	tryAgain.anchor.set(0.5);
	tryAgain.x = sceneWidth/2;
	tryAgain.y = 350;
	gameOverScene.addChild(tryAgain);
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
	life=100;
	decreaseLifeBy(0);
	head.x = mousePosition.x;
	head.y = mousePosition.y;
	createObstacles(50);
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
function pauseGame()
{	//makes the pause screen display
	if(paused)
	{	// unpauses the game
		if(pauseScene.visible==true)
		{	//resumes the game if you paused it
			pauseScene.visible=false;
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
		pauseScene.visible=true;
		paused=true;
		bgm.pause();
		bgm.currentTime=0;
		pauseSound.play();
	}
}
function end()
{	//kills the game
	pauseScene.visible=false;
	paused = true;
	bgm.pause();
	bgm.currentTime=0;
	goy.play();
	bubbles.forEach(c=>gameScene.removeChild(c));
	bubbles = [];
	dolphins.forEach(c=>gameScene.removeChild(c));
	dolphins = [];
	gameOverScene.visible = true;
	gameScene.visible = false;
}