
//TODO:

//Build movement logic
//build center movement logic

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

Piece.prototype.UpdatePosition = function(circle, radial)
{
	this.position = new Position (circle, radial);
}

/************************
END Data types
 ************************/

//stores the enire collection of game pieces by team
var gamePieces = [[16],[16],[16]];


//generates all game pieces
function generatePieces ()
{
	for (var team in Team)
	{
		console.log(team);
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
			console.log(selectedTeam);

		}

		//generates pawns for next outermost circle
		while (startR + i-8 < endR)
		{
			gamePieces [selectedTeam][i] = new Piece(Type.PAWN, selectedTeam, MAX_CIRCLE - 1, startR + i-8, true);
			i++;
		}
		
		
	}
}

//MOVEMENT LOGIC
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

//DISPLAY

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var backgroundImage = new Image();
canvas.width = 980;
canvas.height = 980;
backgroundImage.onload = function(){
	ctx.drawImage(backgroundImage, 1, 1);
};
backgroundImage.src = "../img/BoardImage.png";


