import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow eyebrow--plain text-gold">404</p>
      <h1 className="mt-6 text-balance">This page isn&apos;t here.</h1>
      <p className="mt-5 max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
        get you back on track.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href="/">Return home</Button>
        <Link href="/contact" className="btn btn-secondary">
          Contact us
        </Link>
      </div>
    </Container>
  );
}
