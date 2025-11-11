export type Sex = "female" | "male" | "";
export type RequiredIns = "" | "gt75pct";
export type GlucoseCat = "" | "normal" | "IGT" | "IFG" | "DM";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

export function computeMetEGIR({
  requiredIns,
  sex,
  waistCm,
  tgMgdl,
  hdlMgdl,
  sbp,
  dbp,
  onBpRx,
  glucoseCat,
}: {
  requiredIns: RequiredIns;
  sex: Sex;
  waistCm: string;
  tgMgdl: string;
  hdlMgdl: string;
  sbp: string;
  dbp: string;
  onBpRx: boolean;
  glucoseCat: GlucoseCat;
}) {
  const waist = num(waistCm);
  const tg = num(tgMgdl);
  const hdl = num(hdlMgdl);
  const s = num(sbp);
  const d = num(dbp);

  const complete =
    requiredIns !== "" &&
    sex !== "" &&
    [waist, tg, hdl, s, d].every((v) => Number.isFinite(v)) &&
    glucoseCat !== "";

  if (!complete) {
    return {
      complete: false as const,
      requiredMet: null as boolean | null,
      otherCount: null as number | null,
      diagnosis: null as boolean | null,
      details: null as
        | {
            waist: boolean;
            tgHdl: boolean;
            bp: boolean;
            glucoseNotDM: boolean;
          }
        | null,
    };
  }

  const requiredMet = requiredIns === "gt75pct";

  const c_waist = sex === "male" ? waist >= 94 : waist >= 80;
  const c_tg_hdl = tg >= 150 || hdl < 39;
  const c_bp = s >= 140 || d >= 90 || onBpRx;
  const c_glu_not_dm = glucoseCat === "IGT" || glucoseCat === "IFG";

  const otherCount =
    (c_waist ? 1 : 0) +
    (c_tg_hdl ? 1 : 0) +
    (c_bp ? 1 : 0) +
    (c_glu_not_dm ? 1 : 0);

  const diagnosis = requiredMet && otherCount >= 2;

  return {
    complete: true as const,
    requiredMet,
    otherCount,
    diagnosis,
    details: {
      waist: c_waist,
      tgHdl: c_tg_hdl,
      bp: c_bp,
      glucoseNotDM: c_glu_not_dm,
    },
  };
}
