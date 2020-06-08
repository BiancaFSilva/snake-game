var canvas = document.getElementById ("tela");
var ctx = canvas.getContext ("2d");
var btPausa = document.getElementById ("btPausa");

// Tabuleiro
var nx = 0;
var ny = 0;
var largura = 20;
var distancia = 5;
var bordaX, bordaY;

// Informações sobre o estado atual
var rodando = false;
var xfruta, yfruta; 
var relogio;
var intervalo;

function pausa() {
    rodando = !rodando;
    if (rodando) {
        btPausa.innerHTML = "Pausar";
        relogio = setInterval ("loopPrincipal()", intervalo);
    } else {
        clearInterval (relogio);
        btPausa.innerHTML = "Continuar";
    }
}

// INÍCIO
criarTabuleiro();
novoJogo();

function criarTabuleiro() {    
    nx = Math.floor ((canvas.width - distancia) / (largura + distancia));
    ny = Math.floor ((carvas.height - distancia) / (largura + distancia));
    bordaX = nx * (distancia + largura) + distancia;
    bordaY = ny * (distancia + largura) + distancia;
}

function novoJogo() {
    if (rodando) {
        pausa();
    } else {
        intervalo = 200;
    }

    xfruta = nx - 1;
    yfruta = ny - 1;

    var xcenter = Math.floor (nx / 2);
    var ycenter = Math.floor (ny / 2);
    nodos.length = 0;
    nodos.push (new Nodo (xcenter, ycenter + 2, baixo));
    nodos.push (new Nodo (xcenter, ycenter + 1, baixo));
    nodos.push (new Nodo (xcenter, ycenter, baixo));
    nodos.push (new Nodo (xcenter, ycenter - 1, baixo));
    nodos.push (new Nodo (xcenter, ycenter - 2, baixo));

    btPausa.innerHTML = " Iniciar ";
    btPausa.disabled = false;

    desenhar();
}

function desenhar() {
    var xi, yi;
    ctx.clearRect (0, 0, canvas.width, canvas.height); // Limpa a tela
    
    // Desenhando as bordas
    ctx.fillStyle = "#888888";
    ctx.fillRect (bordaX, 0, canvas.width - 1, canvas.height - 1); 
    ctx.fillRect (0, bordaY, canvas.width - 1, canvas.height - 1); 

    // Desenhando a cobra
    ctx.fillStyle = "#00ff00";
    for (i = 0; i < nodos.length; i++) {
        xi = distancia + nodos [i].x * (largura + distancia);
        yi = distancia + nodos [i].y * (largura + distancia);
        fillRect (xi, yi, largura, largura);
    }

    // Desenhando a fruta
    ctx.fillStyle = "#ff0000";
    xi = distancia + (xfruta * (largura + distancia)) + Math.floor (largura / 2);
    yi = distancia + (yfruta * (largura + distancia)) + Math.floor (largura / 2);
}

// Array com os nodos da cobra
var nodos = new Array();
nodos.length = 0;

