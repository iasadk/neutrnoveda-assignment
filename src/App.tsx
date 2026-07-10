import {
  CalendarHeart,
  ChevronDown,
  ChevronUp,
  Download,
  FileDown,
  Moon,
  PieChart as PieChartIcon,
  Save,
  Scale,
  Sparkles,
  Sun,
  Trash2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";
import ActionButton from "./components/ActionButton";
import SummaryCard from "./components/SummaryCard";
import { useCalculator } from "./hooks/useCalculator";
import { fmt, formatDobLong } from "./lib/utils";

function App() {
  const {
    currentTheme,
    setCurrentTheme,
    theme,

    dateOfBirth,
    setDateOfBirth,
    today,

    error,
    calculation,
    savedResults,

    toastMessage,

    isSaving,

    isHistoryOpen,
    setIsHistoryOpen,

    chartData,
    pieData,
    maxCellValue,

    handleSave,
    handleDelete,
    handleLoad,

    exportCSV,
    exportPDF,
  } = useCalculator();

  return (
    <div
      style={{
        background: theme.bg,
        color: theme.text,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.3s, color 0.3s",
      }}
      className="w-full"
    >
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

  .plc-display {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
  }

  .plc-mono {
    font-family: 'JetBrains Mono', monospace;
  }

  .plc-focus:focus-visible {
    outline: 2px solid ${theme.gold};
    outline-offset: 2px;
  }

  .plc-beam-fill {
    transition: width 0.6s cubic-bezier(0.22,1,0.36,1);
  }

  @media print {
    .no-print {
      display: none !important;
    }

    body {
      background: white !important;
    }
  }
`}</style>
      {/* HEADER */}
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
          style={{ borderColor: theme.border, background: theme.panel }}
          aria-label="Toggle dark mode"
        >
          {currentTheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 pb-20">
        {/* DOB INPUT */}
        <section
          className="rounded-2xl p-5 sm:p-6 border mb-6"
          style={{
            background: theme.panel,
            borderColor: theme.border,
            boxShadow: theme.shadow,
          }}
        >
          <label
            htmlFor="dob"
            className="flex items-center gap-2 text-sm font-medium mb-2"
            style={{ color: theme.subtext }}
          >
            <CalendarHeart size={16} /> Date of Birth
          </label>
          <input
            id="dob"
            type="date"
            value={dateOfBirth}
            max={today}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="plc-focus plc-mono w-full sm:w-64 rounded-lg border px-3 py-2 text-base"
            style={{
              background: theme.panelAlt,
              borderColor: theme.border,
              color: theme.text,
            }}
          />
          {error && (
            <p className="mt-2 text-sm" style={{ color: theme.mother }}>
              {error}
            </p>
          )}
        </section>

        {!calculation && !error && (
          <section
            className="rounded-2xl p-10 border text-center"
            style={{ background: theme.panel, borderColor: theme.border }}
          >
            <Sparkles
              size={22}
              style={{ color: theme.gold, margin: "0 auto 10px" }}
            />
            <p className="plc-display text-lg" style={{ color: theme.subtext }}>
              Your lineage awaits — select a date of birth above to begin.
            </p>
          </section>
        )}

        {calculation ? (
          <>
            {/* SUMMARY */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <SummaryCard
                theme={theme}
                label="Mother Total"
                value={fmt(calculation.motherTotal)}
                accent={theme.mother}
              />
              <SummaryCard
                theme={theme}
                label="Father Total"
                value={fmt(calculation.fatherTotal)}
                accent={theme.father}
              />
              <SummaryCard
                theme={theme}
                label="Grand Total"
                value={fmt(calculation.grandTotal)}
                accent={theme.gold}
              />
              <SummaryCard
                theme={theme}
                label="Dominant Legacy"
                value={calculation.dominantParent}
                accent={
                  calculation.dominantParent === "Mother"
                    ? theme.mother
                    : theme.father
                }
                isText
              />
            </section>
            <p
              className="text-xs mb-6 plc-mono"
              style={{ color: theme.subtext }}
            >
              {formatDobLong(dateOfBirth)} — day {calculation.day} of the month
              ({calculation.isOdd ? "odd" : "even"}) →{" "}
              {calculation.dominantParent.toLowerCase()}ly dominant across all
              seven factors.
            </p>

            {/* FACTOR ROWS — the balance-beam signature element */}
            <section
              className="rounded-2xl border mb-6 overflow-hidden"
              style={{
                background: theme.panel,
                borderColor: theme.border,
                boxShadow: theme.shadow,
              }}
            >
              <div className="px-5 sm:px-6 pt-5 pb-1">
                <h2 className="plc-display text-xl font-semibold">
                  The Seven Factors
                </h2>
                <p className="text-xs mt-1" style={{ color: theme.subtext }}>
                  Mother's share extends left of the spine, Father's share
                  extends right.
                </p>
              </div>
              <div className="px-5 sm:px-6 pb-5">
                {calculation.rows.map((r, i) => (
                  <div
                    key={r.key}
                    className="py-4"
                    style={{
                      borderTop: i === 0 ? "none" : `1px solid ${theme.border}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-2.5">
                        <span
                          className="plc-display text-xs italic mt-0.5"
                          style={{ color: theme.gold }}
                        >
                          {r.roman}
                        </span>
                        <div>
                          <div className="font-medium text-sm sm:text-base">
                            {r.name}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: theme.subtext }}
                          >
                            {r.desc}
                          </div>
                        </div>
                      </div>
                      <div
                        className="plc-mono text-xs sm:text-sm text-right shrink-0"
                        style={{ color: theme.subtext }}
                      >
                        total{" "}
                        <span style={{ color: theme.text }}>
                          {fmt(r.total)}
                        </span>
                      </div>
                    </div>
                    {/* balance beam */}
                    <div className="relative h-6 flex items-center">
                      <div
                        className="absolute left-1/2 top-0 bottom-0 w-px"
                        style={{ background: theme.spine }}
                      />
                      <div className="w-1/2 flex justify-end pr-0.5">
                        <div
                          className="plc-beam-fill h-3 rounded-l-full"
                          style={{
                            width: `${(r.mother / maxCellValue) * 100}%`,
                            background: theme.mother,
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                      <div className="w-1/2 flex justify-start pl-0.5">
                        <div
                          className="plc-beam-fill h-3 rounded-r-full"
                          style={{
                            width: `${(r.father / maxCellValue) * 100}%`,
                            background: theme.father,
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between plc-mono text-xs mt-1">
                      <span style={{ color: theme.mother }}>
                        M {fmt(r.mother)}
                      </span>
                      <span style={{ color: theme.father }}>
                        F {fmt(r.father)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CHARTS */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div
                className="lg:col-span-2 rounded-2xl border p-5"
                style={{
                  background: theme.panel,
                  borderColor: theme.border,
                  boxShadow: theme.shadow,
                }}
              >
                <h3 className="plc-display text-base font-semibold mb-3">
                  Mother vs Father, by Factor
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme.border}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: theme.subtext, fontSize: 11 }}
                      axisLine={{ stroke: theme.border }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: theme.subtext, fontSize: 11 }}
                      axisLine={{ stroke: theme.border }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: theme.panelAlt,
                        border: `1px solid ${theme.border}`,
                        borderRadius: 8,
                        fontSize: 12,
                        color: theme.text,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar
                      dataKey="Mother"
                      fill={theme.mother}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Father"
                      fill={theme.father}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div
                className="rounded-2xl border p-5"
                style={{
                  background: theme.panel,
                  borderColor: theme.border,
                  boxShadow: theme.shadow,
                }}
              >
                <h3 className="plc-display text-base font-semibold mb-3 flex gap-x-2 ">
                  <PieChartIcon />
                  Overall Split
                </h3>
                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        isAnimationActive={false}
                      >
                        <Cell fill="#B85C6B" />
                        <Cell fill="#3E4E7A" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* ACTIONS */}
            <section className="no-print flex flex-wrap gap-2.5 mb-8">
              <ActionButton
                theme={theme}
                onClick={exportCSV}
                icon={<Download size={15} />}
                label="Export CSV"
              />
              <ActionButton
                theme={theme}
                onClick={exportPDF}
                icon={<FileDown size={15} />}
                label="Export PDF"
              />
              <ActionButton
                theme={theme}
                onClick={handleSave}
                icon={<Save size={15} />}
                label={isSaving ? "Saving…" : "Save Result"}
                disabled={isSaving}
              />
              <ActionButton
                theme={theme}
                onClick={() => setIsHistoryOpen((s) => !s)}
                icon={
                  isHistoryOpen ? (
                    <ChevronUp size={15} />
                  ) : (
                    <ChevronDown size={15} />
                  )
                }
                label={`Saved (${savedResults.length})`}
              />
            </section>

            {isHistoryOpen && (
              <section
                className="no-print rounded-2xl border p-5 mb-10"
                style={{ background: theme.panel, borderColor: theme.border }}
              >
                <h3 className="plc-display text-base font-semibold mb-3">
                  Saved Results
                </h3>
                {savedResults.length === 0 ? (
                  <p className="text-sm" style={{ color: theme.subtext }}>
                    Nothing saved yet — calculate a result and tap "Save
                    Result".
                  </p>
                ) : (
                  <div className="space-y-2">
                    {savedResults.map((h) => (
                      <div
                        key={h.id}
                        className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 border"
                        style={{
                          borderColor: theme.border,
                          background: theme.panelAlt,
                        }}
                      >
                        <button
                          onClick={() => handleLoad(h.dob)}
                          className="plc-focus flex-1 text-left"
                        >
                          <div className="text-sm font-medium">
                            {formatDobLong(h.dob)}
                          </div>
                          <div
                            className="plc-mono text-xs"
                            style={{ color: theme.subtext }}
                          >
                            M {fmt(h.motherTotal)} · F {fmt(h.fatherTotal)} ·
                            dominant: {h.dominantParent}
                          </div>
                        </button>
                        <button
                          onClick={() => handleDelete(h.id)}
                          className="plc-focus p-1.5 rounded"
                          aria-label="Delete saved result"
                          style={{ color: theme.mother }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        ) : (
          <section
            className="rounded-2xl border p-5 my-8"
            style={{
              background: theme.panel,
              borderColor: theme.border,
              boxShadow: theme.shadow,
            }}
          >
            <h2 className="plc-display text-xl font-semibold mb-3">
              Choose a Saved Result
            </h2>

            <p className="text-sm mb-4" style={{ color: theme.subtext }}>
              Select one from your history to
              continue.
            </p>

            {savedResults.length === 0 ? (
              <p className="text-sm" style={{ color: theme.subtext }}>
                No saved results yet. Calculate a result first.
              </p>
            ) : (
              <div className="space-y-2">
                {savedResults.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => handleLoad(h.dob)}
                    className="plc-focus w-full text-left rounded-lg px-4 py-3 border"
                    style={{
                      background: theme.panelAlt,
                      borderColor: theme.border,
                    }}
                  >
                    <div className="text-sm font-medium">
                      {formatDobLong(h.dob)}
                    </div>

                    <div
                      className="plc-mono text-xs mt-1"
                      style={{ color: theme.subtext }}
                    >
                      M {fmt(h.motherTotal)} · F {fmt(h.fatherTotal)} ·
                      dominant: {h.dominantParent}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {toastMessage && (
        <div
          className="no-print fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full text-sm plc-mono"
          style={{
            background: theme.text,
            color: theme.bg,
            boxShadow: theme.shadow,
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
