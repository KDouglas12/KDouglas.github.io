
//TODO:

//Build movement logic
//build center movement logic (should just be radial-12 (+something if negative) for straight pieces and like +8 to circle for diaglal pieces)


//Player 1 start
//GAMEPLAY LOOP
//Piece selection
//Highlight possible moves as defined by movement rules
//Movement
//Update board
//Remove taken pieces
//Turn complete
//END GAMEPLAY LOOP

//Eliminated player
//Game end
//Restart
//???...



//Define board as a radial grid
//24 radials each radial is 6 units long, circle numbering starts innermost with 0, radials start at the earliest position for player1 and number from 0-23 clockwise
const MAX_CIRCLE = 5;
const MAX_RADIAL = 23;

/***********************
Errors
***********************/
var CIRCLE_OUT_OF_BOUND = new RangeError("Circle must be between 0 and " + MAX_CIRCLE);
var RADIAL_OUT_OF_BOUND = new RangeError("Radial must be between 0 and " + MAX_RADIAL);


/***********************
Globals
 **********************/
var circles;
var gamePieces = [[16],[16],[16]];
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

/************************
Data types
************************/
var Type =
{
	KING: 0,
	QUEEN: 1,
	BISHOP: 2,
	KNIGHT: 3,
	ROOK: 4,
	PAWN: 5
}

var Team =
{
	PLAYER1: 0,
	PLAYER2: 1,
	PLAYER3: 2
}

//Point datatype for position on board
function Position(circle, radial)
{
	//error checking, circle > 0 and < MAX_CIRCLE
	if (circle > MAX_CIRCLE || circle < 0)
	{
		throw CIRCLE_OUT_OF_BOUND;
	}
	else
	{
		this.circle = circle;
	}

	if (radial > MAX_RADIAL || radial < 0)
	{
		throw RADIAL_OUT_OF_BOUND;
	}
	else
	{
		this.radial = radial;
	}
}

//generates game pieces.  position is a Position object, type and team are enums, active is bool
function Piece(type, team, circle, radial, active)
{
	this.type = type;
	this.team = team;
	this.position = new Position(circle, radial);
	this.active = true;

}

Piece.prototype.updatePosition = function(circle, radial)
{
	this.position = new Position(circle, radial);
}

Piece.prototype.addImage = function(source)
{
	this.img = new Image();
	this.img.src = source;
}


//takes half of the height of the board and builds an object that holds the distance from center that each circle is.
//TODO: Update whatever object it created by this when the board is resized
function GenerateCircles ()
{
	
	this.size = canvas.height / 2;

	this.ring = [];
	this.ring[6] = this.size;
	this.ring[5] = this.size * 0.873;
	this.ring[4] = this.size * 0.748;
	this.ring[3] = this.size * 0.623;
	this.ring[2] = this.size * 0.500;
	this.ring[1] = this.size * 0.375;
	this.ring[0] = this.size * 0.250;
}

/************************
END Data types
 ************************/

//generates all game pieces
function generatePieces ()
{
	for (var team in Team)
	{
		var selectedTeam = Team[team];
		
		var startR = selectedTeam * 8;
		var endR = startR + 8;
		var i = 0;

		//Generates pieces for the ouermost circle
		while (startR + i < endR)
		{
			var selectedType = 0;
			var source = "../img/pieces/"
			
			switch (i)
			{
				case 0:
				case 7:
				
				selectedType = Type.ROOK;
				source += "r" + selectedTeam + ".png";
				break;
				
				case 1:
				case 6:
				
				selectedType = Type.KNIGHT;
				source += "kn" + selectedTeam + ".png";
				break;
				
				case 2:
				case 5:
				
				selectedType = Type.BISHOP;
				source += "b" + selectedTeam + ".png";
				break;
				
				case 3:
				
				selectedType = Type.KING;
				source += "k" + selectedTeam + ".png";
				break;
				
				case 4:
				
				selectedType = Type.QUEEN;
				source += "q" + selectedTeam + ".png";
				break;
				
				default: throw CIRCLE_OUT_OF_BOUND + "Switch";
			}
			
			gamePieces[selectedTeam][i] = new Piece(selectedType, selectedTeam, MAX_CIRCLE, startR + i, true);
			gamePieces[selectedTeam][i].addImage(source);
			source = "../img/pieces/";
			i++;
		}

		//generates pawns for next outermost circle
		while (startR + i-8 < endR)
		{
			gamePieces [selectedTeam][i] = new Piece(Type.PAWN, selectedTeam, MAX_CIRCLE - 1, startR + i-8, true);
			gamePieces[selectedTeam][i].addImage(source + "p" + selectedTeam+".png");
			source = "../img/pieces/";
			i++;
		}
		
		
	}
}


/*********************
MOVEMENT LOGIC
*********************/

//rules for movement:
//Pawn: initial move, move one or two, each other move moves one.  Can't move if blocked, can move forward +1 and traverse to adjacent radial if enemy unit is there
//Rook: Forward/backward along radial to end, traverse circle in loop
//Bishop: traverses along diagnal (maintin +-1, +-1 for radial, circle)
//Queen: Rook+bishop rules
//Knight: +-2 in radial/circle +-1 in radial
//King: +-1,+-1 (radial, circle) "check" check
//Center logic: ??? TBD


function buildMovement (piece)
{
	
}


/*****************
DISPLAY
*****************/


function drawBackground()
{
	var img = new Image();
	img.src = "../img/BoardImage.png";

	console.log("drawing background");
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);	

	backgroundLoaded = true;
}



//Draws quad for all positions in the positionArray
function drawOverlay(positionArray)
{
	var r;
	var c;
	var firstAngle;
	var secondAngle;
	var x = canvas.width/2;
	var y = canvas.height/2;
	
	for (i = 0; i < positionArray.length; i++)
	{
		r = positionArray[i].radial;
		c = positionArray[i].circle;
		firstAngle = r/12*Math.PI;
		secondAngle = (r+1)/12*Math.PI;

			
		ctx.beginPath();
		ctx.arc(x, y, circles.ring[c+1] , firstAngle - Math.PI/2, secondAngle - Math.PI/2);
		ctx.arc(x, y, circles.ring[c], secondAngle - Math.PI/2, firstAngle - Math.PI/2, true);
		ctx.closePath();
		ctx.fill();
	}

}

function drawPiece(piece)
{
	var draw = function(p)
	{
		var img = p.img;
		var c = p.position.circle;
		var r = p.position.radial+0.5;
		var distance = (circles.ring[c] + circles.ring[c+1])/2;

		var angle = r/12*Math.PI;

		var x = (canvas.width/2) + (Math.sin(angle)*distance);
		var y = (canvas.height/2) - (Math.cos(angle)*distance);
		
		ctx.drawImage(img, x-10, y-10, 20, 20 * img.height/img.width);
	};

	if (Array.isArray(piece))
	{
		for (var i in piece)
		{
			for (var q in piece[i])
			{
				if (piece[i][q].active)
				{
					draw(piece[i][q]);
				}
			}	
		}	
	}
	else
	{
		if (piece.active)
		{
			draw(piece);
		}
	}
}




/******************
CLICK HANDLER
*******************/
canvas.addEventListener("click", clickPosition);

function clickPosition(event)
{
	//pixel location of click - canvas displacement - half of pixels to center
	var x = event.clientX - this.offsetLeft + window.pageXOffset -  event.currentTarget.width/2;
	var y = -(event.clientY - this.offsetTop + window.pageYOffset - event.currentTarget.height/2);
	//distance from center.  Used to determine which circle is clicked
	var distance = Math.sqrt(x*x + y*y);
	console.log(window.pageYOffset);
	

	clickedPosition = new Position(determineCircle(distance, circles), determineRadial(x,y));
	var clickedArray = [];
	clickedArray[0] = clickedPosition;
	drawOverlay(clickedArray);
	
	console.log(clickedPosition);		
}

//takes the distance from the center (e) and a generateCircles object (o) and returns which circle was clicked
function determineCircle (distance, o)
{
	var rValue;
	if (distance > o.ring[6] || distance < o.ring0) {rValue = -1;} else
	if (distance > o.ring[5]) {rValue = 5;} else
	if (distance > o.ring[4]) {rValue = 4;} else
	if (distance > o.ring[3]) {rValue = 3;} else
	if (distance > o.ring[2]) {rValue = 2;} else
	if (distance > o.ring[1]) {rValue = 1;} else
	if (distance > o.ring[0]) {rValue = 0;}

	return rValue;
}

//x is calculated x pixel position on board, y is the calculated y pixel position on board
//takes x, y and determines what radial the clicked pixel is in
function determineRadial (x, y)
{
	//Math.atan2(x, y) opposite from normal because I'm measuring 0 to be at 12 o'clock instead of at 3 o'clock

	//holds the degree
	var clickDegreeAngle;

	//adds 360 if in quadrent 3 or 4 (x is negative)
	if (x < 0)
	{
		clickDegreeAngle = Math.floor(180*Math.atan2(x, y)/Math.PI) + 360
	} else
	{
		clickDegreeAngle = Math.floor(180*Math.atan2(x, y)/Math.PI)
	}

	//24 radials (0-23), divides the degrees by 15 because 360/24 = 15
	return Math.floor(clickDegreeAngle/15)
}



function start(size)
{
	circles = 0;
	gamePieces = 0;
	canvas.width = size;
	canvas.height = size;	

	gamePieces = [[16],[16],[16]];
	circles = new GenerateCircles();
	generatePieces();

	drawBackground();
	drawPiece(gamePieces);
}

function resize(size)
{
	canvas.width = size;
	canvas.height = size;

	circles = new GenerateCircles();

	drawBackground();
	drawPiece(gamePieces);
}


//TODO: Arrange everything in a way that actually makes sense


/******************
Game logic
 ******************/

window.onload = function(){start(480);}

