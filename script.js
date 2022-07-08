// Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let lineWidth = 5;

//slider
let slider = document.querySelector('.slider');
let output = document.querySelector('.lineWidthOutput')
output.innerText = lineWidth;

slider.addEventListener('input', updateLineWidth)

let screenDraw = document.querySelector('#tela');
let ctx = screenDraw.getContext('2d');

//capturando o clique em cada botão
document.querySelectorAll('.color').forEach(item => {
   item.addEventListener('click', colorButtonClick);
});

//capturando eventos do mouse
screenDraw.addEventListener('mousedown', mouseDownEvent);
screenDraw.addEventListener('mousemove', mouseMoveEvent);
screenDraw.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

// Functions
function colorButtonClick(e) {
   let color = e.target.getAttribute('data-color');
   currentColor = color;
   
   //alternando os botões selecionados
   document.querySelector('.color.active').classList.remove('active');
   e.target.classList.add('active');
}

function updateLineWidth() {
   lineWidth = this.value;
   output.innerText = lineWidth;
}

//função que libera o desenho quando o botão esquerdo do mouse é pressionado
function mouseDownEvent(e) {
   canDraw = true;
   mouseX = e.pageX - screenDraw.offsetLeft;
   mouseY = e.pageY - screenDraw.offsetTop;
}

//função que chama a função de desenho quando o mouse é movido
function mouseMoveEvent(e) {
   if(canDraw) {
      draw(e.pageX, e.pageY);
   }
}

//função que bloqueia o desenho quando o botão esquerdo do mouse é levantado
function mouseUpEvent() {
   canDraw = false;
}

//função que realmente pinta os pontos na tela de acordo com a cor selecionada
function draw(x, y) {
   let pointX = x - screenDraw.offsetLeft;
   let pointY = y - screenDraw.offsetTop;

   //começando o processo de desenho
   ctx.beginPath();
   ctx.lineWidth = lineWidth;
   ctx.lineJoin = "round";
   ctx.moveTo(mouseX, mouseY);
   ctx.lineTo(pointX, pointY);
   ctx.closePath();
   ctx.strokeStyle = currentColor;
   ctx.stroke();

   //atualizando posição do mouse
   mouseX = pointX;
   mouseY = pointY;
}

//função que limpa o quadro
function clearScreen() {
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}