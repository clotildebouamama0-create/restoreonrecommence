(() => {
  const init = () => {
    if (!document.body.classList.contains('luxury-product')) return;
    if (document.querySelector('.product-image-lightbox')) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'product-image-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
      <button class="product-image-lightbox__close" type="button" aria-label="Fermer">×</button>
      <img class="product-image-lightbox__image" alt="" />
    `;
    document.body.appendChild(lightbox);

    const image = lightbox.querySelector('.product-image-lightbox__image');
    const closeButton = lightbox.querySelector('.product-image-lightbox__close');

    const open = (sourceImage) => {
      const srcset = sourceImage.getAttribute('srcset');
      const src = sourceImage.currentSrc || sourceImage.src || sourceImage.getAttribute('data-src');
      const alt = sourceImage.alt || '';

      if (srcset) image.setAttribute('srcset', srcset);
      else image.removeAttribute('srcset');

      image.src = src;
      image.alt = alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('product-image-lightbox-open');
    };

    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('product-image-lightbox-open');
      image.removeAttribute('srcset');
      image.removeAttribute('src');
    };

    document.addEventListener('click', (event) => {
      const media = event.target.closest('.product__media-list .product__media, div[id^="AzpMediaGrid-"] > *');
      if (!media || !document.body.contains(media)) return;

      const sourceImage = media.querySelector('img');
      if (!sourceImage) return;

      event.preventDefault();
      open(sourceImage);
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox || event.target === closeButton) close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
