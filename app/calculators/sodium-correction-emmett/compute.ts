export type GlucoseUnit = "mgdl" | "mmolL";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function toMgdl(glu: number, unit: GlucoseUnit) {
  return unit === "mgdl" ? glu : glu * 18.015;
}

export function computeSodiumCorrection({
  measuredNa,
  glucose,
  glucoseUnit,
}: {
  measuredNa: string;
  glucose: string;
  glucoseUnit: GlucoseUnit;
}) {
  const na = num(measuredNa);
  const gluIn = num(glucose);
  const gluMgdl = Number.isFinite(gluIn) ? toMgdl(gluIn, glucoseUnit) : NaN;

  const complete = Number.isFinite(na) && Number.isFinite(gluMgdl);

  if (!complete) return { complete: false as const, correctedNa: null as number | null };

  const correctedNa = na + 2 * ((gluMgdl - 100) / 100);
  return { complete: true as const, correctedNa };
}
