
//rules for movement:
//Pawn: initial move, move one or two, each other move moves one.  Can't move if blocked, can move forward +1 and traverse to adjacent radial if enemy unit is there
//Rook: Forward/backward along radial to end, traverse circle in loop
//Bishop: traverses along diagnal (maintin +-1, +-1 for radial, circle)
//Queen: Rook+bishop rules
//Knight: +-2 in radial/circle +-1 in radial
//King: +-1,+-1 (radial, circle) "check" check
//Center logic: ??? TBD

//TODO:

//Create pieces
//Place pieces in correct position
//Build movement logic including center movement

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



//Define board as a radial grid?
//24 radials each radial is 6 units long, circle numbering starts at center with 1, radials start at top and number from 1-24 clockwise

const MAX_CIRCLE = 6;
const MAX_RADIAL = 24;

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


//Create board and any datatypes necessary to hold board
function Position(circle, radial)
{
	if (circle > MAX_CIRCLE || circle <= 0)
	{
		throw "Position is out of bounds";
	}
	else
	{
		this.circle = circle;
	}

	if (radial > MAX_RADIAL || radial <= 0)
	{
		throw "Position is out of bounds";
	}
	else
	{
		this. radial = radial;
	}
}

var Board = [[]];

//generates game pieces.  position is a Position object, type and team are enums, active is bool
function Piece(type, team, position, active)
{
	this.type = type;
	this.team = team;
	this.position = Position;
	this.active = active;
}








