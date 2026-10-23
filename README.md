# DisasterWorld project page

Source for the DisasterWorld project page and documentation, including the documentation theme and build configuration. GitHub Pages serves the `main` branch root; `.nojekyll` keeps Jekyll from dropping the documentation's `_static/` directory.
Built on the [Nerfies](https://github.com/nerfies/nerfies.github.io) template (Bulma, no build step).

## Content

Text and figures follow the paper source (`coasei/overleaf/ICRA_2027_Disaster_Benchmark`).
What's still missing is marked `TODO` in `index.html`:

```bash
rg -n TODO index.html docs-src
```

Images in `static/images/` are web-sized copies of the paper's figures (JPEG, at most 2400 px wide for
full-width figures and 960 px for grid tiles). GitHub rejects files over 100 MB.

`static/videos/disasterworld.mp4` is the project video, compressed from `showcase/final_drafts/clean_no_music.mp4`
in the coasei workspace (1080p H.264 CRF 27 capped at 1.6 Mb/s, AAC audio, `+faststart`; about 36 MB for 3 min), with
a title-card poster `disasterworld.jpg`.

The other videos in `static/videos/` are re-encoded from the reviewed scene clips (`showcase/scene_videos/usable_clips.md`
in the coasei workspace): H.264 `.mp4`, no audio, `+faststart`, CRF 28, each with a `.jpg` poster taken at 1 s.
`scenes/` clips are 1280 px wide (flyovers sped up 1.5x) and play forward once each in the Environments playlist,
which then moves on to the next clip. `survivors/` clips are 960 px wide and play forward then in reverse at the same
speed, so their loop has no jump back to the first frame. Name files `<disaster>_<locality>_<shot>`; the
Environments clip list is the `SCENES` table in `static/js/index.js`.

## Preview locally

```bash
python3 -m http.server 8000 --bind 127.0.0.1   # then open http://localhost:8000
```

The project page uses plain HTML, CSS, and JavaScript. The rendered documentation is checked in, so viewing the site requires no build step or dependency installation.
`static/js/index.js` provides a keyboard-accessible image viewer, the Environments player and playlist, and the
scene-generation arrows; without JavaScript the text, figures and survivor clips still show, but those three do not.

## Documentation

Open `http://localhost:8000/docs/`, or use either Docs button on the project page. This directory contains the rendered [Furo](https://pradyunsg.me/furo/) documentation site with sidebar navigation, full-text search and light/dark themes.

Edit pages in `docs-src/`, navigation in `docs-src/index.md`, and theme settings in `docs-src/conf.py`. Rebuilding requires Python 3.12 or later. To install the documentation build tools and rebuild:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-docs.txt
.venv/bin/python -m sphinx -b dirhtml -d .cache/sphinx -W --keep-going docs-src docs
```

The build writes HTML, styles, JavaScript and the search index into `docs/`. Refresh `http://localhost:8000/docs/` after rebuilding. Commit the source changes and regenerated `docs/` together; do not edit generated pages directly. Building the website does not require the DisasterWorld runtime or AirStack.

The documentation workflow checks the build and provides a downloadable artifact; it does not publish. GitHub Pages serves the committed `docs/`.

The paper, code and dataset are not released yet. Their anchors at the top of the page and in `#use` have no `href`,
are marked `aria-disabled="true"` and carry a "Coming soon" badge (`.soon`); on release, add the URLs and remove the
attribute and badge. The docs mark the same gaps with `Coming soon` admonitions, and keep the maintainer notes as
MyST `%` comments that do not render. The AirStack Documentation card links to the official docs.

The Task Formulation section uses a static, responsive flow figure for observations, team policy,
detection reports, and evaluation. It follows `disaster-dataset/overleaf/sections/task.tex` and the detection
matching protocol in `sections/evaluation.tex`. Keep it consistent with the manuscript when the
task interface or evaluation protocol changes.

The observation example, `static/images/task/observation_tornado_suburban.jpg`, is a web-sized copy
of `disaster_scene_review_corrected_2026-10-02/Tornado/Suburban/level_2/photos/close_damage_01.png`
from the local scene review collection.

## License

This website is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
Keep the Nerfies link in the footer.
