type FactorKey =
    | "genetic"
    | "vitality"
    | "mental"
    | "intellect"
    | "emotional"
    | "spiritual"
    | "soul";

export interface Factor {
    key: FactorKey;
    roman: string;
    name: string;
    desc: string;
    min: number;
    max: number;
}



export type ShortLabel = Record<FactorKey, string>;

export type ThemeName = "light" | "dark";


export interface ComputedRow {
  key: Factor["key"];
  roman: string;
  name: string;
  desc: string;
  mother: number;
  father: number;
  total: number;
}

export interface ComputedResults {
  day: number;
  isOdd: boolean;
  dominantParent: "Mother" | "Father";
  rows: ComputedRow[];
  motherTotal: number;
  fatherTotal: number;
  grandTotal: number;
}

export interface SavedResult {
  id: string;
  dob: string;
  timestamp: string;

  motherTotal: number;
  fatherTotal: number;

  dominantParent: "Mother" | "Father";
}

export interface ChartRow {
  name: string;
  Mother: number;
  Father: number;
}

export interface PieChartRow {
  name: "Mother" | "Father";
  value: number;
}