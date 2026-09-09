import * as THREE from 'three';

/* ==========================================================
   DOM references
   ========================================================== */
const container = document.getElementById('gallery-container');
const loadingScreen = document.getElementById('loading-screen');
const startScreen = document.getElementById('start-screen');
const enterBtn = document.getElementById('enter-btn');
const hud = document.getElementById('hud');
const interactPrompt = document.getElementById('interact-prompt');
const interactTitle = document.getElementById('interact-title');
const interactHintDesktop = document.getElementById('interact-hint-desktop');
const interactBtn = document.getElementById('interact-btn');
const resumeToast = document.getElementById('resume-toast');
const touchControls = document.getElementById('touch-controls');
const touchMoveZone = document.getElementById('touch-move-zone');
const touchLookZone = document.getElementById('touch-look-zone');
const touchStickBase = document.getElementById('touch-stick-base');
const touchStick = document.getElementById('touch-stick');
const jumpBtn = document.getElementById('jump-btn');
const desktopInstructions = document.getElementById('desktop-instructions');
const touchInstructions = document.getElementById('touch-instructions');
const modal = document.getElementById('modal');
const modalDetails = document.getElementById('modal-details');
const closeBtn = document.getElementById('close-btn');

const IS_TOUCH = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

/* ==========================================================
   Exhibit data (copy from resume where applicable)
   ========================================================== */
const EXHIBITS = [
  {
    key: 'flexform',
    title: 'FlexForm Aeronautics',
    subtitle: 'Co-Founder · November 2025 – Present · Oxford, OH',
    image: 'images/flexform.png',
    bullets: [
      'Co-founded a defense-tech startup building proprietary technology for UAV platforms under a licensing model; secured a provisional patent and grant funding',
      'Two-time campus pitch competition winner (MUCAT, Athena42) presenting FlexForm to judging panels',
    ],
  },
  {
    key: 'capital1809',
    title: '1809 Capital',
    subtitle: 'Investment Analyst Intern · April 2026 – Present · Oxford, OH',
    image: 'images/1809capital.png',
    bullets: [
      'Authored a due diligence report evaluating a potential co-investment in a physical-AI/robotics company alongside a top-tier VC firm, covering market sizing, competitive landscape, financials, and exit risk',
      "Building an automated pre-diligence tool that screens investments against 1809 Capital's criteria and thesis",
    ],
  },
  {
    key: 'gallagher',
    title: 'Arthur J. Gallagher & Co.',
    subtitle: 'Data & Analytics Intern, DRIVE Team · June – August 2026 · Rolling Meadows, IL',
    image: 'images/gallagher.png',
    bullets: [
      'Built a data QA tool that proactively flags data-quality issues before they reach production, meaningfully reducing manual review time',
      'Developed an internal coding agent to streamline repetitive development tasks',
      "Enhanced Gallagher Blueprint by identifying upgrades to strengthen clients' risk profiles and unlock revenue; presented the QA tool and Blueprint recommendations to senior leadership as a capstone to the internship",
    ],
  },
  {
    key: 'redhawk',
    title: 'RedHawk Ventures',
    subtitle: 'Investment Analyst · August 2025 – Present · Oxford, OH',
    image: 'images/redhawk.png',
    bullets: [
      "Member of Miami's premier student-led seed-stage venture fund ($1,000,000 AUM, 7% acceptance rate); served on three diligence teams, led one",
      "Built the fund's Python/Flask deal-sourcing scraper and a nine-stage multi-agent due-diligence pipeline (Google ADK) used to screen prospective investments",
      'Co-authored a $100,000 proposal to Miami University for RedHawk Ventures Incubator (RVI), a non-dilutive grant program building the fund\'s own deal-sourcing pipeline through analyst-run founder cohorts',
    ],
  },
  {
    key: 'nakamoto',
    title: 'Cosimo Capital / Nakamoto Mining',
    subtitle: 'Financial Analyst and AI Innovation Intern · June 2024 – August 2025 · Chicago, IL',
    image: 'images/nakamoto.png',
    description: 'Traveled to downtown Chicago every day for my job at Nakamoto. I created @i, the GPT-3.5 and Stable Diffusion AI assistant for @properties real estate agency, trained on vast datasets to generate images and property descriptions, and presented the MVP to the CEO to showcase its features. I also researched and presented DeFi protocols and daily crypto market updates for a hedge fund manager.',
  },
  {
    key: 'blockchainClub',
    title: 'Miami University Blockchain Club',
    subtitle: 'President · August 2025 – Present · Oxford, OH',
    image: 'images/blockchainClub.png',
    bullets: [
      'Coordinate guest speaker events with industry professionals and lead the planning and execution of educational workshops for blockchain literacy among members',
      'Spearheaded logistics for club participation in the national University Blockchain Conference',
    ],
  },
  {
    key: 'sigmaEtaPi',
    title: 'Sigma Eta Pi',
    subtitle: 'Founding Brother · Miami University',
    image: 'images/sepi.png',
    bullets: [
      "Founding brother of Sigma Eta Pi, Miami University's entrepreneurship fraternity",
      "Helped design the chapter's new member education plan",
    ],
  },
  {
    key: 'ethChi',
    title: 'ETH Chicago 2023 Conference',
    image: 'images/EthChi.png',
    description: 'I volunteered for ETH Chicago 2023 where I made valuable connections with university students involved in web3. I also visited Drive Capital to meet venture capitalists.',
  },
  {
    key: 'brc',
    title: 'Bored Racket Club',
    image: 'images/BRC.png',
    description: 'I am the founder and CEO of Bored Racket Club, a global community of Bored Apes and pickleball players. I applied for a Made for Apes license and designed, created, and advertised branded pickleball paddles. I sold out of the paddles at the premier industry conference, and I hosted global events in Chicago and Lisbon for community members. I even was accepted into a selective startup incubator and received $30,000 in funding.',
    link: 'https://www.boredrackets.com/',
    linkText: 'Bored Racket Club Website →',
  },
  {
    key: 'marvila',
    title: 'Bored Racket Club @ MBA Bodega',
    image: 'images/BRCmarket.jpeg',
    description: 'At ApeFest Lisbon, I had the opportunity to sell my Bored Racket Club products at the Made By Apes Bodega. I was able to meet my customers in-person from over 10 countries and sold out of my inventory.',
  },
  {
    key: 'lisbonEvent',
    title: 'Bored Racket Club Lisbon Event',
    image: 'images/BRCcommunity.jpg',
    description: 'I organized and hosted the first international Bored Racket Club event for ApeFest Lisbon. People from all around the world and of all skill levels came to play pickleball with the Bored Racket Club.',
  },
  {
    key: 'metaCollective',
    title: 'Meta Collective',
    image: 'images/metacollective.JPEG',
    description: "I founded Meta Collective, Illinois' first Web3-devoted high school club, as a freshman. I lead weekly meetings discussing cryptocurrencies, NFTs, and other emerging financial markets. We've increased our group's digital wallet value by over 600% trading these assets, hosted and attended events around the state, and promoted the interdisciplinary nature of Web3 around the school!",
  },
  {
    key: 'hermanShout',
    title: 'imnotArt Internship',
    image: 'images/hermanShout.png',
    description: "During my internship at Chicago's first art gallery, imnotArt, I had the opportunity to work with Improbable, the London-based metaverse company. I created a public metaverse for imnotArt, equipped with music, games, and even a special MLB collaboration trivia!",
  },
  {
    key: 'visionPro',
    title: 'imnotArt Internship',
    image: 'images/imnotart.png',
    description: 'At my internship at imnotArt, I onboarded members of the Chicago community to AI, the metaverse, and the Apple Vision Pro.',
  },
  {
    key: 'aiPromptBattle',
    title: 'AI Prompt Battle',
    video: 'images/promptBattle.mp4',
    description: 'I created the AI Prompt Battle to bring fun and competition to AI in all fields. This project won the Cyberjam Hackathon. It was recently used at the Chicago Fashion Coalition event and the Vitalia Biohacking Conference.',
  },
  {
    key: 'tedTalk',
    title: 'TEDxArlington Heights Talk',
    video: 'images/TEDxTalk.mp4',
    audibleVideo: true,
    description: 'I was selected to deliver a TEDxArlington Heights Talk on the accessibility and fun of AI. I worked for six months to pitch my idea, develop my script, and prepare to deliver the talk in October.',
    link: 'https://youtu.be/JXxln7aeSMM?si=CezlOgipYVG3zGkN',
    linkText: 'Watch on YouTube →',
  },
  {
    key: 'captainInterview',
    title: 'Coffee With Captain Appearance',
    image: 'images/captainCover.png',
    audio: 'images/captainInterview.mp3',
    description: 'I appeared on "Coffee With Captain," a Crypto/NFT podcast hosted by a Bored Ape Yacht Club holder, in front of 1,700 listeners.',
  },
  {
    key: 'tennis',
    title: 'Tennis',
    image: 'images/tennis.png',
    description: "I've played tennis for as long as I can remember and made the varsity team starting my freshman year, winning conference champion at 3rd singles that year. Since then, I've played in the state lineup. I also coach middle school tennis players in the summers.",
  },
];

/* ==========================================================
   Room / layout constants
   ========================================================== */
const ROOM_W = 46;
const ROOM_D = 22;
const ROOM_H = 9;
const EYE_HEIGHT = 1.7;
const PLAYER_RADIUS = 0.45;
const FRAME_Y = 1.8;
const FRAME_W = 3.0;
const FRAME_H = 2.0;
const FOCUS_RADIUS = 4.2;
const WALK_SPEED = 5.2;
const SPRINT_SPEED = 9;
const MOUSE_SENS = 0.0022;
const TOUCH_LOOK_SENS = 0.01;
const JUMP_SPEED = 5.5;
const GRAVITY = 14;

const PILLARS = [
  { x: -13, z: -6 },
  { x: 13, z: -6 },
  { x: -13, z: 6 },
  { x: 13, z: 6 },
];
const PILLAR_RADIUS = 0.55;

const WINDOW_COUNT = 5;
const WINDOW_W = 5.2;
const WINDOW_H = 2.8;
const WINDOW_Y = 6.1;

/* ==========================================================
   Scene state
   ========================================================== */
let scene, camera, renderer, clock;
let entered = false;
let modalOpen = false;
let yaw = 0;
let pitch = 0;

const keys = { forward: false, backward: false, left: false, right: false, sprint: false };
const touchMoveVec = { x: 0, y: 0 };
let moveTouchId = null;
let moveOrigin = { x: 0, y: 0 };
let lookTouchId = null;
let lookLast = { x: 0, y: 0 };

const focusables = [];
let focused = null;
const videoElements = [];
let bobTime = 0;
let verticalVelocity = 0;
let isJumping = false;
const textureLoader = new THREE.TextureLoader();

const TIME_KEYFRAMES = [
  { hour: 0, colors: ['#05060f', '#0b0e24', '#12132c', '#1b1c30'], moonAlpha: 1, starAlpha: 1, sunAlpha: 0, sunPos: [0.5, 1.15], windowChance: 0.55 },
  { hour: 5, colors: ['#05060f', '#0b0e24', '#12132c', '#1b1c30'], moonAlpha: 1, starAlpha: 1, sunAlpha: 0, sunPos: [0.08, 0.95], windowChance: 0.55 },
  { hour: 6.5, colors: ['#16203f', '#3a3355', '#a85f6a', '#f2985f'], moonAlpha: 0.15, starAlpha: 0.2, sunAlpha: 0.7, sunPos: [0.15, 0.68], windowChance: 0.35 },
  { hour: 8, colors: ['#3c7bd6', '#6fa8e0', '#a9d4ef', '#dff0fa'], moonAlpha: 0, starAlpha: 0, sunAlpha: 0.9, sunPos: [0.28, 0.45], windowChance: 0.12 },
  { hour: 12, colors: ['#2e7bd8', '#5fa3e6', '#a7d3f3', '#eaf6ff'], moonAlpha: 0, starAlpha: 0, sunAlpha: 1, sunPos: [0.5, 0.16], windowChance: 0.08 },
  { hour: 17, colors: ['#3f5f9e', '#7d6f9a', '#c98a76', '#f2b177'], moonAlpha: 0, starAlpha: 0, sunAlpha: 0.85, sunPos: [0.72, 0.42], windowChance: 0.18 },
  { hour: 19, colors: ['#0c1130', '#241c46', '#5c3860', '#d98a5c'], moonAlpha: 0.4, starAlpha: 0.4, sunAlpha: 0.3, sunPos: [0.85, 0.66], windowChance: 0.45 },
  { hour: 21, colors: ['#060810', '#0e1128', '#171a34', '#241f38'], moonAlpha: 0.85, starAlpha: 0.85, sunAlpha: 0, sunPos: [0.92, 0.98], windowChance: 0.5 },
  { hour: 24, colors: ['#05060f', '#0b0e24', '#12132c', '#1b1c30'], moonAlpha: 1, starAlpha: 1, sunAlpha: 0, sunPos: [0.5, 1.15], windowChance: 0.55 },
];

/* ==========================================================
   Boot
   ========================================================== */
function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

if (!hasWebGL()) {
  showFallback('This browser could not create a WebGL context.');
} else {
  try {
    init();
  } catch (err) {
    console.error(err);
    showFallback(err && err.message ? err.message : String(err));
  }
}

function showFallback(reason) {
  loadingScreen.classList.add('hidden');
  const fallback = document.createElement('div');
  fallback.id = 'webgl-fallback';
  fallback.innerHTML = `
    <div>
      <h1 style="font-family: 'Playfair Display', Georgia, serif; margin-bottom: 14px;">Sam Yeh</h1>
      <p>This interactive gallery needs a browser with WebGL support. In the meantime, connect with me here:</p>
      <p style="margin-top:18px;">
        <a href="https://www.linkedin.com/in/samheyyeh" style="color:#c9a24b;">LinkedIn</a> &nbsp;|&nbsp;
        <a href="https://github.com/samheyyeh" style="color:#c9a24b;">GitHub</a>
      </p>
      ${reason ? `<p style="margin-top:22px; font-size:0.75rem; color:#666; font-family:monospace;">${reason}</p>` : ''}
    </div>
  `;
  document.body.appendChild(fallback);
}

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a24);
  scene.fog = new THREE.Fog(0x1a1a24, 20, 50);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.rotation.order = 'YXZ';
  camera.position.set(0, EYE_HEIGHT, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  buildRoom();
  buildPillars();
  buildWindows();
  buildLighting();
  layoutExhibits();

  clock = new THREE.Clock();
  setupInput();
  window.addEventListener('resize', onResize);

  loadingScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');

  if (IS_TOUCH) {
    desktopInstructions.classList.add('hidden');
    touchInstructions.classList.remove('hidden');
  }

  animate();
}

/* ==========================================================
   Perimeter math — evenly distribute exhibits around the hall
   ========================================================== */
function wallSegments(w, d) {
  const hw = w / 2;
  const hd = d / 2;
  return [
    { from: [-hw, hd], to: [hw, hd], normal: [0, -1] }, // south wall
    { from: [hw, hd], to: [hw, -hd], normal: [-1, 0] }, // east wall
    { from: [hw, -hd], to: [-hw, -hd], normal: [0, 1] }, // north wall
    { from: [-hw, -hd], to: [-hw, hd], normal: [1, 0] }, // west wall
  ];
}

function segLength(s) {
  return Math.hypot(s.to[0] - s.from[0], s.to[1] - s.from[1]);
}

function pointAtDistance(segs, total, dist) {
  let remaining = ((dist % total) + total) % total;
  for (const s of segs) {
    const len = segLength(s);
    if (remaining <= len) {
      const t = remaining / len;
      return {
        x: s.from[0] + (s.to[0] - s.from[0]) * t,
        z: s.from[1] + (s.to[1] - s.from[1]) * t,
        normal: s.normal,
      };
    }
    remaining -= len;
  }
  const last = segs[segs.length - 1];
  return { x: last.to[0], z: last.to[1], normal: last.normal };
}

function layoutExhibits() {
  const segs = wallSegments(ROOM_W, ROOM_D);
  const perimeter = segs.reduce((sum, s) => sum + segLength(s), 0);
  const spacing = perimeter / EXHIBITS.length;
  const startOffset = spacing / 2;

  EXHIBITS.forEach((exhibit, i) => {
    const p = pointAtDistance(segs, perimeter, startOffset + i * spacing);
    buildExhibitFrame(exhibit, p.x, p.z, p.normal);
  });
}

/* ==========================================================
   Room geometry
   ========================================================== */
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#141318';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 254, 254);
  ctx.beginPath();
  ctx.moveTo(128, 0);
  ctx.lineTo(128, 256);
  ctx.moveTo(0, 128);
  ctx.lineTo(256, 128);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildRoom() {
  const floorTex = makeFloorTexture();
  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(ROOM_W / 4, ROOM_D / 4);

  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTex,
    roughness: 0.35,
    metalness: 0.25,
    emissive: 0x1c1c24,
    emissiveIntensity: 0.55,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0x18181f,
    roughness: 0.9,
    emissive: 0x18181f,
    emissiveIntensity: 0.6,
  });
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_D), ceilingMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM_H;
  scene.add(ceiling);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xf1ede0,
    roughness: 0.85,
    emissive: 0x4a4536,
    emissiveIntensity: 0.7,
  });

  const southWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), wallMat);
  southWall.position.set(0, ROOM_H / 2, ROOM_D / 2);
  southWall.rotation.y = Math.PI;
  scene.add(southWall);

  const northWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_W, ROOM_H), wallMat);
  northWall.position.set(0, ROOM_H / 2, -ROOM_D / 2);
  scene.add(northWall);

  const eastWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
  eastWall.position.set(ROOM_W / 2, ROOM_H / 2, 0);
  eastWall.rotation.y = -Math.PI / 2;
  scene.add(eastWall);

  const westWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_D, ROOM_H), wallMat);
  westWall.position.set(-ROOM_W / 2, ROOM_H / 2, 0);
  westWall.rotation.y = Math.PI / 2;
  scene.add(westWall);
}

function buildPillars() {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xdedad0,
    roughness: 0.6,
    emissive: 0x4a4638,
    emissiveIntensity: 0.6,
  });
  const geo = new THREE.CylinderGeometry(PILLAR_RADIUS, PILLAR_RADIUS, ROOM_H, 20);
  PILLARS.forEach((p) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(p.x, ROOM_H / 2, p.z);
    scene.add(mesh);
  });
}

function buildLighting() {
  scene.add(new THREE.HemisphereLight(0x5a5a68, 0x18181c, 1.2));
  scene.add(new THREE.AmbientLight(0xfff4de, 0.5));

  const spotSpots = [
    [-18, 0], [-6, 0], [6, 0], [18, 0],
    [0, -8], [0, 8],
  ];
  spotSpots.forEach(([x, z]) => {
    const spot = new THREE.SpotLight(0xfff2d8, 6, 18, Math.PI / 4, 0.6, 0);
    spot.position.set(x, ROOM_H - 0.4, z);
    const target = new THREE.Object3D();
    target.position.set(x, 0, z);
    scene.add(target);
    spot.target = target;
    scene.add(spot);
  });
}

/* ==========================================================
   Chicago skyline windows
   ========================================================== */
/* ==========================================================
   Time-of-day palette — driven by the viewer's local clock
   ========================================================== */
function hexToRgb(hex) {
  const v = parseInt(hex.replace('#', ''), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(hexA, hexB, t) {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function getTimePalette(hourFloat) {
  const h = ((hourFloat % 24) + 24) % 24;
  let lo = TIME_KEYFRAMES[0];
  let hi = TIME_KEYFRAMES[TIME_KEYFRAMES.length - 1];
  for (let i = 0; i < TIME_KEYFRAMES.length - 1; i++) {
    if (h >= TIME_KEYFRAMES[i].hour && h <= TIME_KEYFRAMES[i + 1].hour) {
      lo = TIME_KEYFRAMES[i];
      hi = TIME_KEYFRAMES[i + 1];
      break;
    }
  }
  const span = hi.hour - lo.hour || 1;
  const t = (h - lo.hour) / span;

  return {
    colors: lo.colors.map((c, i) => lerpColor(c, hi.colors[i], t)),
    moonAlpha: lerp(lo.moonAlpha, hi.moonAlpha, t),
    starAlpha: lerp(lo.starAlpha, hi.starAlpha, t),
    sunAlpha: lerp(lo.sunAlpha, hi.sunAlpha, t),
    sunPos: [lerp(lo.sunPos[0], hi.sunPos[0], t), lerp(lo.sunPos[1], hi.sunPos[1], t)],
    windowChance: lerp(lo.windowChance, hi.windowChance, t),
  };
}

function addWindowsToRect(ctx, x, y, w, h, chance = 0.5) {
  const winW = 5;
  const winH = 8;
  const padX = 5;
  const padY = 7;
  for (let wy = y + padY; wy < y + h - padY; wy += winH + padY) {
    for (let wx = x + padX; wx < x + w - padX; wx += winW + padX) {
      if (Math.random() < chance) {
        ctx.fillStyle = 'rgba(255, 214, 130, 0.85)';
        ctx.fillRect(wx, wy, winW, winH);
      }
    }
  }
}

function drawSkylineLayer(ctx, w, h, baseFrac, color, alpha, minW, maxW, windowChance) {
  const baseY = h * baseFrac;
  let x = -20;
  ctx.globalAlpha = alpha;
  while (x < w + 20) {
    const bw = minW + Math.random() * (maxW - minW);
    const bh = h * (0.12 + Math.random() * 0.34);
    const topY = baseY - bh;
    ctx.fillStyle = color;
    ctx.fillRect(x, topY, bw, h - topY);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, topY, bw, h - topY);
    ctx.clip();
    addWindowsToRect(ctx, x, topY, bw, h - topY, windowChance);
    ctx.restore();
    x += bw + 4 + Math.random() * 10;
  }
  ctx.globalAlpha = 1;
}

function drawWillisTower(ctx, cx, h, chance = 0.5) {
  const baseY = h * 0.86;
  const topY = h * 0.18;
  const width = 90;

  ctx.save();
  ctx.beginPath();
  ctx.rect(cx - width / 2, topY + 40, width, baseY - topY - 40);
  ctx.rect(cx - width / 2, topY, width * 0.42, 60);
  ctx.rect(cx + width * 0.08, topY, width * 0.42, 60);
  ctx.fillStyle = '#0c0a18';
  ctx.fill();
  ctx.clip();
  addWindowsToRect(ctx, cx - width / 2, topY, width, baseY - topY, chance);
  ctx.restore();

  ctx.fillStyle = '#0c0a18';
  ctx.fillRect(cx - width * 0.3, topY - 55, 4, 55);
  ctx.fillRect(cx + width * 0.22, topY - 45, 4, 45);
}

function drawHancockTower(ctx, cx, h, chance = 0.5) {
  const baseY = h * 0.86;
  const topY = h * 0.24;
  const baseWidth = 100;
  const topWidth = 46;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - baseWidth / 2, baseY);
  ctx.lineTo(cx - topWidth / 2, topY);
  ctx.lineTo(cx + topWidth / 2, topY);
  ctx.lineTo(cx + baseWidth / 2, baseY);
  ctx.closePath();
  ctx.fillStyle = '#0c0a18';
  ctx.fill();
  ctx.clip();
  addWindowsToRect(ctx, cx - baseWidth / 2, topY, baseWidth, baseY - topY, chance);
  ctx.restore();

  ctx.fillStyle = '#0c0a18';
  ctx.fillRect(cx - 2, topY - 50, 4, 50);
}

function makeSkylineTexture(hourFloat) {
  const palette = getTimePalette(hourFloat);
  const w = 2048;
  const h = 640;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, palette.colors[0]);
  sky.addColorStop(0.4, palette.colors[1]);
  sky.addColorStop(0.72, palette.colors[2]);
  sky.addColorStop(1, palette.colors[3]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  if (palette.starAlpha > 0.01) {
    ctx.globalAlpha = palette.starAlpha;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    for (let i = 0; i < 140; i++) {
      const sx = Math.random() * w;
      const sy = Math.random() * h * 0.45;
      ctx.fillRect(sx, sy, 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
  }

  if (palette.moonAlpha > 0.01) {
    ctx.globalAlpha = palette.moonAlpha;
    ctx.fillStyle = '#fdf3d8';
    ctx.beginPath();
    ctx.arc(w * 0.83, h * 0.18, 46, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  if (palette.sunAlpha > 0.01) {
    const sx = w * palette.sunPos[0];
    const sy = h * palette.sunPos[1];
    const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 130);
    glow.addColorStop(0, `rgba(255, 235, 180, ${0.55 * palette.sunAlpha})`);
    glow.addColorStop(1, 'rgba(255, 235, 180, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(sx - 130, sy - 130, 260, 260);

    ctx.globalAlpha = palette.sunAlpha;
    ctx.fillStyle = '#fff6df';
    ctx.beginPath();
    ctx.arc(sx, sy, 52, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  const wRatio = palette.windowChance / 0.5;
  const clampChance = (c) => Math.max(0, Math.min(1, c * wRatio));

  drawSkylineLayer(ctx, w, h, 0.55, '#332a52', 0.7, 60, 130, clampChance(0.3));
  drawSkylineLayer(ctx, w, h, 0.68, '#1f1a3a', 0.9, 50, 150, clampChance(0.45));
  drawWillisTower(ctx, w * 0.18, h, clampChance(0.5));
  drawHancockTower(ctx, w * 0.62, h, clampChance(0.5));
  drawSkylineLayer(ctx, w, h, 0.86, '#0c0a18', 1, 40, 110, clampChance(0.55));

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

function buildWindows() {
  const now = new Date();
  const hourFloat = now.getHours() + now.getMinutes() / 60;
  const skylineTex = makeSkylineTexture(hourFloat);
  const margin = 4;
  const usable = ROOM_W - margin * 2;
  const gap = usable / WINDOW_COUNT;

  const walls = [
    { z: ROOM_D / 2, normal: [0, -1] },
    { z: -ROOM_D / 2, normal: [0, 1] },
  ];

  walls.forEach((wall) => {
    for (let i = 0; i < WINDOW_COUNT; i++) {
      const x = -ROOM_W / 2 + margin + gap * (i + 0.5);
      buildWindow(x, wall.z, wall.normal, skylineTex, i);
    }
  });
}

function buildWindow(x, z, normal, skylineTex, index) {
  const angle = Math.atan2(normal[0], normal[1]);

  const group = new THREE.Group();
  group.position.set(x + normal[0] * 0.05, WINDOW_Y, z + normal[1] * 0.05);
  group.rotation.y = angle;

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x1c1a1f,
    roughness: 0.6,
    emissive: 0x141318,
    emissiveIntensity: 0.5,
  });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(WINDOW_W + 0.3, WINDOW_H + 0.3, 0.16), frameMat);
  frame.position.z = -0.08;
  group.add(frame);

  const glassTex = skylineTex.clone();
  glassTex.needsUpdate = true;
  glassTex.repeat.set(1 / WINDOW_COUNT, 1);
  glassTex.offset.set(index / WINDOW_COUNT, 0);
  const glassMat = new THREE.MeshBasicMaterial({ map: glassTex });
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(WINDOW_W, WINDOW_H), glassMat);
  glass.position.z = 0.02;
  group.add(glass);

  const mullionMat = new THREE.MeshStandardMaterial({
    color: 0x141318,
    emissive: 0x141318,
    emissiveIntensity: 0.6,
  });
  const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, WINDOW_H, 0.05), mullionMat);
  vBar.position.z = 0.03;
  group.add(vBar);
  const hBar = new THREE.Mesh(new THREE.BoxGeometry(WINDOW_W, 0.08, 0.05), mullionMat);
  hBar.position.z = 0.03;
  group.add(hBar);

  scene.add(group);
}

/* ==========================================================
   Exhibit frames
   ========================================================== */
function makePlaqueTexture(title) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 112;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#111015';
  roundRectPath(ctx, 0, 0, canvas.width, canvas.height, 14);
  ctx.fill();
  ctx.strokeStyle = 'rgba(201,162,75,0.7)';
  ctx.lineWidth = 3;
  roundRectPath(ctx, 2, 2, canvas.width - 4, canvas.height - 4, 12);
  ctx.stroke();

  let fontSize = 32;
  if (title.length > 22) fontSize = 26;
  if (title.length > 30) fontSize = 21;

  ctx.fillStyle = '#f1ede4';
  ctx.font = `600 ${fontSize}px Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 + 2, canvas.width - 40);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildExhibitFrame(exhibit, x, z, normal) {
  const angle = Math.atan2(normal[0], normal[1]);

  const group = new THREE.Group();
  group.position.set(x + normal[0] * 0.04, FRAME_Y, z + normal[1] * 0.04);
  group.rotation.y = angle;

  const borderMat = new THREE.MeshStandardMaterial({
    color: 0xc9a24b,
    metalness: 0.55,
    roughness: 0.35,
    emissive: 0x6b551d,
    emissiveIntensity: 0.65,
  });
  const border = new THREE.Mesh(
    new THREE.BoxGeometry(FRAME_W + 0.32, FRAME_H + 0.32, 0.12),
    borderMat
  );
  border.position.z = -0.06;
  group.add(border);

  const matMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(FRAME_W, FRAME_H),
    new THREE.MeshBasicMaterial({ color: 0x121212 })
  );
  matMesh.position.z = 0.015;
  group.add(matMesh);

  let pictureMat;
  if (exhibit.video) {
    const vid = document.createElement('video');
    vid.src = exhibit.video;
    vid.loop = true;
    vid.playsInline = true;
    vid.setAttribute('playsinline', '');
    vid.preload = 'auto';
    if (exhibit.audibleVideo) {
      vid.volume = 0.7;
    } else {
      vid.muted = true;
      vid.setAttribute('muted', '');
    }
    videoElements.push(vid);
    const vtex = new THREE.VideoTexture(vid);
    vtex.colorSpace = THREE.SRGBColorSpace;
    pictureMat = new THREE.MeshBasicMaterial({ map: vtex });
  } else {
    pictureMat = new THREE.MeshBasicMaterial({ color: 0x121212 });
    textureLoader.load(exhibit.image, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      const aspect = tex.image.width / tex.image.height;
      const frameAspect = FRAME_W / FRAME_H;
      let w = FRAME_W;
      let h = FRAME_H;
      if (aspect > frameAspect) {
        h = FRAME_W / aspect;
      } else {
        w = FRAME_H * aspect;
      }
      picture.geometry.dispose();
      picture.geometry = new THREE.PlaneGeometry(w, h);
      pictureMat.map = tex;
      pictureMat.color.set(0xffffff);
      pictureMat.needsUpdate = true;
    });
  }

  const picture = new THREE.Mesh(new THREE.PlaneGeometry(FRAME_W, FRAME_H), pictureMat);
  picture.position.z = 0.02;
  group.add(picture);

  const plaqueTex = makePlaqueTexture(exhibit.title);
  const plaqueMat = new THREE.MeshBasicMaterial({ map: plaqueTex, transparent: true });
  const plaque = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.42), plaqueMat);
  plaque.position.set(0, -(FRAME_H / 2) - 0.36, 0.02);
  group.add(plaque);

  scene.add(group);

  focusables.push({ x, z, exhibit });
}

/* ==========================================================
   Input
   ========================================================== */
function setupInput() {
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  renderer.domElement.addEventListener('click', onCanvasClick);
  document.addEventListener('pointerlockchange', onPointerLockChange);
  document.addEventListener('mousemove', onMouseMove);

  enterBtn.addEventListener('click', onEnter);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  interactBtn.addEventListener('click', () => {
    if (focused) openModal(focused.exhibit);
  });

  if (IS_TOUCH) {
    touchMoveZone.addEventListener('touchstart', onMoveTouchStart, { passive: false });
    touchMoveZone.addEventListener('touchmove', onMoveTouchMove, { passive: false });
    touchMoveZone.addEventListener('touchend', onMoveTouchEnd, { passive: false });
    touchMoveZone.addEventListener('touchcancel', onMoveTouchEnd, { passive: false });

    touchLookZone.addEventListener('touchstart', onLookTouchStart, { passive: false });
    touchLookZone.addEventListener('touchmove', onLookTouchMove, { passive: false });
    touchLookZone.addEventListener('touchend', onLookTouchEnd, { passive: false });
    touchLookZone.addEventListener('touchcancel', onLookTouchEnd, { passive: false });

    jumpBtn.classList.remove('hidden');
    jumpBtn.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        tryJump();
      },
      { passive: false }
    );
  }
}

function onKeyDown(e) {
  if (!entered || modalOpen) return;
  switch (e.code) {
    case 'KeyW':
    case 'ArrowUp':
      keys.forward = true;
      break;
    case 'KeyS':
    case 'ArrowDown':
      keys.backward = true;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      keys.left = true;
      break;
    case 'KeyD':
    case 'ArrowRight':
      keys.right = true;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      keys.sprint = true;
      break;
    case 'KeyE':
      if (focused) openModal(focused.exhibit);
      break;
    case 'Space':
      e.preventDefault();
      tryJump();
      break;
    default:
      break;
  }
}

function tryJump() {
  if (!entered || modalOpen || isJumping) return;
  verticalVelocity = JUMP_SPEED;
  isJumping = true;
}

function onKeyUp(e) {
  switch (e.code) {
    case 'KeyW':
    case 'ArrowUp':
      keys.forward = false;
      break;
    case 'KeyS':
    case 'ArrowDown':
      keys.backward = false;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      keys.left = false;
      break;
    case 'KeyD':
    case 'ArrowRight':
      keys.right = false;
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      keys.sprint = false;
      break;
    default:
      break;
  }
}

function onCanvasClick() {
  if (!entered || IS_TOUCH || modalOpen) return;
  if (document.pointerLockElement !== renderer.domElement) {
    renderer.domElement.requestPointerLock();
  } else if (focused) {
    openModal(focused.exhibit);
  }
}

function onPointerLockChange() {
  updateResumeToast();
}

function onMouseMove(e) {
  if (!entered || modalOpen || IS_TOUCH) return;
  if (document.pointerLockElement !== renderer.domElement) return;
  yaw -= e.movementX * MOUSE_SENS;
  pitch -= e.movementY * MOUSE_SENS;
  pitch = Math.max(-1.4, Math.min(1.4, pitch));
}

function onMoveTouchStart(e) {
  e.preventDefault();
  if (!entered || modalOpen || moveTouchId !== null) return;
  const t = e.changedTouches[0];
  moveTouchId = t.identifier;
  moveOrigin = { x: t.clientX, y: t.clientY };
  touchStickBase.style.display = 'block';
  touchStickBase.style.left = t.clientX - 55 + 'px';
  touchStickBase.style.top = t.clientY - 55 + 'px';
  touchStick.style.transform = 'translate(0px, 0px)';
}

function onMoveTouchMove(e) {
  e.preventDefault();
  const t = Array.from(e.changedTouches).find((ct) => ct.identifier === moveTouchId);
  if (!t) return;
  const maxR = 46;
  let dx = t.clientX - moveOrigin.x;
  let dy = t.clientY - moveOrigin.y;
  const dist = Math.hypot(dx, dy);
  if (dist > maxR) {
    dx = (dx / dist) * maxR;
    dy = (dy / dist) * maxR;
  }
  touchStick.style.transform = `translate(${dx}px, ${dy}px)`;
  touchMoveVec.x = dx / maxR;
  touchMoveVec.y = -dy / maxR;
}

function onMoveTouchEnd(e) {
  const t = Array.from(e.changedTouches).find((ct) => ct.identifier === moveTouchId);
  if (!t) return;
  moveTouchId = null;
  touchMoveVec.x = 0;
  touchMoveVec.y = 0;
  touchStickBase.style.display = 'none';
}

function onLookTouchStart(e) {
  e.preventDefault();
  if (!entered || modalOpen || lookTouchId !== null) return;
  const t = e.changedTouches[0];
  lookTouchId = t.identifier;
  lookLast.x = t.clientX;
  lookLast.y = t.clientY;
}

function onLookTouchMove(e) {
  e.preventDefault();
  const t = Array.from(e.changedTouches).find((ct) => ct.identifier === lookTouchId);
  if (!t) return;
  const dx = t.clientX - lookLast.x;
  const dy = t.clientY - lookLast.y;
  lookLast.x = t.clientX;
  lookLast.y = t.clientY;
  yaw -= dx * TOUCH_LOOK_SENS;
  pitch -= dy * TOUCH_LOOK_SENS;
  pitch = Math.max(-1.4, Math.min(1.4, pitch));
}

function onLookTouchEnd(e) {
  const t = Array.from(e.changedTouches).find((ct) => ct.identifier === lookTouchId);
  if (!t) return;
  lookTouchId = null;
}

function onEnter() {
  entered = true;
  startScreen.classList.add('hidden');
  hud.classList.remove('hidden');

  if (IS_TOUCH) {
    touchControls.classList.remove('hidden');
  } else {
    renderer.domElement.requestPointerLock();
  }

  videoElements.forEach((v) => {
    v.play().catch(() => {
      // Browser blocked audible autoplay — fall back to muted so the
      // texture still animates, then let the modal's controls provide sound.
      if (!v.muted) {
        v.muted = true;
        v.play().catch(() => {});
      }
    });
  });

  updateResumeToast();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ==========================================================
   Modal
   ========================================================== */
function renderExhibitHTML(exhibit) {
  let html = `<h2>${exhibit.title}</h2>`;
  if (exhibit.subtitle) {
    html += `<div class="subtitle">${exhibit.subtitle}</div>`;
  }
  if (exhibit.image) {
    html += `<img class="modal-media" src="${exhibit.image}" alt="${exhibit.title}">`;
  }
  if (exhibit.bullets) {
    html += '<ul>' + exhibit.bullets.map((b) => `<li>${b}</li>`).join('') + '</ul>';
  } else if (exhibit.description) {
    html += `<p>${exhibit.description}</p>`;
  }
  if (exhibit.video) {
    html += `<video src="${exhibit.video}" controls playsinline></video>`;
  }
  if (exhibit.audio) {
    html += `<audio controls src="${exhibit.audio}"></audio>`;
  }
  if (exhibit.link) {
    html += `<a class="modal-link" href="${exhibit.link}" target="_blank" rel="noopener">${exhibit.linkText || 'View →'}</a>`;
  }
  return html;
}

function openModal(exhibit) {
  modalOpen = true;
  modalDetails.innerHTML = renderExhibitHTML(exhibit);
  modal.classList.remove('hidden');
  interactPrompt.classList.add('hidden');
  if (!IS_TOUCH && document.pointerLockElement === renderer.domElement) {
    document.exitPointerLock();
  }
  updateResumeToast();
}

function closeModal() {
  modalOpen = false;
  modal.classList.add('hidden');
  modalDetails.querySelectorAll('video, audio').forEach((m) => m.pause());
  updateResumeToast();
}

function updateResumeToast() {
  const locked = document.pointerLockElement === renderer.domElement;
  const show = entered && !modalOpen && !locked && !IS_TOUCH;
  resumeToast.classList.toggle('hidden', !show);
}

/* ==========================================================
   Movement + collision
   ========================================================== */
function updateMovement(delta) {
  if (!entered || modalOpen) return;

  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  if (forward.lengthSq() < 1e-6) {
    forward.set(0, 0, -1);
  } else {
    forward.normalize();
  }
  const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();

  let ix = (keys.right ? 1 : 0) - (keys.left ? 1 : 0) + touchMoveVec.x;
  let iy = (keys.forward ? 1 : 0) - (keys.backward ? 1 : 0) + touchMoveVec.y;
  const mag = Math.hypot(ix, iy);
  if (mag > 1) {
    ix /= mag;
    iy /= mag;
  }

  const speed = keys.sprint ? SPRINT_SPEED : WALK_SPEED;

  if (mag > 0.001) {
    const move = new THREE.Vector3().addScaledVector(forward, iy).addScaledVector(right, ix);
    if (move.lengthSq() > 1e-6) {
      move.normalize().multiplyScalar(speed * delta);
      camera.position.x += move.x;
      camera.position.z += move.z;
    }
  }

  if (isJumping) {
    verticalVelocity -= GRAVITY * delta;
    camera.position.y += verticalVelocity * delta;
    if (camera.position.y <= EYE_HEIGHT) {
      camera.position.y = EYE_HEIGHT;
      verticalVelocity = 0;
      isJumping = false;
    }
  } else if (mag > 0.001) {
    bobTime += delta * speed * 1.6;
    camera.position.y = EYE_HEIGHT + Math.sin(bobTime) * 0.035;
  } else {
    camera.position.y += (EYE_HEIGHT - camera.position.y) * Math.min(1, delta * 8);
  }

  resolveCollisions();
}

function resolveCollisions() {
  const halfW = ROOM_W / 2 - 0.7;
  const halfD = ROOM_D / 2 - 0.7;
  camera.position.x = Math.max(-halfW, Math.min(halfW, camera.position.x));
  camera.position.z = Math.max(-halfD, Math.min(halfD, camera.position.z));

  for (const p of PILLARS) {
    const dx = camera.position.x - p.x;
    const dz = camera.position.z - p.z;
    const dist = Math.hypot(dx, dz);
    const minDist = PILLAR_RADIUS + PLAYER_RADIUS;
    if (dist < minDist && dist > 0.0001) {
      const scale = minDist / dist;
      camera.position.x = p.x + dx * scale;
      camera.position.z = p.z + dz * scale;
    }
  }
}

/* ==========================================================
   Focus / interaction prompt
   ========================================================== */
function updateFocus() {
  if (modalOpen) {
    return;
  }

  const camDir = new THREE.Vector3();
  camera.getWorldDirection(camDir);
  camDir.y = 0;
  camDir.normalize();

  let best = null;
  let bestDist = Infinity;

  for (const f of focusables) {
    const dx = f.x - camera.position.x;
    const dz = f.z - camera.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist > FOCUS_RADIUS || dist < 0.0001) continue;
    const facing = (camDir.x * dx + camDir.z * dz) / dist;
    if (facing < 0.35) continue;
    if (dist < bestDist) {
      bestDist = dist;
      best = f;
    }
  }

  if (best !== focused) {
    focused = best;
    if (focused) {
      interactTitle.textContent = focused.exhibit.title;
      interactPrompt.classList.remove('hidden');
      interactBtn.classList.remove('hidden');
      if (IS_TOUCH) interactHintDesktop.classList.add('hidden');
    } else {
      interactPrompt.classList.add('hidden');
    }
  }
}

/* ==========================================================
   Main loop
   ========================================================== */
function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.1);

  camera.rotation.set(pitch, yaw, 0, 'YXZ');

  updateMovement(delta);
  updateFocus();

  renderer.render(scene, camera);
}
