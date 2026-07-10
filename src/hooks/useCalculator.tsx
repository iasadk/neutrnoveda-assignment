import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

import { SHORT_LABEL, THEMES, type Theme } from "../constants";
import { computeResults, fmt, todayLocalStr } from "../lib/utils";
import type { ChartRow, PieChartRow, SavedResult, ThemeName } from "../types";

export function useCalculator() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("light");

  const [dateOfBirth, setDateOfBirth] = useState("");

  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const theme: Theme = THEMES[currentTheme];

  const today = useMemo(() => todayLocalStr(), []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);

    const timeout = setTimeout(() => {
      setToastMessage("");
    }, 2200);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const response = window.localStorage.getItem("legacy:history");

        if (response) {
            console.log(JSON.parse(response))
          setSavedResults(JSON.parse(response) as SavedResult[]);
        }
      } catch {
        console.log("Failed to load history");
      }
    };

    loadHistory();
  }, []);

  const validation = useMemo(() => {
    if (!dateOfBirth) {
      return {
        error: "",
        calculation: null,
      };
    }

    const date = dayjs(dateOfBirth);

    if (!date.isValid()) {
      return {
        error: "That date doesn't look valid.",
        calculation: null,
      };
    }

    if (date.isAfter(dayjs(), "day")) {
      return {
        error: "Date of birth can't be in the future.",
        calculation: null,
      };
    }

    if (date.year() < 1900) {
      return {
        error: "Please enter a date after the year 1900.",
        calculation: null,
      };
    }

    return {
      error: "",
      calculation: computeResults(dateOfBirth),
    };
  }, [dateOfBirth]);

  const error = validation.error;
  const calculation = validation.calculation;

  const chartData = useMemo<ChartRow[]>(() => {
    if (!calculation) return [];

    return calculation.rows.map((row) => ({
      name: SHORT_LABEL[row.key],
      Mother: Number(row.mother.toFixed(3)),
      Father: Number(row.father.toFixed(3)),
    }));
  }, [calculation]);

  const pieData = useMemo<PieChartRow[]>(() => {
    if (!calculation) return [];

    return [
      {
        name: "Mother",
        value: Number(calculation.motherTotal.toFixed(3)),
      },
      {
        name: "Father",
        value: Number(calculation.fatherTotal.toFixed(3)),
      },
    ];
  }, [calculation]);

  const maxCellValue = useMemo(() => {
    if (!calculation) return 1;

    return Math.max(
      ...calculation.rows.flatMap((row) => [row.mother, row.father]),
    );
  }, [calculation]);

  const persistHistory = useCallback(
    async (history: SavedResult[]) => {
      setSavedResults(history);

      try {
        await window.localStorage.setItem(
          "legacy:history",
          JSON.stringify(history),
        );
      } catch {
        showToast("Couldn't save — storage unavailable.");
      }
    },
    [showToast],
  );

  const handleSave = useCallback(async () => {
    if (!calculation) return;

    setIsSaving(true);

    const entry: SavedResult = {
      id: `${dateOfBirth}-${Date.now()}`,
      dob: dateOfBirth,
      timestamp: new Date().toISOString(),

      motherTotal: calculation.motherTotal,
      fatherTotal: calculation.fatherTotal,

      dominantParent: calculation.dominantParent,
    };

    const updatedHistory = [
      entry,
      ...savedResults.filter((item) => item.dob !== dateOfBirth),
    ].slice(0, 20);

    await persistHistory(updatedHistory);

    setIsSaving(false);

    showToast("Result saved.");
  }, [calculation, dateOfBirth, savedResults, persistHistory, showToast]);

  const handleDelete = useCallback(
    async (id: string) => {
      const updatedHistory = savedResults.filter((item) => item.id !== id);

      await persistHistory(updatedHistory);

      showToast("Removed from saved results.");
    },
    [savedResults, persistHistory, showToast],
  );

  const handleLoad = useCallback(
    (savedDateOfBirth: string) => {
      setDateOfBirth(savedDateOfBirth);

      setIsHistoryOpen(false);

      showToast("Loaded saved date of birth.");
    },
    [showToast],
  );

  const exportCSV = useCallback(() => {
    if (!calculation) return;

    const rows: (string | number)[][] = [
      ["Factor", "Mother Value", "Father Value", "Total Value"],
    ];

    calculation.rows.forEach((row) => {
      rows.push([row.name, fmt(row.mother), fmt(row.father), fmt(row.total)]);
    });

    rows.push([]);
    rows.push(["Mother Total", fmt(calculation.motherTotal)]);
    rows.push(["Father Total", fmt(calculation.fatherTotal)]);
    rows.push(["Grand Total", fmt(calculation.grandTotal)]);
    rows.push(["Dominant Legacy", calculation.dominantParent]);

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `parental-legacy-${dateOfBirth}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast("CSV downloaded.");
  }, [calculation, dateOfBirth, showToast]);

  const exportPDF = useCallback(() => {
    if (!calculation) return;

    window.print();
  }, [calculation]);

  return {
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

    showToast,
    handleSave,
    handleDelete,
    handleLoad,

    exportCSV,
    exportPDF,
  };
}
