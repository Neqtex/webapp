import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/constants";

const FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfIF7ptda9EMC0cTPu46epE3Mxj7JejknRvi-_59CIiSGmoJA/viewform?embedded=true";

export const metadata: Metadata = {
  title: "Request Form",
  description:
    "Submit a request to Neqtex for private AI, automation, and operational support.",
  alternates: { canonical: `${SITE.url}/request-form` },
};

export default function RequestFormPage() {
  return (
    <Section className="pt-28 sm:pt-32 lg:pt-40" containerSize="wide">
      <div className="relative mx-auto max-w-5xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 top-24 -z-10 h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.12),transparent_68%)] blur-3xl"
        />

        <Eyebrow>Client</Eyebrow>
        <h1 className="mt-6 text-balance">Request form</h1>
        <p className="mt-4 max-w-xl text-text-secondary">
          Share what you need and we&apos;ll follow up with next steps.
        </p>

        <div className="glass-float mt-12 sm:mt-14">
          <div className="glass-float__content">
            <iframe
              src={FORM_EMBED_URL}
              width="960"
              height="1014"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Neqtex request form"
              className="block w-full min-w-0 border-0 bg-white"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </Section>
  );
}
