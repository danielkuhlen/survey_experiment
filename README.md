# [PROJECT TITLE] — Survey Experiment

## Project structure

```
survey_experiment/
├── _quarto.yml               # Quarto project configuration
│
├── presentation/
│   ├── slides.qmd            # Design presentation (revealjs → HTML)
│   └── references.bib        # BibTeX references
│
├── survey/                   # Online survey (custom HTML/JS)
│   ├── index.html            # Entry point — open in browser to run survey
│   ├── css/style.css         # Styling
│   └── js/
│       ├── config.js         # ★ Edit this: questions & study metadata
│       ├── randomization.js  # ★ Edit this: vignette texts & assignment logic
│       └── app.js            # Survey engine (rendering, validation, export)
│
├── data/
│   └── raw/                  # Raw response files (gitignored)
│
├── analysis/
│   └── main.R                # Primary analysis script (R)
│
└── docs/                     # Additional documentation
```

## Quick start

### Presentation
```bash
quarto render presentation/slides.qmd
```
Opens as `presentation/slides.html`.

### Survey (local preview)
Open `survey/index.html` directly in a browser — no server needed for local
testing. For deployment, copy the `survey/` folder to any static web host.

## Workflow

1. **Fill in content** — search for `[` to find all placeholder tags.
2. **Presentation** — edit `presentation/slides.qmd` for the 10-slide deck.
3. **Survey questions** — edit `survey/js/config.js` (question texts, options).
4. **Treatment vignettes** — edit `survey/js/randomization.js` (vignette texts).
5. **Analysis** — uncomment and adapt `analysis/main.R` after data collection.

## Data export

The survey currently logs responses to the browser console (development mode).
Switch to one of the commented-out export options in `survey/js/app.js`:
- **POST to backend** — requires a server endpoint
- **Download JSON** — useful for offline pilots
