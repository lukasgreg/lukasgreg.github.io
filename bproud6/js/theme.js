/* Nastaví uložený motiv ještě před vykreslením stránky (bez probliknutí). Výchozí je tmavý. */
(() => {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch (e) { /* úložiště nedostupné – zůstane výchozí motiv */ }
})();
