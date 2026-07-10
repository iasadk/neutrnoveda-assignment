import { fmt } from "../lib/utils";
import type { ComputedResults, ComputedRow, Theme } from "../types";

interface FactorsListProps {
  calculation: ComputedResults;
  theme: Theme;
  maxCellValue: number;
}

interface FactorRowProps {
  row: ComputedRow;
  index: number;
  maxCellValue: number;
  theme: Theme;
}

export function FactorsList({
  calculation,
  theme,
  maxCellValue,
}: FactorsListProps) {
  return (
    <section
      className="mb-6 overflow-hidden rounded-2xl border"
      style={{
        background: theme.panel,
        borderColor: theme.border,
        boxShadow: theme.shadow,
      }}
    >
      <div className="px-5 pt-5 pb-1 sm:px-6">
        <h2 className="plc-display text-xl font-semibold">The Seven Factors</h2>

        <p className="mt-1 text-xs" style={{ color: theme.subtext }}>
          Mother's share extends left of the spine, Father's share extends
          right.
        </p>
      </div>

      <div className="px-5 pb-5 sm:px-6">
        {calculation.rows.map((row, index) => (
          <FactorRow
            key={row.key}
            row={row}
            index={index}
            theme={theme}
            maxCellValue={maxCellValue}
          />
        ))}
      </div>
    </section>
  );
}

export default function FactorRow({
  row,
  index,
  maxCellValue,
  theme,
}: FactorRowProps) {
  return (
    <div
      className="py-4"
      style={{
        borderTop: index === 0 ? "none" : `1px solid ${theme.border}`,
      }}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <span
            className="plc-display mt-0.5 text-xs italic"
            style={{ color: theme.gold }}
          >
            {row.roman}
          </span>

          <div>
            <div className="text-sm font-medium sm:text-base">{row.name}</div>

            <div className="text-xs" style={{ color: theme.subtext }}>
              {row.desc}
            </div>
          </div>
        </div>

        <div
          className="plc-mono shrink-0 text-right text-xs sm:text-sm"
          style={{ color: theme.subtext }}
        >
          total <span style={{ color: theme.text }}>{fmt(row.total)}</span>
        </div>
      </div>

      <div className="relative flex h-6 items-center">
        <div
          className="absolute top-0 bottom-0 left-1/2 w-px"
          style={{ background: theme.spine }}
        />

        <div className="flex w-1/2 justify-end pr-0.5">
          <div
            className="plc-beam-fill h-3 rounded-l-full"
            style={{
              width: `${(row.mother / maxCellValue) * 100}%`,
              background: theme.mother,
              maxWidth: "100%",
            }}
          />
        </div>

        <div className="flex w-1/2 justify-start pl-0.5">
          <div
            className="plc-beam-fill h-3 rounded-r-full"
            style={{
              width: `${(row.father / maxCellValue) * 100}%`,
              background: theme.father,
              maxWidth: "100%",
            }}
          />
        </div>
      </div>

      <div className="plc-mono mt-1 flex justify-between text-xs">
        <span style={{ color: theme.mother }}>M {fmt(row.mother)}</span>

        <span style={{ color: theme.father }}>F {fmt(row.father)}</span>
      </div>
    </div>
  );
}
