// -----------------------------
// Escape Room: Hub + Doors + Riddles (2-stage + final)
// - Stage 1: doors 1-3 (1&2 unlocked, 3 unlocks after 1&2 solved)
// - Stage 2: doors 4-6 (4&5 unlocked, 6 unlocks after 4&5 solved)
// - After door6 solved -> final riddle door7
// - After door7 solved -> ending screen
// - wrong answer: -10 life points
// - correct: marks door solved + progress increases
// - sidebar (life/timer/progress) stays constant
// - state persists via localStorage
// - NO "Back to doors" exists anywhere
// - (Optional) basic no-copy / no-right-click blocks (not security, just friction)
// -----------------------------

const TOTAL_ROOMS = 7;
const START_LIFE = 250;
const START_SECONDS = 30 * 60; // 30 minutes

// Persisted state
const STORAGE_KEY = "escape_state_v2";

// MUST match your first page (startForm) key:
const NAME_KEY = "escape_room_player_name";

// --------------------
// Optional: NO-COPY friction (not real security)
// --------------------
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("cut", (e) => e.preventDefault());
document.addEventListener("paste", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  if ((e.ctrlKey || e.metaKey) && ["c", "x", "v", "a", "s", "p", "u"].includes(k)) {
    e.preventDefault();
  }
  if (e.key === "F12") e.preventDefault();
});

// --------------------
// Riddles
// --------------------
const RIDDLES = {
  door1: {
    title: "Door I: The First Record",
    prompt: "Riddle: What has to be broken before you can use it?",
    answers: ["egg", "an egg"],
  },
  door2: {
    title: "Door II: The Second Record",
    prompt: "Riddle: I speak without a mouth and hear without ears. What am I?",
    answers: ["echo", "an echo"],
  },
  door3: {
    title: "Door III: The Sealed Passage",
    prompt: "Riddle: What goes up but never comes down?",
    answers: ["age", "your age"],
  },

  door4: {
    title: "Door IV: The Cold Ledger",
    prompt: "Riddle: I have branches, but no fruit, trunk, or leaves. What am I?",
    answers: ["bank", "a bank"],
  },
  door5: {
    title: "Door V: The Whispering File",
    prompt: "Riddle: The more you take, the more you leave behind. What are they?",
    answers: ["footsteps", "steps", "foot prints", "footprints"],
  },
  door6: {
    title: "Door VI: The Final Lock",
    prompt: "Riddle: What can fill a room but takes up no space?",
    answers: ["light", "the light"],
  },

  door7: {
    title: "Final Record: The Chain Key",
    prompt: "Final Riddle: What is always in front of you but can’t be seen?",
    answers: ["future", "the future"],
  },
};

// --------------------
// Helpers
// --------------------
function normalizeAnswer(s) {
  return (s || "").trim().toLowerCase();
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getPlayerName() {
  return (localStorage.getItem(NAME_KEY) || "").trim();
}

// If you want to force name only from the first page, redirect if missing:
function ensurePlayerName() {
  const name = getPlayerName();
  if (!name) {
    // Change this to your real start page file (e.g., index.html)
    window.location.href = "index.html";
    return "";
  }
  return name;
}

// --------------------
// State (localStorage)
// --------------------
function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      // Basic sanity defaults if old state is missing fields
      return {
        life: typeof parsed.life === "number" ? parsed.life : START_LIFE,
        solvedCount: typeof parsed.solvedCount === "number" ? parsed.solvedCount : 0,
        stage: parsed.stage ?? 1,
        doors: parsed.doors ?? null,
        view: parsed.view ?? "hub",
        activeDoor: parsed.activeDoor ?? null,
        endTimeMs: typeof parsed.endTimeMs === "number" ? parsed.endTimeMs : Date.now() + START_SECONDS * 1000,
      };
    } catch {}
  }

  return {
    life: START_LIFE,
    solvedCount: 0,

    // stage: 1 | 2 | 3 | "end"
    stage: 1,

    doors: {
      door1: { unlocked: true, solved: false },
      door2: { unlocked: true, solved: false },
      door3: { unlocked: false, solved: false },

      door4: { unlocked: false, solved: false },
      door5: { unlocked: false, solved: false },
      door6: { unlocked: false, solved: false },

      door7: { unlocked: false, solved: false },
    },

    view: "hub", // "hub" | "riddle" | "end"
    activeDoor: null,

    // timer persistence: store endTime (epoch ms)
    endTimeMs: Date.now() + START_SECONDS * 1000,
  };
}

function ensureDoorsObject() {
  // If state came from an old version and has no doors object, rebuild it safely.
  if (state.doors && typeof state.doors === "object") return;

  state.doors = {
    door1: { unlocked: true, solved: false },
    door2: { unlocked: true, solved: false },
    door3: { unlocked: false, solved: false },

    door4: { unlocked: false, solved: false },
    door5: { unlocked: false, solved: false },
    door6: { unlocked: false, solved: false },

    door7: { unlocked: false, solved: false },
  };
}

function saveState(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

// --------------------
// DOM refs
// --------------------
const els = {
  playerLabel: document.getElementById("playerLabel"),
  lifeFill: document.getElementById("lifeFill"),
  lifeText: document.getElementById("lifeText"),
  progFill: document.getElementById("progFill"),
  progText: document.getElementById("progText"),
  timerText: document.getElementById("timerText"),
  sideNote: document.getElementById("sideNote"),
  panel: document.getElementById("panel"),
};

let state = loadState();
ensureDoorsObject();

let timerInterval = null;

// --------------------
// Sidebar
// --------------------
function updateSidebar() {
  const name = getPlayerName();
  els.playerLabel.textContent = name ? `Life Points - ${name}` : "Life Points";

  const lifePct = (state.life / START_LIFE) * 100;
  els.lifeFill.style.width = `${clamp(lifePct, 0, 100)}%`;
  els.lifeFill.style.background = state.life <= 60 ? "var(--red)" : "var(--green)";
  els.lifeText.textContent = `${state.life}`;

  const pct = (state.solvedCount / TOTAL_ROOMS) * 100;
  els.progFill.style.width = `${clamp(pct, 0, 100)}%`;
  els.progText.textContent = `${state.solvedCount} / ${TOTAL_ROOMS}`;
}

function fmtTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function tickTimer() {
  const remaining = (state.endTimeMs - Date.now()) / 1000;
  els.timerText.textContent = fmtTime(remaining);

  if (remaining <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    els.sideNote.textContent = "Time is up. The asylum claims you.";
    // Optional: you could disable interactions by setting view="end" here.
  }
}

// --------------------
// Stage Rules
// --------------------
function applyStageRules() {
  const d = state.doors;

  // Keep solvedCount consistent (safety)
  const solved = ["door1", "door2", "door3", "door4", "door5", "door6", "door7"].filter(
    (k) => d[k] && d[k].solved
  ).length;
  state.solvedCount = clamp(solved, 0, TOTAL_ROOMS);

  if (state.stage === 1) {
    d.door1.unlocked = true;
    d.door2.unlocked = true;
    d.door3.unlocked = !!(d.door1.solved && d.door2.solved);

    // Auto-advance when door3 solved
    if (d.door3.solved) {
      state.stage = 2;
      state.view = "hub";
      state.activeDoor = null;
    }
  }

  if (state.stage === 2) {
    d.door4.unlocked = true;
    d.door5.unlocked = true;
    d.door6.unlocked = !!(d.door4.solved && d.door5.solved);

    // If stage2 completed, go to final riddle
    if (d.door6.solved && !d.door7.solved) {
      state.stage = 3;
      d.door7.unlocked = true;
      state.view = "riddle";
      state.activeDoor = "door7";
    }
  }

  if (state.stage === 3) {
    d.door7.unlocked = true;

    // If final solved, end
    if (d.door7.solved) {
      state.stage = "end";
      state.view = "end";
      state.activeDoor = null;
    }
  }

  saveState(state);
}

// --------------------
// Rendering
// --------------------
function renderHub() {
  const name = getPlayerName();
  let doorIds = [];

  if (state.stage === 1) doorIds = ["door1", "door2", "door3"];
  if (state.stage === 2) doorIds = ["door4", "door5", "door6"];

  const title = state.stage === 2 ? "The Deeper Wing Awaits..." : "The Asylum Awaits...";
  const subtitle =
    state.stage === 2
      ? `${name || "Wanderer"}, two doors yield… the third will not.`
      : "Three doors lie before you. Select an unlocked door to begin.";

  els.panel.innerHTML = `
    <h1 class="h-title">${escapeHtml(title)}</h1>
    <p class="h-sub">${escapeHtml(subtitle)}</p>
    <div class="doors">
      ${doorIds.map((id) => renderDoorCard(id)).join("")}
    </div>
  `;

  for (const doorId of doorIds) {
    const btn = document.getElementById(`btn-${doorId}`);
    btn.addEventListener("click", () => onDoorClick(doorId, btn));
  }
}

function renderDoorCard(id) {
  const labelMap = {
    door1: "Door I",
    door2: "Door II",
    door3: "Door III",
    door4: "Door IV",
    door5: "Door V",
    door6: "Door VI",
  };

  const ds = state.doors[id];
  const classes = ["door", ds.unlocked ? "unlocked" : "locked", ds.solved ? "solved" : ""].join(" ");
  const lockBadge = !ds.unlocked ? `<div class="lock-badge">LOCKED</div>` : "";

  return `
    <button class="${classes}" id="btn-${id}" type="button" aria-label="${labelMap[id]}">
      ${lockBadge}
      <div class="door-visual" aria-hidden="true"></div>
      <div class="door-label">${labelMap[id]}${ds.solved ? " ✓" : ""}</div>
    </button>
  `;
}

function onDoorClick(doorId, btnEl) {
  const door = state.doors[doorId];

  // locked -> shake and do nothing
  if (!door.unlocked) {
    btnEl.classList.remove("shake");
    void btnEl.offsetWidth;
    btnEl.classList.add("shake");
    return;
  }

  // solved -> message only
  if (door.solved) {
    els.sideNote.textContent = "That record is already unlocked.";
    return;
  }

  // open riddle view
  state.view = "riddle";
  state.activeDoor = doorId;
  saveState(state);
  render();
}

function renderRiddle(doorId) {
  const r = RIDDLES[doorId];

  els.panel.innerHTML = `
    <h1 class="r-title">${escapeHtml(r.title)}</h1>
    <p class="r-text">${escapeHtml(r.prompt)}</p>

    <form class="r-form" id="rForm">
      <input class="r-input" id="ans" type="text" placeholder="Type your answer..." autocomplete="off" required />
      <button class="r-btn" type="submit">Submit</button>
    </form>

    <div class="msg" id="msg" aria-live="polite"></div>
  `;

  document.getElementById("rForm").addEventListener("submit", (e) => {
    e.preventDefault();
    checkAnswer(doorId);
  });
}

function checkAnswer(doorId) {
  const input = document.getElementById("ans");
  const msg = document.getElementById("msg");
  const user = normalizeAnswer(input.value);

  const r = RIDDLES[doorId];
  const ok = r.answers.map(normalizeAnswer).includes(user);

  if (!ok) {
    state.life = clamp(state.life - 10, 0, START_LIFE);
    saveState(state);
    updateSidebar();

    msg.className = "msg bad";
    msg.textContent = "Incorrect. The asylum punishes hesitation (-10). Try again.";
    input.select();
    return;
  }

  // correct
  state.doors[doorId].solved = true;
  state.solvedCount = clamp(state.solvedCount + 1, 0, TOTAL_ROOMS);

  saveState(state);
  updateSidebar();

  msg.className = "msg good";
  msg.textContent = "Correct. The lock yields…";

  setTimeout(() => {
    // After any correct answer, go to hub…
    state.view = "hub";
    state.activeDoor = null;
    saveState(state);

    // …then enforce stage rules (may auto-advance to stage2 / final / end)
    applyStageRules();
    render();
  }, 500);
}

function renderEnd() {
  const name = getPlayerName() || "Wanderer";
  els.panel.innerHTML = `
    <h1 class="h-title">The Chains Break…</h1>
    <p class="h-sub">
      ${escapeHtml(name)}, the final lock clicks open. A cold wind rushes through the halls,
      and the spirit of the Betrayed Anatomist exhales for the first time in ages.
    </p>

    <div class="end-card">
      <p class="end-text">
        The asylum’s lights flicker… then steady. The whispers fade into silence.
        You have freed him from his torment.
      </p>
      <p class="end-text">Your escape is complete.</p>
    </div>
  `;
}

function render() {
  applyStageRules();
  updateSidebar();

  if (state.view === "end") {
    renderEnd();
    return;
  }

  if (state.view === "riddle" && state.activeDoor) {
    renderRiddle(state.activeDoor);
  } else {
    renderHub();
  }
}

// --------------------
// Boot
// --------------------
(function init() {
  ensurePlayerName();

  if (!state.endTimeMs) state.endTimeMs = Date.now() + START_SECONDS * 1000;

  tickTimer();
  timerInterval = setInterval(tickTimer, 250);

  render();
})();
