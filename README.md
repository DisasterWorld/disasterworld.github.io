# DisasterWorld project page

Source for the DisasterWorld project page, served by GitHub Pages from `main`.
Built on the [Nerfies](https://github.com/nerfies/nerfies.github.io) template (Bulma, no build step).

## Content

Text and figures follow the paper source (`coasei/overleaf/ICRA_2027_Disaster_Benchmark`).
What's still missing is marked `TODO` in `index.html`:

```bash
grep -n TODO index.html
```

Images in `static/images/` are web-sized copies of the paper's figures (JPEG, at most 2400 px wide for
full-width figures and 960 px for grid tiles). Keep videos in `static/videos/` small (H.264 `.mp4`, a few MB
each); GitHub rejects files over 100 MB.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

The page uses plain HTML, CSS, and JavaScript; no build step or dependency installation is needed.
`static/js/index.js` provides a keyboard-accessible image viewer. The original pipeline figure,
sim/real comparisons, and environment gallery remain visible without JavaScript.

Before release, replace the video poster in `#video` with the project video and provide real
Paper, arXiv, Code, and Dataset URLs. Release resource anchors at the top of the page and in `#use` currently
have no `href` and are marked `aria-disabled="true"`; add the URLs and remove that attribute when
released. The AirStack Documentation card links to the official docs. The video poster contains only
an inactive play button.

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
