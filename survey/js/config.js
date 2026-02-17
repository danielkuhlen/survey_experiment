/**
 * config.js — Survey questions and structure
 *
 * How to use:
 *   Each element in SURVEY_CONFIG.blocks is a "block" of one or more
 *   questions shown on one screen. Questions inside a block are displayed
 *   sequentially on the same page.
 *
 * Question types:
 *   "radio"   — single-choice from a list of options
 *   "likert"  — horizontal Likert scale (specify min/max labels and n points)
 *   "text"    — open-ended textarea
 *   "vignette"— treatment text (no response collected; just displayed)
 *
 * Treatment assignment:
 *   Set `treatmentBlock: true` on the block that delivers the treatment
 *   vignette. randomization.js will swap the vignette text based on the
 *   assigned condition before the block renders.
 */

const SURVEY_CONFIG = {

  // ── Study metadata ────────────────────────────────────────────────
  title:   "[PROJECT TITLE]",
  version: "0.1.0",

  // ── Treatment arms ────────────────────────────────────────────────
  // Each arm has a unique key and a label for data export.
  treatments: {
    control:     { label: "Control" },
    treatment_a: { label: "Treatment A" },
    // treatment_b: { label: "Treatment B" },  // uncomment for 3-arm design
  },

  // ── Question blocks ───────────────────────────────────────────────
  blocks: [

    // Block 1: Background / covariates
    {
      id: "block_background",
      questions: [
        {
          id: "q_age",
          type: "radio",
          text: "What is your age group?",
          options: [
            { value: "18-29", label: "18–29" },
            { value: "30-44", label: "30–44" },
            { value: "45-59", label: "45–59" },
            { value: "60+",   label: "60 or older" },
          ],
        },
        {
          id: "q_gender",
          type: "radio",
          text: "What is your gender?",
          options: [
            { value: "male",        label: "Male" },
            { value: "female",      label: "Female" },
            { value: "non_binary",  label: "Non-binary / third gender" },
            { value: "prefer_not",  label: "Prefer not to say" },
          ],
        },
        {
          id: "q_education",
          type: "radio",
          text: "What is the highest level of education you have completed?",
          options: [
            { value: "no_degree",  label: "No formal qualification" },
            { value: "secondary",  label: "Secondary school" },
            { value: "vocational", label: "Vocational / apprenticeship" },
            { value: "bachelor",   label: "Bachelor's degree" },
            { value: "postgrad",   label: "Postgraduate degree" },
          ],
        },
      ],
    },

    // Block 2: Pre-treatment outcome measure
    {
      id: "block_pre_outcome",
      questions: [
        {
          id: "q_pre_outcome",
          type: "likert",
          text: "[PRE-TREATMENT OUTCOME QUESTION]",
          points: 5,
          labelMin: "Strongly disagree",
          labelMax: "Strongly agree",
        },
      ],
    },

    // Block 3: Treatment (vignette)
    {
      id: "block_treatment",
      treatmentBlock: true,   // randomization.js reads this flag
      questions: [
        {
          id: "vignette",
          type: "vignette",
          // text is set dynamically by randomization.js
          text: "",
        },
      ],
    },

    // Block 4: Post-treatment outcome measure(s)
    {
      id: "block_post_outcome",
      questions: [
        {
          id: "q_outcome_1",
          type: "likert",
          text: "[PRIMARY OUTCOME QUESTION]",
          points: 7,
          labelMin: "Strongly disagree",
          labelMax: "Strongly agree",
        },
        {
          id: "q_outcome_2",
          type: "radio",
          text: "[SECONDARY OUTCOME QUESTION]",
          options: [
            { value: "yes",        label: "Yes" },
            { value: "no",         label: "No" },
            { value: "dont_know",  label: "Don't know" },
          ],
        },
        {
          id: "q_open",
          type: "text",
          text: "[OPTIONAL OPEN-ENDED QUESTION — delete if not needed]",
          placeholder: "Please share your thoughts…",
          rows: 4,
        },
      ],
    },

    // Block 5: Manipulation check
    {
      id: "block_manip_check",
      questions: [
        {
          id: "q_manip_check",
          type: "radio",
          text: "[MANIPULATION CHECK QUESTION]",
          options: [
            { value: "a", label: "[Option A]" },
            { value: "b", label: "[Option B]" },
            { value: "c", label: "[Option C]" },
          ],
        },
      ],
    },

  ], // end blocks
};
