# Survey Experiment

### Does Information About Repression Shift Support for Authoritarian Regimes?

Daniel Kuhlen, Giovanna Lapresa, Jorge Zavala

---

## Project structure

```
survey_experiment/
│
├── 01_data/
│   ├── input/             # raw data files (survey responses, etc.)
│   └── output/            # processed / analysis-ready data
│
├── 02_code/
│   ├── analysis/          # all analysis
│   │   └── main.R         # template script (OLS, balance tables, figures)
│   └── datawrangling/     # data cleaning and preparation scripts
│   └── design_declaration # all design declarations 
│
├── 03_deliverables/
│   └── presentations/.    # slide decks for all presentations
│
├── 04_notes/              # meeting notes, memos, planning documents
│
│
│── 05_bibliography
│   └── bib.bib            # bibtex library with all sources from zotero
│
├── .gitignore
└── README.md
```

---

## Workflow

### 1. Data
- place raw survey response files in `01_data/input/`
- processed and analysis-ready files go in `01_data/output/`
- raw data files are gitignored — only the folder structure is tracked

### 2. Code
- data cleaning scripts live in `02_code/datawrangling/`
- run cleaning scripts first to produce files in `01_data/output/`
- analysis scripts in `02_code/analysis/` read from `01_data/output/`
- run the primary analysis with:

### 3. Presentations
- slide decks are Quarto `.qmd` files in `03_deliverables/presentations/`
- rendered HTML files are tracked in git

### 4. Notes
- meeting notes and planning documents go in `04_notes/`
- file names follow the convention `DD_MM_<topic>.txt` (e.g. `23_02_notes.txt`)

### 5. Bibliography
- the `05_bibliography/bib.bib` file is synced with the shared zotero folder
- when using citations for any deliverables reference this file with relative file paths

---

## Writing
All writing is done in Overleaf in the shared projcet `survey_experiment_class_26`.
- **To-Do:** 
    (1) Sync _output/figures and output/tables folders to zotero
    (2) Set up document for PAP and document for paper

## Git workflow

```bash
# start of session — get latest changes from collaborators
git pull

# after making changes
git add <file> 
# or in case to push all files changed
git add . 
# commit and comment
git commit -m "short description of what changed"
git push
```
