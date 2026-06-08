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

  const init = (root = document) => {
    collect(root);
    requestUpdate();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });

  document.addEventListener('shopify:section:load', (event) => init(event.target));
  document.addEventListener('shopify:section:select', requestUpdate);
})();
