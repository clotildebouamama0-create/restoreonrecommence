/*
 * Custom mega-menu enhancement
 * --------------------------------------------------
 * Make the mega-menu tab buttons (Bestsellers, Powders, ...) switch on
 * hover/focus, not only on click. Mirrors freesoul.com behaviour.
 *
 * The theme already ships a <tabs-element> custom element that exposes a
 * `selectedIndex` property and updates everything when it changes.
 * We just trigger an index change on mouseenter/focusin.
 */
(function () {
  const HOVER_DELAY_MS = 80;

  function bindTabs(tabsEl) {
    if (!tabsEl || tabsEl.__customHoverBound) return;
    tabsEl.__customHoverBound = true;

    const buttons = tabsEl.querySelectorAll('button[role="tab"]');
    if (!buttons.length) return;

    buttons.forEach((button, index) => {
      let timer = null;

      const activate = () => {
        const current = parseInt(tabsEl.getAttribute('selected-index') || '0');
        if (current === index) return;
        if ('selectedIndex' in tabsEl) {
          tabsEl.selectedIndex = index;
        } else {
          tabsEl.setAttribute('selected-index', String(index));
        }
      };

      button.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        timer = setTimeout(activate, HOVER_DELAY_MS);
      });
      button.addEventListener('mouseleave', () => {
        clearTimeout(timer);
      });
      button.addEventListener('focusin', activate);
    });
  }

  function bindAllTabs(root) {
    (root || document).querySelectorAll('.mega-menu__nav--tabs').forEach(bindTabs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => bindAllTabs());
  } else {
    bindAllTabs();
  }

  document.addEventListener('shopify:section:load', (event) => {
    bindAllTabs(event.target);
  });

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches?.('.mega-menu__nav--tabs')) {
          bindTabs(node);
        }
        bindAllTabs(node);
      });
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
