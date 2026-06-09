(() => {
  const LIGHTBOX_CLASS = 'product-image-lightbox';
  const STYLE_ID = 'ProductImageLightboxStyles';

  const injectLightboxStyles = () => {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }

    style.textContent = `
      body.luxury-product .linked-colors,
      body.luxury-product [id^="LinkedColors-"] {
        width: 100% !important;
        max-width: 100% !important;
        display: block !important;
        overflow: visible !important;
      }

      body.luxury-product .linked-colors__wrap,
      body.luxury-product [id^="LinkedColors-"] .linked-colors__wrap {
        width: 100% !important;
        max-width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 14px !important;
        padding: 0 !important;
        margin: 0 auto !important;
        overflow: visible !important;
      }

      body.luxury-product .linked-colors__list,
      body.luxury-product [id^="LinkedColors-"] .linked-colors__list {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: flex-start !important;
        justify-content: center !important;
        gap: 10px !important;
        width: auto !important;
        max-width: 100% !important;
        padding: 0 2px 4px !important;
        margin: 0 auto !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
        list-style: none !important;
        scrollbar-width: none !important;
      }

      body.luxury-product .linked-colors__list::-webkit-scrollbar {
        display: none !important;
      }

      body.luxury-product .linked-colors__item,
      body.luxury-product [id^="LinkedColors-"] .linked-colors__item {
        width: 72px !important;
        min-width: 72px !important;
        max-width: 72px !important;
        height: 96px !important;
        min-height: 96px !important;
        max-height: 96px !important;
        padding: 0 !important;
        margin: 0 !important;
        list-style: none !important;
        flex: 0 0 72px !important;
      }

      body.luxury-product .linked-colors__thumb,
      body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb {
        width: 72px !important;
        min-width: 72px !important;
        max-width: 72px !important;
        height: 96px !important;
        min-height: 96px !important;
        max-height: 96px !important;
        aspect-ratio: 3 / 4 !important;
        padding: 0 !important;
        margin: 0 !important;
        display: block !important;
        position: relative !important;
        overflow: hidden !important;
        border-radius: 0 !important;
        border: 1px solid transparent !important;
        background: #f7f7f5 !important;
        box-sizing: border-box !important;
      }

      body.luxury-product .linked-colors__thumb.is-active,
      body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb.is-active,
      body.luxury-product .linked-colors__thumb[aria-current="true"],
      body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb[aria-current="true"] {
        border-color: #111 !important;
      }

      body.luxury-product .linked-colors__thumb img,
      body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb img,
      body.luxury-product .linked-colors__thumb picture,
      body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb picture {
        position: absolute !important;
        inset: 0 !important;
        display: block !important;
        width: 100% !important;
        min-width: 100% !important;
        max-width: none !important;
        height: 100% !important;
        min-height: 100% !important;
        max-height: none !important;
        object-fit: cover !important;
        object-position: center !important;
        background: #f7f7f5 !important;
      }

      .product__media-list .product__media,
      div[id^="AzpMediaGrid-"] > * {
        cursor: zoom-in !important;
      }

      .product-image-lightbox {
        position: fixed;
        inset: 0;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px;
        background: rgba(0, 0, 0, 0.86);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 180ms ease, visibility 180ms ease;
      }

      .product-image-lightbox.is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .product-image-lightbox__image {
        display: block;
        width: auto;
        height: auto;
        max-width: min(92vw, 1600px);
        max-height: 92vh;
        object-fit: contain;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.38);
      }

      .product-image-lightbox__close {
        position: fixed;
        top: 22px;
        right: 28px;
        z-index: 2;
        width: 44px;
        height: 44px;
        border: 0;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.94);
        color: #000;
        font-size: 34px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 0 0 4px;
      }

      html.product-image-lightbox-open,
      html.product-image-lightbox-open body {
        overflow: hidden !important;
      }

      @media screen and (max-width: 749px) {
        body.luxury-product .linked-colors__item,
        body.luxury-product [id^="LinkedColors-"] .linked-colors__item,
        body.luxury-product .linked-colors__thumb,
        body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb {
          width: 62px !important;
          min-width: 62px !important;
          max-width: 62px !important;
          height: 82px !important;
          min-height: 82px !important;
          max-height: 82px !important;
          flex-basis: 62px !important;
        }

        .product-image-lightbox {
          padding: 18px;
        }

        .product-image-lightbox__image {
          max-width: 96vw;
          max-height: 88vh;
        }

        .product-image-lightbox__close {
          top: 14px;
          right: 14px;
          width: 40px;
          height: 40px;
          font-size: 30px;
        }
      }
    `;
  };

  const forceLinkedColorsPortrait = () => {
    if (!document.body.classList.contains('luxury-product')) return;

    document.querySelectorAll('body.luxury-product [id^="LinkedColors-"] .linked-colors__item').forEach((item) => {
      item.style.setProperty('width', '72px', 'important');
      item.style.setProperty('min-width', '72px', 'important');
      item.style.setProperty('height', '96px', 'important');
      item.style.setProperty('flex', '0 0 72px', 'important');
    });

    document.querySelectorAll('body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb').forEach((thumb) => {
      thumb.style.setProperty('width', '72px', 'important');
      thumb.style.setProperty('min-width', '72px', 'important');
      thumb.style.setProperty('height', '96px', 'important');
      thumb.style.setProperty('min-height', '96px', 'important');
      thumb.style.setProperty('aspect-ratio', '3 / 4', 'important');
    });

    document.querySelectorAll('body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb img').forEach((img) => {
      img.style.setProperty('width', '100%', 'important');
      img.style.setProperty('height', '100%', 'important');
      img.style.setProperty('object-fit', 'cover', 'important');
      img.style.setProperty('object-position', 'center', 'important');
    });
  };

  const removeLegacyGalleryControls = () => {
    document.querySelectorAll('body.luxury-product .luxury-product-desktop-bars').forEach((bars) => bars.remove());
  };

  const createLightbox = () => {
    let lightbox = document.querySelector(`.${LIGHTBOX_CLASS}`);
    if (lightbox) return lightbox;

    lightbox = document.createElement('div');
    lightbox.className = LIGHTBOX_CLASS;
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = '<button class="product-image-lightbox__close" type="button" aria-label="Fermer">×</button><img class="product-image-lightbox__image" alt="">';
    document.body.appendChild(lightbox);
    return lightbox;
  };

  const getLargeImageUrl = (img) => {
    if (img.currentSrc) return img.currentSrc;
    if (img.src) return img.src;
    if (img.dataset.src) return img.dataset.src;
    return '';
  };

  const initLightbox = () => {
    if (!document.body.classList.contains('luxury-product')) return;

    injectLightboxStyles();
    forceLinkedColorsPortrait();

    const lightbox = createLightbox();
    const lightboxImage = lightbox.querySelector('.product-image-lightbox__image');
    const closeButton = lightbox.querySelector('.product-image-lightbox__close');

    const open = (img) => {
      const url = getLargeImageUrl(img);
      if (!url) return;

      const srcset = img.getAttribute('srcset');
      if (srcset) lightboxImage.setAttribute('srcset', srcset);
      else lightboxImage.removeAttribute('srcset');

      lightboxImage.src = url;
      lightboxImage.alt = img.alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('product-image-lightbox-open');
    };

    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('product-image-lightbox-open');
      lightboxImage.removeAttribute('src');
      lightboxImage.removeAttribute('srcset');
    };

    if (!document.documentElement.dataset.productLightboxReady) {
      document.documentElement.dataset.productLightboxReady = 'true';

      document.addEventListener('click', (event) => {
        const media = event.target.closest('.product__media-list .product__media, div[id^="AzpMediaGrid-"] > *');
        if (!media || !document.body.contains(media)) return;

        const img = media.querySelector('img');
        if (!img) return;

        event.preventDefault();
        open(img);
      });

      lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox || event.target === closeButton) close();
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
      });
    }
  };

  const apply = () => {
    removeLegacyGalleryControls();
    initLightbox();
    forceLinkedColorsPortrait();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  window.addEventListener('load', apply, { once: true });
  window.addEventListener('resize', apply, { passive: true });
  document.addEventListener('shopify:section:load', apply);
  document.addEventListener('shopify:section:select', apply);
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
})();