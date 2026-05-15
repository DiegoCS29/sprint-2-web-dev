// dados que aparecem no slideshow do hero
var slides = [
  { iso: 'ISO 200', aperture: 'f/1.8', shutter: '1/120s', cor: '#2E5BFF' },
  { iso: 'ISO 800', aperture: 'f/2.8', shutter: '1/60s',  cor: '#6589FF' },
  { iso: 'ISO 100', aperture: 'f/4.0', shutter: '1/250s', cor: '#1A3FCB' }
];

var slideAtual = 0;
var intervalo = null;

var tagIso = document.getElementById('tag-iso');
var tagAp  = document.getElementById('tag-aperture');
var tagSh  = document.getElementById('tag-shutter');
var botaoCamera = document.querySelector('.botao-camera');
var bolinhas = document.querySelectorAll('.bolinha');


function mostrarSlide(i) {
  if (!tagIso) return;
  var s = slides[i];

  tagIso.textContent = s.iso;
  tagAp.textContent  = s.aperture;
  tagSh.textContent  = s.shutter;
  botaoCamera.style.backgroundColor = s.cor;

  // atualiza qual bolinha esta ativa
  for (var j = 0; j < bolinhas.length; j++) {
    if (j === i) {
      bolinhas[j].classList.add('ativa');
    } else {
      bolinhas[j].classList.remove('ativa');
    }
  }

  slideAtual = i;
}

function proximoSlide() {
  var prox = (slideAtual + 1) % slides.length;
  mostrarSlide(prox);
}

function ligarSlideshow() {
  if (bolinhas.length === 0) return;
  intervalo = setInterval(proximoSlide, 3000);
}

function pararSlideshow() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
  }
}


// click nas bolinhas
for (var i = 0; i < bolinhas.length; i++) {
  bolinhas[i].addEventListener('click', function () {
    var idx = parseInt(this.getAttribute('data-slide'), 10);
    mostrarSlide(idx);
    pararSlideshow();
    ligarSlideshow();
  });
}

// pausa quando o mouse esta em cima
var caixaSlide = document.querySelector('.slideshow');
if (caixaSlide) {
  caixaSlide.addEventListener('mouseenter', pararSlideshow);
  caixaSlide.addEventListener('mouseleave', ligarSlideshow);
}


// botao "Ajuste Rapido" do hero - mostra um alert com as configuracoes
var btnAjustar = document.getElementById('btn-ajustar');
if (btnAjustar) {
  btnAjustar.addEventListener('click', function (e) {
    e.preventDefault();
    var s = slides[slideAtual];
    alert(
      'Ajuste Rapido aplicado!\n\n' +
      'Configuracoes detectadas:\n' +
      '- ' + s.iso + '\n' +
      '- Abertura: ' + s.aperture + '\n' +
      '- Velocidade: ' + s.shutter
    );
  });
}


// destaca o link do menu da secao que esta aparecendo na tela
var linksMenu = document.querySelectorAll('.menu-itens a[href^="#"]');
var secoes = document.querySelectorAll('main section[id]');

function destacarMenu() {
  var pos = window.scrollY + 100;
  var atual = '';

  for (var i = 0; i < secoes.length; i++) {
    var sec = secoes[i];
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      atual = sec.getAttribute('id');
    }
  }

  for (var k = 0; k < linksMenu.length; k++) {
    linksMenu[k].classList.remove('ativo');
    if (linksMenu[k].getAttribute('href') === '#' + atual) {
      linksMenu[k].classList.add('ativo');
    }
  }
}

window.addEventListener('scroll', destacarMenu);


// inicia o slideshow quando a pagina termina de carregar
window.addEventListener('DOMContentLoaded', function () {
  ligarSlideshow();
});
