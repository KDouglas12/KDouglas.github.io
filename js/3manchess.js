
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
		this. radial = radial;
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

//takes half of the height of the board and builds an object that holds the distance from center that each circle is.
//TODO: Update whatever object it created by this when the board is resized
function GenerateCircles ()
{
	this.size = canvas.height / 2;
	this.ring6 = this.size;
	this.ring5 = this.size * 0.873;
	this.ring4 = this.size * 0.748;
	this.ring3 = this.size * 0.623;
	this.ring2 = this.size * 0.500;
	this.ring1 = this.size * 0.375;
	this.ring0 = this.size * 0.250;
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
			
			switch (i)
			{
				case 0:
				case 7:
					selectedType = Type.ROOK;
					break;
				case 1:
				case 6:
					selectedType = Type.KNIGHT;
					break;
				case 2:
				case 5:
					selectedType = Type.BISHOP;
					break;
				case 3:
					selectedType = Type.KING;
					break;
				case 4:
					selectedType = Type.QUEEN;
					break;
				default: throw CIRCLE_OUT_OF_BOUND + "Switch";
			}
			
			gamePieces[selectedTeam][i] = new Piece(selectedType, selectedTeam, MAX_CIRCLE, startR + i, true);
			i++;
		}

		//generates pawns for next outermost circle
		while (startR + i-8 < endR)
		{
			gamePieces [selectedTeam][i] = new Piece(Type.PAWN, selectedTeam, MAX_CIRCLE - 1, startR + i-8, true);
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

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var backgroundImage = new Image();
backgroundImage.src = "../img/BoardImage.png";
canvas.width = 480;
canvas.height = 480;
backgroundImage.onload = function()
{
	ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};


/******************
CLICK HANDLER
*******************/
canvas.addEventListener("click", clickPosition);

function clickPosition(event)
{
	//pixel location of click - canvas displacement - half of pixels to center
	var x = event.clientX - this.offsetLeft -  event.currentTarget.width/2;
	var y = -(event.clientY - this.offsetTop - event.currentTarget.height/2);
	//distance from center.  Used to determine which circle is clicked
	var distance = Math.sqrt(x*x + y*y);
	

	clickedPosition = new Position(determineCircle(distance, circles), determineRadial(x,y));
	console.log(clickedPosition);

	/*
	DEBUG LOG MESSAGES
	console.log("offset x: " + this.offsetLeft);
	console.log("raw x: " + event.clientX);
	console.log("width: " + event.currentTarget.height);
	console.log("width: " + event.currentTarget.width);
	console.log("raw y: " + event.clientY);
	console.log("offset y: " + this.offsetTop);
	console.log("x position: " + x);
	console.log("y position: " + y);
	*/
		
}

//takes the distance from the center (e) and a generateCircles object (o) and returns which circle was clicked
function determineCircle (distance, o)
{
	var rValue;
	if (distance > o.ring6 || distance < o.ring0) {rValue = -1;} else
	if (distance > o.ring5) {rValue = 5;} else
	if (distance > o.ring4) {rValue = 4;} else
	if (distance > o.ring3) {rValue = 3;} else
	if (distance > o.ring2) {rValue = 2;} else
	if (distance > o.ring1) {rValue = 1;} else
	if (distance > o.ring0) {rValue = 0;}

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



function start()
{
	circles = 0;
	gamePieces = 0;

	gamePieces = [[16],[16],[16]];
	circles = new GenerateCircles();
	generatePieces();
}

//TODO: Arrange everything in a way that actually makes sense


/******************
Game logic
 ******************/
start();
