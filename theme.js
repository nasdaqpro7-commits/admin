/**
 * theme.js — Tema compartilhado entre todas as páginas (NasdaqPro)
 * Usa localStorage key: 'dashboard-tema'  ('dark' | 'light')
 */
(function() {
  const KEY = 'dashboard-tema';

  function aplicarTema(tema) {
    if (tema === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
    // Atualiza ícone do botão (se existir nesta página)
    const icon = document.getElementById('themeIcon');
    if (icon) icon.textContent = tema === 'dark' ? '🌙' : '☀️';
  }

  function getTema() {
    return localStorage.getItem(KEY) || 'dark';
  }

  // Aplica imediatamente ao carregar (evita flash)
  aplicarTema(getTema());

  // Expõe globalmente
  window.NasTheme = {
    carregar: function() { aplicarTema(getTema()); },
    toggle: function() {
      const novo = getTema() === 'dark' ? 'light' : 'dark';
      localStorage.setItem(KEY, novo);
      aplicarTema(novo);
      const icon = document.getElementById('themeIcon');
      if (icon) {
        icon.style.transform = 'rotate(360deg) scale(0)';
        setTimeout(function() {
          icon.textContent = novo === 'dark' ? '🌙' : '☀️';
          icon.style.transform = 'rotate(0deg) scale(1)';
        }, 150);
      }
    },
    getTema: getTema
  };

  // Reaplica quando DOM estiver pronto (garante body existe)
  document.addEventListener('DOMContentLoaded', function() {
    aplicarTema(getTema());
  });
})();
