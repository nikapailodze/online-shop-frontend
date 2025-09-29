function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

// Katz (1973): corrected Na = measured Na + 0.016 * (glucose - 100)
// (glucose in mg/dL)
export function computeSodiumCorrectionKatz({
  measuredNa,
  glucoseMgdl,
}: {
  measuredNa: string; // mEq/L
  glucoseMgdl: string; // mg/dL
}) {
  const na = num(measuredNa);
  const glu = num(glucoseMgdl);

  const complete = Number.isFinite(na) && Number.isFinite(glu);

  if (!complete)
    return { complete: false as const, correctedNa: null as number | null };

  const correctedNa = na + 0.016 * (glu - 100);
  return { complete: true as const, correctedNa };
}
