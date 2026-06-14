"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body scroll lock + escape close while menu open
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px]"
      >
        <Link
          href="/"
          aria-label="Neqtex home"
          className="flex items-center gap-2.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/neqtex_logo.svg"
            alt=""
            width={120}
            height={28}
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative text-sm tracking-wide transition-colors hover:text-text-primary ${
                  isActive(item.href) ? "text-gold" : "text-text-secondary"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-line-gold" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex">
            <Link href="/assessment" className="btn btn-primary">
              Schedule Assessment
            </Link>
          </span>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-text-primary transition-colors hover:border-line-gold lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
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
