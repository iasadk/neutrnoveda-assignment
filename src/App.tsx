import {
  CalendarHeart,
  ChevronDown,
  ChevronUp,
  Download,
  FileDown,
  PieChart as PieChartIcon,
  Save
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
import { FactorsList } from "./components/Factors";
import Header from "./components/Header";
import { NoSelect } from "./components/NoSelect";
import SavedResultsList from "./components/SavedResults";
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
      <Header
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        theme={theme}
        key={"calculator-header"}
      />

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
          <NoSelect theme={theme} key={"no-date-select"} />
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

            {/* FACTOR ROWS */}
            <FactorsList
              calculation={calculation}
              maxCellValue={maxCellValue}
              theme={theme}
              key={"factors-list"}
            />

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
              <SavedResultsList
                handleLoad={handleLoad}
                handleDelete={handleDelete}
                savedResults={savedResults}
                theme={theme}
                key={"saved-results"}
              />
            )}
          </>
        ) : (
          <SavedResultsList
            handleLoad={handleLoad}
            handleDelete={handleDelete}
            savedResults={savedResults}
            theme={theme}
            key={"saved-results"}
          />
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
