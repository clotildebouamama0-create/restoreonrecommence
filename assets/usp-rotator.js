/* USP rotator — same approach as freesoul.com:
 * all items are in the DOM, only the one with `.is-active` is visible,
 * a setInterval rotates which item is active.
 *
 * Also keeps --header-height up-to-date so the sticky USP bar always
 * stays glued to the bottom of the header even when the header shrinks
 * on scroll (theme adds `.header-scrolled` which changes padding). */
(function () {

  /* === Live header height tracker === */
  function setupHeaderHeightWatcher() {
    var header = document.querySelector('.header-section');
    if (!header) return;

    // Only track height when there's actually a sticky USP bar that depends on it
    var hasUspBar = !!document.querySelector('[data-usp-rotator]');
    if (!hasUspBar) return;

    function updateHeight() {
      var h = header.getBoundingClientRect().height;
      if (h > 0) {
        document.documentElement.style.setProperty('--header-height', h.toFixed(1) + 'px');
      }
    }

    updateHeight();

    if (typeof ResizeObserver !== 'undefined') {
      var ro = new ResizeObserver(updateHeight);
      ro.observe(header);
    }

    var rafScheduled = false;
    window.addEventListener('scroll', function() {
      if (rafScheduled) return;
      rafScheduled = true;
      window.requestAnimationFrame(function() {
        rafScheduled = false;
        updateHeight();
      });
    }, { passive: true });

    window.addEventListener('resize', updateHeight);
    document.addEventListener('header:scrolled', updateHeight);

    setTimeout(updateHeight, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeaderHeightWatcher);
  } else {
    setupHeaderHeightWatcher();
  }

  function initRotator(root) {
    if (!root || root.dataset.uspRotatorInited === '1') return;
    root.dataset.uspRotatorInited = '1';

    var items = root.querySelectorAll('.usp-rotator__item');
    if (!items.length) return;

    if (items.length === 1) {
      items[0].classList.add('is-active');
      return;
    }

    var speed = parseInt(root.getAttribute('data-rotator-speed'), 10) || 3000;
    if (speed < 500) speed = 500;

    var current = 0;
    items.forEach(function (el, i) {
      if (i === 0) el.classList.add('is-active');
      else el.classList.remove('is-active');
    });

    if (root._uspTimer) {
      clearInterval(root._uspTimer);
      root._uspTimer = null;
    }

    root._uspTimer = setInterval(function () {
      var next = (current + 1) % items.length;
      items[current].classList.remove('is-active');
      items[next].classList.add('is-active');
      current = next;
    }, speed);
  }

  function initAll() {
    document.querySelectorAll('[data-usp-rotator]').forEach(initRotator);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  document.addEventListener('shopify:section:load', function () {
    setTimeout(initAll, 50);
  });

  document.addEventListener('shopify:section:reorder', function () {
    setTimeout(initAll, 50);
  });
})();
