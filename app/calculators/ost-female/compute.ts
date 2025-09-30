function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function clampPrecision(p: number) {
  if (!Number.isFinite(p)) return 2;
  return Math.min(6, Math.max(0, Math.floor(p)));
}

export function computeOstFemale({
  weightKg,
  ageYears,
  precision,
}: {
  weightKg: string;   // kg
  ageYears: string;   // years
  precision: string;  // integer string, e.g. "2"
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

  // OST = 0.2 * (Weight − Age)
  const raw = 0.2 * (w - a);
  const score = Number(raw.toFixed(prec));
  const scoreText = score.toFixed(prec);

  // Female cutoffs:
  // −20 to −4 → High; −3 to 1 → Moderate; >1 to 20 → Low
  let band: string;
  if (score <= -4) band = "High Risk";
  else if (score <= 1) band = "Moderate Risk";   // handles −3..1
  else if (score <= 20) band = "Low Risk";       // >1..20
  else band = "Out of validated range";

  return {
    complete: true as const,
    score,
    scoreText,
    band,
  };
}
