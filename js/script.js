var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");
var btPausa = document.getElementById("btPausa");

// Tabuleiro
var nx = 0;
var ny = 0;
var largura = 20;
var distancia = 5;
var bordaX, bordaY;

// INÍCIO
criarTabuleiro();
novoJogo();

function criarTabuleiro() {    
    nx = Math.floor((canvas.width - distancia) / (largura + distancia));
    ny = Math.floor((carvas.height - distancia) / (largura + distancia));
    bordaX = nx * (distancia + largura) + distancia;
    bordaY = ny * (distancia + largura) + distancia;
}

function novoJogo() {
    btPausa.innerHTML = "Iniciar";
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
}