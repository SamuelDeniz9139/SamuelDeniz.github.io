// http://paulbourke.net/miscellaneous/interpolation/
function lerp(start, end, amt)
{	// interpolates the head towards the mouse position
	return start * (1-amt) + amt * end;
}
function cosineInterpolate(y1, y2, amt)
{	// unused
	let amt2 = (1 - Math.cos(amt * Math.PI)) / 2;
	return (y1 * (1 - amt2)) + (y2 * amt2);
}
function clamp(val, min, max)
{	// keeps the head on the screen
    return val < min ? min : (val > max ? max : val);
}
function rectsIntersect(a,b)
{    // bounding box collision detection - it compares PIXI.Rectangles
	var ab = a.getBounds();
	var bb = b.getBounds();
	return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}
function getRandomUnitVector()
{	// these 2 helpers are used by classes.js
	let x = getRandom(-1,1);
	let y = getRandom(-1,1);
	let length = Math.sqrt(x*x + y*y);
	if(length == 0){ // very unlikely
		x=1; // point right
		y=0;
		length = 1;
	} else {
		x /= length;
		y /= length;
	}
	return {x:x, y:y};
}
function getRandom(min, max)
{
	return Math.random() * (max - min) + min;
}