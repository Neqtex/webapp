import Icon from "./Icon";

interface MetricCardProps {
  label: string;
  icon: string;
  value?: string;
}

export default function MetricCard({ label, icon, value }: MetricCardProps) {
  return (
    <div className="card flex items-start gap-4 p-5">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line-gold text-gold">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        {value && (
          <p className="font-serif text-2xl text-text-primary">{value}</p>
        )}
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </div>
  );
}
