(() => {
  const value = (d, key, fallback) => d[key] || fallback;

  const buildCss = (el) => {
    const d = el.dataset;
    const titleDesktop = value(d, 'titleDesktop', '32');
    const priceDesktop = value(d, 'priceDesktop', '26');
    const descriptionDesktop = value(d, 'descriptionDesktop', '19');
    const variantDesktop = value(d, 'variantDesktop', '96');
    const linkedTextDesktop = value(d, 'linkedTextDesktop', '13');
    const atcDesktop = value(d, 'atcDesktop', '19');
    const titleMobile = value(d, 'titleMobile', '24');
    const priceMobile = value(d, 'priceMobile', '18');
    const descriptionMobile = value(d, 'descriptionMobile', '14');
    const variantMobile = value(d, 'variantMobile', variantDesktop);
    const linkedTextMobile = value(d, 'linkedTextMobile', linkedTextDesktop);
    const tabMobile = value(d, 'tabMobile', '16');

    return `
html body.luxury-product {
  --luxury-product-title-size: ${titleDesktop}px;
  --luxury-product-price-size: ${priceDesktop}px;
  --luxury-product-description-size: ${descriptionDesktop}px;
  --luxury-product-variant-size: ${variantDesktop}px;
  --luxury-product-atc-size: ${atcDesktop}px;
  --luxury-product-title-size-mobile: ${titleMobile}px;
  --luxury-product-price-size-mobile: ${priceMobile}px;
  --luxury-product-description-size-mobile: ${descriptionMobile}px;
  --luxury-product-variant-size-mobile: ${variantMobile}px;
  --luxury-linked-colors-text-size: ${linkedTextDesktop}px;
  --luxury-linked-colors-text-size-mobile: ${linkedTextMobile}px;
  --luxury-product-tab-size-mobile: ${tabMobile}px;
}
html body.luxury-product .linked-colors__label,
html body.luxury-product .linked-colors__current { font-size: var(--luxury-linked-colors-text-size) !important; }
html body.luxury-product .linked-colors__thumb,
html body.luxury-product .linked-colors__thumb img,
html body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb,
html body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb img { width: var(--luxury-product-variant-size) !important; height: var(--luxury-product-variant-size) !important; min-width: var(--luxury-product-variant-size) !important; min-height: var(--luxury-product-variant-size) !important; }
@media screen and (max-width: 989px) {
  html body.luxury-product .product__title > .heading,
  html body.luxury-product .product__title h1,
  html body.luxury-product .product__title h2,
  html body.luxury-product .product__title .heading,
  html body.luxury-product .product__title split-words,
  html body.luxury-product .product__title split-words *,
  html body.luxury-product .product__title .words,
  html body.luxury-product .product__title .word,
  html body.luxury-product .product__title .char { font-size: var(--luxury-product-title-size-mobile) !important; line-height: 1.15 !important; }
  html body.luxury-product .product__price,
  html body.luxury-product .product__price *,
  html body.luxury-product [id^="Price-"] .price,
  html body.luxury-product [id^="Price-"] .price * { font-family: 'Founders Grotesk Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important; font-size: var(--luxury-product-price-size-mobile) !important; line-height: 1.25 !important; }
  html body.luxury-product .product__text,
  html body.luxury-product .product__text *,
  html body.luxury-product .product__description,
  html body.luxury-product .product__description *,
  html body.luxury-product .rte,
  html body.luxury-product .rte * { font-size: var(--luxury-product-description-size-mobile) !important; line-height: 1.55 !important; }
  html body.luxury-product .linked-colors,
  html body.luxury-product [id^="LinkedColors-"] { --lc-size: var(--luxury-product-variant-size-mobile) !important; }
  html body.luxury-product .linked-colors__thumb,
  html body.luxury-product .linked-colors__thumb img,
  html body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb,
  html body.luxury-product [id^="LinkedColors-"] .linked-colors__thumb img { width: var(--luxury-product-variant-size-mobile) !important; height: var(--luxury-product-variant-size-mobile) !important; min-width: var(--luxury-product-variant-size-mobile) !important; min-height: var(--luxury-product-variant-size-mobile) !important; }
  html body.luxury-product .linked-colors__label,
  html body.luxury-product .linked-colors__current { font-size: var(--luxury-linked-colors-text-size-mobile) !important; }
  html body.luxury-product .accordion-tabs__summary { min-height: calc(var(--luxury-product-tab-size-mobile) * 3.2) !important; padding-top: 20px !important; padding-bottom: 20px !important; }
  html body.luxury-product .accordion-tabs__title { font-size: var(--luxury-product-tab-size-mobile) !important; line-height: 1.25 !important; }
  html body.luxury-product .accordion-tabs__content,
  html body.luxury-product .accordion-tabs__content * { font-size: max(12px, calc(var(--luxury-product-tab-size-mobile) - 4px)) !important; line-height: 1.55 !important; }
}
@media screen and (min-width: 990px) {
  html body.luxury-product main .page-width:not(.page-width--narrow) { padding-left: 20px !important; padding-right: 20px !important; }
  html body.luxury-product .featured-product.product { grid-template-columns: max-content minmax(360px, 1fr) !important; gap: 28px !important; align-items: start !important; }
  html body.luxury-product .product__gallery-container,
  html body.luxury-product media-gallery.product__gallery,
  html body.luxury-product .product-gallery-wavy { width: max-content !important; max-width: calc(100vw - 430px) !important; transform: none !important; overflow: visible !important; }
  html body.luxury-product .product__media-container { display: grid !important; grid-template-columns: 96px minmax(0, clamp(560px, 48vw, 760px)) !important; column-gap: 10px !important; align-items: start !important; margin-left: 72px !important; transform: none !important; width: max-content !important; max-width: calc(100vw - 430px) !important; overflow: visible !important; }
  html body.luxury-product .product__media-container > .product-thumbs-wrap { grid-column: 1 !important; grid-row: 1 !important; width: 96px !important; max-width: 96px !important; min-width: 96px !important; margin: 0 !important; position: sticky !important; top: 110px !important; align-self: start !important; z-index: 2 !important; }
  html body.luxury-product .product__media-container > .relative:not(.product-thumbs-wrap),
  html body.luxury-product .product__media-container slider-element[id^="SliderGallery-"] { grid-column: 2 !important; grid-row: 1 !important; width: clamp(560px, 48vw, 760px) !important; max-width: clamp(560px, 48vw, 760px) !important; min-width: 0 !important; overflow: visible !important; }
  html body.luxury-product .product__media-list,
  html body.luxury-product .product__gallery .product__media-list { display: block !important; width: 100% !important; overflow: visible !important; scroll-snap-type: none !important; scrollbar-width: none !important; gap: 0 !important; column-gap: 0 !important; }
  html body.luxury-product .product__media-list::-webkit-scrollbar { display: none !important; }
  html body.luxury-product .product__media-list .product__media { display: block !important; flex: none !important; width: 100% !important; min-width: 100% !important; max-width: 100% !important; aspect-ratio: 4 / 5 !important; height: auto !important; max-height: none !important; scroll-snap-align: none !important; overflow: hidden !important; background: #ffffff !important; margin: 0 0 18px 0 !important; }
  html body.luxury-product .product__media-list .product__media .media,
  html body.luxury-product .product__media-list .product__media picture { width: 100% !important; height: 100% !important; display: block !important; }
  html body.luxury-product .product__media-list .product__media .media::before,
  html body.luxury-product .product__media-list .product__media .media::after { display: none !important; content: none !important; }
  html body.luxury-product .product__media-list .product__media img,
  html body.luxury-product .product__media-list .product__media video,
  html body.luxury-product .product__media-list .product__media .media > img,
  html body.luxury-product .product__media-list .product__media .media > video { width: 100% !important; height: 100% !important; object-fit: contain !important; object-position: center !important; position: absolute !important; inset: 0 !important; max-width: none !important; }
  html body.luxury-product .product__media-container .indicators,
  html body.luxury-product .product__media-container .indicators .button,
  html body.luxury-product .product__media-container .luxury-gallery-arrow,
  html body.luxury-product .product__media-container [is="previous-button"],
  html body.luxury-product .product__media-container [is="next-button"],
  html body.luxury-product .luxury-product-desktop-bars { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
  html body.luxury-product .product__info-container,
  html body.luxury-product .product__info-wrapper,
  html body.luxury-product .product__info { position: sticky !important; top: 110px !important; align-self: start !important; }
}
`;
  };

  const apply = () => {
    document.querySelectorAll('[data-product-typography-controls]').forEach((el) => {
      let style = document.getElementById(`ProductTypographyControlsForced-${el.dataset.sectionId}`);
      if (!style) {
        style = document.createElement('style');
        style.id = `ProductTypographyControlsForced-${el.dataset.sectionId}`;
        document.body.appendChild(style);
      }
      style.textContent = buildCss(el);
    });
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
})();
