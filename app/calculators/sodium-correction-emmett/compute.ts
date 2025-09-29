export type GlucoseUnit = "mgdl" | "mmolL";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

// Convert mmol/L → mg/dL using 18.015 (consistent with your other calcs)
function toMgdl(glu: number, unit: GlucoseUnit) {
  return unit === "mgdl" ? glu : glu * 18.015;
}

// Emmett (2013): corrected Na = measured Na + 2 * ( (glucose - 100) / 100 )
export function computeSodiumCorrection({
  measuredNa,
  glucose,
  glucoseUnit,
}: {
  measuredNa: string;   // mEq/L (≈ mmol/L)
  glucose: string;      // mg/dL or mmol/L (toggle)
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
