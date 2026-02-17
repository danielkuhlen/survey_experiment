/**
 * randomization.js — Treatment assignment
 *
 * Strategy: simple random assignment (equal probability across arms).
 * The assigned condition is stored in sessionStorage so it persists
 * across page refreshes but resets when the browser tab is closed.
 *
 * To extend to block-randomization, replace simpleRandom() with a
 * block-randomization function that reads a pre-loaded assignment list.
 *
 * Vignette texts: add one entry per treatment arm below.
 */

const VIGNETTES = {

  control: `
    <p>[CONTROL CONDITION TEXT]</p>
    <p>Please read the text above carefully before answering the questions
    on the next page.</p>
  `,

  treatment_a: `
    <p><strong>[TREATMENT A HEADER]</strong></p>
    <p>[TREATMENT A TEXT — this is where the experimental manipulation goes.]</p>
    <p>Please read the text above carefully before answering the questions
    on the next page.</p>
  `,

  // treatment_b: `...`,  // uncomment for 3-arm design

};

// ── Assignment ────────────────────────────────────────────────────────

/**
 * Returns (and caches) the treatment arm for this respondent.
 * Once assigned, the condition never changes within a session.
 */
function getAssignedCondition() {
  const stored = sessionStorage.getItem("survey_condition");
  if (stored && VIGNETTES[stored]) return stored;

  const arms   = Object.keys(SURVEY_CONFIG.treatments);
  const chosen = simpleRandom(arms);
  sessionStorage.setItem("survey_condition", chosen);
  return chosen;
}

/**
 * Simple uniform random draw from an array.
 */
function simpleRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Inject vignette text ──────────────────────────────────────────────

/**
 * Finds the treatment block in SURVEY_CONFIG.blocks and sets the
 * vignette text to match the respondent's assigned condition.
 * Called once at page load by app.js.
 */
function assignTreatment() {
  const condition = getAssignedCondition();

  SURVEY_CONFIG.blocks.forEach(block => {
    if (!block.treatmentBlock) return;
    block.questions.forEach(q => {
      if (q.type === "vignette") {
        q.text = VIGNETTES[condition] ?? "[VIGNETTE TEXT MISSING]";
      }
    });
  });

  // Expose condition on the global Survey object (set after app.js loads)
  window._assignedCondition = condition;
}
