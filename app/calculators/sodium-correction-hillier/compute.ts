function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

export function computeSodiumCorrectionHillier({
  measuredNa,
  glucoseMgdl,
}: {
  measuredNa: string;
  glucoseMgdl: string;
}) {
  const na = num(measuredNa);
  const glu = num(glucoseMgdl);

  const complete = Number.isFinite(na) && Number.isFinite(glu);

  if (!complete) return { complete: false as const, correctedNa: null as number | null };

  const correctedNa = na + 0.024 * (glu - 100);
  return { complete: true as const, correctedNa };
}
