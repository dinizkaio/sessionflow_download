// getsessionflow.app — o pouco de JavaScript do site. Sem rastreadores e sem
// serviços de terceiros; a página funciona inteira sem ele.
// Gerado por tools/site/gerar.py (repositório session-flow-privado): mude lá.
(function () {
var raiz = document.documentElement;
var ua = navigator.userAgent || '';
if (/Android/i.test(ua)) {
raiz.classList.add('android');
} else if (/iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) {
raiz.classList.add('ios');
}
var consertar = function (img) {
var falhou = img.currentSrc || img.src;
if (img.getAttribute('data-falhou') === falhou) return; // o mesmo erro, avisado duas vezes
img.setAttribute('data-falhou', falhou);
var fontes = img.parentNode.querySelectorAll('source');
if (fontes.length) {
fontes.forEach(function (s) { s.parentNode.removeChild(s); });
} else if (!/[?&]r=/.test(img.src)) {
setTimeout(function () { img.src += (img.src.indexOf('?') < 0 ? '?' : '&') + 'r=' + Date.now(); }, 1500);
}
};
document.querySelectorAll('picture img').forEach(function (img) {
img.addEventListener('error', function () { consertar(img); });
if (img.complete && img.naturalWidth === 0) consertar(img); // falhou antes deste script
});
var blocos = document.querySelectorAll('[data-revelar]');
var calmo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !calmo) {
var observador = new IntersectionObserver(function (entradas) {
entradas.forEach(function (e) {
if (e.isIntersecting) {
e.target.classList.add('visivel');
observador.unobserve(e.target);
}
});
}, { rootMargin: '0px 0px -8% 0px' });
blocos.forEach(function (b) { observador.observe(b); });
} else {
blocos.forEach(function (b) { b.classList.add('visivel'); });
}
var cabecalho = document.querySelector('.cabecalho');
if (cabecalho) {
var aoRolar = function () { cabecalho.classList.toggle('rolado', window.scrollY > 8); };
window.addEventListener('scroll', aoRolar, { passive: true });
aoRolar();
}
var botaoMenu = document.querySelector('.botao-menu');
var painelMenu = document.getElementById('menu-do-site');
if (botaoMenu && painelMenu) {
var rotuloMenu = botaoMenu.querySelector('span');
var menuAberto = function () { return raiz.classList.contains('menu-aberto'); };
var abrirMenu = function (sim) {
raiz.classList.toggle('menu-aberto', sim);
botaoMenu.setAttribute('aria-expanded', sim ? 'true' : 'false');
rotuloMenu.textContent = botaoMenu.getAttribute(sim ? 'data-fechar' : 'data-abrir');
};
botaoMenu.addEventListener('click', function () { abrirMenu(!menuAberto()); });
painelMenu.addEventListener('click', function (ev) {
if (ev.target.closest('a')) abrirMenu(false); // o "Recursos" e o "Planos" ficam na mesma página
});
document.addEventListener('keydown', function (ev) {
if (ev.key === 'Escape' && menuAberto()) {
abrirMenu(false);
botaoMenu.focus();
}
});
document.addEventListener('click', function (ev) {
if (menuAberto() && !ev.target.closest('.cabecalho')) abrirMenu(false); // o véu
});
var janelaLarga = window.matchMedia('(min-width: 62.0625rem)');
var aoMudarLargura = function (m) { if (m.matches) abrirMenu(false); };
if (janelaLarga.addEventListener) janelaLarga.addEventListener('change', aoMudarLargura);
else janelaLarga.addListener(aoMudarLargura);
}
var dados = document.getElementById('linguas-do-site');
var aviso = document.querySelector('.aviso-lingua');
if (!dados || !aviso) return;
var site = JSON.parse(dados.textContent);
var pagina = raiz.getAttribute('data-lingua');
var guardar = function (lingua) {
try { localStorage.setItem('sf-lingua', lingua); } catch (e) { /* navegador sem armazenamento */ }
};
var escolhida = null;
try { escolhida = localStorage.getItem('sf-lingua'); } catch (e) { /* idem */ }
document.querySelectorAll('[data-escolher-lingua]').forEach(function (a) {
a.addEventListener('click', function () { guardar(a.getAttribute('data-escolher-lingua')); });
});
if (escolhida) return;
var doNavegador = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''])
.map(function (l) { return String(l).slice(0, 2).toLowerCase(); });
var alvo = null;
for (var i = 0; i < doNavegador.length; i++) {
if (site.urls[doNavegador[i]]) { alvo = doNavegador[i]; break; }
}
if (!alvo || alvo === pagina) return;
var t = site.sugestao[alvo];
aviso.setAttribute('lang', site.lang[alvo]);
aviso.querySelector('.aviso-texto').textContent = t.texto;
var link = aviso.querySelector('a');
link.textContent = t.botao;
link.setAttribute('href', site.urls[alvo]);
link.setAttribute('hreflang', site.lang[alvo]);
link.addEventListener('click', function () { guardar(alvo); });
var fechar = aviso.querySelector('button');
fechar.textContent = t.fechar;
fechar.addEventListener('click', function () {
guardar(pagina);
aviso.hidden = true;
});
aviso.hidden = false;
})();
