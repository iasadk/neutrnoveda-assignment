import type { Theme } from "../constants";

type SummaryCardProps = {
  theme: Theme;
  label: string;
  value: string | number;
  accent: string;
  isText?: boolean;
};

export default function SummaryCard({
  theme,
  label,
  value,
  accent,
  isText = false,
}: SummaryCardProps) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: theme.panel,
        borderColor: theme.border,
        boxShadow: theme.shadow,
      }}
    >
      <div className="mb-1 text-xs" style={{ color: theme.subtext }}>
        {label}
      </div>

      <div
        className={
          isText
            ? "plc-display text-lg font-semibold"
            : "plc-mono text-xl font-semibold"
        }
        style={{ color: accent }}
      >
        {value}
      </div>
    </div>
  );
}
