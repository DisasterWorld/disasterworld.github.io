(() => {
  'use strict';

  const lightbox = document.getElementById('lightbox');
  const expandedImage = lightbox.querySelector('img');
  const expandedVideo = lightbox.querySelector('video');
  function expand(media) {
    const isVideo = media.tagName === 'VIDEO';
    expandedImage.hidden = isVideo;
    expandedVideo.hidden = !isVideo;
    if (isVideo) {
      expandedVideo.src = media.currentSrc || media.src;
      expandedVideo.play().catch(() => {});
    } else {
      expandedImage.src = media.src;
      expandedImage.alt = media.alt;
    }
    lightbox.showModal();
  }
  document.querySelectorAll('figure img, .image-grid img').forEach(img => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'image-zoom';
    button.setAttribute('aria-label', `Expand image: ${img.alt}`);
    img.replaceWith(button);
    button.append(img);
    button.addEventListener('click', () => expand(img));
  });
  document.querySelectorAll('.survivors figure').forEach(figure =>
    figure.addEventListener('click', () => expand(figure.querySelector('video'))));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => expandedVideo.removeAttribute('src'));

  // Play clips only while they are on screen.
  const onScreen = new IntersectionObserver(entries => entries.forEach(({target, isIntersecting}) =>
    isIntersecting ? target.play().catch(() => {}) : target.pause()), {threshold: 0.25});
  document.querySelectorAll('video[data-autoplay]').forEach(v => onScreen.observe(v));

  // One button group = one exclusive choice; the selected button is dark.
  function choose(group, value) {
    for (const b of group.children) b.classList.toggle('is-dark', b.dataset.value === value);
  }

  document.getElementById('survivor-filter').addEventListener('click', e => {
    const value = e.target.dataset.value;
    if (value === undefined) return;
    choose(e.currentTarget, value);
    document.querySelectorAll('.survivors figure').forEach(f => f.hidden = !!value && f.dataset.disaster !== value);
  });

  // Clips per scene: [file suffix, label]. Files are static/videos/env/<disaster>_<locality>_<suffix>.{mp4,jpg}.
  const SCENES = {
    hurricane: {
      urban: [['flyover_topdown_axis', 'Flyover'], ['pan_1', 'Pan'], ['pan_3', 'Pan']],
      suburban: [['flyover_topdown_axis', 'Flyover'], ['pan_2', 'Pan'], ['building_1', 'Sunken house']],
    },
    tornado: {
      urban: [['pan_1', 'Pan'], ['pan_2', 'Pan'], ['vehicle_4', 'Overturned taxi']],
      suburban: [['flyover_topdown_track', 'Flyover along the track'], ['pan_through_1', 'Pan along the track'],
                 ['building_2', 'Destroyed house']],
    },
    fire: {
      urban: [['fire_hero_15', 'Burning'], ['fire_hero_26', 'Charred'], ['fire_hero_14', 'Burning']],
      suburban: [['pan_steep_1', 'Low pan'], ['pan_1', 'Pan'], ['building_1', 'Building']],
    },
    earthquake: {
      urban: [['flyover_topdown_axis', 'Flyover'], ['arc_at_1', 'Partial collapse'], ['building_1', 'Complete collapse']],
      suburban: [['pan_1', 'Pan'], ['pan_2', 'Pan'], ['building_2', 'Collapsed house']],
    },
  };
  const env = {disaster: 'hurricane', locale: 'urban', clip: 0};
  const player = document.getElementById('env-player');
  const strip = document.getElementById('env-strip');
  const envPath = suffix => `./static/videos/env/${env.disaster}_${env.locale}_${suffix}`;

  function showEnv() {
    const clips = SCENES[env.disaster][env.locale];
    choose(document.getElementById('env-disaster'), env.disaster);
    choose(document.getElementById('env-locale'), env.locale);
    strip.replaceChildren(...clips.map(([suffix, label], i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = i === env.clip ? 'is-active' : '';
      b.innerHTML = `<img src="${envPath(suffix)}.jpg" alt="" loading="lazy"><span>${label}</span>`;
      b.onclick = () => { env.clip = i; showEnv(); };
      return b;
    }));
    const path = envPath(clips[env.clip][0]);
    player.poster = `${path}.jpg`;
    player.src = `${path}.mp4`;
    // Only start playing if the player is on screen; otherwise the observer starts it later.
    const r = player.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) player.play().catch(() => {});
  }

  for (const key of ['disaster', 'locale']) {
    document.getElementById(`env-${key}`).addEventListener('click', e => {
      if (!e.target.dataset.value) return;
      env[key] = e.target.dataset.value;
      env.clip = 0;
      showEnv();
    });
  }
  showEnv();
})();
