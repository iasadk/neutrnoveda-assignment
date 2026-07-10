import { Moon, Scale, Sun } from "lucide-react";
import type { Theme, ThemeName } from "../types";

interface HeaderProps {
  theme: Theme;
  currentTheme: ThemeName;
  setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeName>>;
}

const Header = ({ theme, currentTheme, setCurrentTheme }: HeaderProps) => {
  return (
    <header className="max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-6 flex items-start justify-between gap-4">
      <div>
        <div
          className="flex items-center gap-2 mb-2"
          style={{ color: theme.gold }}
        >
          <Scale size={18} strokeWidth={1.75} />

          <span className="plc-mono text-xs tracking-widest uppercase">
            Legacy Ledger
          </span>
        </div>

        <h1 className="plc-display text-3xl sm:text-4xl font-semibold leading-tight">
          Parental Legacy &amp; Life Factors
        </h1>

        <p
          className="mt-2 max-w-xl text-sm sm:text-base"
          style={{ color: theme.subtext }}
        >
          Enter a date of birth to reveal how seven ancestral factors are
          believed to divide between maternal and paternal lineage — always
          balancing to exactly 100.
        </p>
      </div>

      <button
        onClick={() =>
          setCurrentTheme(currentTheme === "light" ? "dark" : "light")
        }
        className="no-print plc-focus shrink-0 rounded-full p-2.5 border"
        style={{
          borderColor: theme.border,
          background: theme.panel,
        }}
        aria-label="Toggle dark mode"
      >
        {currentTheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </header>
  );
};

export default Header;
