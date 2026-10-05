(() => {
  'use strict';

  const lightbox = document.getElementById('lightbox');
  const expandedImage = lightbox.querySelector('img');
  document.querySelectorAll('figure img, .image-grid img').forEach(img => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'image-zoom';
    button.setAttribute('aria-label', `Expand image: ${img.alt}`);
    img.replaceWith(button);
    button.append(img);
    button.addEventListener('click', () => {
      expandedImage.src = img.src;
      expandedImage.alt = img.alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });

})();
