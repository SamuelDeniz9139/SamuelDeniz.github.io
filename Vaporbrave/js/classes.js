class Head extends PIXI.Sprite
{   //what you control
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/statue.png"].texture);
        this.anchor.set(0.5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.15);
        this.x = x;
        this.y = y;
    }
}
class TitleBG extends PIXI.Sprite
{   //the title screen background
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/BGtitle.jpg"].texture);
        this.anchor.set(0.5);
        this.scale.set(0.5);
        this.x = app.screen.width/2;
        this.y = app.screen.height/2;
    }
}
class PlayBG extends PIXI.Sprite
{   //game screen
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/BGplay.jpg"].texture);
        this.anchor.set(0.5);
        this.scale.set(0.7);
        this.x = app.screen.width/2;
        this.y = app.screen.height/2;
    }
}
class FailBG extends PIXI.Sprite
{   //game over screen
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/BGfail.jpg"].texture);
        this.anchor.set(0.5);
        this.scale.set(0.3);
        this.x = app.screen.width/2;
        this.y = app.screen.height/2;
    }
}
class CreditsBG extends PIXI.Sprite
{   //the pause screen background, will eventually become the background for the credits page
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/BGcredits.jpg"].texture);
        this.anchor.set(0.5);
        this.scale.set(0.5);
        this.x = app.screen.width/2;
        this.y = app.screen.height/2;
    }
}
class Circle extends PIXI.Sprite
{   //the basic green orbs
    constructor(radius, x=0, y=0)
    {
        super(app.loader.resources["images/eball.png"].texture);
        this.anchor.set(.5);
        this.scale.set(0.075);
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
class Elcric extends PIXI.Sprite
{   //the blue, horizontally oriented orbs
    constructor(radius, x=0, y=0)
    {
        super(app.loader.resources["images/nball.png"].texture);
        this.anchor.set(.5, .5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.075);
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
class Sphere extends PIXI.Sprite
{   //the large, white, instakill orb
    constructor(radius, x=0, y=0)
    {
        super(app.loader.resources["images/nrgball.png"].texture);
        this.anchor.set(.5, .5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.3);
		this.x = x;
		this.y = y;
		this.radius = radius;
		// variables
		this.fwd = getRandomUnitVector();
		this.speed = 10;
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
	}// protected methods
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
class Clecir extends PIXI.Sprite
{   //the pink, vertically oriented orbs
    constructor(radius, x=0, y=0)
    {
        super(app.loader.resources["images/enball.png"].texture);
        this.anchor.set(.5, .5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.075);
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
	}// protected methods
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