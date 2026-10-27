export type Project = {
  key: 'cg' | 'fresco' | 'tecvision' | 'citer'
  n: string
  name: string
  type: string
  year: string
  color: 'laterite'
  line: string
  stack: string | null
  points: string[]
  live: string | null
  demo: string | null
  repo: string | null
}

type Fact = { terms: string[]; text: string; source: string }

export const projects: Project[] = [
  {
    key: 'cg',
    demo: '/demos/cg',
    n: '01',
    name: 'ContractGuard',
    type: 'Contract review AI',
    year: '2025',
    color: 'laterite',
    line: 'Extracts key clauses, flags risky language, and answers questions with citations back to the source.',
    stack: 'React, Node.js, PostgreSQL / pgvector, LangChain, Groq, TypeScript, Firebase',
    points: [
      'Grounding each response in retrieved clause text and checking citations reduced unsupported answers from 7% to under 2%.',
      'Processes a 20-page contract end to end in under 6 seconds.',
    ],
    live: 'https://cg-ai.onrender.com/',
    repo: 'https://github.com/Native-Labs-2-4/CG-AI',
  },
  {
    key: 'fresco',
    demo: '/demos/fresco',
    n: '02',
    name: 'Fresco',
    type: 'Produce freshness scanner',
    year: '2025',
    color: 'laterite',
    line: 'Point a phone camera at produce to estimate freshness, days remaining, and a better storage option.',
    stack: 'FastAPI, Next.js, PostgreSQL, TensorFlow / Keras, MobileNetV2, TensorFlow.js',
    points: [
      'Classifier trained on 33,420 images across 44 produce types, with 89.3% accuracy.',
      'Moved inference into the browser with TensorFlow.js, reducing it from 30+ seconds to under 2 seconds.',
    ],
    live: 'https://shelf-life-cyan.vercel.app/',
    repo: 'https://github.com/JeremiahShadams/Shelf-Life',
  },
  {
    key: 'tecvision',
    demo: '/demos/tecvision',
    n: '03',
    name: 'Tecvision',
    type: 'Property platform / payments',
    year: '2025',
    color: 'laterite',
    line: 'Property listing, ownership, and payment flows for Immovvel, shipped with a remote product team.',
    stack: 'Next.js, Node.js, PostgreSQL, Stripe, Paystack, Webhooks, TypeScript',
    points: [
      'Shipped listing, ownership, and payment flows for Immovvel as part of a 30+ person remote team.',
      'Integrated Stripe and Paystack with idempotent webhooks so retried events do not double-charge.',
    ],
    live: null,
    repo: null,
  },
  {
    key: 'citer',
    demo: '/demos/citer',
    n: '04',
    name: 'Citer',
    type: 'Agentic code intelligence',
    year: '2025',
    color: 'laterite',
    line: 'Ask questions about a repository in plain English and get answers with exact file and line references.',
    stack: 'Python, LangGraph, FastAPI, Next.js, pgvector, Redis, Tree-Sitter, Docker',
    points: [
      'Parses files at function and class level, then searches by meaning, keyword, and symbol name.',
      'Answers only from retrieved code and says “not found” instead of guessing.',
    ],
    live: null,
    repo: 'https://github.com/JeremiahShadams/Citer',
  },
]

export const experience = [
  {
    org: 'CoreCredit',
    role: 'Frontend Developer (intern)',
    where: 'Lagos',
    when: 'Jul 2023 — Feb 2024',
    pts: [
      'Built the credit tracking UI and an internal operations dashboard for loan officers.',
      'Redesigned the loan application from 8 steps to 5, reducing drop-off at document upload.',
    ],
  },
  {
    org: 'Emperor Resources',
    role: 'Frontend Developer',
    where: 'Lagos',
    when: 'May 2024 — Dec 2024',
    pts: [
      'Built FX exchange interfaces on a live market API, with polling, backoff, and caching to respect rate limits.',
      'Shipped a component library used across 5 features, making UI work about 25% faster.',
    ],
  },
  {
    org: 'MIST',
    role: 'Full-Stack Developer',
    where: 'Lagos',
    when: 'Feb 2025 — Aug 2025',
    pts: [
      'Deployed an attendance system for 150+ junior staff and trainees, replacing paper sign-in sheets.',
      'Built a Wi-Fi device tracker for about 70 devices, reading DHCP leases and ARP tables to flag unknown ones.',
    ],
  },
  {
    org: 'Tecvision',
    role: 'Software Engineer (Full-Stack)',
    where: 'Sweden, remote',
    when: 'Jul 2025 — Present',
    pts: [
      'Shipped listing, ownership, and payment flows for Immovvel on a 30+ person remote team.',
      'Integrated Stripe and Paystack with idempotent webhooks so retried events do not double-charge.',
    ],
  },
]

export const facts: Fact[] = [
  {
    terms: ['contractguard', 'contract', 'legal'],
    text: 'ContractGuard reviews contracts: it extracts key clauses, flags risky language, and answers with citations. Unsupported answers dropped from 7% to under 2%, and a 20-page contract takes under 6 seconds.',
    source: 'ContractGuard case study',
  },
  {
    terms: ['fresco', 'fresh', 'produce', 'shelf'],
    text: 'Fresco is a produce freshness scanner trained on 33,420 images across 44 produce types, with 89.3% accuracy. Browser inference with TensorFlow.js takes under 2 seconds.',
    source: 'Fresco case study',
  },
  {
    terms: ['citer', 'code', 'repo', 'agent'],
    text: 'Citer answers plain-English questions about a repository with exact file and line references. It uses Tree-Sitter parsing and hybrid search, and says “not found” instead of guessing.',
    source: 'Citer case study',
  },
  {
    terms: ['ai', 'llm', 'llms', 'rag', 'agentic', 'machine', 'learning'],
    text: 'Jeremiah’s AI work includes ContractGuard, a contract-review assistant that answers with citations to source clauses, and Citer, an agentic repository Q&A tool that cites exact file and line references.',
    source: 'AI case studies',
  },
  {
    terms: ['tecvision', 'tecvison', 'immovvel', 'stripe', 'paystack', 'payment', 'currently', 'current', 'role'],
    text: 'Jeremiah is a full-stack software engineer at Tecvision, working on property listing, ownership, and payment flows for Immovvel, with Stripe and Paystack integrations protected by idempotent webhooks.',
    source: 'Tecvision experience and case study',
  },
  {
    terms: ['mist', 'attendance', 'ministry'],
    text: 'At MIST, Jeremiah built an attendance system for 150+ staff and a Wi-Fi device tracker covering about 70 devices.',
    source: 'MIST experience',
  },
  {
    terms: ['emperor', 'fx', 'exchange'],
    text: 'At Emperor Resources, he built FX exchange interfaces on a live market API and a component library used across 5 features.',
    source: 'Emperor Resources experience',
  },
  {
    terms: ['corecredit', 'loan', 'intern'],
    text: 'At CoreCredit, he built a credit tracking UI and operations dashboard, and cut the loan application from 8 steps to 5.',
    source: 'CoreCredit experience',
  },
  {
    terms: ['stack', 'skills', 'tech', 'language', 'python', 'typescript'],
    text: 'Python, TypeScript, and JavaScript. Next.js, React, React Native, and Tailwind. FastAPI, Node.js, LangGraph, RAG, and agents. PostgreSQL, pgvector, Redis, and Firebase.',
    source: 'Stack section',
  },
  {
    terms: ['contact', 'hire', 'email', 'reach', 'available'],
    text: 'Email jeremiahshadamoro@gmail.com, or find Jeremiah on GitHub and LinkedIn. Based in Lagos and working remotely.',
    source: 'Contact section',
  },
  {
    terms: ['paint', 'art', 'draw', 'studio', 'write'],
    text: 'Outside code, Jeremiah paints, draws, and writes. The Studio section is waiting for original work.',
    source: 'Studio section',
  },
]

export const REFUSAL = 'That’s outside what I can answer here. I only know Jeremiah’s projects, experience, and how he builds. Ask me about ContractGuard, Fresco, or his AI work.'

export const answer = (question: string) => {
  const words = new Set(question.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean))
  const matchingFacts = facts.filter((fact) => fact.terms.some((term) => words.has(term)))
  if (matchingFacts.length === 0) return REFUSAL

  const text = matchingFacts.map((fact) => fact.text).join(' ')
  const sources = [...new Set(matchingFacts.map((fact) => fact.source))]
  const citation = `${sources.length === 1 ? 'Source' : 'Sources'}: ${sources.join('; ')}.`
  return `${text} ${citation}`
}
