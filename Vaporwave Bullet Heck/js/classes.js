class Ship extends PIXI.Sprite
{   //what you control
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["images/Spaceship.png"].texture);
        this.anchor.set(.5, .5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.15);
        this.x = x;
        this.y = y;
    }
}
class Background extends PIXI.Sprite
{   //the title screen background
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/background.jpg"].texture);
        this.anchor.set(0.08,0); // wasn't able to center the image unless i messed with these parameters
        this.scale.set(0.3);
        this.x = x;
        this.y = y;
    }
}
class Backdrop extends PIXI.Sprite
{   //the pause screen background
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/backgroundGO.jpg"].texture);
        this.anchor.set(0.5,0.5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.5);
        this.x = x;
        this.y = y;
    }
}
class BackdropGO extends PIXI.Sprite
{   //game over screen
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/backdropGO.jpg"].texture);
        this.anchor.set(0.5,0.5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.7);
        this.x = x;
        this.y = y;
    }
}
class BackgroundGO extends PIXI.Sprite
{   //game screen
    constructor(x=0,y=0)
    {
        super(app.loader.resources["images/backdrop.jpg"].texture);
        this.anchor.set(0.5,0.5); // position, scaling, rotating etc are now from center of sprite
        this.scale.set(0.7);
        this.x = x;
        this.y = y;
    }
}
class Circle extends PIXI.Sprite
{   //the basic green orbs
    constructor(radius, x=0, y=0)
    {
        super(app.loader.resources["images/eball.png"].texture);
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
    reflectX(sceneWidth)
    {
		this.fwd.x *= -1;
	}
    reflectY(sceneHeight)
    {
		this.fwd.y *= -1;
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
    reflectX(sceneWidth)
    {
		this.fwd.x *= -1;
	}
    reflectY(sceneHeight)
    {
		this.fwd.y *= -1;
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
	}
    reflectX(sceneWidth)
    {
		this.fwd.x *= -1;
	}
    reflectY(sceneHeight)
    {
		this.fwd.y *= -1;
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
	}
    reflectX(sceneWidth)
    {
		this.fwd.x *= -1;
	}
    reflectY(sceneHeight)
    {
		this.fwd.y *= -1;
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