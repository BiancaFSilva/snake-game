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
var proxDirec = new Array();
proxDirec.length = 0;

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
    ctx.fillStyle = "#39ff14";
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

function loopPrincipal() {
    moverSnake();
    detectarColisoes();
    desenhar();
}

function executarGameOver() {
    btPausa.disabled = true;
    if (rodando) {
        pausa();
    }    
}

function detectarColisoes() {
    // Colisão com alguma parede
    if ((nodos[0].x < 0) || (nodos[0].x >= nx) || (nodos[0].y < 0) || (nodos[0].y >= ny)) {
        executarGameOver(); 
    }

     //Colisão com o corpo
    for (i = 1; i < nodos.length; i++) {
        if ((nodos[0].x == nodos[i].x) && (nodos[0].y == nodos[i].y)) {
            executarGameOver(); 
    }
}   

function moverSnake() {
    // Movimentos do corpo
    for (i = nodos.length -1; i > 0; i--) {
        nodos[i].x = nodos[i - 1].x;
        nodos[i].y = nodos[i - 1].y;
        nodos[i].direc = nodos[i - 1].direc;
    }
    // Movimentos da cebaça
    nodos[0].Mover();


    //Mover todos os nodos, exceto cabeça
 for (i = nodos.length - 1; i > 0; i--) {
    nodos[i].x = nodos[i-1].x;
    nodos[i].y = nodos[i-1].y;
    nodos[i].direc = nodos[i-1].direc;
    }
    //Se lista de comandos não estiver vazia
    if (proxDirec.length > 0)
    //Se há uma direção diferente da atual
    if (nodos[0].direc != proxDirec[0])
    //Alterar a direção
    nodos[0].direc = proxDirec[0];
    //Executa movimento da cabeça
    nodos[0].Mover();
    //Enquanto houverem comandos na lista
    while (proxDirec.length > 0) {
    //Se o comando é redundante
    if (proxDirec[0] == nodos[0].direc)
    //Remove o comando do inicio da lista
    proxDirec.shift();
    else
    //Se não for, para a repetição
    break;
    }
   
}

// EVENTOS
document.onkeydown=onKD;
function onKD(evt) {
    switch(evt.keyCode) {
        case 37: 
            proxDirec.push (esquerda);
        break;
        case 38:
            proxDirec.push (cima);
        break;
        case 39: 
            proxDirec.push (direita);
        break;
        case 40: 
            proxDirec.push (baixo);
        break;
    }
}
