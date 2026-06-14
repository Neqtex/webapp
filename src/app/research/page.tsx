import type { Metadata } from "next";
import Image from "next/image";
import { Cpu, Database, SlidersHorizontal } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/home/CTASection";
import JsonLd from "@/components/JsonLd";
import ResearchLibrary from "@/components/research/ResearchLibrary";
import {
  RESEARCH_PAPERS,
  arxivAbsUrl,
  FEATURED_PAPER,
} from "@/lib/research";
import { SITE } from "@/lib/constants";

const BANNER =
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2400&q=80";

export const metadata: Metadata = {
  title: "Research Library",
  description:
    "A curated, readable library of the research behind private AI — Small Language Models, retrieval, fine-tuning, and agentic automation. Search and read arXiv papers in-page.",
  alternates: { canonical: `${SITE.url}/research` },
  openGraph: {
    title: "Research Library | Neqtex",
    description:
      "Curated arXiv papers on Small Language Models, RAG, fine-tuning, and agentic automation — searchable and readable in-page.",
    url: `${SITE.url}/research`,
    images: [BANNER],
  },
};

const CONTEXT = [
  {
    icon: Cpu,
    title: "Right-sized models",
    body: "Evidence that small, specialized models can match larger ones on focused tasks — at a fraction of the cost and latency.",
  },
  {
    icon: Database,
    title: "Grounded knowledge",
    body: "Retrieval techniques that let models answer from your controlled sources instead of memorized, unverifiable weights.",
  },
  {
    icon: SlidersHorizontal,
    title: "Efficient adaptation",
    body: "Fine-tuning and distillation methods that make domain customization practical on infrastructure you govern.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Neqtex Research Library",
  description:
    "A curated library of research on private AI, Small Language Models, retrieval, fine-tuning, and agentic automation.",
  url: `${SITE.url}/research`,
  hasPart: RESEARCH_PAPERS.map((paper) => ({
    "@type": "ScholarlyArticle",
    headline: paper.title,
    datePublished: String(paper.year),
    url: arxivAbsUrl(paper.id),
    publisher: paper.org,
  })),
};

export default function ResearchPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* Banner */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={BANNER}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>

        <Container>
          <div className="max-w-3xl pb-16 pt-36 sm:pt-40 lg:pb-24 lg:pt-48">
            <Eyebrow>Research Library</Eyebrow>
            <h1 className="mt-6 text-balance">
              The research behind{" "}
              <span className="text-gradient-gold">practical private AI</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-text-secondary">
              We build on peer-reviewed work, not hype. This is a curated,
              searchable library of the papers that shape how we deploy Small
              Language Models, retrieval, and automation — readable here, in
              full, straight from arXiv.
            </p>
            <p className="mt-6 text-sm text-text-muted">
              Featured: “{FEATURED_PAPER.title}” — {FEATURED_PAPER.org}.
            </p>
          </div>
        </Container>

        <span className="absolute bottom-3 right-4 text-[11px] text-text-muted/70">
          Photo via Unsplash
        </span>
      </section>

      {/* Context */}
      <Section className="border-t border-line pt-16 sm:pt-20 lg:pt-24">
        <div className="max-w-2xl">
          <Eyebrow>Why this matters</Eyebrow>
          <h2 className="mt-6 text-balance">
            Decisions grounded in evidence, not trends.
          </h2>
          <p className="mt-6 text-text-secondary">
            The fastest way to waste money on AI is to follow fashion. The
            techniques below are what let organizations deploy AI that is
            secure, affordable, and genuinely useful — and they inform every
            engagement we take on.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {CONTEXT.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="card h-full p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-gold">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-serif text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Library */}
      <Section
        containerSize="wide"
        className="border-t border-line pt-16 sm:pt-20 lg:pt-24"
      >
        <div className="max-w-2xl">
          <Eyebrow>Library</Eyebrow>
          <h2 className="mt-6 text-balance">Browse &amp; read.</h2>
          <p className="mt-6 text-text-secondary">
            Pick a paper from the list to read its full PDF in the reader. Use
            the panel toggle to collapse the list and give the document more
            room. Search by title, author, topic, or arXiv ID.
          </p>
        </div>
        <div className="mt-10">
          <ResearchLibrary />
        </div>
      </Section>

      <CTASection
        eyebrow="Apply the Research"
        title="Want this applied to your workflows?"
        body="We translate the research above into secure, right-sized systems for your business. Start with a focused assessment."
      />
    </>
  );
}
