import type { ReactNode } from "react";
import type { Theme } from "../types";

type ActionButtonProps = {
  theme: Theme;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  disabled?: boolean;
};

export default function ActionButton({
  theme,
  onClick,
  icon,
  label,
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="plc-focus flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium disabled:opacity-60"
      style={{
        borderColor: theme.border,
        background: theme.panel,
        color: theme.text,
      }}
    >
      {icon}
      {label}
    </button>
  );
}
