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
let creditsText=["BACKGROUNDS:","https://hdqwalls.com/wallpaper/2560x1440/vaporwave", "https://wallpaperaccess.com/vaporwave-desktop",
"MUSIC:","MACINTOSH PLUS - リサフランク420 / 現代のコンピュー", "Kalax - Shibuya Lights (VAPORWAVE - AESTHETIC)",
"Lucien Hughes - S U N D A Y  S C H O O L","HOME - Resonance", "Glass Animals - The Other Side of Paradise V A P O R W A V E","",
"Developed by Samuel Deniz using PixiJS"];
let bgScales=[0.5,0.7,1,0.6,0.6];
let head,lifeLabel;
let playBGM = new Howl({
	src: ['sounds/gameMusic.mp3'],
	autoplay:false,
	loop:true
});//gameplay music
let pauseBGM = new Howl({
	src: ['sounds/pauseMusic.mp3'],
	autoplay:false,
	loop:true
});//paused music
let failBGM = new Howl({
	src: ['sounds/gameOverMusic.mp3'],
	autoplay:false,
	loop:true
});//game over music
let titleBGM = new Howl({
	src: ['sounds/titleMusic.mp3'],
	autoplay:false,
	loop:true
});//title screen music
let creditsBGM = new Howl({
	src: ['sounds/creditsMusic.mp3'],
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