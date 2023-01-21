//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 14;
let raio = diametro / 2;

//variáveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
//vamos usar a mesma width e height da raquete
let velocidadeYOponente;

let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

//erros do oponente
let chanceDeErrar = 0;

function preload() {
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

//função para estabelecer o tamanho da tela(width, height)
function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

function draw() {
  background(0); //cor de fundo
  mostraBolinha(); //desenha a bolinha
  movimentaBolinha(); //movimenta a bolinha
  movimentaMinhaRaquete(); //movimento da raquete(x, y)
  movimentaRaqueteOponente(); //movimento da raquete do oponente
  verificaColisaoBorda(); //verifica as colisões com a borda
  //verificaColisaoRaquete(); //verifica as colisões com a raquete
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaquete, yRaquete); //desenha a raquete
  mostraRaquete(xRaqueteOponente, yRaqueteOponente); //desenha a raquete do oponente
  placarJogo();
  marcaPonto();
  
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
   if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    ponto.play()
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
    if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

// colisão feita sem biblioteca
/*function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
  velocidadeXBolinha *= -1;
    raquetada.play()
  }
}*/

// colisão feita com a biblioteca "collide2d"
function verificaColisaoRaquete(x, y) {
 colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
  velocidadeXBolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function placarJogo() {
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255, 140, 0))
  rect(200, 10, 40, 20)
  fill(255)
  text(meusPontos, 220, 26)
  fill(color(255, 140, 0))
  rect(400, 10, 40, 20)
  fill(255)
  text(pontosDoOponente, 420, 26)
}

function marcaPonto() {
  if(xBolinha > 590) {
    meusPontos += 1;
  }
  if(xBolinha < 10) {
    pontosDoOponente += 1;
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}