class Head extends PIXI.Sprite
{//what you control
    constructor(x=0, y=0)
    {
        super(app.loader.resources["images/statue.png"].texture);
        this.anchor.set(0.5); // position, scaling, rotating etc are now from center of sprite
        this.x = x;
        this.y = y;
    }
}
class BG extends PIXI.Sprite
{//controls all backgrounds, all should be 700x500, the same as the game window
    constructor(imageSource,x=0,y=0)
    {
        super(app.loader.resources[imageSource].texture);
        this.anchor.set(0.5);
        this.x = app.screen.width/2;
        this.y = app.screen.height/2;
    }
}
class Button extends PIXI.Sprite
{//contains the structure for all buttons that appear in the game
    constructor(buttonSprite,hoverSprite,buttonX,buttonY,buttonFunction,x=0,y=0)
    {
        super(app.loader.resources[buttonSprite].texture);
        this.anchor.set(0.5);
        this.x=buttonX;
        this.y=buttonY;
        this.interactive=true,
        this.buttonMode=true;
        this.on("pointerover",function(){
            this.texture=app.loader.resources[hoverSprite].texture;
        });
        this.on("pointerout",function(){
            this.texture=app.loader.resources[buttonSprite].texture;
        });
        this.on("pointerdown",buttonFunction);
    }
}
class Bubble extends PIXI.Sprite
{//obstacles that bounce off the screen's sides
    constructor(radius, x=0, y=0)
    {
        super(app.loader.resources["images/bubble.png"].texture);
        this.anchor.set(0.5);
		this.x = x;
		this.y = y;
		this.radius = radius;
		// variables
		this.fwd = getRandomUnitVector();
		this.speed = 50;
		this.isAlive = true;
	}	// abstract method - declared, but no implementation
    activate()
    {
    }	// public methods to be called from main.js
    _chase(dt)
    {
        let t = this.target;
        let amt = 3.0 * dt;
        let newX = cosineInterpolate(this.x, t.x, amt);
        let newY = cosineInterpolate(this.y, t.y, amt);
        this.x = newX;
        this.y = newY;
    }
    move(dt=1/60)
    {
		this.x += this.fwd.x * this.speed * dt;
		this.y += this.fwd.y * this.speed * dt;
	}
    _wrapX(sceneWidth)
    {
        if (this.fwd.x < 0 && this.x < 0 - this.radius)
        {
			this.x = sceneWidth + this.radius;
		}
        if(this.fwd.x > 0 && this.x > sceneWidth + this.radius)
        {
			this.x = 0 -  this.radius;
		}
	}
    _wrapY(sceneHeight)
    {
		if (this.fwd.y < 0 && this.y < 0 - this.radius){
			this.y = sceneHeight + this.radius;
		}
		if(this.fwd.y > 0 && this.y > sceneHeight + this.radius){
			this.y = 0 - this.radius;
		}
	}
}
class Dolphin extends PIXI.Sprite
{   //should travel horizontally, leave the screen, and reappear on the other side
    constructor(radius, x=0, y=0)
    {
        super(app.loader.resources["images/dolphin.png"].texture);
        this.anchor.set(.5);
		this.x = x;
		this.y = y;
        this.isAlive = true;
		this.radius = radius;
		this.fwd = 1;//getRandomUnitVector();
        /*if(this.fwd<0)
        {
            this.fwd*=-1;
        }*/
	}	// abstract method - declared, but no implementation
    activate()
    {
	  
    }	// public methods to be called from main.js
    _chase(dt)
    {
        let t = this.target;
        let newX = cosineInterpolate(this.x, t.x, 3*dt);
        let newY = cosineInterpolate(this.y, t.y, 3*dt);
        this.x = newX;
        this.y = newY;
    }
    move(dt=1/60)
    {
		this.x += this.fwd.x * this.speed * dt;
		this.y += this.fwd.y * this.speed * dt;
	}
    _wrapX(sceneWidth)
    {
        if (this.fwd.x < 0 && this.x < 0 - this.radius)
        {
			this.x = sceneWidth + this.radius;
		}
        if(this.fwd.x > 0 && this.x > sceneWidth + this.radius)
        {
			this.x = 0 -  this.radius;
		}
	}
    _wrapY(sceneHeight)
    {
		if (this.fwd.y < 0 && this.y < 0 - this.radius){
			this.y = sceneHeight + this.radius;
		}
		if(this.fwd.y > 0 && this.y > sceneHeight + this.radius){
			this.y = 0 - this.radius;
		}
	}
}