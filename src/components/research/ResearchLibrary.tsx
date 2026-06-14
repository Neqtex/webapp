"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  ArrowUpRight,
  Star,
  Download,
  PanelLeftClose,
  PanelLeftOpen,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  RESEARCH_PAPERS,
  RESEARCH_CATEGORIES,
  FEATURED_PAPER,
  arxivAbsUrl,
  arxivPdfUrl,
  type ResearchPaper,
} from "@/lib/research";

type Filter = "All" | (typeof RESEARCH_CATEGORIES)[number];

const FILTERS: Filter[] = ["All", ...RESEARCH_CATEGORIES];

export default function ResearchLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedId, setSelectedId] = useState(FEATURED_PAPER.id);
  const [collapsed, setCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current as
      | (HTMLDivElement & {
          webkitRequestFullscreen?: () => Promise<void>;
        })
      | null;
    if (!el) return;
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void>;
      webkitFullscreenElement?: Element | null;
    };
    if (document.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen ?? doc.webkitExitFullscreen)?.call(doc);
    } else {
      (el.requestFullscreen ?? el.webkitRequestFullscreen)?.call(el);
    }
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESEARCH_PAPERS.filter((paper) => {
      const matchesFilter = filter === "All" || paper.category === filter;
      if (!matchesFilter) return false;
      if (!q) return true;
      const haystack = [
        paper.title,
        paper.authors,
        paper.org,
        paper.summary,
        paper.category,
        paper.id,
        paper.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, filter]);

  const selected =
    RESEARCH_PAPERS.find((p) => p.id === selectedId) ?? FEATURED_PAPER;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // On small screens, collapse the list so the reader takes over.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setCollapsed(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col overflow-hidden border border-line bg-background lg:flex-row ${
        isFullscreen
          ? "h-screen w-screen rounded-none"
          : "rounded-2xl lg:h-[82vh] lg:min-h-[620px]"
      }`}
    >
      {/* Left pane */}
      <aside
        className={`flex flex-col border-line bg-surface transition-all duration-300 ${
          collapsed
            ? "hidden lg:flex lg:w-0 lg:min-w-0 lg:overflow-hidden lg:border-r-0"
            : "w-full border-b lg:w-[340px] lg:min-w-[340px] lg:border-b-0 lg:border-r"
        }`}
        aria-hidden={collapsed}
      >
        <div className="border-b border-line p-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers…"
              className="w-full rounded-full border border-line bg-background py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-line-gold"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    active
                      ? "border-line-gold bg-gold/10 text-gold"
                      : "border-line text-text-secondary hover:border-line-gold hover:text-text-primary"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-xs text-text-muted">
            {results.length} {results.length === 1 ? "paper" : "papers"}
          </p>
        </div>

        {/* Scrollable list */}
        <div className="max-h-[46vh] flex-1 overflow-y-auto overscroll-contain lg:max-h-none">
          {results.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-text-muted">
              No papers match your search.
            </p>
          ) : (
            <ul>
              {results.map((paper) => {
                const isActive = paper.id === selected.id;
                return (
                  <li key={paper.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(paper.id)}
                      aria-current={isActive}
                      className={`flex w-full flex-col items-start gap-1 border-b border-line px-4 py-4 text-left transition-colors ${
                        isActive
                          ? "bg-gold/[0.07]"
                          : "hover:bg-surface-elevated"
                      }`}
                    >
                      <span className="flex w-full items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-gold">
                          {paper.featured && (
                            <Star className="h-3 w-3" strokeWidth={1.5} />
                          )}
                          {paper.category}
                        </span>
                        <span className="font-sans text-[11px] text-text-muted">
                          {paper.year}
                        </span>
                      </span>
                      <span
                        className={`font-serif text-[15px] leading-snug ${
                          isActive ? "text-gold" : "text-text-primary"
                        }`}
                      >
                        {paper.title}
                      </span>
                      <span className="text-xs text-text-muted">
                        {paper.org}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Right pane */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex items-start gap-3 border-b border-line bg-surface/60 px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Show paper list" : "Hide paper list"}
            aria-expanded={!collapsed}
            className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-line text-text-secondary transition-colors hover:border-line-gold hover:text-text-primary"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <PanelLeftClose className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-gold">
              {selected.featured && (
                <Star className="h-3 w-3" strokeWidth={1.5} />
              )}
              {selected.category} · {selected.year}
            </p>
            <h3 className="mt-1 truncate font-serif text-lg text-text-primary">
              {selected.title}
            </h3>
            <p className="mt-0.5 truncate text-xs text-text-muted">
              {selected.authors} · {selected.org}
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href={arxivAbsUrl(selected.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-2 text-xs text-text-secondary transition-colors hover:border-line-gold hover:text-text-primary sm:inline-flex"
            >
              arXiv:{selected.id}
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <a
              href={arxivPdfUrl(selected.id)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PDF on arXiv"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-text-secondary transition-colors hover:border-line-gold hover:text-text-primary"
            >
              <Download className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
              aria-pressed={isFullscreen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-text-secondary transition-colors hover:border-line-gold hover:text-text-primary"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Maximize2 className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Summary strip */}
        <div className="border-b border-line bg-surface/30 px-4 py-3 sm:px-5">
          <p className="text-sm leading-relaxed text-text-secondary">
            {selected.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selected.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-2.5 py-0.5 text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* PDF reader */}
        <div className="relative h-[68vh] flex-1 bg-surface-elevated lg:h-auto">
          <iframe
            key={selected.id}
            src={`${arxivPdfUrl(selected.id)}#view=FitH`}
            title={selected.title}
            className="h-full w-full"
          />
        </div>

        <p className="border-t border-line px-4 py-2 text-center text-[11px] text-text-muted">
          PDF served live from arXiv.org. If it doesn&apos;t load,{" "}
          <a
            href={arxivPdfUrl(selected.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline-offset-2 hover:underline"
          >
            open it in a new tab
          </a>
          .
        </p>
      </section>
    </div>
  );
}
