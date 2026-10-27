// Single source of truth for Jeremiah Shadamoro's portfolio
// Side A (Proof & Production) & Side B (The Studio & Culture)

export const SITE = {
  name: "JEREMIAH SHADAMORO",
  moniker: "SOJ",
  boxLabel: "NATIVE LABS",
  trackingNo: "NL-2026-SOJ",
  role: "Software Engineer | Full-Stack (AI)",
  title: "Jeremiah Shadamoro — Software Engineer | Full-Stack (AI)",
  headline: "I architect high-throughput full-stack products, low-latency AI pipelines, and resilient payment systems.",
  subheadline: "Shipped across 30+ person remote teams, government infrastructure, and on-device ML. Drum & bass DJ by night, amateur director on weekends.",
  email: "jeremiahshadamoro@gmail.com",
  phone: "+2348104261451",
  location: "Lagos, Nigeria",
  timezone: "WAT (UTC+1) — Overlaps US mornings & European business hours",
  availability: "Available for full-time US/EU remote roles",
  github: "https://github.com/oluwatosin123456789",
  linkedin: "https://www.linkedin.com/in/jeremiah-shadamoro-547224235/",
  x: "https://x.com/jerry_fire17",
  medium: "https://medium.com/@jeremiahshadamoro",
  resume: "/resume.pdf",
  projects: {
    contractGuard: "https://cg-ai.onrender.com/",
    contractGuardGithub: "https://github.com/Native-Labs-2-4/CG-AI",
    fresco: "https://shelf-life-cyan.vercel.app/",
  },
  education: {
    institution: "Anchor University (AUL)",
    degree: "B.Sc. Computer Science",
    period: "2022 — 2026",
    status: "Final-year",
    location: "Lagos, Nigeria",
  },
} as const;

export function orderPlacedDate(): string {
  const t = new Date(Date.now() + (new Date().getTimezoneOffset() + 60) * 60000);
  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
  ];
  return `${t.getDate()} ${months[t.getMonth()]} ${t.getFullYear()}`;
}

export const DISPATCH_SYSTEM_PROMPT = `You are DISPATCH, the studio dispatcher for Jeremiah "SOJ" Shadamoro. Voice: terse radio-operator telegraph style, ALL CAPS, warm but clipped, max 55 words, no markdown, no emoji. You answer questions about Jeremiah using ONLY these verified facts: Software Engineer (Full-Stack / AI). Experience at Tecvision (Sweden, remote - payments, Stripe/Paystack idempotency, webhook race condition fix on 30+ person team), Ministry of Innovation, Science & Technology (MIST Lagos - attendance & Wi-Fi device tracker for 150+ staff), Emperor Resources (FX exchange interfaces), and CoreCredit (loan funnel optimization). Shipped systems: Fresco (on-device produce freshness scanner, MobileNetV2, 89.3% accuracy, 33k images), Citer (LangGraph codebase reasoning agent with Tree-sitter AST), and ContractGuard (legal AI, clause citations, <2% hallucination). Anchor University (AUL) Computer Science class of 2026. Based in Lagos, Nigeria (WAT). Cleared for full-time US/EU remote roles. Side B: Drum & bass DJ and hobby directing. Contact: jeremiahshadamoro@gmail.com. Stay in character always.`;

export const MANIFESTO_TENETS = [
  "Make it fast.",
  "Make it beautiful.",
  "Make it consistent.",
  "Make it carefully.",
  "Make it timeless.",
  "Make it soulful.",
  "Make it.",
] as const;

export const HEADLINE_METRICS = [
  {
    value: "30+",
    label: "Person Remote Team",
    sub: "Shipped core payment & booking engine at Tecvision (Sweden)",
    anchor: "#work-tecvision",
  },
  {
    value: "150+",
    label: "Staff Attendance System",
    sub: "Automated manual reporting from hours to minutes at MIST",
    anchor: "#work-mist",
  },
  {
    value: "89.3%",
    label: "CV Model Accuracy",
    sub: "Trained on 33,420 images; sub-2s client inference (Fresco)",
    anchor: "#lab-fresco",
  },
  {
    value: "< 2%",
    label: "Hallucination Rate",
    sub: "Cuts unsupported answers from 7% to under 2% (ContractGuard)",
    anchor: "#lab-contractguard",
  },
] as const;

export type CaseStudy = {
  id: string;
  slug: string;
  company: string;
  role: string;
  period: string;
  location: string;
  team: string;
  tagline: string;
  context: string;
  constraint: string;
  built: string[];
  tradeoffs: string;
  result: string;
  metric: { value: string; label: string };
  theFind: string;
  stack: string[];
  links?: { label: string; url: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "work-tecvision",
    slug: "tecvision",
    company: "Tecvision",
    role: "Software Engineer (Full-Stack)",
    period: "Jul 2025 — Present",
    location: "Stockholm, Sweden (Remote)",
    team: "30+ person cross-functional engineering team",
    tagline: "End-to-end payment orchestration and listing flows for Immovel & corporate event booking.",
    context:
      "Tecvision builds international real estate and event booking platforms requiring multi-currency payment processing across Europe and emerging markets.",
    constraint:
      "Third-party payment gateways (Stripe & Paystack) suffer from asynchronous webhook delivery latency, transient network drops, and potential replay attacks. Client-side redirects frequently fire before webhooks complete.",
    built: [
      "Architected listing, property ownership verification, and booking checkout flows handling concurrent reservations.",
      "Integrated Stripe and Paystack end-to-end: payment intents, customer portal, refunds, and webhook signature verification.",
      "Engineered an idempotent webhook ingestion pipeline using database transactional locks and Redis deduplication keys.",
      "Diagnosed and resolved a critical production race condition where the frontend success redirect beat payment webhook confirmation, stranding paid users in a 'pending' state.",
    ],
    tradeoffs:
      "Opted for optimistic client-side UI states paired with exponential backoff polling against our payment status endpoint, while keeping database state strictly locked to cryptographically verified webhook signatures.",
    result:
      "Eliminated 100% of 'paid but pending' customer support tickets; achieved zero double-charges across all peak reservation windows.",
    metric: {
      value: "100%",
      label: "Webhook Idempotency & Zero Payment Race Conditions",
    },
    theFind:
      "Payment confirmation must never lose a race against an eager client redirect. Treat webhooks as the ultimate source of truth, but never leave the UI guessing.",
    stack: [
      "TypeScript",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Stripe API",
      "Paystack API",
      "Redis",
      "Docker",
    ],
  },
  {
    id: "work-mist",
    slug: "mist",
    company: "Ministry of Innovation, Science & Technology",
    role: "Full-Stack Development",
    period: "Feb 2025 — Aug 2025",
    location: "Lagos, Nigeria (Hybrid)",
    team: "Internal engineering & public infrastructure unit",
    tagline: "Automated personnel attendance and network device security tracker for public innovation headquarters.",
    context:
      "The Lagos State Ministry oversaw 150+ staff, interns, and graduate trainees across sprawling campuses. Daily attendance and physical security audits were manually reconciled on paper registers.",
    constraint:
      "Low hardware budget, intermittent internet connectivity, and strict state data privacy regulations preventing third-party cloud data exfiltration.",
    built: [
      "Built a secure local-first automated attendance tracking portal with granular department reporting and export tools.",
      "Designed an automated Wi-Fi device monitor that parsed DHCP lease tables and ARP caches across the local network router to track ~70 active devices simultaneously.",
      "Implemented automated alerting for unrecognized MAC addresses and rogue access point connections to bolster premises security.",
    ],
    tradeoffs:
      "Bypassed expensive proprietary biometric hardware by building on top of standard local network infrastructure, caching data locally in SQLite with batched PostgreSQL sync.",
    result:
      "Reduced daily attendance reconciliation time from hours to under 3 minutes; caught unauthorized network devices within 30 seconds of handshake.",
    metric: {
      value: "Hours → Mins",
      label: "Reporting Latency Reduction for 150+ Personnel",
    },
    theFind:
      "Real network hardware state beats trusting client self-reporting every single time. Good software exploits the infrastructure already in the room.",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLite",
      "React",
      "Tailwind",
      "Network Socket APIs",
      "ARP/DHCP",
    ],
  },
  {
    id: "work-emperor",
    slug: "emperor",
    company: "Emperor Resources",
    role: "Frontend Developer",
    period: "May 2024 — Dec 2024",
    location: "Lagos, Nigeria",
    team: "Fintech product squad",
    tagline: "High-frequency FX currency exchange interfaces with resilient caching and shared component systems.",
    context:
      "Emperor Resources delivers real-time foreign exchange data and currency swap services in a volatile currency market where quotes shift every few seconds.",
    constraint:
      "Upstream FX provider APIs (Aboki FX) imposed strict rate limits and frequently returned 502/504 gateway timeouts during high-volatility spikes.",
    built: [
      "Constructed responsive real-time FX exchange interfaces with real-time currency converters and trend charts.",
      "Implemented a smart frontend polling engine with exponential backoff, jitter, client-side stale-while-revalidate caching, and fallback rate boards.",
      "Authored a unified design component library adopted across 5 customer-facing features, enforcing WCAG accessibility and responsive tokens.",
    ],
    tradeoffs:
      "Traded raw millisecond rate polling for an intelligent SWR cache layer with visual 'last updated' freshness badges, keeping the UI interactive even when rate limits were hit.",
    result:
      "Accelerated subsequent UI feature shipping by ~25% and eliminated user-facing API timeout errors entirely.",
    metric: {
      value: "~25%",
      label: "UI Build Time Reduction via Shared Component Library",
    },
    theFind:
      "A rock-solid caching and backoff layer turns fragile third-party APIs into bulletproof user experiences.",
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Aboki FX API",
      "Zustand",
      "REST APIs",
    ],
  },
  {
    id: "work-corecredit",
    slug: "corecredit",
    company: "CoreCredit",
    role: "Frontend Developer Intern",
    period: "Jul 2023 — Feb 2024",
    location: "Lagos, Nigeria",
    team: "Credit ops & lending product team",
    tagline: "Credit tracking dashboards and high-conversion loan application redesign.",
    context:
      "CoreCredit provides working capital micro-loans to small business owners across Nigeria, requiring rapid KYC document submission.",
    constraint:
      "High mobile user drop-off on 3G connections during document photo upload in an 8-step loan application form.",
    built: [
      "Built credit tracking operational dashboards for underwriters to review loan performance, risk tiers, and recovery schedules.",
      "Redesigned the multi-step loan onboarding flow from 8 confusing screens down to 5 streamlined, progressive disclosure steps.",
      "Added client-side image compression before upload to ensure document verification succeeded even on spotty cellular connections.",
      "Integrated frontend form state with backend lending APIs in a live production fintech system.",
    ],
    tradeoffs:
      "Sacrificed capturing ultra-high-resolution uncompressed PDFs in favor of client-side canvas-compressed WebP images, cutting payload sizes by 80%.",
    result:
      "Significantly slashed applicant drop-off at the KYC document step and cut overall loan onboarding completion time in half.",
    metric: {
      value: "8 → 5",
      label: "Onboarding Steps Streamlined with Zero Data Loss",
    },
    theFind:
      "Every unnecessary step in a fintech onboarding funnel is a customer handed to your competitor. Compress the friction before you compress the code.",
    stack: [
      "JavaScript",
      "React",
      "REST APIs",
      "HTML5 Canvas",
      "CSS3",
      "Git",
    ],
  },
];

export type LabProject = {
  id: string;
  name: string;
  role: string;
  badge: string;
  tagline: string;
  description: string;
  architecture: string;
  metric: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const LAB_PROJECTS: LabProject[] = [
  {
    id: "lab-fresco",
    name: "Fresco",
    role: "Computer Vision Shelf-Life Estimator",
    badge: "ON-DEVICE ML · EDGE AI",
    tagline: "Point your phone at produce — predict days to spoilage in under 2 seconds on-device.",
    description:
      "Trained a deep convolutional neural network (MobileNetV2) on 33,420 images across 44 produce classes to assess ripeness and surface degradation. To eliminate server cold-start latency and GPU hosting costs, the trained model was quantized and exported to TensorFlow.js for direct client-side browser inference.",
    architecture:
      "Mobile Camera Frame → Client-Side Canvas Preprocessing (224×224 Normalization) → TensorFlow.js WebGL Engine → Class & Confidence Scoring → Local Shelf-Life Calculation. Zero server round-trip.",
    metric: "89.3% Top-1 Accuracy · 33,420 Images · 30s → <2s Latency",
    stack: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "TensorFlow/Keras",
      "MobileNetV2",
      "TensorFlow.js",
      "Python",
    ],
    liveUrl: "https://shelf-life-cyan.vercel.app/",
  },
  {
    id: "lab-citer",
    name: "Citer",
    role: "Agentic Code Intelligence & Semantic Search",
    badge: "LANGGRAPH · AST PARSING",
    tagline: "A multi-agent codebase reasoning engine that parses code structure and never guesses.",
    description:
      "An autonomous LangGraph agent that ingests entire GitHub repositories, parses syntax trees at the function and class level using Tree-sitter, and indexes chunks across both dense embeddings (pgvector) and exact symbol indices. The agent reasons step-by-step, verifying its citations before delivering answers.",
    architecture:
      "Repo Ingestion → Tree-sitter AST Chunking → Dense (pgvector) + BM25 Sparse Indexing → LangGraph Multi-Agent Evaluator → Grounded Context Synthesis. If context is missing, reports 'Not Found' instead of hallucinating.",
    metric: "100% Context Grounding · Zero Hallucinated Symbols",
    stack: [
      "Python",
      "LangGraph",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "GPT-4o",
      "Tree-sitter",
      "Docker",
    ],
  },
  {
    id: "lab-contractguard",
    name: "ContractGuard",
    role: "Legal Contract Review & Risk Classification",
    badge: "LEGAL AI · HYBRID RAG",
    tagline: "Automated clause-level risk detection with guaranteed citation grounding in under 6 seconds.",
    description:
      "Designed for fast legal audits. Parses complex 20+ page PDF/Word contracts, splits on legal section hierarchies, and executes hybrid keyword + vector retrieval to flag non-standard indemnities, liability caps, and jurisdiction risks with plain-English risk ratings.",
    architecture:
      "Document Stream → Structure-Aware Clause Segmenter → pgvector Dense + BM25 Lexical Retrieval → Groq LPU Ultra-Low Latency Inference → Citation Verifier. Responses without strict clause backing are automatically rejected.",
    metric: "7% → <2% Unsupported Answers · <6s 20-Page Contract Audit",
    stack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "pgvector",
      "LangChain",
      "Groq API",
      "TypeScript",
      "Firebase",
    ],
    liveUrl: "https://cg-ai.onrender.com/",
    githubUrl: "https://github.com/Native-Labs-2-4/CG-AI",
  },
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages & Core",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3 / Modern CSS"],
  },
  {
    name: "Full-Stack & Systems",
    skills: [
      "Next.js (App Router)",
      "React",
      "React Native",
      "FastAPI",
      "Node.js",
      "Tailwind CSS",
      "RESTful APIs",
      "Stripe & Paystack APIs",
      "Webhook Idempotency",
    ],
  },
  {
    name: "AI, Agents & ML",
    skills: [
      "RAG Architecture",
      "AI Agents",
      "LangGraph",
      "LLM Tool Calling",
      "pgvector & Vector Search",
      "BM25 Full-Text Search",
      "Groq LPU API",
      "OpenAI API",
      "TensorFlow / Keras",
      "MobileNetV2",
      "TensorFlow.js",
      "Tree-sitter AST",
    ],
  },
  {
    name: "Data & Infrastructure",
    skills: [
      "PostgreSQL",
      "Redis",
      "SQLite",
      "Docker",
      "Firebase",
      "Supabase",
      "Git & GitHub Actions",
      "CI/CD Pipelines",
      "AWS Fundamentals",
    ],
  },
];

export const BOOTH_TRACKS = [
  {
    title: "Timeless Sequences",
    artist: "SOJ (After Hours Mix)",
    bpm: 174,
    genre: "Drum & Bass / Halftime",
    key: "F Minor",
    duration: "42:15",
    desc: "Sub-bass pressure, crisp atmospheric breaks, and driving percussion built for high-focus deep coding sprints.",
  },
  {
    title: "Obsidian Groove",
    artist: "Native Labs Dubplate",
    bpm: 128,
    genre: "Deep / Dark Electronic",
    key: "A Minor",
    duration: "36:40",
    desc: "Hypnotic rolling basslines and analog synthesizer stabs. Clean, minimal, zero distraction.",
  },
  {
    title: "Needle Drop // WAT Sunrise",
    artist: "SOJ Live Cut",
    bpm: 170,
    genre: "Atmospheric Jungle",
    key: "D Minor",
    duration: "28:10",
    desc: "Tape-saturated breakbeats recorded at 4:00 AM Lagos time during the final production deploy.",
  },
];

export const DIRECTOR_BOARDS = [
  {
    scene: "SEQUENCE 01",
    title: "The Establishing Shot // Architecture",
    takeaway: "I storyboard before I write code.",
    text: "In cinema, you don't call action until the lighting and camera blocking are locked. In software, I map entity relationships, webhook edge cases, and failure states on paper before opening the IDE. Architecture is just storyboarding for data.",
    tag: "PLANNING & FRAMING",
  },
  {
    scene: "SEQUENCE 02",
    title: "The Cut // Latency & Micro-pacing",
    takeaway: "120ms is the difference between electric and sluggish.",
    text: "A director knows that cutting three frames too late kills the momentum of a scene. In UI engineering, shaving 200ms off an interaction is the difference between a user feeling power and feeling friction. Pacing is respect for human attention.",
    tag: "PACING & RHYTHM",
  },
  {
    scene: "SEQUENCE 03",
    title: "The Reveal // The Payoff",
    takeaway: "Reward curiosity at the end of the line.",
    text: "Great cinema never leaves the audience flat at the final credits. When a recruiter or senior engineer digs through my code or scrolls to the bottom of this page, there should always be a reward: an easter egg, a clean metric, a moment of delight.",
    tag: "THE REWARD",
  },
];
