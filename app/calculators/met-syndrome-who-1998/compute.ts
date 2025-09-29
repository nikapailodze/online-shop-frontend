export type Sex = "female" | "male" | "";
export type GlucoseCat = "" | "normal" | "IGT" | "IFG" | "DM" | "reducedSensitivity";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

export function computeMetWHO1998({
  sex,
  bmi,
  waistCm,
  hipCm,
  tgMgdl,
  hdlMgdl,
  sbp,
  dbp,
  glucoseCat,
  microalbuminuria,
}: {
  sex: Sex;
  bmi: string; // kg/m²
  waistCm: string;
  hipCm: string;
  tgMgdl: string;
  hdlMgdl: string;
  sbp: string;
  dbp: string;
  glucoseCat: GlucoseCat;
  microalbuminuria: boolean;
}) {
  const bmiNum = num(bmi);
  const waist = num(waistCm);
  const hip = num(hipCm);
  const tg = num(tgMgdl);
  const hdl = num(hdlMgdl);
  const s = num(sbp);
  const d = num(dbp);

  const whr = waist && hip ? waist / hip : NaN;

  const complete =
    sex !== "" &&
    glucoseCat !== "" &&
    [bmiNum, waist, hip, tg, hdl, s, d].every((v) => Number.isFinite(v));

  if (!complete) {
    return {
      complete: false as const,
      requiredMet: null,
      otherCount: null,
      diagnosis: null,
      details: null,
    };
  }

  // Required: insulin resistance
  const requiredMet =
    glucoseCat === "IGT" ||
    glucoseCat === "IFG" ||
    glucoseCat === "DM" ||
    glucoseCat === "reducedSensitivity";

  // Other criteria
  const c_obesity =
    bmiNum > 30 ||
    (sex === "male" ? whr > 0.9 : whr > 0.85);

  const c_dyslipidemia =
    tg >= 150 ||
    (sex === "male" ? hdl < 35 : hdl < 39);

  const c_bp = s >= 140 || d >= 90;

  const c_glucose = glucoseCat === "IGT" || glucoseCat === "IFG" || glucoseCat === "DM";

  const c_micro = microalbuminuria;

  const otherCount =
    (c_obesity ? 1 : 0) +
    (c_dyslipidemia ? 1 : 0) +
    (c_bp ? 1 : 0) +
    (c_glucose ? 1 : 0) +
    (c_micro ? 1 : 0);

  const diagnosis = requiredMet && otherCount >= 2;

  return {
    complete: true as const,
    requiredMet,
    otherCount,
    diagnosis,
    details: {
      obesity: c_obesity,
      dyslipidemia: c_dyslipidemia,
      bp: c_bp,
      glucose: c_glucose,
      microalbuminuria: c_micro,
    },
  };
}
