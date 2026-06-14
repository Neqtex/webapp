export interface ResearchPaper {
  /** arXiv identifier, e.g. "2506.02153" */
  id: string;
  title: string;
  authors: string;
  org: string;
  year: number;
  category: ResearchCategory;
  /** Concise, plain-language summary of why the paper matters. */
  summary: string;
  tags: string[];
  featured?: boolean;
}

export type ResearchCategory =
  | "Small Language Models"
  | "Retrieval (RAG)"
  | "Fine-Tuning"
  | "Agents & Automation";

export const RESEARCH_CATEGORIES: ResearchCategory[] = [
  "Small Language Models",
  "Retrieval (RAG)",
  "Fine-Tuning",
  "Agents & Automation",
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "2506.02153",
    title: "Small Language Models are the Future of Agentic AI",
    authors: "Belcak, Heinrich, Diao, Molchanov, et al.",
    org: "NVIDIA Research",
    year: 2025,
    category: "Agents & Automation",
    summary:
      "A position paper arguing that small, specialized models are powerful enough, more suitable, and far more economical than large general models for the repetitive tasks agents actually perform. Includes a practical LLM-to-SLM conversion algorithm.",
    tags: ["SLM", "agents", "NVIDIA", "efficiency", "cost"],
    featured: true,
  },
  {
    id: "2404.14219",
    title: "Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone",
    authors: "Abdin, Jacobs, Awan, et al.",
    org: "Microsoft",
    year: 2024,
    category: "Small Language Models",
    summary:
      "Shows that careful data curation lets a 3.8B-parameter model rival far larger ones — small enough to run on a phone while staying competitive on reasoning benchmarks.",
    tags: ["SLM", "phi-3", "on-device", "data quality"],
  },
  {
    id: "2410.20011",
    title: "A Survey of Small Language Models",
    authors: "Wang, Chen, Wu, et al.",
    org: "Multiple institutions",
    year: 2024,
    category: "Small Language Models",
    summary:
      "A broad map of the SLM landscape: architectures, training and compression techniques, and deployment trade-offs. A strong orientation point for teams weighing right-sized models.",
    tags: ["SLM", "survey", "compression", "deployment"],
  },
  {
    id: "2402.14905",
    title: "MobileLLM: Optimizing Sub-billion Parameter Language Models for On-Device Use Cases",
    authors: "Liu, Zhao, Iandola, et al.",
    org: "Meta",
    year: 2024,
    category: "Small Language Models",
    summary:
      "Design choices for sub-billion-parameter models that run on-device, where memory and latency — not just accuracy — decide what is actually deployable.",
    tags: ["SLM", "on-device", "edge", "latency"],
  },
  {
    id: "2306.11644",
    title: "Textbooks Are All You Need",
    authors: "Gunasekar, Zhang, Aneja, et al.",
    org: "Microsoft",
    year: 2023,
    category: "Small Language Models",
    summary:
      "Demonstrates that high-quality, textbook-like training data can dramatically outperform scale — a foundational argument for data curation over raw model size.",
    tags: ["phi-1", "data quality", "SLM", "curation"],
  },
  {
    id: "2310.06825",
    title: "Mistral 7B",
    authors: "Jiang, Sablayrolles, Mensch, et al.",
    org: "Mistral AI",
    year: 2023,
    category: "Small Language Models",
    summary:
      "A 7B open-weight model that outperformed larger contemporaries, popularizing efficient attention and making capable private deployment broadly accessible.",
    tags: ["open weights", "7B", "efficiency", "deployment"],
  },
  {
    id: "2403.08295",
    title: "Gemma: Open Models Based on Gemini Research and Technology",
    authors: "Gemma Team",
    org: "Google DeepMind",
    year: 2024,
    category: "Small Language Models",
    summary:
      "Open, lightweight models (2B and 7B) built from the Gemini line, intended for responsible deployment in controlled and resource-constrained environments.",
    tags: ["open weights", "Gemma", "lightweight", "deployment"],
  },
  {
    id: "2005.11401",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Lewis, Perez, Piktus, et al.",
    org: "Facebook AI Research",
    year: 2020,
    category: "Retrieval (RAG)",
    summary:
      "The paper that introduced RAG: pairing a retriever with a generator so models answer from a controllable knowledge source instead of memorized weights — the backbone of private knowledge assistants.",
    tags: ["RAG", "retrieval", "knowledge", "grounding"],
  },
  {
    id: "2310.11511",
    title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
    authors: "Asai, Wu, Wang, et al.",
    org: "University of Washington, Allen AI",
    year: 2023,
    category: "Retrieval (RAG)",
    summary:
      "Teaches a model to decide when to retrieve and to critique its own output, improving factual accuracy and citation quality — useful for high-trust internal assistants.",
    tags: ["RAG", "self-reflection", "factuality", "citations"],
  },
  {
    id: "2106.09685",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu, Shen, Wallis, et al.",
    org: "Microsoft",
    year: 2021,
    category: "Fine-Tuning",
    summary:
      "Makes fine-tuning practical by training small adapter matrices instead of full weights — drastically lowering the cost of customizing models to a business domain.",
    tags: ["LoRA", "fine-tuning", "adapters", "efficiency"],
  },
  {
    id: "2305.14314",
    title: "QLoRA: Efficient Finetuning of Quantized LLMs",
    authors: "Dettmers, Pagnoni, Holtzman, Zettlemoyer",
    org: "University of Washington",
    year: 2023,
    category: "Fine-Tuning",
    summary:
      "Combines 4-bit quantization with LoRA to fine-tune large models on a single GPU, putting domain customization within reach of modest, controlled infrastructure.",
    tags: ["QLoRA", "quantization", "fine-tuning", "GPU"],
  },
  {
    id: "1503.02531",
    title: "Distilling the Knowledge in a Neural Network",
    authors: "Hinton, Vinyals, Dean",
    org: "Google",
    year: 2015,
    category: "Fine-Tuning",
    summary:
      "The original knowledge-distillation paper: transferring the behavior of a large model into a smaller one — the conceptual basis for producing efficient, deployable SLMs.",
    tags: ["distillation", "compression", "SLM", "training"],
  },
  {
    id: "2210.03629",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Yao, Zhao, Yu, et al.",
    org: "Princeton, Google",
    year: 2022,
    category: "Agents & Automation",
    summary:
      "Interleaves reasoning traces with tool actions, giving models a reliable loop for using external systems — a core pattern behind dependable workflow automation.",
    tags: ["agents", "reasoning", "tools", "automation"],
  },
  {
    id: "2305.15334",
    title: "Gorilla: Large Language Model Connected with Massive APIs",
    authors: "Patil, Zhang, Wang, Gonzalez",
    org: "UC Berkeley",
    year: 2023,
    category: "Agents & Automation",
    summary:
      "Fine-tunes a model to call thousands of real APIs accurately, showing how focused training turns a model into a dependable operator over internal tools.",
    tags: ["agents", "API", "tool use", "automation"],
  },
  {
    id: "2401.02385",
    title: "TinyLlama: An Open-Source Small Language Model",
    authors: "Zhang, Tan, Wang, Lu",
    org: "SUTD",
    year: 2024,
    category: "Small Language Models",
    summary:
      "A fully open 1.1B-parameter model trained on trillions of tokens, demonstrating how far compact, transparent models can be pushed for private use.",
    tags: ["SLM", "open source", "1.1B", "training"],
  },
];

export const FEATURED_PAPER =
  RESEARCH_PAPERS.find((p) => p.featured) ?? RESEARCH_PAPERS[0];

export function arxivPdfUrl(id: string): string {
  return `https://arxiv.org/pdf/${id}`;
}

export function arxivAbsUrl(id: string): string {
  return `https://arxiv.org/abs/${id}`;
}
