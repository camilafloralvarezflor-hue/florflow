// ─── Scroll reveal ────────────────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── Nav: fondo más opaco al hacer scroll ─────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(247,244,238,.98)'
    : 'rgba(247,244,238,.92)';
});

// ─── FAQ: una columna en pantallas chicas ─────────────────────────────────────
if(window.innerWidth < 768) {
  const faqGrid = document.querySelector('#faq .container > div');
  if(faqGrid) faqGrid.style.gridTemplateColumns = '1fr';
}

// ─── Contador animado en métricas del hero ────────────────────────────────────
(function() {
  const counters = document.querySelectorAll('.metric-count');
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseInt(el.dataset.target, 10);
    const dur = 1600;
    const start = performance.now() + 1400;
    function tick(now) {
      const t = Math.max(0, Math.min(1, (now - start) / dur));
      el.textContent = Math.round(easeOut(t) * target);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  counters.forEach(animateCount);

  // Botón CTA magnético — se mueve levemente hacia el cursor
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x*0.18}px, ${y*0.25}px) translateY(-1px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

// ─── Animación 3D de la laptop ────────────────────────────────────────────────
(function() {
  const wrap  = document.querySelector('.flw-stage-wrap');
  const stage = document.getElementById('flw-stage');
  if (!wrap || !stage) return;

  function fit() {
    const r  = wrap.getBoundingClientRect();
    const sx = r.width  / 1400;
    const sy = r.height / 900;
    stage.style.setProperty('--flw-stage-scale', Math.min(sx, sy));
  }
  fit();
  window.addEventListener('resize', fit);

  // Se activa al entrar en el viewport
  new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) wrap.classList.add('is-active'); });
  }, { threshold: 0.25 }).observe(wrap);

  // También se activa al pasar el cursor encima
  wrap.addEventListener('mouseenter', () => wrap.classList.add('is-active'));
})();
