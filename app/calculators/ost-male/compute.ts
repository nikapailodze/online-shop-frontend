function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function clampPrecision(p: number) {
  if (!Number.isFinite(p)) return 2;
  return Math.min(6, Math.max(0, Math.floor(p)));
}

export function computeOstMale({
  weightKg,
  ageYears,
  precision,
}: {
  weightKg: string;
  ageYears: string;
  precision: string;
}) {
  const w = num(weightKg);
  const a = num(ageYears);
  const prec = clampPrecision(num(precision));

  const complete = [w, a, prec].every((v) => Number.isFinite(v));
  if (!complete) {
    return {
      complete: false as const,
      score: null as number | null,
      scoreText: null as string | null,
      band: null as string | null,
    };
  }

  const raw = 0.2 * (w - a);
  const score = Number(raw.toFixed(prec));
  const scoreText = score.toFixed(prec);

  let band: string;
  if (score <= -1) band = "High Risk";
  else if (score <= 3) band = "Moderate Risk";
  else if (score <= 20) band = "Low Risk";
  else band = "Out of validated range";

  return {
    complete: true as const,
    score,
    scoreText,
    band,
  };
}
