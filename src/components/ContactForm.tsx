"use client";

import { FormEvent, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const INDUSTRIES = [
  "Accounting",
  "Legal",
  "Healthcare",
  "Manufacturing",
  "Other",
];

const DEPLOYMENTS = [
  "Not sure yet",
  "Client-owned infrastructure",
  "Private cloud",
  "Hybrid",
  "Managed by Neqtex",
];

const TIMELINES = [
  "Exploring options",
  "Within 1–3 months",
  "Within 3–6 months",
  "6+ months",
];

const initial = {
  name: "",
  company: "",
  email: "",
  industry: "",
  goal: "",
  deployment: "",
  timeline: "",
  budget: "",
  website: "", // honeypot
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState(initial);

  const update = (key: keyof typeof initial, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send message");
      setStatus("success");
      setData(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center px-6 py-16 text-center">
        <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={1.5} />
        <h2 className="mt-6 font-serif text-2xl">Message received.</h2>
        <p className="mt-3 max-w-sm text-text-secondary">
          Thank you for reaching out. We&apos;ll respond within one business day.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-secondary mt-8"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7 lg:p-9" noValidate>
      {status === "error" && (
        <div
          role="alert"
          className="mb-6 flex items-center gap-3 rounded-lg border border-danger/40 bg-danger/10 p-4 text-sm text-text-primary"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-danger" strokeWidth={1.5} />
          {error}
        </div>
      )}

      {/* Honeypot — visually hidden, ignored by humans */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="name"
            className="field"
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label htmlFor="company" className="field-label">
            Company
          </label>
          <input
            id="company"
            className="field"
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="field-label">
            Work email <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="field"
            required
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label htmlFor="industry" className="field-label">
            Industry
          </label>
          <select
            id="industry"
            className="field"
            value={data.industry}
            onChange={(e) => update("industry", e.target.value)}
            disabled={status === "loading"}
          >
            <option value="">Select…</option>
            {INDUSTRIES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="goal" className="field-label">
          What are you trying to improve? <span className="text-gold">*</span>
        </label>
        <textarea
          id="goal"
          className="field"
          rows={4}
          required
          placeholder="Tell us about the workflows, data, or bottlenecks you're considering."
          value={data.goal}
          onChange={(e) => update("goal", e.target.value)}
          disabled={status === "loading"}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="deployment" className="field-label">
            Preferred deployment
          </label>
          <select
            id="deployment"
            className="field"
            value={data.deployment}
            onChange={(e) => update("deployment", e.target.value)}
            disabled={status === "loading"}
          >
            <option value="">Select…</option>
            {DEPLOYMENTS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="field-label">
            Timeline
          </label>
          <select
            id="timeline"
            className="field"
            value={data.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            disabled={status === "loading"}
          >
            <option value="">Select…</option>
            {TIMELINES.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="field-label">
            Budget range{" "}
            <span className="text-text-muted">(optional)</span>
          </label>
          <input
            id="budget"
            className="field"
            placeholder="e.g. $10k–25k"
            value={data.budget}
            onChange={(e) => update("budget", e.target.value)}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="mt-8">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
