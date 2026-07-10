import { Trash2 } from "lucide-react";
import { fmt, formatDobLong } from "../lib/utils";
import type { SavedResult, Theme } from "../types";

interface SavedResultsProps {
  theme: Theme;
  savedResults: SavedResult[];
  handleLoad: (dob: string) => void;
  handleDelete: (id: string) => void;
}

export default function SavedResultsList({
  theme,
  savedResults,
  handleLoad,
  handleDelete,
}: SavedResultsProps) {
  return (
    <section
      className="my-8 rounded-2xl border p-5"
      style={{
        background: theme.panel,
        borderColor: theme.border,
        boxShadow: theme.shadow,
      }}
    >
      <h2 className="plc-display mb-3 text-xl font-semibold">
        Choose a Saved Result
      </h2>

      <p className="mb-4 text-sm" style={{ color: theme.subtext }}>
        Select one from your history to continue.
      </p>

      {savedResults.length === 0 ? (
        <p className="text-sm" style={{ color: theme.subtext }}>
          No saved results yet. Calculate a result first.
        </p>
      ) : (
        <div className="space-y-2">
          {savedResults.map((result) => (
            <SavedResultRow
              onLoad={handleLoad}
              result={result}
              theme={theme}
              handleDelete={handleDelete}
              key={`result-card-${result.id}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface SavedResultRowProps {
  theme: Theme;
  result: SavedResult;
  onLoad: (dob: string) => void;
  handleDelete: (id: string) => void;
}

export function SavedResultRow({
  theme,
  result,
  onLoad,
  handleDelete,
}: SavedResultRowProps) {
  return (
    <div
      className="flex items-center justify-between rounded-lg border px-4 py-3"
      style={{
        background: theme.panelAlt,
        borderColor: theme.border,
      }}
    >
      <button
        onClick={() => onLoad(result.dob)}
        className="plc-focus flex-1 text-left"
      >
        <div className="text-sm font-medium">{formatDobLong(result.dob)}</div>

        <div className="plc-mono mt-1 text-xs" style={{ color: theme.subtext }}>
          M {fmt(result.motherTotal)} · F {fmt(result.fatherTotal)} · dominant:{" "}
          {result.dominantParent}
        </div>
      </button>

      <button
        onClick={() => handleDelete(result.id)}
        className="plc-focus ml-4 rounded p-1.5 transition-opacity hover:opacity-70"
        aria-label="Delete saved result"
        style={{ color: theme.mother }}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
