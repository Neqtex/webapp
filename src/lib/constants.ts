export const SITE = {
  name: "Neqtex",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://neqtex.com",
  email: "info@neqtex.com",
  calendly: "https://calendly.com/neqtexdev1/30min",
  positioning:
    "Private AI, Small Language Models, and intelligent automation systems that reduce operational drag while preserving control over data, infrastructure, and process.",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Private AI", href: "/private-ai" },
  { label: "SLMs", href: "/small-language-models" },
  { label: "Industries", href: "/industries" },
  { label: "Research", href: "/research" },
  { label: "Process", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export const TRUST_SIGNALS = [
  "Private AI Deployment",
  "Workflow Automation",
  "SLM Implementation",
  "Secure Knowledge Systems",
] as const;

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    title: "Private AI Systems",
    description:
      "Secure assistants built around your internal knowledge and workflows.",
    icon: "ShieldCheck",
  },
  {
    title: "Small Language Model Deployment",
    description:
      "Right-sized models that can run in private cloud or controlled infrastructure.",
    icon: "Cpu",
  },
  {
    title: "Workflow Automation",
    description:
      "Automations that reduce repetitive work across operational systems.",
    icon: "Workflow",
  },
  {
    title: "Dataset Curation",
    description:
      "Prepare company-specific data for retrieval, fine-tuning, and evaluation.",
    icon: "Database",
  },
  {
    title: "AI Fine-Tuning",
    description:
      "Customize models for specific business language, tasks, and processes.",
    icon: "SlidersHorizontal",
  },
  {
    title: "Knowledge Systems",
    description:
      "Turn documents, SOPs, and tribal knowledge into searchable intelligence.",
    icon: "Library",
  },
];

export interface ProblemItem {
  title: string;
  description: string;
  icon: string;
}

export const PROBLEMS: ProblemItem[] = [
  {
    title: "Sensitive data",
    description: "Information that cannot be casually exposed to public tools.",
    icon: "Lock",
  },
  {
    title: "Manual workflows",
    description: "Repetitive operational work that quietly drains capacity.",
    icon: "RefreshCw",
  },
  {
    title: "Scattered knowledge",
    description: "Documents, SOPs, and expertise spread across systems.",
    icon: "FolderSearch",
  },
  {
    title: "Unclear AI strategy",
    description: "Generic tools that do not understand your business.",
    icon: "Compass",
  },
];

export const PRIVATE_AI_FEATURES = [
  "On-premise options",
  "Private cloud deployment",
  "Internal knowledge assistants",
  "Retrieval augmented generation",
  "Fine-tuned workflows",
  "Human-in-the-loop review",
  "Evaluation and monitoring",
] as const;

export interface DeploymentModel {
  title: string;
  description: string;
  icon: string;
}

export const DEPLOYMENT_MODELS: DeploymentModel[] = [
  {
    title: "Client-Owned Infrastructure",
    description:
      "For organizations that want maximum control over data and hardware.",
    icon: "Server",
  },
  {
    title: "Private Cloud",
    description: "Dedicated cloud environments for scalable deployment.",
    icon: "Cloud",
  },
  {
    title: "Hybrid",
    description: "Local data control with selective cloud intelligence.",
    icon: "Network",
  },
  {
    title: "Managed Deployment",
    description:
      "Neqtex-managed implementation for teams that want speed and simplicity.",
    icon: "LifeBuoy",
  },
];

export interface Industry {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  useCases: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "accounting",
    name: "Accounting",
    icon: "Calculator",
    tagline:
      "Reduce administrative drag across onboarding, document processing, and research.",
    useCases: [
      "Client onboarding",
      "Document processing",
      "Internal research assistants",
      "Tax prep support",
      "Workflow routing",
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    icon: "Scale",
    tagline:
      "Support attorneys with secure search, summarization, and knowledge retrieval.",
    useCases: [
      "Contract review support",
      "Matter search",
      "Document summarization",
      "Internal legal assistants",
      "Knowledge retrieval",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "Stethoscope",
    tagline:
      "Compliance-aware automation for documentation, policy, and clinical admin.",
    useCases: [
      "Documentation workflows",
      "Policy retrieval",
      "Clinical admin support",
      "Internal knowledge assistants",
      "Compliance-aware automation",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "Factory",
    tagline:
      "Operational copilots for SOPs, quality, maintenance, and safety knowledge.",
    useCases: [
      "SOP retrieval",
      "Quality workflows",
      "Maintenance knowledge systems",
      "Operations copilots",
      "Safety documentation",
    ],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Assessment",
    description:
      "Identify bottlenecks, data sources, risks, and measurable opportunities.",
    icon: "Search",
  },
  {
    number: "02",
    title: "Proof of Concept",
    description: "Build a focused pilot around one high-value workflow.",
    icon: "FlaskConical",
  },
  {
    number: "03",
    title: "Deployment",
    description: "Integrate the system into your operational environment.",
    icon: "Rocket",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "Measure usage, improve quality, and expand where ROI is clear.",
    icon: "TrendingUp",
  },
];

export const ROI_METRICS = [
  { label: "Hours saved per week", icon: "Clock" },
  { label: "Manual tasks reduced", icon: "ListChecks" },
  { label: "Faster onboarding", icon: "UserPlus" },
  { label: "Improved knowledge access", icon: "BookOpen" },
  { label: "Lower repetitive admin labor", icon: "TrendingDown" },
] as const;
