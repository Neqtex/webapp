"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/constants";

interface Indicator {
  left: number;
  width: number;
  visible: boolean;
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    visible: false,
  });

  const listRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const isActive = useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname]
  );

  // Move the sliding indicator to a given link element.
  const moveTo = useCallback((el: HTMLAnchorElement | null) => {
    const list = listRef.current;
    if (!el || !list) return;
    const listRect = list.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({
      left: rect.left - listRect.left,
      width: rect.width,
      visible: true,
    });
  }, []);

  // Rest the indicator on the active link, or hide it if none is active.
  const settle = useCallback(() => {
    const activeItem = NAV_ITEMS.find((item) => isActive(item.href));
    if (activeItem) {
      moveTo(linkRefs.current[activeItem.href]);
    } else {
      setIndicator((prev) => ({ ...prev, visible: false }));
    }
  }, [isActive, moveTo]);

  useEffect(() => {
    setScrolled(window.scrollY > 12);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Position the indicator after layout/fonts settle and on resize.
  useEffect(() => {
    settle();
    const id = window.setTimeout(settle, 250);
    window.addEventListener("resize", settle);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("resize", settle);
    };
  }, [settle]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        aria-label="Primary"
        className={`flex items-center gap-1.5 rounded-full border py-2 pl-4 pr-2 transition-all duration-300 ${
          scrolled
            ? "border-line bg-background/80 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-line/60 bg-background/55 backdrop-blur-md"
        }`}
      >
        <Link
          href="/"
          aria-label="Neqtex home"
          className="flex items-center pr-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/neqtex_logo.svg" alt="" className="h-7 w-auto" />
        </Link>

        {/* Desktop links with sliding indicator */}
        <div
          ref={listRef}
          onMouseLeave={settle}
          className="relative ml-2 mr-1 hidden items-center lg:flex"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 -z-0 h-9 -translate-y-1/2 rounded-full border border-line-gold/40 bg-gold/10 transition-all duration-300 ease-out ${
              indicator.visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: indicator.left, width: indicator.width }}
          />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                linkRefs.current[item.href] = el;
              }}
              onMouseEnter={() => moveTo(linkRefs.current[item.href])}
              className={`relative z-10 rounded-full px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-gold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <span className="mx-1 hidden h-6 w-px bg-line lg:block" />

        <span className="hidden sm:inline-flex">
          <Link
            href="/assessment"
            className="btn btn-primary !px-5 !py-2.5 text-sm"
          >
            Schedule Assessment
          </Link>
        </span>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text-primary transition-colors hover:border-line-gold lg:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`relative flex h-full flex-col px-6 pt-5 transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex h-16 items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/neqtex_logo.svg" alt="Neqtex" className="h-7 w-auto" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-text-primary"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <ul className="mt-8 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between border-b border-line py-4 font-serif text-2xl ${
                    isActive(item.href) ? "text-gold" : "text-text-primary"
                  }`}
                >
                  {item.label}
                  <ArrowRight
                    className="h-5 w-5 text-text-muted"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pb-10 pt-8">
            <Link href="/assessment" className="btn btn-primary w-full">
              Schedule Assessment
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 block text-center text-sm text-text-secondary"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
