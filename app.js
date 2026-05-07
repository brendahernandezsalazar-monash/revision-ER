const STORAGE_KEY = "hybrid_er_city_under_siege_v3";
const START_LIFE = 150;
const WRONG_ANSWER_PENALTY = 15;
const TIMER_DURATION_MS = 40 * 60 * 1000;
const DEBUG_MODE = new URLSearchParams(window.location.search).get("debug") === "1";

const TEAMS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/16-DV22xfT0yKeQsxeZuyyCPzST8-jWCL6UHuDCirxFk/gviz/tq?tqx=out:csv&sheet=Teams";

const ROOM_DATA = [
  {
    id: "warehouse",
    name: "Warehouse",
    district: "East Wharf",
    scene: "HER-resources/Warehouse.png",
    blocked: false,
    intro:
      "The warehouse is quiet after a long night, but one careless moment leaves a clue behind. A worker has fallen asleep with one arm hanging over the edge of a chair.",
    fragment:
      "The fragment reveals that pressure against the back of the humerus can silence a nerve and leave the hand unable to rise.",
    hintTitle: "Hint One",
    hintText: "WRIST DROP",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "The night was long, and the chair became a trap. One arm hung over the edge, pressed hard against the bone while the sleeper noticed nothing. By morning, the hand had fallen. The wrist would not rise, the fingers would not straighten, and the thumb could no longer lift away. Complete the table by selecting the correct pin, injured nerve, and movement deficit.",
        disableTextField: true,
        fields: [
          {
            label: "Pin A region",
            options: ["A", "B", "C", "D"],
            answer: "A",
          },
          {
            label: "Pin A injured nerve",
            options: ["Radial nerve", "Median nerve", "Ulnar nerve", "Axillary nerve"],
            answer: "Radial nerve",
          },
          {
            label: "Pin A movement deficit",
            options: [
              "Wrist extension, finger extension, thumb extension",
              "Thumb opposition and lateral lumbrical function",
              "Finger abduction/adduction",
              "Shoulder abduction from 15-90°",
            ],
            answer: "Wrist extension, finger extension, thumb extension",
          },
        ],
      },
    ],
    avatarX: "42.9%",
    avatarY: "49.3%",
    avatarSize: "80px",
  },
  {
    id: "fightclub",
    name: "Fightclub",
    district: "Lower Ring",
    scene: "HER-resources/Fight_Club.png",
    blocked: false,
    intro:
      "The fight club is loud, smoky, and crowded, but one shot cuts through the noise.",
    fragment:
      "The fourth fragment reveals that a narrow bony landmark can expose a nerve and leave the foot unable to rise.",
    hintTitle: "Hint Two",
    hintText: "FOOT DROP",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "A shot rings out in the fight club, but the wound is not the only clue. The bone is struck near its narrow neck, where a nervous messenger wraps around in danger. By morning, the foot hangs low, the toes scrape the ground, and the victim can no longer lift the front of the foot or turn the sole away from the midline. Find the fractured landmark, name the trapped nerve, and match the movements that are lost.",
        disableTextField: true,
        fields: [
          {
            label: "Pin A region",
            options: ["A", "B", "C", "D"],
            answer: "A",
          },
          {
            label: "Pin A injured nerve",
            options: ["Common fibular nerve", "Tibial nerve", "Femoral nerve", "Obturator nerve"],
            answer: "Common fibular nerve",
          },
          {
            label: "Pin A movement deficit",
            options: [
              "Dorsiflexion and eversion of the foot",
              "Plantarflexion and inversion",
              "Knee extension",
              "Thigh adduction",
            ],
            answer: "Dorsiflexion and eversion of the foot",
          },
        ],
      },
    ],
    avatarX: "47.5%",
    avatarY: "45.8%",
    avatarSize: "80px",
  },
  {
    id: "pub",
    name: "Pub",
    district: "River Quarter",
    scene: "HER-resources/Pub.png",
    blocked: false,
    intro:
      "A dimly lit pub hides its clues in the upper gut. Use the pinned structures on the 3D print to follow the riddle and identify the vessel at risk.",
    fragment:
      "Fragment III: The first fragment points to a dangerous bleed hidden behind the upper gut.",
    hintTitle: "Hint Three",
    hintText: "GDA",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "In this pub, the strongest drink is not the whiskey. It is the acid that waits below. When the shield grows thin, the burn becomes a wound. Find the two favourite hiding places in the upper gut, then choose the hidden vessels that could turn each burn into a bleed.",
        disableTextField: true,
        fields: [
          {
            label: "Pin A region",
            options: [
              "Pyloric antrum",
              "First part of the duodenum",
              "Second part of the duodenum",
              "Greater curvature of the stomach",
              "Cardia",
            ],
            answer: "First part of the duodenum",
          },
          {
            label: "Pin A hidden vessel",
            options: [
              "Gastroduodenal artery",
              "Left gastric artery",
              "Right gastric artery",
              "Splenic artery",
              "Short gastric arteries",
              "Right gastro-omental artery",
              "Left gastro-omental artery",
              "Superior mesenteric artery",
              "Inferior pancreaticoduodenal artery",
            ],
            answer: "Gastroduodenal artery",
          },
          {
            label: "Pin B region",
            options: [
              "Pyloric antrum",
              "First part of the duodenum",
              "Second part of the duodenum",
              "Greater curvature of the stomach",
              "Cardia",
            ],
            answer: "Pyloric antrum",
          },
          {
            label: "Pin B hidden vessel",
            options: [
              "Left gastric artery",
              "Gastroduodenal artery",
              "Splenic artery",
              "Short gastric arteries",
              "Right gastro-omental artery",
              "Left gastro-omental artery",
              "Superior mesenteric artery",
              "Inferior pancreaticoduodenal artery",
            ],
            answer: "Left gastric artery",
          },
        ],
      },
      {
        id: "Q2",
        type: "mcq",
        question:
          "In the pub below the ribs, three messengers call the acid pumps to the wall. Which trio has summoned the acid?",
        options: [
          "Histamine, gastrin, and acetylcholine",
          "Histamine, gastrin, and somatostatin",
          "Gastrin, acetylcholine, and secretin",
          "Histamine, acetylcholine, and prostaglandins",
        ],
        answer: "Histamine, gastrin, and acetylcholine",
      },
    ],
    avatarX: "44.2%",
    avatarY: "46.7%",
    avatarSize: "80px",
  },
  {
    id: "docks",
    name: "Docks",
    district: "Harbour Edge",
    scene: "HER-resources/Docks.png",
    blocked: false,
    intro:
      "The docks are quiet, but the clues point to hidden waterways under dangerous pressure. Use the pinned structures on the 3D print to identify where portal and systemic circulations can meet.",
    fragment:
      "Fragment IV: The second fragment reveals that a hidden vascular crossing can turn pressure into collapse.",
    hintTitle: "Hint Four",
    hintText: "VARICES",
    questions: [
      {
        id: "Q1",
        type: "multi-dropdown",
        question:
          "At the docks, a worker suddenly turns pale. The red tide rises from deep within the upper gut, near the place where the swallowed path meets the stomach. Complete the clue table below to find the crossing most likely to rupture.",
        textFieldLabel: "Based on the completed table, which leak is most likely causing the bleeding in this patient? Enter the correct pin.",
        textAnswer: "Pin C | C | c",
        fields: [
          {
            label: "Pin A region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Rectum",
          },
          {
            label: "Pin A clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Rectal varices",
          },
          {
            label: "Pin A portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Superior rectal vein",
          },
          {
            label: "Pin A systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Middle and inferior rectal veins",
          },
          {
            label: "Pin B region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Paraumbilical region",
          },
          {
            label: "Pin B clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Caput medusae",
          },
          {
            label: "Pin B portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Paraumbilical veins",
          },
          {
            label: "Pin B systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Superficial epigastric veins",
          },
          {
            label: "Pin C region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Esophagus",
          },
          {
            label: "Pin C clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Esophageal varices",
          },
          {
            label: "Pin C portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Esophageal branch of the left gastric vein",
          },
          {
            label: "Pin C systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Esophageal branches of the azygos vein",
          },
          {
            label: "Pin D region",
            options: ["Rectum", "Paraumbilical region", "Esophagus", "Retroperitoneum"],
            answer: "Retroperitoneum",
          },
          {
            label: "Pin D clinical condition",
            options: [
              "Rectal varices",
              "Caput medusae",
              "Esophageal varices",
              "Retroperitoneal portosystemic anastomoses",
            ],
            answer: "Retroperitoneal portosystemic anastomoses",
          },
          {
            label: "Pin D portal circulation",
            options: [
              "Superior rectal vein",
              "Paraumbilical veins",
              "Esophageal branch of the left gastric vein",
              "Splenic vein and colic veins",
            ],
            answer: "Splenic vein and colic veins",
          },
          {
            label: "Pin D systemic circulation",
            options: [
              "Middle and inferior rectal veins",
              "Superficial epigastric veins",
              "Esophageal branches of the azygos vein",
              "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
            ],
            answer: "Renal, suprarenal, paravertebral, gonadal and retroperitoneal veins",
          },
        ],
      },
      {
        id: "Q2",
        type: "mcq",
        question:
          "The hidden leak has been found. Which response is helping keep the dock worker's pressure from collapsing?",
        options: [
          "Decreased venous return lowers cardiac output and arterial pressure, reducing baroreceptor firing; this increases parasympathetic activity, slowing the heart to preserve energy.",
          "Decreased venous return lowers cardiac output and arterial pressure, increasing baroreceptor firing; this increases sympathetic activity, raising heart rate, contractility, arteriolar tone, and venous tone.",
          "Decreased venous return lowers cardiac output and arterial pressure, reducing baroreceptor firing; this increases sympathetic activity, raising heart rate, contractility, arteriolar tone, and venous tone.",
          "Increased venous return raises stroke volume, allowing cardiac output to increase despite blood loss.",
        ],
        answer:
          "Decreased venous return lowers cardiac output and arterial pressure, reducing baroreceptor firing; this increases sympathetic activity, raising heart rate, contractility, arteriolar tone, and venous tone.",
      },
    ],
    avatarX: "31.4%",
    avatarY: "60.4%",
    avatarSize: "80px",
  },
  {
    id: "cave",
    name: "Cave",
    district: "Outer Ridge",
    scene: "HER-resources/Cave.png",
    blocked: true,
    unlockAfterAll: true,
    intro:
      "The cave can only be entered after all previous rooms are complete. Teams receive a code to open a locked box containing a 12-lead ECG, which provides the final clue.",
    fragment:
      "Fragment V: The final fragment reveals that the hidden enemy has struck through the heart's blood supply.",
    hintTitle: "Hint Five",
    hintText: "ECG",
    questions: [
      {
        id: "Q1",
        type: "matching",
        question:
          "Use the ECG clues to uncover which vessel has been taken down. Match the ECG lead groups with the heart territory they mainly represent.",
        pairs: [
          { left: "II, III, aVF", right: "Inferior wall" },
          { left: "V1-V3, especially ST depression suggesting posterior involvement", right: "Posterior wall" },
          { left: "I, aVL, V5-V6", right: "Lateral wall" },
          { left: "V1-V4 with ST elevation", right: "Anterior/septal wall" },
        ],
      },
      {
        id: "Q2",
        type: "mcq",
        question: "Looking at the ECG, which heart territories appear to be involved?",
        options: [
          "Inferior wall only",
          "Inferior and anterior/septal walls",
          "Inferior, posterior, and lateral walls",
          "Posterior and anterior/septal walls",
        ],
        answer: "Inferior, posterior, and lateral walls",
      },
      {
        id: "Q3",
        type: "text",
        question:
          "These territories give the final clue. On the 3D heart model, find the coronary vessel where the hidden enemy was lying in wait. Enter the correct letter.",
        answer: "C | c",
      },
      {
        id: "Q4",
        type: "mcq",
        question: "What is the nature of the assassin?",
        options: [
          "It lurks on the vascular endothelial cells.",
          "Its lipid core is camouflaged as it silently accumulates beneath the outer adventitia.",
          "Its macrophages gorge on cholesterol under the cover of the endothelium.",
          "It camouflages its lipid core by stimulating smooth muscle cells to divide around it, thickening the adventitia.",
        ],
        answer: "Its macrophages gorge on cholesterol under the cover of the endothelium.",
      },
      {
        id: "Q5",
        type: "mcq",
        question:
          "The heart does not fall silent. A slower echo keeps it moving, beating at 41 beats per minute. Which hidden pacemaker has taken over, and which ion gives its upward spark?",
        options: [
          "AV node / junctional pacemaker - Ca2+ influx",
          "AV node / junctional pacemaker - fast Na+ influx",
          "His-Purkinje system - fast Na+ influx",
          "SA node - K+ efflux",
        ],
        answer: "AV node / junctional pacemaker - Ca2+ influx",
      },
    ],
    avatarX: "38.8%",
    avatarY: "68.3%",
    avatarSize: "80px",
  },
];

const FALLBACK_TEAMS = [
  { TeamName: "2A. (leg)ends", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_9874f1.png" },
  { TeamName: "1A. Clavicular", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_badbed.png" },
  { TeamName: "2B. flexors", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_9874f1.png" },
  { TeamName: "2C. thoracic park", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/badbed_mercedes_helm.png" },
  { TeamName: "1B. Ventricular Vibes", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_9874f1_mercedes_helmet_wings.gif" },
  { TeamName: "1C. Supero-cephalic", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_badbed_shortsleeve_smile.png" },
  { TeamName: "3A. Triangle of Auscultation", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_short_sleeve_AF52DE.png" },
  { TeamName: "3B. Lordosis Legends", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_e2d8fb.png" },
  { TeamName: "3C. Lymphomaniacs", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/badbed_wings_smile.gif" },
  { TeamName: "4B. 404 structure not found", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_ee4e91_mercedes.png" },
  { TeamName: "4A. the anatomy files", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/ferrari_h_e8ea29.png" },
  { TeamName: "4C. knees and toes", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/knees&toes_smile.gif" },
  { TeamName: "6C. tyrannosaurus plexus", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_badbed.png" },
  { TeamName: "6A. we studied", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_badbed.png" },
  { TeamName: "5B. seahawks", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_9874f1.png" },
  { TeamName: "5C. Bone Knowers", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_ea5c29_mercedes_skirt.png" },
  { TeamName: "5A. Humour-Us", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/avatar_d8fbda_space-buns_34C759.png" },
  { TeamName: "6B. bad to the bone", AvatarUrl: "https://raw.githubusercontent.com/brendahernandezsalazar-monash/accesories/main/avatars/badbed_mercedes_helm.png" },
];

const screens = {
  intro: document.getElementById("screen-intro"),
  instructions: document.getElementById("screen-instructions"),
  map: document.getElementById("screen-map"),
  room: document.getElementById("screen-room"),
  finale: document.getElementById("screen-finale"),
};

const els = {
  teamSelect: document.getElementById("teamSelect"),
  teamSummary: document.getElementById("teamSummary"),
  avatarPreview: document.getElementById("avatarPreview"),
  startGameBtn: document.getElementById("startGameBtn"),
  continueToMapBtn: document.getElementById("continueToMapBtn"),
  hudTeamName: document.getElementById("hudTeamName"),
  hudProgress: document.getElementById("hudProgress"),
  hudLife: document.getElementById("hudLife"),
  hudLifeFill: document.getElementById("hudLifeFill"),
  hudTimer: document.getElementById("hudTimer"),
  hudStatus: document.getElementById("hudStatus"),
  hintList: document.getElementById("hintList"),
  roomHintList: document.getElementById("roomHintList"),
  roomTeamName: document.getElementById("roomTeamName"),
  roomProgress: document.getElementById("roomProgress"),
  roomLife: document.getElementById("roomLife"),
  roomLifeFill: document.getElementById("roomLifeFill"),
  roomTimer: document.getElementById("roomTimer"),
  finalHintList: document.getElementById("finalHintList"),
  mapAvatar: document.getElementById("mapAvatar"),
  mapAvatarImg: document.getElementById("mapAvatarImg"),
  cityMap: document.getElementById("cityMap"),
  mapImage: document.querySelector(".map-image"),
  mapDebugPanel: document.getElementById("mapDebugPanel"),
  mapDebugTarget: document.getElementById("mapDebugTarget"),
  mapDebugCoords: document.getElementById("mapDebugCoords"),
  mapDebugPercents: document.getElementById("mapDebugPercents"),
  roomAvatar: document.getElementById("roomAvatar"),
  roomAvatarImg: document.getElementById("roomAvatarImg"),
  roomSceneImage: document.getElementById("roomSceneImage"),
  roomStage: document.querySelector(".room-stage"),
  roomDistrictTag: document.getElementById("roomDistrictTag"),
  roomTitle: document.getElementById("room-title"),
  roomIntro: document.getElementById("roomIntro"),
  roomQuestion: document.getElementById("roomQuestion"),
  questionStepLabel: document.getElementById("questionStepLabel"),
  answerForm: document.getElementById("answerForm"),
  answerLabel: document.getElementById("answerLabel"),
  answerFields: document.getElementById("answerFields"),
  answerFeedback: document.getElementById("answerFeedback"),
  backToMapBtn: document.getElementById("backToMapBtn"),
  finalFragments: document.getElementById("finalFragments"),
  restartBtn: document.getElementById("restartBtn"),
  debugPanel: document.getElementById("debugPanel"),
  debugRoomName: document.getElementById("debugRoomName"),
  debugCoords: document.getElementById("debugCoords"),
  debugPercents: document.getElementById("debugPercents"),
};

const mapButtons = Array.from(document.querySelectorAll(".map-hotspot"));

let teams = [];
let state = loadState();
let timerInterval = null;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  teams = await loadTeams();
  hydrateState();
  bindEvents();
  renderTeamOptions();
  renderAll();
  startTimer();
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {}
  }

  return {
    screen: "intro",
    selectedTeam: "",
    activeRoomId: "",
    solvedRoomIds: [],
    fragments: [],
    hints: [],
    roomQuestionIndex: {},
    life: START_LIFE,
    endTimeMs: Date.now() + TIMER_DURATION_MS,
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function hydrateState() {
  state.roomQuestionIndex = state.roomQuestionIndex || {};
  state.solvedRoomIds = state.solvedRoomIds.filter((id) => ROOM_DATA.some((room) => room.id === id));
  state.fragments = state.fragments.filter((item) => ROOM_DATA.some((room) => room.id === item.roomId));
  state.hints = state.hints.filter((item) => ROOM_DATA.some((room) => room.id === item.roomId));
  state.life = typeof state.life === "number" ? state.life : START_LIFE;
  state.endTimeMs = typeof state.endTimeMs === "number" ? state.endTimeMs : Date.now() + TIMER_DURATION_MS;

  if (!state.selectedTeam || !teams.some((team) => team.TeamName === state.selectedTeam)) {
    state.selectedTeam = "";
    state.screen = "intro";
  }

  saveState();
}

async function loadTeams() {
  try {
    const response = await fetch(TEAMS_CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const csv = await response.text();
    const parsed = parseCsv(csv)
      .map((team) => ({
        TeamName: team.TeamName?.trim() || "",
        AvatarUrl: (team.AvatarUrl || team.AvatarURL || "").trim(),
      }))
      .filter((team) => team.TeamName && team.AvatarUrl);

    return parsed.length ? parsed : FALLBACK_TEAMS;
  } catch (error) {
    console.warn("Falling back to local teams because the Google Sheet could not be loaded.", error);
    return FALLBACK_TEAMS;
  }
}

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  const [headerRow, ...bodyRows] = rows.filter((entry) => entry.some((cell) => cell.trim() !== ""));
  if (!headerRow) {
    return [];
  }

  return bodyRows.map((bodyRow) => {
    const record = {};
    headerRow.forEach((header, index) => {
      record[header.trim()] = (bodyRow[index] || "").trim();
    });
    return record;
  });
}

function bindEvents() {
  els.teamSelect.addEventListener("change", handleTeamChange);
  els.startGameBtn.addEventListener("click", () => {
    if (state.selectedTeam) {
      goToScreen("instructions");
    }
  });
  els.continueToMapBtn.addEventListener("click", () => goToScreen("map"));
  els.backToMapBtn.addEventListener("click", () => goToScreen("map"));
  els.answerForm.addEventListener("submit", handleAnswerSubmit);
  els.restartBtn.addEventListener("click", resetProgress);
  document.querySelectorAll("[data-restart-game]").forEach((button) => {
    button.addEventListener("click", resetProgress);
  });
  if (DEBUG_MODE && els.cityMap) {
    els.cityMap.addEventListener("click", handleMapDebugClick);
  }
  if (DEBUG_MODE && els.mapDebugTarget) {
    els.mapDebugTarget.addEventListener("change", renderMapDebugPanel);
  }
  if (DEBUG_MODE && els.roomStage) {
    els.roomStage.addEventListener("click", handleDebugStageClick);
  }

  mapButtons.forEach((button) => {
    button.addEventListener("click", () => handleMapSelection(button.dataset.roomId));
  });
}

function renderAll() {
  renderTeamSelection();
  renderSidebar();
  renderMap();
  renderFinale();
  syncScreen();
}

function renderTeamOptions() {
  const options = teams
    .map((team) => `<option value="${escapeHtml(team.TeamName)}">${escapeHtml(team.TeamName)}</option>`)
    .join("");
  els.teamSelect.innerHTML = `<option value="">Choose your team</option>${options}`;

  if (state.selectedTeam) {
    els.teamSelect.value = state.selectedTeam;
  }
}

function renderTeamSelection() {
  const team = getSelectedTeam();
  els.startGameBtn.disabled = !team;

  if (!team) {
    els.teamSummary.textContent = "Choose a team to begin the briefing.";
    els.avatarPreview.classList.remove("ready");
    els.avatarPreview.removeAttribute("src");
    return;
  }

  els.teamSummary.textContent = `${team.TeamName} will carry this investigation.`;
  els.avatarPreview.src = team.AvatarUrl;
  els.avatarPreview.classList.add("ready");
}

function renderSidebar() {
  const team = getSelectedTeam();
  const solvedCount = state.solvedRoomIds.length;
  const totalPlayable = getPlayableRooms().length;

  els.hudTeamName.textContent = team ? team.TeamName : "-";
  els.roomTeamName.textContent = team ? team.TeamName : "-";
  els.hudProgress.textContent = `${solvedCount} / ${totalPlayable}`;
  els.roomProgress.textContent = `${solvedCount} / ${totalPlayable}`;
  els.hudLife.textContent = String(state.life);
  els.roomLife.textContent = String(state.life);
  updateLifeMeters();
  updateTimerDisplays();
  els.hudStatus.textContent = isRoomBlocked(getRoomById("cave"))
    ? "Four fragments remain hidden. The cave is still blocked."
    : "The cave route has opened.";

  const hintMarkup = state.hints.length
    ? state.hints
        .map((hint) => `<li><strong>${escapeHtml(hint.title)}:</strong> ${escapeHtml(hint.text)}</li>`)
        .join("")
    : "<li>No hints recovered yet.</li>";

  els.hintList.innerHTML = hintMarkup;
  els.roomHintList.innerHTML = hintMarkup;
  els.finalHintList.innerHTML = hintMarkup;
}

function renderMap() {
  const team = getSelectedTeam();
  if (team) {
    els.mapAvatarImg.src = team.AvatarUrl;
    els.mapAvatar.classList.add("ready");
  } else {
    els.mapAvatar.classList.remove("ready");
    els.mapAvatarImg.removeAttribute("src");
  }

  mapButtons.forEach((button) => {
    const room = getRoomById(button.dataset.roomId);
    const solved = state.solvedRoomIds.includes(room.id);
    const blocked = isRoomBlocked(room);

    button.classList.toggle("solved", solved);
    button.classList.toggle("blocked", blocked);
    button.classList.toggle("locked", blocked);
  });

  renderMapDebugPanel();
}

function renderRoom(roomId) {
  const room = getRoomById(roomId);
  const team = getSelectedTeam();
  if (!room || isRoomBlocked(room)) {
    goToScreen("map");
    return;
  }

  const questionIndex = state.roomQuestionIndex[room.id] || 0;
  const question = room.questions[questionIndex];

  els.roomDistrictTag.textContent = room.district;
  els.roomTitle.textContent = room.name;
  els.roomIntro.textContent = room.intro;
  els.questionStepLabel.textContent = `Question ${questionIndex + 1} of ${room.questions.length}`;
  els.roomQuestion.textContent = question.question;
  els.roomSceneImage.src = room.scene;
  els.roomSceneImage.alt = `${room.name} scene`;
  els.answerFeedback.textContent = "";
  els.answerFeedback.className = "answer-feedback";

  els.roomAvatar.style.setProperty("--avatar-x", room.avatarX);
  els.roomAvatar.style.setProperty("--avatar-y", room.avatarY);
  els.roomAvatar.style.setProperty("--avatar-size", room.avatarSize);
  renderDebugPanel(room);

  if (team) {
    els.roomAvatarImg.src = team.AvatarUrl;
    els.roomAvatar.classList.add("ready");
  } else {
    els.roomAvatar.classList.remove("ready");
    els.roomAvatarImg.removeAttribute("src");
  }

  renderAnswerField(question);
}

function renderFinale() {
  const markup = state.fragments
    .map(
      (fragment) => `
        <article class="fragment-card">
          <strong>${escapeHtml(fragment.roomName)}</strong>
          <span>${escapeHtml(fragment.text)}</span>
        </article>
      `
    )
    .join("");

  els.finalFragments.innerHTML = markup || "<p>No fragments recovered yet.</p>";
}

function syncScreen() {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));

  if (!state.selectedTeam && state.screen !== "intro") {
    state.screen = "intro";
  }

  if (!screens[state.screen]) {
    state.screen = "intro";
  }

  screens[state.screen].classList.add("active");

  if (state.screen === "room" && state.activeRoomId) {
    renderRoom(state.activeRoomId);
  }
}

function handleTeamChange(event) {
  state.selectedTeam = event.target.value;
  saveState();
  renderAll();
}

function handleMapSelection(roomId) {
  const room = getRoomById(roomId);
  if (!room || isRoomBlocked(room)) {
    els.hudStatus.textContent = `${room?.name || "That location"} is blocked.`;
    return;
  }

  moveAvatarTo(roomId);
  state.activeRoomId = roomId;
  state.roomQuestionIndex[roomId] = state.solvedRoomIds.includes(roomId) ? room.questions.length - 1 : 0;
  saveState();

  window.setTimeout(() => {
    state.screen = "room";
    saveState();
    renderAll();
  }, 900);
}

function moveAvatarTo(roomId) {
  const button = mapButtons.find((entry) => entry.dataset.roomId === roomId);
  if (!button) {
    return;
  }
  els.mapAvatar.style.left = button.style.getPropertyValue("--x");
  els.mapAvatar.style.top = button.style.getPropertyValue("--y");
}

function handleAnswerSubmit(event) {
  event.preventDefault();
  const room = getRoomById(state.activeRoomId);
  if (!room) {
    return;
  }

  const questionIndex = state.roomQuestionIndex[room.id] || 0;
  const question = room.questions[questionIndex];
  const isCorrect = validateQuestionAnswer(question);

  if (!isCorrect) {
    state.life = Math.max(0, state.life - WRONG_ANSWER_PENALTY);
    saveState();
    renderSidebar();
    els.answerFeedback.textContent = "That answer does not fit the evidence yet.";
    els.answerFeedback.className = "answer-feedback error";
    return;
  }

  const nextIndex = questionIndex + 1;
  if (nextIndex < room.questions.length) {
    state.roomQuestionIndex[room.id] = nextIndex;
    saveState();
    renderRoom(room.id);
    els.answerFeedback.textContent = "Correct. Move to the next clue.";
    els.answerFeedback.className = "answer-feedback success";
    return;
  }

  if (!state.solvedRoomIds.includes(room.id)) {
    state.solvedRoomIds.push(room.id);
    state.fragments.push({
      roomId: room.id,
      roomName: room.name,
      text: room.fragment,
    });
    state.hints.push({
      roomId: room.id,
      title: room.hintTitle,
      text: room.hintText,
    });
  }

  state.roomQuestionIndex[room.id] = room.questions.length - 1;
  els.answerFeedback.textContent = "Correct. Your fragment and lock clue have been added.";
  els.answerFeedback.className = "answer-feedback success";

  saveState();
  renderSidebar();
  renderMap();
  renderFinale();

  if (state.solvedRoomIds.length === getPlayableRooms().length) {
    window.setTimeout(() => {
      goToScreen("finale");
    }, 850);
    return;
  }

  window.setTimeout(() => {
    goToScreen("map");
  }, 850);
}

function renderAnswerField(question) {
  els.answerFields.innerHTML = "";

  if (question.type === "info") {
    els.answerLabel.textContent = "Continue when ready";
    const note = document.createElement("div");
    note.className = "answer-note";
    note.textContent = "This clue sets up the following questions. Click Next to continue.";
    els.answerFields.appendChild(note);
    return;
  }

  if (question.type === "multi-dropdown") {
    els.answerLabel.textContent = "Complete the full table";
    const groups = buildMultiDropdownGroups(question.fields);
    const columnKeys = getMultiDropdownColumnKeys(groups);
    const wrap = document.createElement("div");
    wrap.className = "table-answer-wrap";

    const table = document.createElement("table");
    table.className = "answer-table";

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Pin</th>";
    columnKeys.forEach((key) => {
      const th = document.createElement("th");
      th.textContent = formatColumnLabel(key);
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    groups.forEach((group) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${escapeHtml(group.pin)}</td>`;

      columnKeys.forEach((key) => {
        const td = document.createElement("td");
        const field = group.columns[key];
        if (!field) {
          tr.appendChild(td);
          return;
        }
        const select = document.createElement("select");
        select.name = `multi-${field.index}`;
        select.className = "dropdown-field";
        select.innerHTML = `<option value="">Select</option>${shuffleArray(field.options)
          .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
          .join("")}`;
        td.appendChild(select);
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    els.answerFields.appendChild(wrap);

    if (!question.disableTextField) {
      const textWrap = document.createElement("div");
      textWrap.className = "matching-row";
      const title = document.createElement("strong");
      title.textContent = question.textFieldLabel || "Enter the final clue";
      const input = document.createElement("input");
      input.className = "text-field";
      input.id = "dynamicAnswerInput";
      input.name = "multi-text-answer";
      input.type = "text";
      input.autocomplete = "off";
      textWrap.appendChild(title);
      textWrap.appendChild(input);
      els.answerFields.appendChild(textWrap);
    }
    return;
  }

  if (question.type === "mcq") {
    els.answerLabel.textContent = "Select one answer";
    const wrapper = document.createElement("div");
    wrapper.className = "choice-list";
    shuffleArray(question.options).forEach((option) => {
      const label = document.createElement("label");
      label.className = "choice-item";
      label.innerHTML = `
        <input type="radio" name="dynamic-answer" value="${escapeHtml(option)}" />
        <span>${escapeHtml(option)}</span>
      `;
      wrapper.appendChild(label);
    });
    els.answerFields.appendChild(wrapper);
    return;
  }

  if (question.type === "dropdown") {
    els.answerLabel.textContent = "Choose the correct option";
    const select = document.createElement("select");
    select.className = "dropdown-field";
    select.name = "dynamic-answer";
    select.id = "dynamicAnswerInput";
    select.innerHTML = `<option value="">Select an option</option>${shuffleArray(question.options)
      .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
      .join("")}`;
    els.answerFields.appendChild(select);
    return;
  }

  if (question.type === "matching") {
    els.answerLabel.textContent = "Complete each match";
    const wrapper = document.createElement("div");
    wrapper.className = "matching-list";
    const options = shuffleArray(question.pairs.map((pair) => pair.right));
    question.pairs.forEach((pair, index) => {
      const row = document.createElement("div");
      row.className = "matching-row";
      const title = document.createElement("strong");
      title.textContent = pair.left;
      const select = document.createElement("select");
      select.name = `matching-${index}`;
      select.innerHTML = `<option value="">Select a match</option>${options
        .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
        .join("")}`;
      row.appendChild(title);
      row.appendChild(select);
      wrapper.appendChild(row);
    });
    els.answerFields.appendChild(wrapper);
    return;
  }

  els.answerLabel.textContent = "Enter your answer";
  const input = document.createElement("input");
  input.className = "text-field";
  input.id = "dynamicAnswerInput";
  input.name = "dynamic-answer";
  input.type = "text";
  input.autocomplete = "off";
  els.answerFields.appendChild(input);
}

function validateQuestionAnswer(question) {
  if (question.type === "info") {
    return true;
  }

  if (question.type === "matching") {
    return question.pairs.every((pair, index) => {
      const value = document.querySelector(`[name="matching-${index}"]`)?.value || "";
      return normalizeAnswer(value) === normalizeAnswer(pair.right);
    });
  }

  if (question.type === "multi-dropdown") {
    const dropdownsCorrect = question.fields.every((field, index) => {
      const value = document.querySelector(`[name="multi-${index}"]`)?.value || "";
      return normalizeAnswer(value) === normalizeAnswer(field.answer);
    });
    if (question.disableTextField) {
      return dropdownsCorrect;
    }
    const textValue = document.querySelector('[name="multi-text-answer"]')?.value || "";
    const acceptedText = String(question.textAnswer || "")
      .split("|")
      .map((entry) => normalizeAnswer(entry));
    return dropdownsCorrect && acceptedText.includes(normalizeAnswer(textValue));
  }

  const rawValue =
    document.querySelector('[name="dynamic-answer"]:checked')?.value ||
    document.querySelector('[name="dynamic-answer"]')?.value ||
    "";

  if (question.type === "text") {
    const accepted = String(question.answer)
      .split("|")
      .map((entry) => normalizeAnswer(entry));
    return accepted.includes(normalizeAnswer(rawValue));
  }

  return normalizeAnswer(rawValue) === normalizeAnswer(question.answer);
}

function buildMultiDropdownGroups(fields) {
  const groups = {};

  fields.forEach((field, index) => {
    const match = field.label.match(/^Pin\s+([A-Z])\s+(.+)$/i);
    if (!match) {
      return;
    }

    const pin = match[1].toUpperCase();
    const column = match[2].toLowerCase();

    if (!groups[pin]) {
      groups[pin] = { pin, columns: {} };
    }

    groups[pin].columns[column] = {
      index,
      options: field.options,
    };
  });

  return Object.values(groups).sort((a, b) => a.pin.localeCompare(b.pin));
}

function getMultiDropdownColumnKeys(groups) {
  const keys = [];
  groups.forEach((group) => {
    Object.keys(group.columns).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
  });
  return keys;
}

function formatColumnLabel(key) {
  return key
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startTimer() {
  if (timerInterval) {
    window.clearInterval(timerInterval);
  }
  updateTimerDisplays();
  timerInterval = window.setInterval(() => {
    updateTimerDisplays();
  }, 1000);
}

function updateTimerDisplays() {
  const remainingMs = Math.max(0, state.endTimeMs - Date.now());
  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const display = `${minutes}:${seconds}`;

  if (els.hudTimer) {
    els.hudTimer.textContent = display;
  }
  if (els.roomTimer) {
    els.roomTimer.textContent = display;
  }

  if (remainingMs <= 0 && timerInterval) {
    window.clearInterval(timerInterval);
    timerInterval = null;
    els.hudStatus.textContent = "Time is up.";
  }
}

function updateLifeMeters() {
  const pct = Math.max(0, Math.min(100, (state.life / START_LIFE) * 100));
  const color =
    pct <= 25 ? "linear-gradient(90deg, #a63a3a, #ea8b8b)" :
    pct <= 50 ? "linear-gradient(90deg, #b87c29, #e1b45f)" :
    "linear-gradient(90deg, #3aa55d, #7ee08b)";

  if (els.hudLifeFill) {
    els.hudLifeFill.style.width = `${pct}%`;
    els.hudLifeFill.style.background = color;
  }
  if (els.roomLifeFill) {
    els.roomLifeFill.style.width = `${pct}%`;
    els.roomLifeFill.style.background = color;
  }
}

function renderDebugPanel(room) {
  if (!els.debugPanel || !els.roomStage) {
    return;
  }

  if (!DEBUG_MODE || !room) {
    els.debugPanel.hidden = true;
    els.roomStage.classList.remove("debug-enabled");
    return;
  }

  els.debugPanel.hidden = false;
  els.roomStage.classList.add("debug-enabled");
  els.debugRoomName.textContent = room.name;
  updateDebugReadout(room);
}

function renderMapDebugPanel() {
  if (!els.mapDebugPanel || !els.cityMap) {
    return;
  }

  if (!DEBUG_MODE) {
    els.mapDebugPanel.hidden = true;
    els.cityMap.classList.remove("debug-enabled");
    return;
  }

  els.mapDebugPanel.hidden = false;
  els.cityMap.classList.add("debug-enabled");
  updateMapDebugReadout();
}

function handleMapDebugClick(event) {
  if (!DEBUG_MODE || !els.cityMap || !els.mapImage) {
    return;
  }

  if (event.target.closest(".map-hotspot")) {
    return;
  }

  const targetId = els.mapDebugTarget?.value || "warehouse";
  const hotspot = mapButtons.find((button) => button.dataset.roomId === targetId);
  if (!hotspot) {
    return;
  }

  const rect = els.mapImage.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
  const xPercent = `${((x / rect.width) * 100).toFixed(1)}%`;
  const yPercent = `${((y / rect.height) * 100).toFixed(1)}%`;

  hotspot.style.setProperty("--x", xPercent);
  hotspot.style.setProperty("--y", yPercent);
  updateMapDebugReadout(rect.width, rect.height);
}

function updateMapDebugReadout(widthOverride, heightOverride) {
  if (!els.mapDebugCoords || !els.mapDebugPercents || !els.mapDebugTarget || !els.mapImage) {
    return;
  }

  const hotspot = mapButtons.find((button) => button.dataset.roomId === els.mapDebugTarget.value);
  if (!hotspot) {
    return;
  }

  const xPercent = hotspot.style.getPropertyValue("--x") || "0%";
  const yPercent = hotspot.style.getPropertyValue("--y") || "0%";
  const imageWidth = widthOverride || els.mapImage.clientWidth || 1280;
  const imageHeight = heightOverride || els.mapImage.clientHeight || 1280;
  const xPx = Math.round((parseFloat(xPercent) / 100) * imageWidth);
  const yPx = Math.round((parseFloat(yPercent) / 100) * imageHeight);

  els.mapDebugCoords.textContent = `x: ${xPx}, y: ${yPx}`;
  els.mapDebugPercents.textContent = `x: ${xPercent}, y: ${yPercent}`;
}

function handleDebugStageClick(event) {
  if (!DEBUG_MODE || !els.roomSceneImage) {
    return;
  }

  const room = getRoomById(state.activeRoomId);
  if (!room) {
    return;
  }

  const rect = els.roomSceneImage.getBoundingClientRect();
  const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
  const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));

  room.avatarX = `${((x / rect.width) * 100).toFixed(1)}%`;
  room.avatarY = `${((y / rect.height) * 100).toFixed(1)}%`;
  els.roomAvatar.style.setProperty("--avatar-x", room.avatarX);
  els.roomAvatar.style.setProperty("--avatar-y", room.avatarY);
  updateDebugReadout(room, rect.width, rect.height);
}

function updateDebugReadout(room, widthOverride, heightOverride) {
  const imageWidth = widthOverride || els.roomSceneImage?.clientWidth || 1920;
  const imageHeight = heightOverride || els.roomSceneImage?.clientHeight || 1080;
  const xPercent = parseFloat(room.avatarX);
  const yPercent = parseFloat(room.avatarY);
  const xPx = Math.round((xPercent / 100) * imageWidth);
  const yPx = Math.round((yPercent / 100) * imageHeight);

  if (els.debugCoords) {
    els.debugCoords.textContent = `x: ${xPx}, y: ${yPx}`;
  }
  if (els.debugPercents) {
    els.debugPercents.textContent = `x: ${room.avatarX}, y: ${room.avatarY}`;
  }
}

function goToScreen(screenName) {
  state.screen = screenName;
  if (screenName !== "room") {
    state.activeRoomId = "";
  }
  saveState();
  renderAll();
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  hydrateState();
  renderTeamOptions();
  renderAll();
  startTimer();
}

function getPlayableRooms() {
  return ROOM_DATA;
}

function getRoomById(roomId) {
  return ROOM_DATA.find((room) => room.id === roomId);
}

function isRoomBlocked(room) {
  if (!room) {
    return true;
  }
  if (!room.unlockAfterAll) {
    return !!room.blocked;
  }
  const needed = ROOM_DATA.filter((entry) => !entry.unlockAfterAll).length;
  return state.solvedRoomIds.filter((id) => id !== room.id).length < needed;
}

function getSelectedTeam() {
  return teams.find((team) => team.TeamName === state.selectedTeam) || null;
}

function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s+]/g, "")
    .replace(/\s+/g, " ");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
