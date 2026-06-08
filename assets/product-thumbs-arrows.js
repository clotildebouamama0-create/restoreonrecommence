/* Prev/Next arrows for the product gallery.
 * Clicks the previous/next thumbnail (which the theme already wires to the
 * main slider through media-dots / aria-controls), so the main image
 * actually changes — not just the thumbnail strip scrolls. */
(function () {
  function init() {
    var wraps = document.querySelectorAll('.product-thumbs-wrap');
    if (!wraps.length) return; // Cheap early exit on non-product pages
    wraps.forEach(function (wrap) {
      if (wrap.dataset.thumbsArrowsInited === '1') return;
      wrap.dataset.thumbsArrowsInited = '1';

      var list = wrap.querySelector('.product__thumbnails-list');
      var prev = wrap.querySelector('[data-product-thumbs-prev]');
      var next = wrap.querySelector('[data-product-thumbs-next]');
      if (!list) return;

      function getThumbs() {
        return Array.prototype.slice.call(list.querySelectorAll('.product__thumbnail'));
      }
      function getActiveIndex() {
        var thumbs = getThumbs();
        for (var i = 0; i < thumbs.length; i++) {
          if (thumbs[i].getAttribute('aria-current') === 'true' ||
              thumbs[i].classList.contains('is-active') ||
              thumbs[i].classList.contains('is-current')) {
            return i;
          }
        }
        return 0;
      }
      function scrollThumbIntoView(thumb) {
        if (!thumb) return;
        var thumbRect = thumb.getBoundingClientRect();
        var listRect = list.getBoundingClientRect();
        if (thumbRect.left < listRect.left || thumbRect.right > listRect.right) {
          var offsetLeft = thumb.offsetLeft - (list.clientWidth - thumb.clientWidth) / 2;
          list.scrollTo({ left: offsetLeft, behavior: 'smooth' });
        }
      }
      function go(direction) {
        var thumbs = getThumbs();
        if (!thumbs.length) return;
        var idx = getActiveIndex();
        var nextIdx = idx + direction;
        if (nextIdx < 0) nextIdx = thumbs.length - 1;
        if (nextIdx >= thumbs.length) nextIdx = 0;
        var target = thumbs[nextIdx];
        if (target) {
          target.click();
          scrollThumbIntoView(target);
        }
      }

      function update() {
        if (!prev || !next) return;
        var thumbs = getThumbs();
        prev.disabled = false;
        next.disabled = false;
        prev.style.opacity = thumbs.length > 1 ? '1' : '0.4';
        next.style.opacity = thumbs.length > 1 ? '1' : '0.4';
      }

      if (prev) prev.addEventListener('click', function (e) { e.preventDefault(); go(-1); });
      if (next) next.addEventListener('click', function (e) { e.preventDefault(); go(1); });
      list.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      update();
      setTimeout(update, 250);
      setTimeout(update, 1000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('shopify:section:load', init);
})();
