function startGame()
{	// Starts the game up
	let mousePosition = app.renderer.plugins.interaction.mouse.global;
	titleBGM.pause();
	failBGM.pause();
	startScene.visible = false;
	gameOverScene.visible = false;
	gameScene.visible = true;
	pauseScene.visible = false;
	life=10;
	decreaseLifeBy(0);
	head.x = mousePosition.x;
	head.y = mousePosition.y;
	createObstacles(8);
	playBGM.play();
	paused = false;
}
function pauseGame()
{	//makes the pause screen display
	if(paused && pauseScene.visible==true)
	{	//resumes the game if you paused it
		pauseScene.visible=false;
		lifeLabel.visible=true;
		paused=false;
		playBGM.play();
		pauseBGM.pause();
		pauseBGM.currentTime=0;
	}
	else if (gameScene.visible==true)
	{// pauses the game
		pauseScene.visible=true;
		lifeLabel.visible=false;
		paused=true;
		playBGM.pause();
		playBGM.currentTime=0;
		pauseBGM.play();
	}
}
function end()
{	//kills the game
	pauseScene.visible=false;
	paused = true;
	playBGM.pause();
	playBGM.currentTime=0;
	failBGM.play();
	bubbles.forEach(c=>gameScene.removeChild(c));
	bubbles = [];
	dolphins.forEach(c=>gameScene.removeChild(c));
	dolphins = [];
	gameOverScene.visible = true;
	gameScene.visible = false;
}
function returnToTitle()
{//returns the user to the title screen from either the game over or credits scenes
	creditsScene.visible=false;
	gameOverScene.visible=false;
	startScene.visible=true;
	failBGM.currentTime=0;
	failBGM.pause();
	titleBGM.currentTime=0;
	titleBGM.play();
	creditsBGM.currentTime=0;
	creditsBGM.pause();
}
function viewCredits()
{//sends the viewer to the credits scene
	creditsScene.visible=true;
	startScene.visible=false;
	titleBGM.currentTime=0;
	titleBGM.pause();
	creditsBGM.play();
}