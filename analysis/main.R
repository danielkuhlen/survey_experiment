# ─────────────────────────────────────────────────────────────────────────────
# main.R — Primary analysis script
# Project: [PROJECT TITLE]
# Author:  Daniel Kuhlen
# ─────────────────────────────────────────────────────────────────────────────

library(tidyverse)
library(estimatr)   # difference_in_means(), lm_robust()
library(modelsummary)

# ── 1. Load data ──────────────────────────────────────────────────────────────

# Replace with actual data loading once field work is complete.
# For JSON export from the survey, use jsonlite::fromJSON().
# df <- jsonlite::fromJSON("data/raw/responses.json") |> as_tibble()

# ── 2. Tidy ───────────────────────────────────────────────────────────────────

# df <- df |>
#   mutate(
#     treatment = factor(condition, levels = c("control", "treatment_a")),
#     outcome   = as.numeric(q_outcome_1),
#   )

# ── 3. Balance table ──────────────────────────────────────────────────────────

# datasummary_balance(~treatment, data = df, output = "balance_table.tex")

# ── 4. Main estimator (difference-in-means / ATE) ────────────────────────────

# ate <- difference_in_means(outcome ~ treatment, data = df)
# summary(ate)

# ── 5. Regression with controls ───────────────────────────────────────────────

# fit <- lm_robust(outcome ~ treatment + age + gender + education, data = df)
# modelsummary(fit, stars = TRUE, output = "analysis/table_main.tex")

# ── 6. Heterogeneous effects ──────────────────────────────────────────────────

# Add subgroup / interaction analyses here

# ── 7. Figures ────────────────────────────────────────────────────────────────

# Add ggplot2 visualisations here
