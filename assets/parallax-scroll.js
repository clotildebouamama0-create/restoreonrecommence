(() => {
  const SELECTOR = '[data-parallax]';
  const SECTION_SELECTOR = '[data-parallax-section]';
  const TARGET_SELECTOR = 'picture, img, video, iframe, .media, .banner__image, .image-fit, .fwb__picture, .diptyque-cta__media, .dip__cell-img, .pbi__bg, .pbi__bg-img, .srl__card-image, .fmv__panel-image';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return;

  let items = [];
  let ticking = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getTargets = (element) => {
    if (element.matches(TARGET_SELECTOR)) return [element];

    if (element.matches(SECTION_SELECTOR)) {
      const scopedTargets = Array.from(element.querySelectorAll(TARGET_SELECTOR)).filter((target) => {
        return !target.closest('[data-parallax], [data-parallax-section]') || target.closest('[data-parallax-section]') === element;
      });

      if (scopedTargets.length) return scopedTargets;
    }

    const target = element.querySelector(TARGET_SELECTOR) || element.firstElementChild || element;
    return target ? [target] : [];
  };

  const prepareTarget = (element, target, index) => {
    const key = `parallaxPrepared${index}`;
    if (target.dataset[key] === 'true') return null;

    target.dataset[key] = 'true';
    element.style.overflow = element.style.overflow || 'hidden';
    element.style.position = element.style.position || 'relative';

    target.style.setProperty('will-change', 'transform');
    target.style.setProperty('transform-origin', 'center center');
    target.style.transition = target.style.transition || 'transform 80ms linear';

    const speed = Number.parseFloat(element.dataset.parallax || '0.22');
    const direction = element.dataset.parallaxDir || 'vertical';

    return {
      element,
      target,
      speed: Number.isFinite(speed) ? clamp(speed, 0.05, 0.7) : 0.22,
      direction
    };
  };

  const prepare = (element) => {
    const targets = getTargets(element);
    return targets.map((target, index) => prepareTarget(element, target, index)).filter(Boolean);
  };

  const collect = (root = document) => {
    const elements = Array.from(root.querySelectorAll(`${SELECTOR}, ${SECTION_SELECTOR}`));
    if (root.matches && (root.matches(SELECTOR) || root.matches(SECTION_SELECTOR))) {
      elements.unshift(root);
    }

    const nextItems = elements.flatMap(prepare).filter(Boolean);

    if (nextItems.length) {
      items = items.concat(nextItems);
      update();
    }
  };

  const update = () => {
    ticking = false;
    if (!items.length) return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    items.forEach((item) => {
      if (!document.documentElement.contains(item.element)) return;

      const rect = item.element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const progress = ((viewportHeight / 2) - (rect.top + rect.height / 2)) / viewportHeight;
      const amount = progress * item.speed * 160;
      let transform;

      if (item.direction === 'horizontal') {
        transform = `translate3d(${amount}px, 0, 0) scale(1.06)`;
      } else if (item.direction === 'zoom') {
        const scale = 1 + Math.abs(progress) * item.speed * 0.24;
        transform = `scale(${clamp(scale, 1, 1.16)})`;
      } else {
        transform = `translate3d(0, ${amount}px, 0) scale(1.06)`;
      }

      item.target.style.setProperty('transform', transform, 'important');
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  const forceProductGalleryInternalScroll = () => {
    if (!document.body.classList.contains('luxury-product')) return;

    const css = `
      @media screen and (min-width: 990px) {
        html,
        body.luxury-product {
          overflow: hidden !important;
          height: 100% !important;
        }

        body.luxury-product .page-container,
        body.luxury-product .main-content {
          height: 100vh !important;
          max-height: 100vh !important;
          overflow: hidden !important;
        }

        body.luxury-product .section--padding {
          height: calc(100vh - 150px) !important;
          max-height: calc(100vh - 150px) !important;
          overflow: hidden !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        body.luxury-product .featured-product.product {
          height: calc(100vh - 150px) !important;
          max-height: calc(100vh - 150px) !important;
          overflow: hidden !important;
          align-items: start !important;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 420px) !important;
        }

        body.luxury-product .product__gallery-container,
        body.luxury-product media-gallery.product__gallery,
        body.luxury-product .product__media-container,
        body.luxury-product .product__media-container > .relative:not(.product-thumbs-wrap),
        body.luxury-product slider-element[id^="SliderGallery-"] {
          height: 100% !important;
          max-height: 100% !important;
          min-height: 0 !important;
          overflow: hidden !important;
          transform: none !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        body.luxury-product .product__media-container {
          display: grid !important;
          grid-template-columns: 96px minmax(0, 1fr) !important;
          gap: 10px !important;
        }

        body.luxury-product .product__media-container > .product-thumbs-wrap {
          grid-column: 1 !important;
          height: 100% !important;
          max-height: 100% !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
        }

        body.luxury-product .product__media-container > .relative:not(.product-thumbs-wrap),
        body.luxury-product slider-element[id^="SliderGallery-"] {
          grid-column: 2 !important;
        }

        body.luxury-product div[id^="AzpMediaGrid-"],
        body.luxury-product .product__media-list,
        body.luxury-product .product__gallery .product__media-list {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 10px !important;
          height: 100% !important;
          max-height: 100% !important;
          overflow-y: scroll !important;
          overflow-x: hidden !important;
          overscroll-behavior: contain !important;
          scrollbar-width: auto !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        body.luxury-product div[id^="AzpMediaGrid-"] > *,
        body.luxury-product .product__media-list .product__media {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          aspect-ratio: 3 / 5 !important;
          height: auto !important;
          margin: 0 !important;
          overflow: hidden !important;
        }

        body.luxury-product .product__info,
        body.luxury-product .product__info-wrapper,
        body.luxury-product .product__info-container {
          position: static !important;
          top: auto !important;
          max-height: 100% !important;
          overflow-y: auto !important;
        }
      }
    `;

    let style = document.getElementById('ForceProductGalleryInternalScrollFromParallax');
    if (!style) {
      style = document.createElement('style');
      style.id = 'ForceProductGalleryInternalScrollFromParallax';
      document.head.appendChild(style);
    }
    style.textContent = css;
  };

  const init = (root = document) => {
    collect(root);
    requestUpdate();
    forceProductGalleryInternalScroll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', () => {
    requestUpdate();
    forceProductGalleryInternalScroll();
  }, { passive: true });

  document.addEventListener('shopify:section:load', (event) => init(event.target));
  document.addEventListener('shopify:section:select', () => {
    requestUpdate();
    forceProductGalleryInternalScroll();
  });

  window.addEventListener('load', forceProductGalleryInternalScroll, { once: true });
  setTimeout(forceProductGalleryInternalScroll, 300);
  setTimeout(forceProductGalleryInternalScroll, 1200);
})();