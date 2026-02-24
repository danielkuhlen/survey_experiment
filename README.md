# Survey Experiment
### Does Information About Repression Shift Support for Authoritarian Regimes?

Daniel Kuhlen, Giovanna Lapresa, Jorge Zavala

---

## Project structure

```
survey_experiment/
│
├── 01_data/
│   ├── input/          # Raw data files (survey responses, etc.)
│   └── output/         # Processed / analysis-ready data
│
├── 02_code/
│   ├── analysis/       # Statistical analysis scripts
│   │   └── main.R      # Primary analysis (OLS, balance tables, figures)
│   └── datawrangling/  # Data cleaning and preparation scripts
│
├── 03_deliverables/
│   └── presentations/  # Quarto slide decks (revealjs → HTML)
│
├── 04_notes/           # Meeting notes, memos, planning documents
│
├── .gitignore
└── README.md
```

---

## Workflow

### 1. Data
- Place raw survey response files in `01_data/input/`
- Processed and analysis-ready files go in `01_data/output/`
- Raw data files are gitignored — only the folder structure is tracked

### 2. Code
- Data cleaning scripts live in `02_code/datawrangling/`
- Run cleaning scripts first to produce files in `01_data/output/`
- Analysis scripts in `02_code/analysis/` read from `01_data/output/`
- Run the primary analysis with:
```bash
Rscript 02_code/analysis/main.R
```

### 3. Presentations
- Slide decks are Quarto `.qmd` files in `03_deliverables/presentations/`
- Render a presentation to HTML with:
```bash
quarto render 03_deliverables/presentations/<filename>.qmd
```
- Rendered HTML files are tracked in git so collaborators can view slides without installing Quarto

### 4. Notes
- Meeting notes and planning documents go in `04_notes/`
- File names follow the convention `DD_MM_<topic>.txt` (e.g. `23_02_notes.txt`)

---

## Git workflow

```bash
# Start of session — get latest changes from collaborators
git pull

# After making changes
git add <file>
git commit -m "short description of what changed"
git push
```
