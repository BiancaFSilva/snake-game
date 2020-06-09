// EVENTOS
var KeyBoard = (function () {
		var DIRECTION = { current : "" }
		var ACTION = { current : "" };
	var kUp = false; 
	var kDown = false; 
	var kLeft = false;
	var kRight = false;
	var kSpace = false;

	// ADICIONANDO EVENTOS
	document.onkeydown = pressKey;
	document.onkeyup = leavePress;

	// ENTRADA (setas)
	function pressKey (event) {
		event.preventDefault();
		switch (event.keyCode) {
			case 37: //esquerda
				kLeft = true;
			break;
			case 38: //cima
				kUp = true;
			break;
			case 39: //direita
				kRight = true;
			break;
			case 40: //baixo
				kDown = true;
			break;	
		};		
		updatePosition();
	};

	// TECLA LIBERADA
	function leavePress (event) {
		switch (event.keyCode) {
			case 32: //Espaço
				setAction();
			break;
			case 37: //Esquerda
				kLeft = false;
			break;

			case 38: //Cima
				kUp = false;
			break;

			case 39: //Direita
				kRight = false;
			break;

			case 40://Baixo
				kDown = false;
			break;	
		};
		updatePosition();
	};

	function updatePosition() {
		setStatePosition (kUp ? 1 : kDown ? 2 : kRight ? 3 : kLeft ? 4 : 0 )
	};

	// ZERA VALORES
	function setStatePosition (dir) {
		if (ACTION.current != "" && dir != 0) {
			DIRECTION.current = dir;
		}
	};

	function setAction () {
		ACTION.current = ACTION.current == "" ? "start" : "";
	};

	// Direção para ser usada
	return { 
		DIRECTION : DIRECTION,
		ACTION : ACTION
	}

})();