export interface ThemePreset {
  id: 'emerald' | 'amber' | 'cyan' | 'violet' | 'mono';
  label: string;
  code: string;
  accent: string;
  accentRgb: string;
  tint: string;
  description: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'emerald',
    label: 'Green',
    code: 'Green',
    accent: '#22ff99',
    accentRgb: '34, 255, 153',
    tint: '#3dffab',
    description: 'Classic high-contrast terminal green',
  },
  {
    id: 'cyan',
    label: 'Cyan',
    code: 'Cyan',
    accent: '#38e8ff',
    accentRgb: '56, 232, 255',
    tint: '#4eeeff',
    description: 'Ice-blue cyberdeck cyan',
  },
  {
    id: 'amber',
    label: 'Amber',
    code: 'Amber',
    accent: '#ffb32c',
    accentRgb: '255, 179, 44',
    tint: '#ffbc42',
    description: 'Warm retro terminal amber',
  },
  {
    id: 'violet',
    label: 'Violet',
    code: 'Violet',
    accent: '#c084fc',
    accentRgb: '192, 132, 252',
    tint: '#c994ff',
    description: 'Ultraviolet synth accent',
  },
  {
    id: 'mono',
    label: 'Mono',
    code: 'Mono',
    accent: '#f4f4f5',
    accentRgb: '244, 244, 245',
    tint: '#e4e4e7',
    description: 'Clean monochrome white',
  },
];

export type ProjectCategory =
  | 'AI & AGENTS'
  | 'APIs & DATA'
  | 'SYSTEMS & CLI'
  | 'WEB & EXT';

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  status: 'LIVE' | 'FLAGSHIP' | 'OSS';
  featured?: boolean;
  year: string;
  permissions: string;
  lang: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  summary: string;
  highlights: string[];
  architecture: string;
  repoUrl: string;
  liveUrl?: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  pid: string;
  items: { name: string; level: number; note: string }[];
}

export interface ExperienceItem {
  hash: string;
  branch?: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  tag: 'CERT' | 'FELLOWSHIP' | 'AWARD' | 'OSS';
  detail: string;
}

export const PROFILE = {
  handle: 'hari',
  host: 'node-alpha',
  version: 'v3.0',
  name: 'HARI NARAYANA',
  fullName: 'Hari Narayana',
  role: 'AI Systems Engineer · Full-Stack & ECE @ VIT',
  headline:
    'Engineering stateful LLM agents, MCP servers, RAG knowledge graphs & production APIs.',
  status: 'OPEN TO AI / FULL-STACK ROLES & COLLABS',
  location: 'Amaravati, Andhra Pradesh // UTC+5:30',
  email: 'harinarayana1457@gmail.com',
  github: 'https://github.com/harinarayana1457-cmyk',
  githubUsername: 'harinarayana1457-cmyk',
  portfolioRepo: 'https://github.com/harinarayana1457-cmyk/My_Portfolio',
  linkedin: 'https://www.linkedin.com/in/hari-narayana-035ba1389/',
  bio: [
    'Electronics & Communication Engineering (ECE) undergrad at Vellore Institute of Technology (VIT), specializing in Embedded Systems and Artificial Intelligence / Machine Learning.',
    'Currently an AI Evaluation Specialist at Handshake and active Google Developer Groups builder — designing stateful Model Context Protocol (MCP) agents, low-latency vector retrieval APIs, and full-stack cloud systems.',
  ],
  specs: [
    { key: 'USER', value: 'Hari Narayana [SYS_AUTH: ROOT]' },
    { key: 'NODE', value: 'VIT // B.Tech ECE (Embedded & AI/ML)' },
    { key: 'ROLE', value: 'AI Evaluation Specialist @ Handshake' },
    { key: 'CORE', value: 'Python · TypeScript · FastAPI · Next.js' },
    { key: 'AI_OPS', value: 'MCP · RAG · AWS Bedrock · Gemini · Evals' },
    { key: 'CLOUD', value: 'GCP · Docker · K8s · Vercel · Netlify' },
  ],
  telemetry: [
    { label: 'PUBLIC_REPOS', value: '33+', sub: 'github.com/harinarayana1457-cmyk' },
    { label: 'FLAGSHIP_AI', value: '4+', sub: 'MCP, RAG, Vector & Gemini APIs' },
    { label: 'CERT_&_HONORS', value: '8', sub: 'GCP, Handshake, McKinsey, IIT-B' },
    { label: 'CURRENT_NODE', value: 'VIT', sub: 'ECE · Embedded & AI/ML' },
  ],
};

export const EDUCATION = {
  institution: 'Vellore Institute of Technology (VIT)',
  degree: 'Bachelor of Technology in Electronics and Communication Engineering (ECE)',
  specialization: 'Embedded Systems and Artificial Intelligence / Machine Learning',
  period: 'Sept. 2025 — Present',
  location: 'Amaravati, Andhra Pradesh',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    slug: 'CartWeave',
    name: 'CARTWEAVE',
    tagline:
      'Stateful Model Context Protocol (MCP) LLM agent & multi-retailer grocery arbitrage concierge on Amazon Bedrock.',
    category: 'AI & AGENTS',
    status: 'FLAGSHIP',
    featured: true,
    year: 'Oct. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'TypeScript',
    stack: ['TypeScript', 'MCP', 'Claude 3.5 Sonnet', 'AWS Bedrock', 'Next.js'],
    metrics: [
      { label: 'PROTOCOL', value: 'MCP 2025' },
      { label: 'TOOL PIPELINES', value: '5 JSON-RPC' },
      { label: 'MODELS', value: 'Claude+Nova' },
    ],
    summary:
      'Engineered a stateful Model Context Protocol (MCP 2025-11-25 Streamable HTTP) agent server and conversational concierge with Echo Show 15 simulator that remembers multi-turn session context via Mcp-Session-Id and Amazon Bedrock.',
    highlights: [
      'Stateful MCP Streamable HTTP server persisting multi-turn context via Mcp-Session-Id with Claude 3.5 Sonnet & Nova Pro Converse API.',
      'Designed 5 structured JSON-RPC 2.0 tool-calling pipelines (inventory scanning, constraint swapping, personalized meal ranking, multi-retailer arbitrage) with strict schema validation.',
      'Built an automated MCP protocol compliance and LLM tool-output evaluation test suite verifying deterministic structured outputs and SSE streaming reliability.',
    ],
    architecture:
      'Echo Show 15 / Next.js UI -> MCP Streamable HTTP (Mcp-Session-Id) -> 5 JSON-RPC 2.0 Tools -> Amazon Bedrock (Claude 3.5 & Nova Pro)',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/CartWeave',
  },
  {
    id: '02',
    slug: 'Styrud-AI-Study-Galaxy',
    name: 'STYRUD',
    tagline:
      'Live production RAG & 2D semantic knowledge graph study engine supporting 9 Indian languages.',
    category: 'AI & AGENTS',
    status: 'LIVE',
    featured: true,
    year: 'Sept. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'Python / TS',
    stack: ['Python', 'FastAPI', 'Google Gemini', 'React', 'Playwright'],
    metrics: [
      { label: 'LANGUAGES', value: '9 Indian' },
      { label: 'GRAPH', value: '2D Force' },
      { label: 'DEPLOY', value: 'Vercel Live' },
    ],
    summary:
      'Built and deployed a live production RAG and semantic search web application with a Python FastAPI backend that indexes unstructured documents into an interactive 2D force-directed semantic knowledge graph with exact source citations.',
    highlights: [
      'Implemented TF-IDF vector embeddings, K-Means semantic clustering, and grounded retrieval-augmented Q&A pipelines using Google Gemini and Claude prompt orchestration.',
      'Engineered an automated Playwright ingestion bot (notebooklm_bot.py) and dynamic index-updating pipeline for low-latency querying across 9 Indian languages.',
      'Delivers multi-lingual audio briefings and 10+ interactive visual study tools in production.',
    ],
    architecture:
      'Playwright Ingestion Bot -> FastAPI Indexer (TF-IDF + K-Means) -> Gemini/Claude Grounded RAG -> React 2D Semantic Galaxy',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Styrud-AI-Study-Galaxy',
    liveUrl: 'https://styrud-lgf3.vercel.app',
  },
  {
    id: '03',
    slug: 'HHG-3-FaceLedger-Blockchain',
    name: 'FACELEDGER',
    tagline:
      '128-D biometric vector retrieval API & cryptographic Merkle-tree blockchain provenance pipeline.',
    category: 'APIs & DATA',
    status: 'LIVE',
    featured: true,
    year: 'Nov. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'Python / JS',
    stack: ['Python', 'FastAPI', 'OpenCV', 'Solidity', 'React'],
    metrics: [
      { label: 'EMBEDDINGS', value: '128-D L2' },
      { label: 'WEB INDEXES', value: '11+ Live' },
      { label: 'PROOFS', value: 'Merkle+ECDSA' },
    ],
    summary:
      'Architected an end-to-end Python FastAPI backend and vector-similarity retrieval pipeline extracting 128-D L2-normalized OpenCV embeddings and perceptual hashes (dHash/pHash) to rank matches across 11+ web indexes and anchor cryptographic provenance.',
    highlights: [
      'Extracts 128-D L2-normalized facial embeddings alongside dHash/pHash perceptual fingerprints for reverse web discovery.',
      'Production REST APIs with OpenAPI/Swagger (/docs), structured query schemas, and automated unittest integration suites on Vercel.',
      'Anchors cryptographic Merkle-tree state verification and secp256k1 signatures for tamper-evident forensic provenance.',
    ],
    architecture:
      'Image Input -> OpenCV 128-D L2 + dHash/pHash -> 11+ Index Vector Ranker -> FastAPI (/docs) -> Merkle & secp256k1 Anchor',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/HHG-3-FaceLedger-Blockchain',
    liveUrl: 'https://harinarayana1457-cmyk.github.io/HHG-3-FaceLedger-Blockchain/',
  },
  {
    id: '04',
    slug: 'Sentinel-Epidemic-Surveillance',
    name: 'PROJECT_SENTINEL',
    tagline:
      'AI syndromic epidemic early-warning & geospatial clustering backend powered by Gemini & Firestore.',
    category: 'AI & AGENTS',
    status: 'FLAGSHIP',
    featured: true,
    year: 'Sept. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'TypeScript',
    stack: ['Google Gemini', 'Firebase Firestore', 'TypeScript', 'Python', 'Geospatial'],
    metrics: [
      { label: 'MODE', value: 'Real-Time' },
      { label: 'OUTPUTS', value: 'Structured' },
      { label: 'STORE', value: 'Firestore' },
    ],
    summary:
      'AI syndromic epidemic surveillance and early-warning system integrating Google Gemini structured outputs with Firebase Firestore queries and real-time geospatial filtering to detect community symptom clusters before regional escalation.',
    highlights: [
      'Clusters incoming community symptom reports with structured Gemini JSON outputs for rapid anomaly scoring.',
      'Real-time Firebase Firestore query layer supporting dynamic regional & geospatial filtering.',
      'Built to surface early outbreak intelligence with clean alert telemetry.',
    ],
    architecture:
      'Symptom Stream -> Gemini Structured Clustering Engine -> Firebase Firestore Geospatial Index -> Early-Warning Dashboard',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Sentinel-Epidemic-Surveillance',
  },
  {
    id: '05',
    slug: 'BookIt-Multi-Domain-Booking',
    name: 'BOOKIT_&_OMNIRESERVE',
    tagline:
      'Multi-domain Python/Flask booking & reservation API with normalized SQL schemas and instant ranking.',
    category: 'APIs & DATA',
    status: 'OSS',
    year: 'Sept. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'Python',
    stack: ['Python', 'Flask', 'SQL', 'REST API', 'Cart Engine'],
    metrics: [
      { label: 'VERTICALS', value: 'Multi-Domain' },
      { label: 'SCHEMA', value: 'Normalized SQL' },
      { label: 'SEARCH', value: 'Instant Rank' },
    ],
    summary:
      'Commercial-grade multi-vertical booking and ticketing framework in Python/Flask unifying movies, concert venues, transit, and table reservations under normalized relational tables and a transactional session cart pipeline.',
    highlights: [
      'Designed normalized relational database tables and transactional cart schemas handling concurrent bookings cleanly.',
      'Built instant catalog search, dynamic routing, and ranking endpoints across multiple booking domains.',
      'Paired with companion OmniReserve unified checkout architecture.',
    ],
    architecture:
      'Catalog UI -> Flask Dynamic Router -> Normalized SQL Schema & Transactional Cart -> Instant Search & Ranking API',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/BookIt-Multi-Domain-Booking',
  },
  {
    id: '06',
    slug: 'Wallplay',
    name: 'WALLPLAY',
    tagline:
      'Terminal-driven Windows desktop playground with Win32 API hooks, live wallpapers, stickers & dancing icons.',
    category: 'SYSTEMS & CLI',
    status: 'OSS',
    year: 'Nov. 2026',
    permissions: '-rwxr-xr-x',
    lang: 'Python',
    stack: ['Python', 'Rich CLI', 'Win32 API', 'Windows', 'Terminal'],
    metrics: [
      { label: 'INTERFACE', value: 'Rich CLI' },
      { label: 'LAYER', value: 'Win32 API' },
      { label: 'FX', value: 'Live Desktop' },
    ],
    summary:
      'Control and animate your Windows desktop straight from the command line — layering interactive wallpaper effects, widgets, stickers, and physics-animated dancing desktop icons via native Win32 bindings.',
    highlights: [
      'Direct Win32 API desktop shell manipulation controlled via an ergonomic Rich CLI.',
      'Supports real-time wallpaper effects, desktop widgets, stickers, and animated icon choreography.',
      'Built for zero-bloat terminal-native desktop customization.',
    ],
    architecture: 'Rich Terminal CLI -> Command Dispatcher -> Win32 API Desktop Shell Bridge -> Live Overlay & Icon Controller',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Wallplay',
  },
  {
    id: '07',
    slug: 'Handdy',
    name: 'HANDDY',
    tagline:
      'Universal hand-tracked air mouse & gesture controller Chrome MV3 extension powered by MediaPipe WASM.',
    category: 'WEB & EXT',
    status: 'OSS',
    year: 'Oct. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'JavaScript',
    stack: ['MediaPipe', 'WebAssembly', 'Chrome MV3', 'Computer Vision', 'JavaScript'],
    metrics: [
      { label: 'INFERENCE', value: 'On-Device' },
      { label: 'RUNTIME', value: 'WASM' },
      { label: 'TARGET', value: 'Chrome MV3' },
    ],
    summary:
      'Hands-free universal air mouse and browser gesture controller running completely on-device inside Chrome Manifest V3 using MediaPipe Hand Landmarker WebAssembly.',
    highlights: [
      'Zero-cloud privacy-first hand landmark tracking running locally via WebAssembly.',
      'Maps pinch, scroll, and directional hand gestures to smooth cursor & browser navigation actions.',
      'Built for accessibility and touchless workstation workflows.',
    ],
    architecture: 'Webcam Stream -> MediaPipe Hand Landmarker (WASM) -> Gesture State Machine -> Chrome MV3 Content Controller',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Handdy',
  },
  {
    id: '08',
    slug: 'Webdek',
    name: 'WEBDEK',
    tagline:
      'Workspace inspector & codebase architecture visualizer with multi-ecosystem AST parser & AI readiness score.',
    category: 'SYSTEMS & CLI',
    status: 'OSS',
    year: 'Oct. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'TypeScript',
    stack: ['React 18', 'TypeScript', 'AST Parser', 'Static Analysis', 'Tailwind'],
    metrics: [
      { label: 'ANALYSIS', value: 'Multi-AST' },
      { label: 'SCORING', value: 'AI Readiness' },
      { label: 'UI', value: 'Graph View' },
    ],
    summary:
      'Embedded workspace inspector and architecture visualizer in React 18 & TypeScript featuring a multi-ecosystem AST parser, heuristic layer classification, and AI agent readiness scoring.',
    highlights: [
      'Parses multi-ecosystem repositories to automatically map modules into clean architectural layers.',
      'Computes an AI-agent readiness score highlighting documentation gaps, coupling, and entrypoints.',
      'Interactive visual topology built for fast onboarding into unfamiliar codebases.',
    ],
    architecture: 'Repo Files -> Multi-Ecosystem AST Parser -> Heuristic Layer Classifier -> AI Readiness Scorer -> React Visualizer',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Webdek',
  },
  {
    id: '09',
    slug: 'Xplot',
    name: 'XPLOT',
    tagline:
      'Zero-boilerplate CLI, interactive plotter & Matplotlib codegen for XPPAUT .dat and AUTO bifurcation diagrams.',
    category: 'SYSTEMS & CLI',
    status: 'OSS',
    year: 'Oct. 2026',
    permissions: '-rwxr-xr-x',
    lang: 'Python',
    stack: ['Python', 'NumPy', 'Matplotlib', 'CLI', 'Dynamical Systems'],
    metrics: [
      { label: 'DOMAIN', value: 'ODE / AUTO' },
      { label: 'SCHEMA', value: 'Auto .ode' },
      { label: 'EXPORT', value: 'Py Script' },
    ],
    summary:
      'Scientific computing CLI and interactive plotting utility for XPPAUT .dat simulations and AUTO bifurcation diagrams, featuring automatic .ode schema resolution and reproducible Matplotlib script generation.',
    highlights: [
      'Automatically resolves variable names and column schemas directly from .ode model definitions.',
      'Renders phase portraits and bifurcation diagrams interactively or exports publication-ready Matplotlib scripts.',
      'Eliminates repetitive plotting boilerplate in dynamical systems research.',
    ],
    architecture: '.ode & .dat Files -> Automatic Schema Resolver -> NumPy Parser -> Interactive Plotter / Matplotlib Codegen',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Xplot',
  },
  {
    id: '10',
    slug: 'Ketrac-Playlist-Extractor',
    name: 'KETRAC',
    tagline:
      'High-speed YouTube playlist extractor & 50-source batch partitioner built for NotebookLM study pipelines.',
    category: 'APIs & DATA',
    status: 'LIVE',
    year: 'Sept. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'Python / JS',
    stack: ['Python', 'FastAPI', 'JavaScript', 'NotebookLM', 'Vercel'],
    metrics: [
      { label: 'BATCH SIZE', value: '50 Sources' },
      { label: 'BACKEND', value: 'FastAPI' },
      { label: 'DEPLOY', value: 'Vercel Live' },
    ],
    summary:
      'High-speed YouTube playlist link extractor and canonicalizer that automatically partitions large course playlists into 50-source batches tailored for Google NotebookLM ingestion limits.',
    highlights: [
      'Canonicalizes and deduplicates playlist URLs at high speed via FastAPI.',
      'Automatically chunks massive lecture playlists into clean 50-link NotebookLM-ready batches.',
      'Deployed live on Vercel for instant 1-click student study workflows.',
    ],
    architecture: 'Playlist URL -> FastAPI Extractor & Canonicalizer -> 50-Source Batch Partitioner -> Live Web UI',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Ketrac-Playlist-Extractor',
    liveUrl: 'https://ketrac.vercel.app',
  },
  {
    id: '11',
    slug: 'Viser',
    name: 'VISER',
    tagline:
      'AI hackathon demo video generator & Devpost studio with kinetic subtitles and procedural Web Audio BGM.',
    category: 'WEB & EXT',
    status: 'OSS',
    year: 'Sept. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'TypeScript',
    stack: ['Next.js 15', 'React 19', 'TypeScript', 'Web Audio API', 'Canvas'],
    metrics: [
      { label: 'STACK', value: 'Next 15' },
      { label: 'AUDIO', value: 'Web Audio' },
      { label: 'EXPORT', value: '1-Click' },
    ],
    summary:
      'Browser-native AI hackathon video generator and Devpost submission studio built in Next.js 15 & React 19 with kinetic typography subtitles, procedural Web Audio background music, and multi-track timeline rendering.',
    highlights: [
      'Procedural Web Audio BGM synthesizer synced cleanly to timeline transitions.',
      'Kinetic subtitle renderer and multi-track timeline editor built right in the browser.',
      '1-click submission exporter tailored for hackathon demos and Devpost.',
    ],
    architecture: 'Script & Assets -> Multi-Track Timeline Engine -> Canvas + Web Audio Renderer -> 1-Click Demo Export',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/Viser',
  },
  {
    id: '12',
    slug: 'FFCS-Timetable-Optimizer',
    name: 'FFCS_OPTIMIZER',
    tagline:
      'Algorithmic VIT timetable conflict solver with dynamic slot collision matrix & credit load enforcement.',
    category: 'WEB & EXT',
    status: 'OSS',
    year: 'Sept. 2026',
    permissions: 'drwxr-xr-x',
    lang: 'TypeScript',
    stack: ['React 18', 'TypeScript', 'Constraint Solver', 'Algorithms', 'Tailwind'],
    metrics: [
      { label: 'SOLVER', value: '0 Conflicts' },
      { label: 'TARGET', value: 'VIT FFCS' },
      { label: 'SPEED', value: '1-Click' },
    ],
    summary:
      'Algorithmic university timetable optimization engine built for VIT Fully Flexible Credit System (FFCS) featuring a dynamic slot collision matrix, credit threshold enforcement, and 1-click conflict-free schedule generation.',
    highlights: [
      'Real-time slot collision matrix validating lecture and lab slot overlaps instantly.',
      'Enforces credit load limits while optimizing preferred faculty and time windows.',
      'Eliminates manual spreadsheet juggling during high-stress course registration.',
    ],
    architecture: 'Course & Faculty Preferences -> Slot Collision Matrix -> Backtracking Constraint Solver -> Interactive Schedule Grid',
    repoUrl: 'https://github.com/harinarayana1457-cmyk/FFCS-Timetable-Optimizer',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'ai',
    label: 'LLMs_AGENTS_&_SEARCH',
    pid: 'PID 1024',
    items: [
      { name: 'LLM Agents & Tool Calling', level: 95, note: 'JSON Schema, JSON-RPC 2.0' },
      { name: 'Model Context Protocol', level: 93, note: 'MCP Streamable HTTP, Sessions' },
      { name: 'RAG & Vector Search', level: 92, note: 'TF-IDF, 128-D L2, Cosine Sim' },
      { name: 'LLM Evals & Alignment', level: 94, note: 'Rubrics, red-teaming, grounding' },
      { name: 'Ranking & Recommender', level: 88, note: 'Multi-criteria scoring & retrieval' },
    ],
  },
  {
    id: 'backend',
    label: 'PYTHON_BACKENDS_&_APIs',
    pid: 'PID 2048',
    items: [
      { name: 'Python (FastAPI / Flask)', level: 94, note: 'OpenAPI/Swagger, SSE streams' },
      { name: 'SQL & Schema Design', level: 89, note: 'Normalized tables, query tuning' },
      { name: 'RESTful APIs & SSE', level: 92, note: 'Real-time streaming & contracts' },
      { name: 'Firebase Firestore', level: 86, note: 'Geospatial & live queries' },
      { name: 'Playwright Automation', level: 88, note: 'Ingestion bots & E2E suites' },
    ],
  },
  {
    id: 'lang-fe',
    label: 'LANGUAGES_&_FRONTEND',
    pid: 'PID 3072',
    items: [
      { name: 'Python', level: 95, note: 'AI/ML, APIs, CLI, scientific' },
      { name: 'TypeScript / JS (ES6+)', level: 92, note: 'Strict types, MCP, Chrome MV3' },
      { name: 'React 18 / Next.js 14+', level: 91, note: 'Interactive UIs, SSR, WebGL' },
      { name: 'HTML5 / Tailwind CSS', level: 93, note: 'Responsive cyber-terminal UI' },
      { name: 'Java & Embedded C/ECE', level: 80, note: 'OOP, 2D engines, hardware' },
    ],
  },
  {
    id: 'cloud',
    label: 'CLOUD_DEVOPS_&_PROD',
    pid: 'PID 4096',
    items: [
      { name: 'Google Cloud (GCP)', level: 90, note: 'GenAI Leader Certified' },
      { name: 'AWS Bedrock & SAM', level: 88, note: 'Claude 3.5, Nova Pro Converse' },
      { name: 'Docker & Kubernetes', level: 84, note: 'Containerized pipelines' },
      { name: 'Vercel & Netlify CI/CD', level: 93, note: 'Zero-downtime shipping' },
      { name: 'Testing & Git/GitHub', level: 91, note: 'Unit, integration, MCP evals' },
    ],
  },
];

export const TOOLBELT = [
  'MCP (2025-11-25)',
  'Claude 3.5 Sonnet',
  'Google Gemini',
  'AWS Bedrock',
  'FastAPI',
  'Flask',
  'Next.js 14/15',
  'React 18/19',
  'OpenAPI / Swagger',
  'Playwright',
  'OpenCV',
  'Docker',
  'Kubernetes',
  'GCP',
  'Firebase Firestore',
  'Vercel',
  'Netlify',
  'Node.js',
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    hash: 'e9f4a12',
    branch: 'HEAD -> main',
    role: 'AI Evaluation Specialist',
    company: 'Handshake',
    period: 'Jul. 2026 — Present',
    location: 'Remote',
    summary:
      'Evaluating and elevating frontier LLM reliability across multi-turn agentic workflows, tool-use pipelines, and strict structured outputs.',
    bullets: [
      'Evaluated and improved LLM output quality across multi-turn agentic workflows, tool-use pipelines, and structured JSON/schema outputs to elevate model precision and reliability.',
      'Designed systematic LLM evaluation rubrics, retrieval-grounding benchmarks, and adversarial prompt stress-tests to detect hallucinations and ranking regressions.',
      'Analyzed failure modes in multi-step conversational reasoning to formulate actionable feedback loops and refine production model alignment metrics.',
    ],
    stack: ['LLM Evals', 'Agentic Workflows', 'JSON Schema', 'Red-Teaming', 'Alignment'],
  },
  {
    hash: 'c7b30d8',
    branch: 'origin/community',
    role: 'Developer Groups Member',
    company: 'Google Developer Groups (GDG)',
    period: 'Jan. 2026 — Present',
    location: 'India',
    summary:
      'Building multi-agent orchestration prototypes, RAG pipelines, and leading peer workshops on MCP and cloud-native Python backends.',
    bullets: [
      'Built and benchmarked multi-agent orchestration prototypes, RAG retrieval pipelines, and vector-embedding search workflows during technical community sprints.',
      'Collaborated on peer engineering workshops covering Model Context Protocol (MCP), structured LLM tool calling, and cloud-native Python backend deployment.',
    ],
    stack: ['MCP', 'Multi-Agent', 'RAG', 'Vector Search', 'GCP', 'Python'],
  },
  {
    hash: 'a2d95e1',
    branch: 'tag: forward-2026',
    role: 'Professional Development (Forward Program)',
    company: 'McKinsey & Company',
    period: 'May 2026 — Jun. 2026',
    location: 'Remote',
    summary:
      'Intensive global program centered on data-driven decision making, structured problem-solving, and hypothesis-driven product system design.',
    bullets: [
      'Completed intensive training focused on data-driven decision making, structured problem-solving, and hypothesis-driven product system design.',
      'Applied agile communication and analytical framing to break down ambiguous technical product challenges.',
    ],
    stack: ['Systems Design', 'Hypothesis-Driven', 'Data Strategy', 'Leadership'],
  },
  {
    hash: '74c18b3',
    branch: 'tag: internship',
    role: 'Web Development Intern',
    company: 'Kodbud',
    period: 'Feb. 2026 — Mar. 2026',
    location: 'Remote',
    summary:
      'Shipped production full-stack backend services, optimized SQL databases, and integrated agentic LLM tool-calling workflows.',
    bullets: [
      'Shipped and maintained production full-stack backend services and RESTful APIs, designing relational database tables and optimized SQL queries for real-world user workloads.',
      'Integrated agentic LLM workflows and automated tool-calling pipelines to streamline backend data processing and personalized recommendation delivery.',
      'Utilized Git, Docker, and cloud deployment pipelines within agile sprints to ship reliable production web features.',
    ],
    stack: ['REST APIs', 'SQL', 'LLM Agents', 'Docker', 'Git', 'Cloud CI/CD'],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: '01',
    title: 'Google Cloud Generative AI Leader & Agentic AI Edition',
    issuer: 'Google Cloud · Credly',
    tag: 'CERT',
    detail:
      'Earned the official Google Cloud Generative AI Leader certification and Cloud Technical Series (Agentic AI Edition) credential.',
  },
  {
    id: '02',
    title: 'Handshake AI Fellowship',
    issuer: 'Handshake',
    tag: 'FELLOWSHIP',
    detail:
      'Selected for the competitive AI Fellowship cohort focused on LLM output quality evaluation, adversarial testing, and alignment benchmarking.',
  },
  {
    id: '03',
    title: 'Vibe Coding 101 — 72h Production AI Ship',
    issuer: 'GDGoC BITS Pilani Dubai',
    tag: 'AWARD',
    detail:
      'Awarded Certificate of Completion for rapid prototyping and deploying a live production AI application in 72 hours.',
  },
  {
    id: '04',
    title: 'Google Cloud Get Certified Program (2026 Ed. 2)',
    issuer: 'Google Cloud',
    tag: 'FELLOWSHIP',
    detail:
      'Selected for the 2026 cohort to pursue advanced Google Cloud engineering credentials.',
  },
  {
    id: '05',
    title: 'Google Developer Profile — 4+ Skill Badges',
    issuer: 'Google Cloud & Developers',
    tag: 'CERT',
    detail:
      'Completed 4+ official developer skill badges across Cloud Infrastructure, Kubernetes, and Generative AI.',
  },
  {
    id: '06',
    title: 'IIT Bombay FOSSEE Animations Contributor',
    issuer: 'IIT Bombay · Open Source',
    tag: 'OSS',
    detail:
      'Contributed to open-source scientific computing & education by completing 3 Virtual Labs (Mathematics, Physics, Electronics).',
  },
  {
    id: '07',
    title: 'McKinsey Forward Program',
    issuer: 'McKinsey & Company',
    tag: 'FELLOWSHIP',
    detail:
      'Completed the global leadership initiative mastering structured problem-solving, digital fluency, and agile communication.',
  },
  {
    id: '08',
    title: 'Radiothon Quarter-Finalist',
    issuer: 'VIT',
    tag: 'AWARD',
    detail:
      'Advanced to the Quarter-Finals by pitching an innovative technical broadcast engineering concept at VIT.',
  },
];
