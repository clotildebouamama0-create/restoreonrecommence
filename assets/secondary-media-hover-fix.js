(() => {
  const CARD_SELECTOR = '.product-card';
  const MEDIA_LINK_SELECTOR = '.product-card__media a.media, .product-card__media a[href]';

  const styleOverlay = (overlay) => {
    overlay.classList.remove('hidden', 'invisible', 'opacity-0');
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '1';
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'opacity 180ms ease, visibility 180ms ease';
    overlay.style.overflow = 'hidden';
  };

  const setupCard = (card) => {
    if (card.dataset.secondImageHoverReady === 'true') return;

    const mediaLink = card.querySelector(MEDIA_LINK_SELECTOR);
    if (!mediaLink) return;

    const template = mediaLink.querySelector('template');
    if (!template) return;

    const mediaItems = Array.from(template.content.children).filter((child) => {
      return child.querySelector('img') || child.matches('img');
    });

    const secondMedia = mediaItems[1];
    if (!secondMedia) return;

    const overlay = secondMedia.cloneNode(true);
    overlay.classList.add('product-card__second-image-hover');
    styleOverlay(overlay);

    const image = overlay.querySelector('img') || (overlay.matches('img') ? overlay : null);
    if (image) {
      image.loading = 'eager';
      image.style.width = '100%';
      image.style.height = '100%';
      image.style.objectFit = mediaLink.classList.contains('media--contain') ? 'contain' : 'cover';
      image.style.display = 'block';
    }

    mediaLink.appendChild(overlay);
    mediaLink.style.overflow = 'hidden';
    card.dataset.secondImageHoverReady = 'true';

    mediaLink.addEventListener('mouseenter', () => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
    });

    mediaLink.addEventListener('mouseleave', () => {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    });
  };

  const init = (root = document) => {
    root.querySelectorAll(CARD_SELECTOR).forEach(setupCard);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  setTimeout(() => init(), 250);
  setTimeout(() => init(), 1000);

  document.addEventListener('shopify:section:load', (event) => init(event.target));
  document.addEventListener('shopify:section:select', (event) => init(event.target));
})();
