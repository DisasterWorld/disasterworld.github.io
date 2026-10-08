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

  // Clips per scene: [file suffix, label], most striking first (the hero shots of the showcase video).
  // Files are static/videos/scenes/<disaster>_<locality>_<suffix>.{mp4,jpg}.
  const SCENES = {
    hurricane: {
      urban: [['r11b_arc_2', 'Stranded cars'], ['pan_6', 'Flooded street'], ['pan_1', 'Flooded street'],
              ['pan_3', 'Wind-damaged street'], ['r11_arc_3', 'Flooded intersection'], ['r11_arc_4', 'Flooded intersection']],
      suburban: [['pan_2', 'Flooded streets'], ['r11_arc_2', 'Damaged houses'], ['building_3', 'Flattened house'],
                 ['flyover_topdown_axis', 'Flyover'], ['building_1', 'Sunken house'], ['pan_3', 'Flooded streets']],
    },
    tornado: {
      urban: [['r11b_pan_1', 'Along the track'], ['vehicle_4', 'Overturned taxi'], ['vehicle_5', 'Overturned truck'],
              ['r11c_overturned', 'Overturned cars']],
      suburban: [['pan_1', 'Tornado track'], ['pan_through_1', 'Tornado track'], ['flyover_topdown_track', 'Flyover along the track'],
                 ['building_2', 'Flattened house'], ['pan_3', 'Edge of the track']],
    },
    fire: {
      urban: [['fire_hero_15', 'Burning building'], ['fire_hero_26', 'Charred building'],
              ['fire_hero_14', 'Burning building'], ['fire_hero_18', 'Burning building'], ['fire_hero_28', 'Burning building'],
              ['r11_pan_1', 'Street view']],
      suburban: [['pan_steep_1', 'Aerial view'], ['pan_1', 'Aerial view'], ['building_1', 'Burnt house'],
                 ['pan_3', 'Burnt streets'], ['building_2', 'Burnt house'], ['r11_arc_2', 'Burnt block']],
    },
    earthquake: {
      urban: [['arc_at_1', 'Partial collapse'], ['pan_2', 'Street view'], ['building_1', 'Complete collapse'],
              ['arc_at_3', 'Partial collapse'], ['building_c3', 'Rubble pile'], ['pan_turkey_T1_wide_pitch_slow', 'Flyover']],
      suburban: [['building_4', 'Ground rupture'], ['building_2', 'Collapsed house'], ['pan_1', 'Aerial view'],
                 ['pan_2', 'Aerial view'], ['cand_foundation_2', 'Foundation failure'], ['building_3', 'Collapsed house']],
    },
  };
  const env = {disaster: 'hurricane', locale: 'urban', clip: 0};
  const player = document.getElementById('env-player');
  const viewer = document.getElementById('env-viewer');
  const disasters = document.getElementById('env-disaster');
  const locales = document.getElementById('env-locale');
  const playlist = document.getElementById('env-clips');
  const more = document.getElementById('env-more');
  const clips = () => SCENES[env.disaster][env.locale];
  const envPath = suffix => `./static/videos/scenes/${env.disaster}_${env.locale}_${suffix}`;
  const press = (group, value) => {
    for (const b of group.children) b.setAttribute('aria-pressed', b.dataset.value === value);
  };

  // Scroll the playlist (not the page) just enough to show `item`.
  function reveal(item) {
    const l = playlist.getBoundingClientRect(), r = item.getBoundingClientRect();
    const by = (lo, hi, a, b) => (a < lo ? a - lo : b > hi ? b - hi : 0);
    playlist.scrollBy({top: by(l.top, l.bottom, r.top, r.bottom), left: by(l.left, l.right, r.left, r.right),
                       behavior: 'smooth'});
  }

  function playClip(i) {
    env.clip = i;
    [...playlist.children].forEach((b, j) => {
      b.setAttribute('aria-pressed', j === i);
      b.querySelector('.bar').style.transform = 'scaleX(0)';
    });
    reveal(playlist.children[i]);
    const path = envPath(clips()[i][0]);
    player.poster = `${path}.jpg`;
    player.src = `${path}.mp4`;
    player.animate([{opacity: 0}, {opacity: 1}], 250);
    // Only start playing if the player is on screen; otherwise the observer starts it later.
    const r = player.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) player.play().catch(() => {});
  }

  function showScene() {
    press(disasters, env.disaster);
    press(locales, env.locale);
    playlist.replaceChildren(...clips().map(([suffix, label], i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = `<img src="${envPath(suffix)}.jpg" alt=""><span class="label"><span class="bar"></span>${label}</span>`;
      b.onclick = () => playClip(i);
      return b;
    }));
    playlist.scrollTo(0, 0);
    playClip(0);
    updateMore();
  }

  // The "More clips" bar under the playlist: shown whenever the list overflows; at the end it flips to "Back to top".
  const vertical = () => getComputedStyle(playlist).flexDirection === 'column';  // a row strip on phones
  function updateMore() {
    const overflow = vertical() ? playlist.scrollHeight > playlist.clientHeight + 1 : playlist.scrollWidth > playlist.clientWidth + 1;
    const left = vertical() ? playlist.scrollHeight - playlist.clientHeight - playlist.scrollTop
                            : playlist.scrollWidth - playlist.clientWidth - playlist.scrollLeft;
    more.hidden = !overflow;
    more.classList.toggle('at-end', left < 2);
    more.firstElementChild.textContent = left < 2 ? 'Back to top' : 'More clips';
  }
  playlist.addEventListener('scroll', updateMore);
  new ResizeObserver(updateMore).observe(playlist);
  playlist.addEventListener('load', updateMore, true);
  more.addEventListener('click', () => {
    if (more.classList.contains('at-end')) return playlist.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    const step = playlist.children[0].getBoundingClientRect();
    playlist.scrollBy(vertical() ? {top: step.height, behavior: 'smooth'} : {left: step.width, behavior: 'smooth'});
  });

  // The playing clip's bar fills as it plays; at the end the next clip starts, wrapping to the first.
  player.addEventListener('timeupdate', () => {
    const bar = playlist.children[env.clip].querySelector('.bar');
    bar.style.transform = `scaleX(${player.currentTime / player.duration || 0})`;
  });
  player.addEventListener('ended', () => playClip((env.clip + 1) % clips().length));

  for (const [group, key] of [[disasters, 'disaster'], [locales, 'locale']]) {
    group.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      env[key] = b.dataset.value;
      showScene();
      if (key === 'disaster') viewer.scrollIntoView({block: 'nearest', behavior: 'smooth'});
    });
  }
  showScene();

  // Scene-generation flow chart: route orthogonal arrows between the cards (data-node) in the SVG laid over the
  // figure. Redrawn whenever the figure changes size (images loading, window resizing); hidden on phones.
  const pipeline = document.querySelector('.pipeline');
  const arrows = pipeline.querySelector('.pipe-arrows');
  const routes = arrows.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
  const svgEl = (tag, attrs) => {
    const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  };

  // A polyline through `pts` with each bend rounded off.
  function route(pts) {
    let d = `M${pts[0]}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [[px, py], [x, y], [nx, ny]] = [pts[i - 1], pts[i], pts[i + 1]];
      const r = Math.min(8, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
      d += ` L${x - Math.sign(x - px) * r},${y - Math.sign(y - py) * r}` +
           ` Q${x},${y} ${x + Math.sign(nx - x) * r},${y + Math.sign(ny - y) * r}`;
    }
    return `${d} L${pts[pts.length - 1]}`;
  }

  function drawPipeline() {
    if (getComputedStyle(arrows).display === 'none') return;
    const o = pipeline.getBoundingClientRect();
    const box = el => {
      const r = el.getBoundingClientRect();
      return {l: r.left - o.left, r: r.right - o.left, t: r.top - o.top, b: r.bottom - o.top,
              x: (r.left + r.right) / 2 - o.left, y: (r.top + r.bottom) / 2 - o.top};
    };
    const n = Object.fromEntries([...pipeline.querySelectorAll('[data-node]')].map(e => [e.dataset.node, box(e)]));
    const gen = box(pipeline.querySelector('.pipe-generator')), sim = box(pipeline.querySelector('.pipe-simulator'));
    // Straight across / straight up or down, through the middle of the span the two cards share.
    const across = (a, b) => {
      const y = (Math.max(a.t, b.t) + Math.min(a.b, b.b)) / 2;
      return [[a.r, y], [b.l, y]];
    };
    const vertical = (a, b) => {
      const x = (Math.max(a.l, b.l) + Math.min(a.r, b.r)) / 2;
      return a.t > b.b ? [[x, a.t], [x, b.b]] : [[x, a.b], [x, b.t]];
    };
    const jx = (Math.max(n.damaged.r, n.model.r) + n.final.l) / 2, jy = n.final.y;  // where the damage branches join
    const gx = (gen.r + sim.l) / 2;  // gutter between generator and simulator
    const lines = [  // [points, arrowhead?]
      [across(n.assets, n.damaged), true],
      [across(n.layout, n.model), true],
      [vertical(n.model, n.damaged), true],
      [vertical(n.human, n.final), true],
      [[[n.damaged.r, n.damaged.y], [jx, n.damaged.y], [jx, jy]], false],
      [[[n.model.r, n.model.y], [jx, n.model.y], [jx, jy]], false],
      [[[jx, jy], [n.final.l, jy]], true],
      [[[n.final.r, n.final.y], [gx, n.final.y], [gx, n.isaac.y], [n.isaac.l, n.isaac.y]], true],
    ];
    arrows.setAttribute('width', o.width);
    arrows.setAttribute('height', o.height);
    routes.replaceChildren(
      ...lines.map(([pts, head]) => svgEl('path', head ? {d: route(pts), 'marker-end': 'url(#pipe-head)'} : {d: route(pts)})),
      svgEl('circle', {cx: jx, cy: jy, r: 4}));
  }

  // Cards size to their images, so watch every card and stage, not just the figure: one card growing moves the rest.
  const resized = new ResizeObserver(drawPipeline);
  pipeline.querySelectorAll('.pipe-stage, .pipe-card').forEach(e => resized.observe(e));
  resized.observe(pipeline);
})();
