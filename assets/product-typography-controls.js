(() => {
  const LIGHTBOX_CLASS = 'product-image-lightbox';
  const STYLE_ID = 'ProductImageLightboxStyles';

  const injectLightboxStyles = () => {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
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

      .product-image-lightbox__close:hover {
        background: #fff;
      }

      html.product-image-lightbox-open,
      html.product-image-lightbox-open body {
        overflow: hidden !important;
      }

      @media screen and (max-width: 749px) {
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
    document.head.appendChild(style);
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
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  window.addEventListener('load', apply, { once: true });
  document.addEventListener('shopify:section:load', apply);
  document.addEventListener('shopify:section:select', apply);
})();
