/* Lightbox réutilisable : zoom sur les .fig avec navigation et légendes */
(function () {
  function initLightbox() {
    // Construire le markup de la lightbox une seule fois
    if (document.getElementById('lightbox')) return;
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.id = 'lightbox';
    lb.innerHTML = `
      <div class="lightbox-close" id="lbClose">✕</div>
      <div class="lightbox-nav lightbox-prev" id="lbPrev">←</div>
      <div class="lightbox-nav lightbox-next" id="lbNext">→</div>
      <div class="lightbox-inner">
        <img id="lbImg" src="" alt="">
        <p class="lightbox-caption" id="lbCaption"></p>
      </div>
    `;
    document.body.appendChild(lb);

    const figs = Array.from(document.querySelectorAll('.fig'));
    let current = 0;

    function open(i) {
      current = i;
      const fig = figs[current];
      const img = fig.querySelector('img');
      const caption = fig.getAttribute('data-caption') || img.alt || '';
      const lbImg = document.getElementById('lbImg');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbImg.classList.toggle('lb-narrow', fig.hasAttribute('data-narrow'));
      document.getElementById('lbCaption').textContent = caption;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
    function next() { open((current + 1) % figs.length); }
    function prev() { open((current - 1 + figs.length) % figs.length); }

    figs.forEach((fig, i) => {
      fig.addEventListener('click', () => open(i));
    });
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbNext').addEventListener('click', next);
    document.getElementById('lbPrev').addEventListener('click', prev);
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    if (figs.length <= 1) {
      document.getElementById('lbPrev').style.display = 'none';
      document.getElementById('lbNext').style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
})();
