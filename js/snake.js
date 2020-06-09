// Cobra
var snake = (function () {	'use strict';
	var direction;
	var lastDirection;
	var leng;
	var body = new Array();
	var ctx;
	var size;
	var selfCollision;
	var squareCollision;

	function setDirection (arg) { direction = arg; };
	function setSize (arg) { size = arg; };		
	function setLeng (arg) { leng = arg; };
	function setCtx (arg) { ctx = arg; };
	function setBody (i, lx, ly) {
		body[i] = {x : lx, y : ly};
	};
	function setSquareCollision (arg) { squareCollision = arg; };
	function setSelfCollision (arg) { selfCollision = arg; };

	function getLeng () { return leng; };
	function getBody () { return body; };
	function getLastDirection () { return lastDirection; };
	function getSelfCollision () { return selfCollision; };
	function getSquareCollision () { return squareCollision; };

	// DESENHA A COBRA
	function draw () {
		for (var i = 0; i < leng ; i++ ) {
			ctx.strokeStyle = "#888888";
			ctx.fillStyle = i == leng - 1 ? "#00CC29" : "#39ff14";
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeRect( body[i].x * size, body[i].y * size, size, size);
			ctx.fillRect( body[i].x * size, body[i].y * size, size, size);			
			ctx.closePath();
		};	
	};

	// MOVIMENTAÇÃO
	function move () {
		//Current x, y 
		var cX = body [leng - 1 ].x;
		var cY = body [leng - 1 ].y;

		switch (direction) {
			case 1: //cima
				cY --;
			break;
			case 2: //baixo
				cY ++;
			break;
			case 3: //direita
				cX ++;
			break;
			case 4: //esquerda
				cX --;
			break;
		}
		lastDirection = direction;

		for (var i = 0; i < leng -1; i++) {
			body [i].x = body[i + 1].x;
			body [i].y = body[i + 1].y;

			if (body [i + 1].x == cX && body [i + 1].y == cY ) {
				selfCollision = true;
			} 
			if (body [leng -1].x == square.getX() && body [leng -1].y == square.getY()) {
				squareCollision = true;
			};
		};		
		body [leng - 1 ].x = cX;
		body [leng - 1 ].y = cY;		
	};

	// CRESCE cada vez que encontra uma fruta
	function grow (sx, sy) {
		body.unshift({x : sx, y : sy});
		leng += 1;
	}

	return{
		setSize : setSize,
		setDirection : setDirection,
		setLeng : setLeng,
		setCtx : setCtx,
		setBody : setBody,
		setSquareCollision : setSquareCollision,
		setSelfCollision : setSelfCollision,
		getLeng : getLeng,
		getBody : getBody,
		getLastDirection : getLastDirection,
		getSelfCollision : getSelfCollision,
		getSquareCollision : getSquareCollision,
		draw : draw,
		move : move,
		grow : grow
	};
}());