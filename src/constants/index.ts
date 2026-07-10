import type { Factor, ShortLabel, Theme, ThemeName } from "../types";

export const FACTORS: Factor[] = [
    { key: "genetic", roman: "I", name: "Genetic Inheritance", desc: "Physical build, health patterns, hereditary resilience.", min: 9.333, max: 10.777 },
    { key: "vitality", roman: "II", name: "Constitutional Vitality", desc: "Baseline energy, stamina, bodily endurance.", min: 8.111, max: 9.111 },
    { key: "mental", roman: "III", name: "Mental Patterns", desc: "Thought habits, temperament, cognitive style.", min: 6.111, max: 7.111 },
    { key: "intellect", roman: "IV", name: "Intellectual Capacity", desc: "Reasoning, curiosity, learning aptitude.", min: 6.333, max: 6.999 },
    { key: "emotional", roman: "V", name: "Emotional Foundation", desc: "Emotional regulation, empathy, inner security.", min: 7.111, max: 7.999 },
    { key: "spiritual", roman: "VI", name: "Spiritual Lineage", desc: "Inherited beliefs, values, sense of meaning.", min: 5.011, max: 6.011 },
    { key: "soul", roman: "VII", name: "Soul Connections", desc: "Intuition, karmic ties, relational depth.", min: 5.111, max: 6.222 },
];


export const SHORT_LABEL: ShortLabel = {
    genetic: "Genetic",
    vitality: "Vitality",
    mental: "Mental",
    intellect: "Intellect",
    emotional: "Emotional",
    spiritual: "Spiritual",
    soul: "Soul",
};

export const MONTHS: readonly string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const THEMES: Record<ThemeName, Theme> = {
    light: {
        // Base
        bg: "#FFFFFF",          // background
        panel: "#FFFFFF",       // card
        panelAlt: "#F7F3FA",    // muted
        text: "#43306F",        // foreground
        subtext: "#7A4ACB",     // muted-foreground
        border: "#E5DBF2",      // border

        // Brand colors
        mother: "#A855F7",      // primary
        father: "#7C3AED",      // accent/secondary

        // Supporting colors
        gold: "#C89B2E",
        spine: "#5FB27D",

        shadow:
            "0 2px 8px rgba(67,48,111,.08), 0 8px 24px rgba(67,48,111,.08)"
    },

    dark: {
        // Base
        bg: "#231C37",          // background
        panel: "#32204A",       // card
        panelAlt: "#2B1E46",    // muted
        text: "#E6DDF5",        // foreground
        subtext: "#C59AF9",     // muted-foreground
        border: "#50306D",      // border

        // Brand colors
        mother: "#A855F7",      // primary
        father: "#8B5CF6",      // accent

        // Supporting colors
        gold: "#E0B54A",
        spine: "#73C08C",

        shadow:
            "0 2px 8px rgba(67,48,111,.08), 0 8px 24px rgba(67,48,111,.08)"
    },
};