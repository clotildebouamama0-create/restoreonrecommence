/* Luxury product page enhancements
 * - Inject brand (vendor) name at the top of the info column
 * - Product image lightbox
 * Activates when <body class="luxury-product"> is present.
 */
(function () {
  function injectVendor() {
    if (!document.body.classList.contains('luxury-product')) return;
    var vendor = document.body.getAttribute('data-product-vendor');
    if (!vendor) return;
    document.querySelectorAll('.product__info-container').forEach(function (info) {
      if (info.dataset.luxuryVendorInjected === '1') return;
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

  function injectLightboxStyles() {
    if (document.getElementById('LuxuryProductImageLightboxStyles')) return;
    var style = document.createElement('style');
    style.id = 'LuxuryProductImageLightboxStyles';
    style.textContent = '' +
      '.azp-media-tile,.product__media-list .product__media,div[id^="AzpMediaGrid-"]>*{cursor:zoom-in!important}' +
      '.product-image-lightbox{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:48px;background:rgba(0,0,0,.86);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s ease,visibility .18s ease}' +
      '.product-image-lightbox.is-open{opacity:1;visibility:visible;pointer-events:auto}' +
      '.product-image-lightbox__image{display:block;width:auto;height:auto;max-width:min(92vw,1600px);max-height:92vh;object-fit:contain;box-shadow:0 24px 80px rgba(0,0,0,.38)}' +
      '.product-image-lightbox__close{position:fixed;top:22px;right:28px;z-index:2;width:44px;height:44px;border:0;border-radius:999px;background:rgba(255,255,255,.94);color:#000;font-size:34px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0 0 4px}' +
      '.product-image-lightbox__close:hover{background:#fff}' +
      'html.product-image-lightbox-open,html.product-image-lightbox-open body{overflow:hidden!important}' +
      '@media screen and (max-width:749px){.product-image-lightbox{padding:18px}.product-image-lightbox__image{max-width:96vw;max-height:88vh}.product-image-lightbox__close{top:14px;right:14px;width:40px;height:40px;font-size:30px}}';
    document.head.appendChild(style);
  }

  function createLightbox() {
    var lightbox = document.querySelector('.product-image-lightbox');
    if (lightbox) return lightbox;
    lightbox = document.createElement('div');
    lightbox.className = 'product-image-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = '<button class="product-image-lightbox__close" type="button" aria-label="Fermer">×</button><img class="product-image-lightbox__image" alt="">';
    document.body.appendChild(lightbox);
    return lightbox;
  }

  function getImageUrl(img) {
    return img.currentSrc || img.src || img.getAttribute('data-src') || '';
  }

  function initLightbox() {
    if (!document.body.classList.contains('luxury-product')) return;
    injectLightboxStyles();

    var lightbox = createLightbox();
    var lightboxImage = lightbox.querySelector('.product-image-lightbox__image');
    var closeButton = lightbox.querySelector('.product-image-lightbox__close');

    function open(img) {
      var url = getImageUrl(img);
      if (!url) return;
      var srcset = img.getAttribute('srcset');
      if (srcset) lightboxImage.setAttribute('srcset', srcset);
      else lightboxImage.removeAttribute('srcset');
      lightboxImage.src = url;
      lightboxImage.alt = img.alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('product-image-lightbox-open');
    }

    function close() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('product-image-lightbox-open');
      lightboxImage.removeAttribute('src');
      lightboxImage.removeAttribute('srcset');
    }

    if (document.documentElement.dataset.luxuryProductLightboxReady === '1') return;
    document.documentElement.dataset.luxuryProductLightboxReady = '1';

    document.addEventListener('click', function (event) {
      if (!document.body.classList.contains('luxury-product')) return;
      if (event.target.closest('.product-image-lightbox__close')) return;
      if (event.target.closest('.product-image-lightbox')) return;

      var tile = event.target.closest('.azp-media-tile, .product__media-list .product__media, div[id^="AzpMediaGrid-"] > *');
      if (!tile) return;

      var img = tile.matches('img') ? tile : tile.querySelector('img');
      if (!img) return;

      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      open(img);
    }, true);

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox || event.target === closeButton) close();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  }

  function initGallery() {
    document.querySelectorAll('body.luxury-product .luxury-product-desktop-bars').forEach(function (bars) { bars.remove(); });
  }

  function init() {
    injectVendor();
    initGallery();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', init, { once: true });
  document.addEventListener('shopify:section:load', init);
})();
