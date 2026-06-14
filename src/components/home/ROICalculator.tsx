"use client";

import { useId, useMemo, useState } from "react";

interface FieldDef {
  key: keyof Inputs;
  label: string;
  prefix?: string;
  suffix?: string;
  min: number;
  step: number;
}

interface Inputs {
  employees: number;
  hoursPerWeek: number;
  hourlyCost: number;
  monthlyCost: number;
}

const FIELDS: FieldDef[] = [
  { key: "employees", label: "Employees affected", min: 0, step: 1 },
  { key: "hoursPerWeek", label: "Hours saved / employee / week", min: 0, step: 1 },
  { key: "hourlyCost", label: "Average hourly cost", prefix: "$", min: 0, step: 5 },
  { key: "monthlyCost", label: "Monthly implementation cost", prefix: "$", min: 0, step: 100 },
];

const currency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const WEEKS_PER_MONTH = 4.33;

export default function ROICalculator() {
  const baseId = useId();
  const [inputs, setInputs] = useState<Inputs>({
    employees: 8,
    hoursPerWeek: 4,
    hourlyCost: 55,
    monthlyCost: 2500,
  });

  const { monthlySavings, annualSavings, breakEven } = useMemo(() => {
    const grossMonthly =
      inputs.employees *
      inputs.hoursPerWeek *
      WEEKS_PER_MONTH *
      inputs.hourlyCost;
    const monthly = grossMonthly - inputs.monthlyCost;
    const breakEvenMonths =
      grossMonthly > 0 ? inputs.monthlyCost / grossMonthly : 0;
    return {
      monthlySavings: monthly,
      annualSavings: monthly * 12,
      breakEven: breakEvenMonths,
    };
  }, [inputs]);

  const breakEvenLabel = () => {
    if (breakEven <= 0) return "—";
    if (breakEven < 1) {
      const weeks = Math.max(1, Math.round(breakEven * WEEKS_PER_MONTH));
      return `${weeks} week${weeks > 1 ? "s" : ""}`;
    }
    return `${breakEven.toFixed(1)} months`;
  };

  return (
    <div className="card grid gap-8 p-7 lg:grid-cols-2 lg:p-9">
      <div>
        <h3 className="font-serif text-xl">Estimate your impact</h3>
        <p className="mt-2 text-sm text-text-secondary">
          A directional model of operational savings. Results are estimates,
          not guarantees.
        </p>
        <div className="mt-6 space-y-4">
          {FIELDS.map((field) => {
            const id = `${baseId}-${field.key}`;
            return (
              <div key={field.key}>
                <label htmlFor={id} className="field-label">
                  {field.label}
                </label>
                <div className="relative">
                  {field.prefix && (
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                      {field.prefix}
                    </span>
                  )}
                  <input
                    id={id}
                    type="number"
                    inputMode="numeric"
                    min={field.min}
                    step={field.step}
                    value={inputs[field.key]}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        [field.key]: Math.max(
                          field.min,
                          Number(e.target.value) || 0
                        ),
                      }))
                    }
                    className={`field ${field.prefix ? "pl-7" : ""}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 rounded-xl border border-line bg-surface p-6">
        <Result label="Estimated monthly savings" value={currency(monthlySavings)} highlight />
        <div className="hairline" />
        <Result label="Estimated annual savings" value={currency(annualSavings)} />
        <Result label="Break-even point" value={breakEvenLabel()} />
        <p className="mt-2 text-xs text-text-muted">
          Estimates based on the inputs above and ~4.33 weeks per month. Actual
          results depend on workflow, adoption, and scope.
        </p>
      </div>
    </div>
  );
}

function Result({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-text-secondary">{label}</span>
      <span
        className={`font-serif tabular-nums ${
          highlight ? "text-3xl text-gradient-gold" : "text-xl text-text-primary"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
