import Link from "next/link";
import { Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] =
  [
    {
      heading: "Solutions",
      links: [
        { label: "Private AI", href: "/private-ai" },
        { label: "Small Language Models", href: "/small-language-models" },
        { label: "All Solutions", href: "/solutions" },
        { label: "Process", href: "/how-it-works" },
      ],
    },
    {
      heading: "Industries",
      links: [
        { label: "Accounting", href: "/industries/accounting" },
        { label: "Legal", href: "/industries/legal" },
        { label: "Healthcare", href: "/industries/healthcare" },
        { label: "Manufacturing", href: "/industries/manufacturing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Schedule Assessment", href: "/assessment" },
      ],
    },
  ];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface/40">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/neqtex_logo.svg" alt="Neqtex" className="h-7 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-secondary">
              Private AI, Small Language Models, and intelligent automation for
              organizations that need control, security, and measurable
              operational value.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              {SITE.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h2 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
                  {col.heading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Neqtex LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-text-secondary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-text-secondary">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
