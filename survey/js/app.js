/**
 * app.js — Survey engine
 *
 * Responsibilities:
 *   - Renders question blocks one at a time
 *   - Validates required responses before advancing
 *   - Tracks progress bar
 *   - Collects and exports responses as JSON
 */

// ── Initialise ────────────────────────────────────────────────────────

assignTreatment();   // inject vignette text (from randomization.js)

const Survey = (() => {

  const blocks          = SURVEY_CONFIG.blocks;
  let   currentBlock    = -1;   // -1 = consent screen
  const responses       = {};   // { questionId: value }

  // DOM refs
  const screenConsent   = document.getElementById("screen-consent");
  const screenQuestions = document.getElementById("screen-questions");
  const screenEnd       = document.getElementById("screen-end");
  const questionBlock   = document.getElementById("question-block");
  const progressBar     = document.getElementById("progress-bar");
  const btnBack         = document.getElementById("btn-back");

  // ── Navigation ──────────────────────────────────────────────────────

  function next() {
    // Validate current block before advancing
    if (currentBlock >= 0 && !validateBlock(currentBlock)) return;

    currentBlock++;

    if (currentBlock === 0) {
      // Move from consent to first question block
      screenConsent.classList.add("hidden");
      screenQuestions.classList.remove("hidden");
    }

    if (currentBlock >= blocks.length) {
      // All blocks done — show end screen
      finishSurvey();
      return;
    }

    renderBlock(currentBlock);
    updateProgress();
    updateBackButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    if (currentBlock <= 0) return;
    currentBlock--;
    renderBlock(currentBlock);
    updateProgress();
    updateBackButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Rendering ───────────────────────────────────────────────────────

  function renderBlock(index) {
    const block = blocks[index];
    questionBlock.innerHTML = block.questions.map(renderQuestion).join("");
    restoreResponses(block);
  }

  function renderQuestion(q) {
    const numLabel = `<p class="question-number">Question</p>`;
    const text     = `<p class="question-text">${q.text}</p>`;

    switch (q.type) {
      case "radio":
        return `<div class="question" data-id="${q.id}" data-type="radio">
          ${numLabel}${text}
          <ul class="options-list">
            ${q.options.map(o => `
              <li>
                <label>
                  <input type="radio" name="${q.id}" value="${o.value}" />
                  <span>${o.label}</span>
                </label>
              </li>`).join("")}
          </ul>
        </div>`;

      case "likert":
        return `<div class="question" data-id="${q.id}" data-type="likert">
          ${numLabel}${text}
          <div class="likert-row">
            <span class="likert-label">${q.labelMin}</span>
            <div class="likert-options">
              ${Array.from({ length: q.points }, (_, i) => i + 1).map(v => `
                <label>
                  <input type="radio" name="${q.id}" value="${v}" />
                  <span>${v}</span>
                </label>`).join("")}
            </div>
            <span class="likert-label">${q.labelMax}</span>
          </div>
        </div>`;

      case "text":
        return `<div class="question" data-id="${q.id}" data-type="text">
          ${numLabel}${text}
          <textarea
            class="text-input"
            name="${q.id}"
            rows="${q.rows ?? 4}"
            placeholder="${q.placeholder ?? ""}"
          ></textarea>
        </div>`;

      case "vignette":
        return `<div class="question vignette" data-id="${q.id}" data-type="vignette">
          <div class="vignette-box">${q.text}</div>
        </div>`;

      default:
        return `<p>Unknown question type: ${q.type}</p>`;
    }
  }

  // ── Validation ──────────────────────────────────────────────────────

  function validateBlock(index) {
    const block = blocks[index];
    let valid = true;

    block.questions.forEach(q => {
      if (q.type === "vignette") return;   // no response required

      const el = questionBlock.querySelector(`[name="${q.id}"]`);
      if (!el) return;

      let answered = false;
      if (q.type === "radio" || q.type === "likert") {
        answered = !!questionBlock.querySelector(`input[name="${q.id}"]:checked`);
      } else if (q.type === "text") {
        answered = el.value.trim().length > 0;
      }

      const container = questionBlock.querySelector(`[data-id="${q.id}"]`);
      if (!answered) {
        valid = false;
        container.style.border = "1.5px solid #ef4444";
        container.style.borderRadius = "8px";
        container.style.padding = "12px";
      } else {
        container.style.border = "";
        container.style.padding = "";
      }
    });

    if (!valid) {
      alert("Please answer all questions before continuing.");
    }
    return valid;
  }

  // ── Response collection ──────────────────────────────────────────────

  function restoreResponses(block) {
    // Re-apply previously given answers when user navigates back
    block.questions.forEach(q => {
      const saved = responses[q.id];
      if (!saved) return;

      if (q.type === "radio" || q.type === "likert") {
        const radio = questionBlock.querySelector(
          `input[name="${q.id}"][value="${saved}"]`
        );
        if (radio) radio.checked = true;
      } else if (q.type === "text") {
        const ta = questionBlock.querySelector(`textarea[name="${q.id}"]`);
        if (ta) ta.value = saved;
      }
    });

    // Live-save on change
    questionBlock.addEventListener("change", collectResponses);
    questionBlock.addEventListener("input",  collectResponses);
  }

  function collectResponses() {
    blocks.forEach(block => {
      block.questions.forEach(q => {
        if (q.type === "vignette") return;

        if (q.type === "radio" || q.type === "likert") {
          const checked = document.querySelector(`input[name="${q.id}"]:checked`);
          if (checked) responses[q.id] = checked.value;
        } else if (q.type === "text") {
          const ta = document.querySelector(`textarea[name="${q.id}"]`);
          if (ta) responses[q.id] = ta.value;
        }
      });
    });
  }

  // ── Finish ───────────────────────────────────────────────────────────

  function finishSurvey() {
    collectResponses();

    const payload = {
      meta: {
        condition: window._assignedCondition,
        timestamp: new Date().toISOString(),
        survey:    SURVEY_CONFIG.title,
        version:   SURVEY_CONFIG.version,
      },
      responses,
    };

    // ── Export options (choose one): ─────────────────────────────────
    //
    // Option A — log to console (development only)
    console.log("Survey complete:", payload);
    //
    // Option B — POST to your own backend endpoint
    // fetch("/api/responses", {
    //   method:  "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body:    JSON.stringify(payload),
    // });
    //
    // Option C — download as JSON file (useful for offline pilots)
    // downloadJSON(payload);
    // ────────────────────────────────────────────────────────────────

    screenQuestions.classList.add("hidden");
    screenEnd.classList.remove("hidden");
    progressBar.style.width = "100%";
  }

  // ── Utilities ────────────────────────────────────────────────────────

  function updateProgress() {
    const pct = ((currentBlock + 1) / blocks.length) * 100;
    progressBar.style.width = `${Math.min(pct, 100)}%`;
  }

  function updateBackButton() {
    btnBack.style.visibility = currentBlock > 0 ? "visible" : "hidden";
  }

  function downloadJSON(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), {
      href: url,
      download: `response_${Date.now()}.json`,
    });
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Public API ───────────────────────────────────────────────────────
  return { next, back };

})();
