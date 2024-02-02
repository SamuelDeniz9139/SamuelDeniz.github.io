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
	startButton=new Button("images/startButton.png","images/startHover.png",sceneWidth*0.3,500,startGame);
	startScene.addChild(startButton);
	creditsButton=new Button("images/creditsButton.png","images/creditsHover.png",sceneWidth*0.7,500,viewCredits);
	startScene.addChild(creditsButton);
	retryButton=new Button("images/retryButton.png","images/retryHover.png",sceneWidth*0.3,400,startGame);
	gameOverScene.addChild(retryButton);
	titleButton=new Button("images/titleButton.png","images/titleHover.png",sceneWidth*0.7,400,returnToTitle);
	gameOverScene.addChild(titleButton);
	returnButton=new Button("images/titleButton.png","images/titleHover.png",sceneWidth/2,500,returnToTitle);
	creditsScene.addChild(returnButton);
	head = new Head();
	gameScene.addChild(head);
	createLabels();
	app.ticker.add(gameLoop);
	titleBGM.play();
}
function generateStaticText(words,fill,size,font,thicc,yPos)
{//generates text that does not change
	let newText=new PIXI.Text(words);
	newText.style=new PIXI.TextStyle({
		fill: fill,
		fontSize: size,
		fontFamily: font,
		strokeThickness: thicc,
		stroke: 0xEEEEEE
	});
	newText.anchor.set(0.5);
	newText.x=sceneWidth/2;
	newText.y=yPos;
	return newText;
}
function createLabels()
{	//adds text to each scene of the game
	startScene.addChild(generateStaticText("v a p o r b r a v e",[0x00FFFF,0xFF00FF],80,"Rocket",3,100));
	startScene.addChild(generateStaticText("Move the statue with your mouse.",0xEEEEEE,30,"VCR",0,300));
	startScene.addChild(generateStaticText("Avoid obstacles for as long as you can.",0xEEEEEE,30,"VCR",0,330));
	startScene.addChild(generateStaticText("Click the screen to pause the game.",0xEEEEEE,30,"VCR",0,360));
	pauseScene.addChild(generateStaticText("p a u s e d",0xEEEEEE,60,"VCR",0,sceneHeight/2));
	gameOverScene.addChild(generateStaticText("GAME OVER",0xEEEEEE,80,"Alien",0,200));
    creditsScene.addChild(generateStaticText("CREDITS",0xEEEEEE,80,"Alien",0,50));
    for (let creds=0;creds<creditsText.length;creds++)
    {   //adds all the text to the credits scene
        creditsScene.addChild(generateStaticText(creditsText[creds],0xEEEEEE,20,"VCR",0,120+(30*creds)));
    }
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
	dolphins=dolphins.filter(c=>c.isAlive);
	if (life <= 0)
	{	// Is game over?
		end();
		return;
	}
}