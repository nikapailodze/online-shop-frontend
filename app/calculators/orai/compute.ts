export type YesNo = "" | "yes" | "no";
export type WeightUnit = "kg" | "lb";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function toKg(value: number, unit: WeightUnit) {
  return unit === "lb" ? value * 0.453592 : value;
}

function ageFactor(age: number) {
  if (age >= 75) return 15;
  if (age >= 65) return 9;
  if (age >= 55) return 5;
  return 0;
}

function weightFactor(kg: number) {
  if (kg < 60) return 9;
  if (kg < 70) return 3;
  return 0;
}

export function computeOrai({
  ageYears,
  weight,
  weightUnit,
  onEstrogen,
}: {
  ageYears: string;
  weight: string;
  weightUnit: WeightUnit;
  onEstrogen: YesNo;
}) {
  const age = num(ageYears);
  const wt = num(weight);
  const est = onEstrogen === "yes" ? 0 : onEstrogen === "no" ? 2 : NaN;

  const complete =
    Number.isFinite(age) &&
    Number.isFinite(wt) &&
    onEstrogen !== "";

  if (!complete) {
    return {
      complete: false as const,
      score: null,
      interpretation: null,
      details: null,
    };
  }

  const kg = toKg(wt, weightUnit);

  const score =
    ageFactor(age) +
    weightFactor(kg) +
    est;

  const interpretation =
    score >= 9 ? "Higher risk (consider bone densitometry)" : "Lower risk";

  return {
    complete: true as const,
    score,
    interpretation,
    details: {
      ageFactor: ageFactor(age),
      weightFactor: weightFactor(kg),
      estrogenPoints: est,
      weightKg: kg,
    },
  };
}
