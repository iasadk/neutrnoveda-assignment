import { Sparkles } from "lucide-react";
import type { Theme } from "../types";


interface NoSelectProps {
  theme: Theme;
}

export const NoSelect: React.FC<NoSelectProps> = ({ theme }) => {
  return (
    <section
      className="rounded-2xl border p-10 text-center"
      style={{
        background: theme.panel,
        borderColor: theme.border,
      }}
    >
      <Sparkles
        size={22}
        style={{
          color: theme.gold,
          margin: "0 auto 10px",
        }}
      />

      <p
        className="plc-display text-lg"
        style={{ color: theme.subtext }}
      >
        Your lineage awaits — select a date of birth above to begin.
      </p>
    </section>
  );
};
