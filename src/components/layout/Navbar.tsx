"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { NAV_GROUPS, SITE, type NavGroup } from "@/lib/constants";

interface Indicator {
  left: number;
  width: number;
  visible: boolean;
}

function isNavHrefActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function isGroupActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => isNavHrefActive(item.href, pathname));
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileGroup, setExpandedMobileGroup] = useState<string | null>(
    null
  );
  const [indicator, setIndicator] = useState<Indicator>({
    left: 0,
    width: 0,
    visible: false,
  });

  const listRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimerRef = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const moveTo = useCallback((el: HTMLElement | null) => {
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

  const settle = useCallback(() => {
    const activeGroup = NAV_GROUPS.find((group) => isGroupActive(group, pathname));
    if (activeGroup) {
      moveTo(triggerRefs.current[activeGroup.id]);
    } else {
      setIndicator((prev) => ({ ...prev, visible: false }));
    }
  }, [moveTo, pathname]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
      closeTimerRef.current = null;
      settle();
    }, 120);
  }, [cancelClose, settle]);

  const openGroup = useCallback(
    (groupId: string) => {
      cancelClose();
      setOpenDropdown(groupId);
      moveTo(triggerRefs.current[groupId]);
    },
    [cancelClose, moveTo]
  );

  const toggleMobileGroup = (groupId: string) => {
    setExpandedMobileGroup((current) => (current === groupId ? null : groupId));
  };

  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  useEffect(() => {
    setScrolled(window.scrollY > 12);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

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

  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDropdown]);

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

        <div
          ref={listRef}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="relative ml-2 mr-1 hidden items-center lg:flex"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 -z-0 h-9 -translate-y-1/2 rounded-full border border-line-gold/40 bg-gold/10 transition-all duration-300 ease-out ${
              indicator.visible ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: indicator.left, width: indicator.width }}
          />

          {NAV_GROUPS.map((group) => {
            const active = isGroupActive(group, pathname);
            const isOpen = openDropdown === group.id;

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => openGroup(group.id)}
              >
                <button
                  type="button"
                  ref={(el) => {
                    triggerRefs.current[group.id] = el;
                  }}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-controls={`nav-menu-${group.id}`}
                  onClick={() =>
                    setOpenDropdown((current) =>
                      current === group.id ? null : group.id
                    )
                  }
                  className={`relative z-10 inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
                    active
                      ? "text-gold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.75}
                  />
                </button>

                <div
                  className={`absolute left-1/2 top-full z-50 min-w-[15rem] -translate-x-1/2 pt-2.5 transition-all duration-200 ${
                    isOpen
                      ? "pointer-events-auto visible opacity-100"
                      : "pointer-events-none invisible opacity-0"
                  }`}
                >
                  <div
                    id={`nav-menu-${group.id}`}
                    role="menu"
                    aria-label={group.label}
                    className="rounded-2xl border border-line bg-background/95 p-2 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl"
                  >
                    <ul className="space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.href} role="none">
                          <Link
                            href={item.href}
                            role="menuitem"
                            className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                              isNavHrefActive(item.href, pathname)
                                ? "bg-gold/10 text-gold"
                                : "text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
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

          <div className="mt-8 flex flex-col gap-2">
            {NAV_GROUPS.map((group) => {
              const expanded = expandedMobileGroup === group.id;
              const active = isGroupActive(group, pathname);

              return (
                <div key={group.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => toggleMobileGroup(group.id)}
                    className={`flex w-full items-center justify-between py-4 font-serif text-2xl ${
                      active ? "text-gold" : "text-text-primary"
                    }`}
                  >
                    {group.label}
                    <ChevronDown
                      className={`h-5 w-5 text-text-muted transition-transform duration-200 ${
                        expanded ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>

                  <ul
                    className={`overflow-hidden transition-all duration-300 ${
                      expanded ? "max-h-96 pb-4" : "max-h-0"
                    }`}
                  >
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between py-3 pl-2 text-base ${
                            isNavHrefActive(item.href, pathname)
                              ? "text-gold"
                              : "text-text-secondary"
                          }`}
                        >
                          {item.label}
                          <ArrowRight
                            className="h-4 w-4 text-text-muted"
                            strokeWidth={1.5}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

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
