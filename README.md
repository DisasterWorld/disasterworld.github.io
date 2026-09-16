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

## License

This website is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
Keep the Nerfies link in the footer.
