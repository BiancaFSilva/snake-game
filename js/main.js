(function () {
	var canvas, ctx;
	var BLOCKSIZE, iniX, iniY, firstDirection, firstLeng; // variáveis cobra
	var gamePlay, gameInit, gameOver, gameWin;            // variáveis do jogo
	var lblLevel, lblSpeed, lblScore, lblStatus, btnRestar, arrStatus;  // parte do HTML
	var interval, acDelta, lastUpdateTime, msPerFrame, arrTimer;        //Variaveis tempo
	var sndcomer1 = document.getElementById("comer1"); 
    var sndcomer2 = document.getElementById("comer2"); 
    var sndgameover = document.getElementById("gameover"); 

	function main() {
		lblLevel = document.getElementById ('level');
		lblSpeed = document.getElementById ('speed');
		lblScore = document.getElementById ('score');
		lblStatus = document.getElementById ('status');
		btnRestar = document.getElementById ('restart');

		canvas = document.getElementById ("canvas");
		ctx = canvas.getContext ("2d"); 
		init ();
	}

	// CONFIGURAÇÕES INICIAIS
	function init () {
		valuesVariables ();

		// Inicia o personagem
		snake.setLeng (firstLeng);
		snake.setSize (BLOCKSIZE);
		snake.setCtx (ctx);
		snake.setDirection (firstDirection);
		snake.setSelfCollision (false);

		// "Sorteia" os valores de x e y
		for( i = 0; i < snake.getLeng(); i++ ){ 
			snake.setBody (i, iniX + i, iniY); 
		}	

		// Inicia a fruta
		square.setCanvas (canvas.width, canvas.height);
		square.setSize (BLOCKSIZE);
		square.setCtx (ctx);
		square.squarePosition ();

		gameLoop ();
		configureBtn ();
		controlKeyBoard ();
	}

	//Função seta valores iniciais
	function valuesVariables () {
		KeyBoard.DIRECTION.current = "";
		KeyBoard.ACTION.current = "";

		ctx.clearRect (0, 0, canvas.width, canvas.height);

		interface.setSpeed (1);
		interface.setScore (0);
		interface.setLevel (1);

		// Cobra e fruta
		BLOCKSIZE = 8;
	 	iniX = 10 ;
		iniY = 10 ;
		firstDirection = 3;
		firstLeng = 4;

		// Tempo
		arrTimer = [
					[ 200, 197.5, 195, 292.5, 190, 187.5, 185, 182.5, 180, 177.5],
					[ 175, 172.5, 170, 177.5, 175, 162.5, 160, 157.5, 155, 152.5],
					[ 150, 147.5, 145, 142.5, 140, 137.5, 135, 132.5, 130, 127.5],
					[ 125, 122.5, 110, 117.5, 115, 112.5, 110, 107.5, 105, 102.5],
					[ 100,  97.5,  95,  92.5,  90,  87.5,  85,  82.5,  80,  77.5],
					[  75,  72.5,  70,  77.5,  75,  62.5,  60,  57.5,  55,  52.5],
					[  50,    50,  50,    50,  50,    50,  50,    50,  50,    50],
					[  50,    50,  50,    50,  50,    50,  50,    50,  50,    50],
					[  50,    50,  50,    50,  50,    50,  50,    50,  50,    50],
					[  50,    50,  50,    50,  50,    50,  50,    50,  50,    50],
				   ];
		interval = 190;
	 	acDelta = 0;
	 	lastUpdateTime = 0;
	 	msPerFrame = arrTimer [interface.getLevel() - 1] [interface.getSpeed() - 1];

	  	arrStatus = ["Começar","Jogando","Pausado","Vencedor","Game Over"]; // Statua de jogo

	 	gamePlay = false;
	 	gameInit = false;
	 	gameOver = false;
	 	gameWin = false;
	};

	// Configuração do botão
	function configureBtn () {
		btnRestar.onclick = function () {
			init ();
		};
	};

	// Animação
	function gameLoop () {		
		var deltaTime = Date.now() - lastUpdateTime;
		if (snake.getLeng() == 650) { winGame (); };

		msPerFrame = arrTimer [interface.getLevel() - 1] [interface.getSpeed() - 1];

		lblLevel.innerHTML = interface.getLevel ();
		lblSpeed.innerHTML = interface.getSpeed ();
		lblScore.innerHTML = interface.getScore ();
		lblStatus.innerHTML = arrStatus [statusGame ()];

		controlKeyBoard ();		
		draw ();

		if (gamePlay) {
			if (acDelta > msPerFrame) {
		        acDelta = 0;
		       	moveSnake ();
		    } else {
		        acDelta += deltaTime;
		    }
		}
	    lastUpdateTime = Date.now();
		requestAnimFrame (gameLoop);
	};

	// DESENHA
	function draw () {
		ctx.clearRect (0, 0, canvas.width, canvas.height);		
		snake.draw ();

		if (snake.getSquareCollision() == true) {
			var sX = square.getX(), sY = square.getY();
			square.squarePosition ();
			snake.setSquareCollision (false);
			snake.grow (sX, sY);
			interface.incrementScore ();
			interface.incrementSpeed ();
		};
		square.draw ();
	}

	// CONTROLANDO O TECLADO
	function controlKeyBoard () {
		if (KeyBoard.ACTION.current != "") {
			playGame ();
		} else {
			stopGame ();
		};

		if (KeyBoard.DIRECTION.current == "" ) {
			snake.setDirection (firstDirection);
		} else {			
			if (KeyBoard.DIRECTION.current == 1) {
				if (snake.getLastDirection() !=2 ) {
					snake.setDirection (KeyBoard.DIRECTION.current);
				};
			} else if ( KeyBoard.DIRECTION.current == 2) {
				if ( snake.getLastDirection() !=1 ) {
					snake.setDirection (KeyBoard.DIRECTION.current);
				};
			} else if ( KeyBoard.DIRECTION.current == 3) {
				if ( snake.getLastDirection() != 4) {
					snake.setDirection (KeyBoard.DIRECTION.current);
				};
			} else if ( KeyBoard.DIRECTION.current == 4) {
				if ( snake.getLastDirection() !=3) {
					snake.setDirection (KeyBoard.DIRECTION.current);
				};
			};
		};		
	};

	// INICIA
	function playGame () {
		gamePlay = true;
		gameInit = true;
	};
	// PAUSA
	function stopGame () {
		gamePlay = false;
	};
	// PERDE
	function overGame () {
		KeyBoard.ACTION.current = "";
		gameOver = true;
		stopGame();
	};
	// ALTERA STATUS
	function statusGame () {
		if (gamePlay == true) {
			return 1;
		} else {
			if (gameOver == true) {
				return 4;
			} else { 
				if ( gameWin == true) {
					return 3
				} else {
					if ( gameInit == false) {
						return 0;
					} else {
						return 2;
					};
				};
			};
		};
	};
	// MOVIMENTOS
	function moveSnake () {
		if (snake.getSelfCollision() == true) {
			overGame ();
		} else {
			if (snake.getBody() [snake.getLeng() - 1].x >= ((canvas.width / 8)) || snake.getBody() [snake.getLeng() - 1].x < 0 ) {
				overGame ();
			} else {
				if (snake.getBody() [snake.getLeng() - 1].y >= ((canvas.height / 8)) || snake.getBody() [snake.getLeng() - 1].y < 0 ) {
					overGame ();
				} else {
					snake.move();
				};
			};
		};
	};

	//RequestAnimationFrame
	requestAnimFrame = (function () {
		var func = window.requestAnimationFrame ||
		    window.webkitRequestAnimationFrame 	||
		    window.mozRequestAnimationFrame 	||
		    window.oRequestAnimationFrame 		||
		    window.msRequestAnimationFrame 		||
		    function (callback, element) {
		    	window.setTimeout (callback, 1000 / interval) ;
		    };		    
		return function (callback, element) { 
			func.apply (window, [callback, element]);
		};
	})();

	main (); // INICIA TUDO
})();