(() => {
  const css = `
@media screen and (min-width: 990px) {
  html body.luxury-product .featured-product.product {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 420px) !important;
    gap: 28px !important;
    align-items: start !important;
    min-height: 0 !important;
  }

  html body.luxury-product .product__gallery-container {
    position: sticky !important;
    top: 150px !important;
    height: calc(100vh - 170px) !important;
    max-height: calc(100vh - 170px) !important;
    min-height: 0 !important;
    overflow: hidden !important;
    align-self: start !important;
    transform: none !important;
  }

  html body.luxury-product media-gallery.product__gallery,
  html body.luxury-product .product__media-container,
  html body.luxury-product .product__media-container > .relative:not(.product-thumbs-wrap),
  html body.luxury-product slider-element[id^="SliderGallery-"] {
    height: 100% !important;
    max-height: 100% !important;
    min-height: 0 !important;
    overflow: hidden !important;
    clip-path: none !important;
  }

  html body.luxury-product .product__media-container {
    display: grid !important;
    grid-template-columns: 96px minmax(0, 1fr) !important;
    gap: 10px !important;
    align-items: start !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-left: 0 !important;
    transform: none !important;
  }

  html body.luxury-product .product__media-container > .product-thumbs-wrap {
    grid-column: 1 !important;
    grid-row: 1 !important;
    width: 96px !important;
    max-width: 96px !important;
    min-width: 96px !important;
    height: 100% !important;
    max-height: 100% !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
  }

  html body.luxury-product .product__media-container > .relative:not(.product-thumbs-wrap),
  html body.luxury-product slider-element[id^="SliderGallery-"] {
    grid-column: 2 !important;
    grid-row: 1 !important;
    width: 100% !important;
    max-width: 100% !important;
  }

  html body.luxury-product div[id^="AzpMediaGrid-"],
  html body.luxury-product .product__media-list,
  html body.luxury-product .product__gallery .product__media-list {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    grid-auto-flow: row !important;
    gap: 10px !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
    min-height: 0 !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    overscroll-behavior: contain !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: auto !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  html body.luxury-product div[id^="AzpMediaGrid-"]::-webkit-scrollbar,
  html body.luxury-product .product__media-list::-webkit-scrollbar {
    width: 8px !important;
    display: block !important;
  }

  html body.luxury-product div[id^="AzpMediaGrid-"]::-webkit-scrollbar-thumb,
  html body.luxury-product .product__media-list::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.35) !important;
    border-radius: 999px !important;
  }

  html body.luxury-product div[id^="AzpMediaGrid-"] > *,
  html body.luxury-product .product__media-list .product__media {
    display: block !important;
    flex: none !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    aspect-ratio: 3 / 5 !important;
    height: auto !important;
    max-height: none !important;
    overflow: hidden !important;
    margin: 0 !important;
    background: #ffffff !important;
  }

  html body.luxury-product .product__media-list .product__media .media,
  html body.luxury-product .product__media-list .product__media picture {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
  }

  html body.luxury-product .product__media-list .product__media .media::before,
  html body.luxury-product .product__media-list .product__media .media::after {
    display: none !important;
    content: none !important;
  }

  html body.luxury-product .product__media-list .product__media img,
  html body.luxury-product .product__media-list .product__media video,
  html body.luxury-product .product__media-list .product__media .media > img,
  html body.luxury-product .product__media-list .product__media .media > video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    position: absolute !important;
    inset: 0 !important;
    max-width: none !important;
  }

  html body.luxury-product .product__info,
  html body.luxury-product .product__info-wrapper,
  html body.luxury-product .product__info-container {
    position: sticky !important;
    top: 150px !important;
    align-self: start !important;
  }

  html body.luxury-product .product__media-container .indicators,
  html body.luxury-product .product__media-container .indicators .button,
  html body.luxury-product .product__media-container .luxury-gallery-arrow,
  html body.luxury-product .product__media-container [is="previous-button"],
  html body.luxury-product .product__media-container [is="next-button"],
  html body.luxury-product .luxury-product-desktop-bars {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
}
`;

  const apply = () => {
    if (!document.body.classList.contains('luxury-product')) return;

    let style = document.getElementById('LuxuryProductGalleryInternalScrollForce');
    if (!style) {
      style = document.createElement('style');
      style.id = 'LuxuryProductGalleryInternalScrollForce';
      document.body.appendChild(style);
    }
    style.textContent = css;

    document.querySelectorAll('body.luxury-product .luxury-product-desktop-bars').forEach((bars) => bars.remove());
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  window.addEventListener('load', apply, { once: true });
  document.addEventListener('shopify:section:load', apply);
  document.addEventListener('shopify:section:select', apply);
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
})();