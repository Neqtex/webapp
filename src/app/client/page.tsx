'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

const APP_URL = 'https://app.neqtex.com';

const PROFESSIONAL_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

export default function ClientPage() {
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
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:justify-center lg:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Neqtex Client Portal</p>
          <h2 className="mt-3 max-w-md text-3xl leading-tight lg:text-4xl">
            Your private workspace for operational relief.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-text-secondary lg:text-base">
            Resources, assessments, and next steps — tailored for your team.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center bg-surface px-6 py-10 lg:min-h-screen lg:px-12 lg:py-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl">Neqtex</h1>
            <div className="mx-auto mt-4 h-px w-24 bg-line-gold lg:mx-0" />
            <p className="mt-4 text-sm text-text-secondary">
              Operational offload &amp; cost relief for teams ready to stop paying
              for work they shouldn&apos;t be doing.
            </p>
          </div>

          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-line-gold bg-surface-elevated lg:mx-0 mx-auto">
            <Lock className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>

          <p className="mb-6 text-center text-sm text-text-secondary lg:text-left">
            Enter your access PIN to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="client-pin" className="sr-only">
                Access PIN
              </label>
              <input
                id="client-pin"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="form-control w-full text-center tracking-[0.3em]"
                required
                autoFocus
              />
            </div>

            {error && (
              <p className="flex items-center justify-center gap-2 text-sm text-danger lg:justify-start">
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

          <p className="mt-10 text-center text-xs text-text-muted lg:text-left">
            app.neqtex.com · Copyright © 2026 Neqtex LLC
          </p>
        </div>
      </div>
    </div>
  );
}
