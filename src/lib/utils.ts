import dayjs from "dayjs";
import { FACTORS } from "../constants";
import type { ComputedResults, ComputedRow } from "../types";
const SEED_MULTIPLIER: number = 12.9898;
const RANDOM_MULTIPLIER: number = 43758.5453;

const seededFraction = (n: number): number => {
    const x = Math.sin(n * SEED_MULTIPLIER) * RANDOM_MULTIPLIER;
    return x - Math.floor(x);
};

export const computeResults = (dob: string): ComputedResults => {
    const date = dayjs(dob);

    const day = date.date();
    const isOdd = day % 2 === 1;

    const raw = FACTORS.map((factor, index) => {
        const fracA = seededFraction(day * 100 + index * 13 + 7);
        const fracB = seededFraction(day * 37 + index * 19 + 3);

        const dominant =
            factor.min + fracA * (factor.max - factor.min);

        const ratio = 0.82 + fracB * 0.12;
        const recessive = dominant * ratio;

        return {
            ...factor,
            dominant,
            recessive,
        };
    });

    const rawGrand = raw.reduce(
        (sum, row) => sum + row.dominant + row.recessive,
        0
    );

    const scale = 100 / rawGrand;

    let rows = raw.map((row) => {
        const domMilli = Math.round(row.dominant * scale * 1000);
        const recMilli = Math.round(row.recessive * scale * 1000);

        return {
            ...row,
            motherMilli: isOdd ? domMilli : recMilli,
            fatherMilli: isOdd ? recMilli : domMilli,
        };
    });

    const sumMilli = rows.reduce(
        (sum, row) => sum + row.motherMilli + row.fatherMilli,
        0
    );

    const diffMilli = 100_000 - sumMilli;

    rows = rows.map((row, index) => {
        if (index !== rows.length - 1) return row;

        return isOdd
            ? { ...row, motherMilli: row.motherMilli + diffMilli }
            : { ...row, fatherMilli: row.fatherMilli + diffMilli };
    });

    let motherMilliTotal = 0;
    let fatherMilliTotal = 0;

    const finalRows: ComputedRow[] = rows.map((row) => {
        motherMilliTotal += row.motherMilli;
        fatherMilliTotal += row.fatherMilli;

        return {
            key: row.key,
            roman: row.roman,
            name: row.name,
            desc: row.desc,
            mother: row.motherMilli / 1000,
            father: row.fatherMilli / 1000,
            total: (row.motherMilli + row.fatherMilli) / 1000,
        };
    });

    return {
        day,
        isOdd,
        dominantParent: isOdd ? "Mother" : "Father",
        rows: finalRows,
        motherTotal: motherMilliTotal / 1000,
        fatherTotal: fatherMilliTotal / 1000,
        grandTotal: (motherMilliTotal + fatherMilliTotal) / 1000,
    };
};

export const fmt = (value: number): string => value.toFixed(3);

export const formatDobLong = (dob: string): string =>
    dayjs(dob).format("D MMMM YYYY");

export const todayLocalStr = (): string =>
    dayjs().format("YYYY-MM-DD");