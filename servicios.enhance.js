
(() => {
  'use strict';

  // ===== Helper selectors
  const qs  = (sel, ctx=document) => ctx.querySelector(sel);
  const qsa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // ===== 1) Insertar botón "Ver detalle" en cada tarjeta si no existe
  document.addEventListener('DOMContentLoaded', () => {
    const cards = qsa('.features-horizontal .feature');
    cards.forEach((card) => {
      if (card.querySelector('.btn-ver-detalle')) return; // ya existe

      // Crear botón
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-ver-detalle';
      btn.textContent = 'Ver detalle';
      btn.setAttribute('aria-label', 'Ver detalle');

      // Insertarlo tras el último párrafo si existe; si no, al final de la tarjeta
      const lastP = card.querySelector('p:last-of-type');
      if (lastP && lastP.parentNode === card) {
        lastP.insertAdjacentElement('afterend', btn);
      } else {
        card.appendChild(btn);
      }
    });
  });

  // ===== 2) Delegación: botón reenvía el click al disparador actual del modal (ícono o la card)
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.feature .btn-ver-detalle');
    if (!btn) return;

    const card = btn.closest('.feature');
    if (!card) return;

    // Preferimos el ícono si existe; si no, la tarjeta completa
    const trigger = card.querySelector('.icon-box') || card.querySelector('[data-modal-target]') || card;

    // Reutiliza la lógica existente (no tocamos tu código de modales)
    trigger?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
})();
