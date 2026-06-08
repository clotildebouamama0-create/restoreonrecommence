/* Luxury product page enhancements
 * - Custom prev/next arrows + dash pagination on horizontal gallery
 * - Inject brand (vendor) name at the top of the info column
 * Activates when <body class="luxury-product"> is present.
 */
(function () {
  function injectVendor() {
    if (!document.body.classList.contains('luxury-product')) return;
    var vendor = document.body.getAttribute('data-product-vendor');
    if (!vendor) return;
    document.querySelectorAll('.product__info-container').forEach(function (info) {
      if (info.dataset.luxuryVendorInjected === '1') return;
      // Skip if a vendor block is already present
      if (info.querySelector('.product__vendor') || info.querySelector('.luxury-vendor')) {
        info.dataset.luxuryVendorInjected = '1';
        return;
      }
      var el = document.createElement('div');
      el.className = 'luxury-vendor';
      el.textContent = vendor;
      info.insertBefore(el, info.firstChild);
      info.dataset.luxuryVendorInjected = '1';
    });
  }

  function initGallery() {
    if (!document.body.classList.contains('luxury-product')) return;

    document.querySelectorAll('.product__media-list').forEach(function (list) {
      if (list.dataset.luxuryInited === '1') return;
      list.dataset.luxuryInited = '1';

      var slides = list.querySelectorAll('.product__media');
      if (slides.length <= 1) return;

      // Find sibling thumbnails column (left vertical thumbs)
      var mediaContainer = list.closest('.product__media-container');
      var thumbButtons = mediaContainer
        ? mediaContainer.querySelectorAll('.product__thumbnail')
        : [];

      // Wrap with arrows — put them into the .relative parent of the slider
      var sliderEl = list.closest('slider-element');
      var arrowWrap = sliderEl ? sliderEl.parentElement : list.parentElement;
      if (!arrowWrap) arrowWrap = list.parentElement;
      // Ensure positioning context
      if (getComputedStyle(arrowWrap).position === 'static') {
        arrowWrap.style.position = 'relative';
      }

      var prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'luxury-gallery-arrow luxury-gallery-arrow--prev';
      prev.setAttribute('aria-label', 'Précédent');
      prev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';

      var next = document.createElement('button');
      next.type = 'button';
      next.className = 'luxury-gallery-arrow luxury-gallery-arrow--next';
      next.setAttribute('aria-label', 'Suivant');
      next.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

      arrowWrap.appendChild(prev);
      arrowWrap.appendChild(next);

      // Dash pagination: one dash per image, inserted after the slider
      var dashes = document.createElement('ul');
      dashes.className = 'luxury-gallery-dashes';
      slides.forEach(function (_, i) {
        var li = document.createElement('li');
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.dataset.idx = String(i);
        btn.setAttribute('aria-label', 'Image ' + (i + 1));
        if (i === 0) btn.classList.add('is-active');
        btn.addEventListener('click', function () {
          scrollToIndex(i);
        });
        li.appendChild(btn);
        dashes.appendChild(li);
      });

      // Put dashes IN the slider's .relative wrap (below the slider) so they don't
      // become an extra flex child of the row-layout .product__media-container.
      if (arrowWrap) {
        arrowWrap.appendChild(dashes);
      } else {
        var galleryContainer = list.closest('.product__media-container');
        if (galleryContainer) galleryContainer.appendChild(dashes);
      }

      function slideWidth() {
        var rect = slides[0].getBoundingClientRect();
        var w = rect.width;
        // include gap between slides
        var style = getComputedStyle(list);
        var gap = parseFloat(style.columnGap || style.gap || '0') || 0;
        return w + gap;
      }
      function currentIndex() {
        var w = slideWidth();
        if (!w) return 0;
        return Math.round(list.scrollLeft / w);
      }
      function scrollToIndex(i) {
        var w = slideWidth();
        list.scrollTo({ left: w * i, behavior: 'smooth' });
      }
      function update() {
        var idx = currentIndex();
        if (idx < 0) idx = 0;
        if (idx > slides.length - 1) idx = slides.length - 1;
        dashes.querySelectorAll('button').forEach(function (b, i) {
          b.classList.toggle('is-active', i === idx);
        });
        // Sync active thumbnail (match by data-media-id)
        var activeMediaId = slides[idx] ? slides[idx].getAttribute('data-media-id') : null;
        thumbButtons.forEach(function (tb) {
          var match = activeMediaId && tb.getAttribute('data-media-id') === activeMediaId;
          tb.classList.toggle('is-active', match);
          tb.setAttribute('aria-current', match ? 'true' : 'false');
        });
        prev.disabled = list.scrollLeft <= 4;
        next.disabled = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;
      }

      // Wire thumbnail clicks → scroll main gallery to matching slide
      thumbButtons.forEach(function (tb) {
        if (tb.dataset.luxuryThumbWired === '1') return;
        tb.dataset.luxuryThumbWired = '1';
        tb.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var id = tb.getAttribute('data-media-id');
          if (!id) return;
          var targetIdx = -1;
          slides.forEach(function (s, i) {
            if (s.getAttribute('data-media-id') === id) targetIdx = i;
          });
          if (targetIdx >= 0) scrollToIndex(targetIdx);
        }, true);
      });

      prev.addEventListener('click', function () {
        var idx = Math.max(0, currentIndex() - 1);
        scrollToIndex(idx);
      });
      next.addEventListener('click', function () {
        var idx = Math.min(slides.length - 1, currentIndex() + 1);
        scrollToIndex(idx);
      });
      list.addEventListener('scroll', function () {
        if (list._luxuryRaf) cancelAnimationFrame(list._luxuryRaf);
        list._luxuryRaf = requestAnimationFrame(update);
      }, { passive: true });
      window.addEventListener('resize', update);
      setTimeout(update, 100);
      setTimeout(update, 600);
    });
  }

  function init() {
    injectVendor();
    initGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('shopify:section:load', init);
})();
