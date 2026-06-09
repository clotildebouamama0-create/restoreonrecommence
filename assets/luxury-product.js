/* Luxury product page enhancements
 * - Inject brand (vendor) name at the top of the info column
 * - Product image lightbox
 * - Internal scroll for custom media grid
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
    var style = document.getElementById('LuxuryProductImageLightboxStyles');
    if (!style) {
      style = document.createElement('style');
      style.id = 'LuxuryProductImageLightboxStyles';
      document.head.appendChild(style);
    }

    style.textContent = '' +
      '@media screen and (min-width:1024px){' +
      'body.luxury-product .azp-media-grid{height:calc(100vh - 120px)!important;max-height:calc(100vh - 120px)!important;min-height:0!important;overflow-y:auto!important;overflow-x:hidden!important;overscroll-behavior:contain!important;-webkit-overflow-scrolling:touch!important;align-content:start!important;grid-auto-rows:calc((100vh - 120px - var(--azp-media-gap,12px))/1.55)!important;scrollbar-width:thin!important}' +
      'body.luxury-product .azp-media-grid::-webkit-scrollbar{width:6px!important;display:block!important}' +
      'body.luxury-product .azp-media-grid::-webkit-scrollbar-thumb{background:rgba(0,0,0,.22)!important;border-radius:999px!important}' +
      'body.luxury-product .azp-media-tile{height:calc((100vh - 120px - var(--azp-media-gap,12px))/1.55)!important;min-height:0!important;aspect-ratio:3/4!important;background:#f7f7f5!important}' +
      'body.luxury-product .azp-media-tile img,body.luxury-product .azp-media-tile video{width:100%!important;height:100%!important;object-fit:cover!important;object-position:top center!important;background:#f7f7f5!important}' +
      'body.luxury-product .product__gallery-container,body.luxury-product media-gallery.product__gallery,body.luxury-product [id^="ProductGallery-"]{height:calc(100vh - 120px)!important;max-height:calc(100vh - 120px)!important;min-height:0!important}' +
      '}' +
      'body.luxury-product .linked-colors,body.luxury-product [id^="LinkedColors-"]{width:100%!important;max-width:100%!important;display:grid!important;justify-items:center!important;gap:14px!important;overflow:visible!important}' +
      'body.luxury-product .linked-colors__wrap,body.luxury-product .linked-colors__list,body.luxury-product [id^="LinkedColors-"] .linked-colors__wrap,body.luxury-product [id^="LinkedColors-"] .linked-colors__list{display:flex!important;align-items:flex-start!important;justify-content:center!important;gap:10px!important;flex-wrap:nowrap!important;width:auto!important;max-width:100%!important;overflow-x:auto!important;overflow-y:hidden!important;padding:2px 2px 4px!important;margin:0 auto!important;scrollbar-width:none!important}' +
      'body.luxury-product .linked-colors__wrap::-webkit-scrollbar,body.luxury-product .linked-colors__list::-webkit-scrollbar{display:none!important}' +
      'body.luxury-product .linked-colors__thumb{width:72px!important;height:96px!important;min-width:72px!important;min-height:96px!important;max-width:72px!important;max-height:96px!important;aspect-ratio:3/4!important;padding:0!important;margin:0!important;border:1px solid transparent!important;border-radius:0!important;background:#f7f7f5!important;overflow:hidden!important;position:relative!important;display:block!important;box-sizing:border-box!important}' +
      'body.luxury-product .linked-colors__thumb.is-active,body.luxury-product .linked-colors__thumb[aria-current="true"],body.luxury-product .linked-colors__thumb:hover{border-color:#111!important}' +
      'body.luxury-product .linked-colors__thumb img,body.luxury-product .linked-colors__thumb picture{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;display:block!important;object-fit:cover!important;object-position:center!important}' +
      'body.luxury-product .linked-colors__label,body.luxury-product .linked-colors__current{display:block!important;text-align:center!important;width:100%!important;font-size:13px!important;line-height:1.25!important;letter-spacing:.16em!important;margin:0!important}' +
      '.azp-media-tile,.product__media-list .product__media,div[id^="AzpMediaGrid-"]>*{cursor:zoom-in!important}' +
      '.product-image-lightbox{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:48px;background:rgba(0,0,0,.86);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s ease,visibility .18s ease}' +
      '.product-image-lightbox.is-open{opacity:1;visibility:visible;pointer-events:auto}' +
      '.product-image-lightbox__image{display:block;width:auto;height:auto;max-width:min(92vw,1600px);max-height:92vh;object-fit:contain;box-shadow:0 24px 80px rgba(0,0,0,.38)}' +
      '.product-image-lightbox__close{position:fixed;top:22px;right:28px;z-index:2;width:44px;height:44px;border:0;border-radius:999px;background:rgba(255,255,255,.94);color:#000;font-size:34px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0 0 4px}' +
      '.product-image-lightbox__close:hover{background:#fff}' +
      'html.product-image-lightbox-open,html.product-image-lightbox-open body{overflow:hidden!important}' +
      '@media screen and (max-width:749px){.product-image-lightbox{padding:18px}.product-image-lightbox__image{max-width:96vw;max-height:88vh}.product-image-lightbox__close{top:14px;right:14px;width:40px;height:40px;font-size:30px}body.luxury-product .linked-colors__thumb{width:62px!important;height:82px!important;min-width:62px!important;min-height:82px!important}}';
  }

  function forceMediaGridScroll() {
    if (!document.body.classList.contains('luxury-product')) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    document.querySelectorAll('.azp-media-grid').forEach(function (grid) {
      var gridHeight = Math.max(420, window.innerHeight - 120);
      var tileHeight = Math.floor(gridHeight / 1.55);

      grid.style.setProperty('height', gridHeight + 'px', 'important');
      grid.style.setProperty('max-height', gridHeight + 'px', 'important');
      grid.style.setProperty('overflow-y', 'auto', 'important');
      grid.style.setProperty('grid-auto-rows', tileHeight + 'px', 'important');

      grid.querySelectorAll('.azp-media-tile').forEach(function (tile) {
        tile.style.setProperty('height', tileHeight + 'px', 'important');
        tile.style.setProperty('aspect-ratio', '3 / 4', 'important');

        tile.querySelectorAll('img, video').forEach(function (media) {
          media.style.setProperty('object-fit', 'cover', 'important');
          media.style.setProperty('object-position', 'top center', 'important');
        });
      });
    });
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
    forceMediaGridScroll();

    var lightbox = createLightbox();
    var lightboxImage = lightbox.querySelector('.product-image-lightbox__image');
    var closeButton = lightbox.querySelector('.product-image-lightbox__close');

    function open(img) {
      var url = getImageUrl(img);
      if (!url) return;
      lightboxImage.src = url;
      lightboxImage.alt = img.alt || '';
      lightbox.classList.add('is-open');
      document.documentElement.classList.add('product-image-lightbox-open');
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.documentElement.classList.remove('product-image-lightbox-open');
    }

    if (document.documentElement.dataset.luxuryProductLightboxReady === '1') return;
    document.documentElement.dataset.luxuryProductLightboxReady = '1';

    document.addEventListener('click', function (event) {
      var tile = event.target.closest('.azp-media-tile, .product__media-list .product__media, div[id^="AzpMediaGrid-"] > *');
      if (!tile) return;
      var img = tile.matches('img') ? tile : tile.querySelector('img');
      if (!img) return;
      event.preventDefault();
      open(img);
    }, true);

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox || event.target === closeButton) close();
    });
  }

  function init() {
    injectVendor();
    initLightbox();
    forceMediaGridScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();