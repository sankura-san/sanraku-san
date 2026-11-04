# Maynard K. Nay-osan — Portfolio

A static portfolio (no build step, no dependencies).

```
index.html        page structure
css/style.css     all styling, themes and interaction animations
js/main.js        your content (edit CFG at the top), navigation, theme switch, pointer effects
js/smoke.js       WebGL smoke background (reacts to the pointer and the theme)
assets/portrait.jpg
```

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publish with GitHub Pages
1. Create a new repository on GitHub (for example `portfolio`).
2. Upload **all files and folders above** to the repository root (keep the folder structure; `index.html` must be at the top level).
3. Go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose **main** and **/ (root)**, then Save.
4. After a minute your site is live at `https://<your-username>.github.io/<repository-name>/`.

## Editing content
Open `js/main.js`. The `CFG` block at the top holds your name, role and the HTML for each section. Email, phone and GitHub link are in the `CFG_EMAIL`, `CFG_PHONE` and `CFG_GH` constants.

## Notes
- The light/dark circular reveal uses the View Transitions API (Chrome, Edge, Safari 18+). Other browsers get a smooth colour fade; the smoke recolours either way.
- The custom cursor and magnetic buttons only run on mouse devices. Everything respects `prefers-reduced-motion`.
- Fonts load from Google Fonts, so they need an internet connection.
