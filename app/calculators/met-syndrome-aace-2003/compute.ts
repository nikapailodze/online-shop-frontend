export type Sex = "female" | "male" | "";
export type RequiredIR = "" | "IGT" | "IFG";
export type GlucoseCat = "" | "normal" | "IGT" | "IFG" | "DM";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

export function computeMetAACE2003({
  requiredIR,
  bmi,
  sex,
  tg,
  hdl,
  sbp,
  dbp,
  glucoseCatOther,
  otherIR,
}: {
  requiredIR: RequiredIR; // IGT or IFG required
  bmi: string; // kg/m^2
  sex: Sex; // affects HDL cutoff
  tg: string; // mg/dL
  hdl: string; // mg/dL
  sbp: string; // mmHg
  dbp: string; // mmHg
  glucoseCatOther: GlucoseCat; // for "Other Criteria": IGT/IFG but NOT DM
  otherIR: boolean; // “Other features of insulin resistance”
}) {
  // Parse numbers
  const bmiN = num(bmi);
  const tgN = num(tg);
  const hdlN = num(hdl);
  const sbpN = num(sbp);
  const dbpN = num(dbp);

  // Check required field completeness
  const complete =
    requiredIR !== "" &&
    sex !== "" &&
    [bmiN, tgN, hdlN, sbpN, dbpN].every((x) => Number.isFinite(x)) &&
    glucoseCatOther !== "";

  if (!complete) {
    return {
      complete: false as const,
      requiredMet: null as boolean | null,
      otherCount: null as number | null,
      diagnosis: null as boolean | null,
      details: null as {
        bmi: boolean;
        tgHdl: boolean;
        bp: boolean;
        glucoseNotDM: boolean;
        otherIR: boolean;
      } | null,
    };
  }

  // Required criterion
  const requiredMet = requiredIR === "IGT" || requiredIR === "IFG";

  // Other criteria:
  const c_bmi = bmiN >= 25;
  const c_tg_hdl =
    tgN >= 150 &&
    ((sex === "male" && hdlN < 40) || (sex === "female" && hdlN < 50));
  const c_bp = sbpN >= 130 || dbpN >= 85;
  const c_glu_not_dm = glucoseCatOther === "IGT" || glucoseCatOther === "IFG"; // but NOT DM
  const c_otherIR = !!otherIR;

  const otherCount =
    (c_bmi ? 1 : 0) +
    (c_tg_hdl ? 1 : 0) +
    (c_bp ? 1 : 0) +
    (c_glu_not_dm ? 1 : 0) +
    (c_otherIR ? 1 : 0);

  const diagnosis = requiredMet && otherCount >= 1;

  return {
    complete: true as const,
    requiredMet,
    otherCount,
    diagnosis,
    details: {
      bmi: c_bmi,
      tgHdl: c_tg_hdl,
      bp: c_bp,
      glucoseNotDM: c_glu_not_dm,
      otherIR: c_otherIR,
    },
  };
}
