
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
	
	this.size = GameDisplay.size / 2;

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
var Board = {}
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

//takes clicked piece and builds an array of what needs to be displayed
function buildMovement (piece)
{
	var movementArray;

	switch (piece.type)
	{
		case Type.KNIGHT:
		
		break;

		case Type.BISHOP:

		break;

		case Type.ROOK:

		break;

		case Type.KING:

		break;

		case Type.QUEEN:

		break;

		case Type.PAWN:

		break;

		default:
	}
	
}



//takes what you want to iterate over, what you want to do, and stateCheck (1 == must be active, 0 == must be inactive, 2 == doesn't matter)
function forEachPiece(piece, action)
{
	function iterate(piece)
	{
		for (var i = 0; i < piece.length; i++)
		{
			if (piece[i] instanceof Array)
			{
				iterate(piece[i]);
			}
			else
			{
				action(piece[i]);
				
			}	
		}
	}
	iterate(piece);
};



/*****************
DISPLAY
*****************/

var GameDisplay =
{

	size: 0,
	
	drawBackground: function()
	{
		var img = new Image();
		img.src = "../img/BoardImage.png";
		var canvas = document.getElementById("background");
		var ctx = canvas.getContext("2d");
		canvas.width = this.size;
		canvas.height = this.size;

		console.log("drawing background");
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);	

		backgroundLoaded = true;
	},



//Draws quad for all positions in the positionArray

	drawOverlay: function (positionArray)
	{
		var r;
		var c;
		var firstAngle;
		var secondAngle;
		var canvas = document.getElementById("overlay");
		var ctx = canvas.getContext("2d");
		canvas.width = this.size;
		canvas.height = this.size;
		var x = canvas.width/2;
		var y = canvas.height/2;

		function draw(o)
		{
			r = o.radial;
			c = o.circle;
			firstAngle = r/12*Math.PI;
			secondAngle = (r+1)/12*Math.PI;

			
			ctx.beginPath();
			ctx.arc(x, y, circles.ring[c+1] , firstAngle - Math.PI/2, secondAngle - Math.PI/2);
			ctx.arc(x, y, circles.ring[c], secondAngle - Math.PI/2, firstAngle - Math.PI/2, true);
			ctx.closePath();
			ctx.fillStyle = "rgba(242,46,46,0.5)";

			ctx.fill();
		}

		forEachPiece(positionArray, draw);
	
	},

	drawPiece: function(piece)
	{
		var canvas = document.getElementById("pieces");
		var ctx = canvas.getContext("2d");
		canvas.width = this.size;
		canvas.height = this.size;
		canvas.addEventListener("click", ClickHandler.clickPosition);

		console.log(canvas.height);
		
		function draw(p)
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
		
		forEachPiece(piece, draw);
	}


};

/******************
   CLICK HANDLER
 *******************/
var ClickHandler =
{
	size: 0,
	clickedArray: [],

	clickPosition: function(event)
	{
		//pixel location of click - canvas displacement + page offset (scrolling) - half of pixels to center
		var x = event.clientX - this.offsetLeft + window.pageXOffset -  event.currentTarget.width/2;
		var y = -(event.clientY - this.offsetTop + window.pageYOffset - event.currentTarget.height/2);
		//distance from center.  Used to determine which circle is clicked
		var distance = Math.sqrt(x*x + y*y);

		var clickedPosition = new Position(determineCircle(distance, circles), determineRadial(x,y));
		
		console.log(forEachPiece(gamePieces, determinePiece));
		
		
		//ClickHandler.clickedArray.push(clickedPosition);
		//GameDisplay.drawOverlay(ClickHandler.clickedArray);
		//console.log(ClickHandler.clickedArray);

		function determineCircle (distance, o)
		{
			var rValue;
			if (distance > o.ring[6] || distance < o.ring[0]) {rValue = -1;} else
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

		function determinePiece(p)
		{
			//console.log(clickedPosition);
			//console.log(p.position);
			if (clickedPosition.circle === p.position.circle && clickedPosition.radial === p.position.radial)
			{
				console.log(p);
				//console.log(clickedPosition);
				return p;
			}
		}
	}
};

function start(size)
{
	circles = 0;
	gamePieces = 0;	

	gamePieces = [[16],[16],[16]];
	GameDisplay.size = size;
	
	circles = new GenerateCircles();
	generatePieces();

	GameDisplay.drawBackground();
	GameDisplay.drawPiece(gamePieces);
}

function resize(size)
{
	GameDisplay.size = size;

	circles = new GenerateCircles();

	GameDisplay.drawBackground();
	GameDisplay.drawPiece(gamePieces);
}


//TODO: Arrange everything in a way that actually makes sense


/******************
Game logic
 ******************/

window.onload = function(){start(480);}

