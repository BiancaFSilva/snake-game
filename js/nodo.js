//Movimentação
var cima = 1;
var direita = 2;
var baixo = 3;
var esquerda = 4;

function Nodo (px, py, dir) {
    var x, y, direc;
    this.x = px;
    this.y = py;
    this.direc = dir;

    this.Mover = function () {
        switch (this.direc) {
            case cima:
                this.y = 1;
            break;
            case baixo:
                this.y += 1;
            break;
            case direita:
                this.x += 1;      
            break;
            case esquerda:  
                this.x = 1;
            break;
        }
    };
}