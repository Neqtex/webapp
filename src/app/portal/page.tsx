'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

const APP_URL = 'https://app.neqtex.com';

const PROFESSIONAL_IMAGE =
  'https://images.unsplash.com/photo-1635315619556-5826839a1bea?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function PortalPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/client/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid PIN');
        return;
      }

      window.location.href = APP_URL;
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-screen flex-col lg:flex-row">
      <div className="relative min-h-[40vh] flex-1 lg:min-h-screen">
        <Image
          src={PROFESSIONAL_IMAGE}
          alt="Professional business leader"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/20 lg:to-transparent" />
        <div className="absolute left-8 top-8 lg:left-12 lg:top-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/neqtex_logo.svg"
            alt="Neqtex"
            className="h-10 w-auto lg:h-11"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:justify-center lg:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Client Portal</p>
          <h2 className="mt-3 max-w-md text-3xl leading-tight lg:text-4xl">
            Your private workspace for operational relief.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-text-secondary lg:text-base">
            Resources, assessments, and next steps — tailored for your team.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-surface lg:min-h-screen">
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 lg:py-16">
          <div className="mx-auto w-full max-w-md">
            <header className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl">Client Portal</h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary">
                Operational offload &amp; cost relief for teams ready to stop paying
                for work they shouldn&apos;t be doing.
              </p>
            </header>

            <section
              aria-labelledby="access-heading"
              className="rounded-2xl border border-line bg-surface-elevated p-6 sm:p-8"
            >
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-gold bg-background">
                  <Lock className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 id="access-heading" className="text-xl">
                    Access required
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    Enter your PIN to continue to the app.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="portal-pin" className="mb-2 block text-xs uppercase tracking-[0.16em] text-text-muted">
                    Access PIN
                  </label>
                  <input
                    id="portal-pin"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="form-control w-full tracking-[0.3em]"
                    required
                    autoFocus
                  />
                </div>

                {error && (
                  <p className="flex items-center gap-2 text-sm text-danger">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || !pin}
                  className="btn btn-primary flex w-full items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying…
                    </>
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
            </section>
          </div>
        </div>

        <footer className="border-t border-line px-6 py-5 text-center lg:px-16 lg:text-left">
          <p className="text-xs text-text-muted">
            app.neqtex.com · Copyright © 2026 Neqtex LLC
          </p>
        </footer>
      </div>
    </div>
  );
}
