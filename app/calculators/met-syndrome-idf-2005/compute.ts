export type Sex = "female" | "male" | "";
export type Ethnicity =
  | ""
  | "europid"
  | "south_asian_chinese_japanese"
  | "south_central_american"
  | "sub_saharan_african"
  | "eastern_med_middle_east";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function idfWaistThresholdCm(sex: Sex, eth: Ethnicity) {
  if (sex === "male") {
    if (eth === "south_asian_chinese_japanese" || eth === "south_central_american") {
      return 90;
    }
    return 94;
  }
  if (sex === "female") {
    return 80;
  }
  return NaN;
}

export function computeMetIDF2005({
  sex,
  ethnicity,
  waistCm,
  tgMgdl,
  onTgRx,
  hdlMgdl,
  onHdlRx,
  sbp,
  dbp,
  onBpRx,
  fpgMgdl,
  hasDiabetes,
}: {
  sex: Sex;
  ethnicity: Ethnicity;
  waistCm: string;
  tgMgdl: string;
  onTgRx: boolean;
  hdlMgdl: string;
  onHdlRx: boolean;
  sbp: string;
  dbp: string;
  onBpRx: boolean;
  fpgMgdl: string;
  hasDiabetes: boolean;
}) {
  const waist = num(waistCm);
  const tg = num(tgMgdl);
  const hdl = num(hdlMgdl);
  const s = num(sbp);
  const d = num(dbp);
  const fpg = num(fpgMgdl);

  const complete =
    sex !== "" &&
    ethnicity !== "" &&
    [waist, tg, hdl, s, d, fpg].every((v) => Number.isFinite(v));

  if (!complete) {
    return {
      complete: false as const,
      requiredMet: null,
      otherCount: null,
      diagnosis: null,
      details: null,
    };
  }

  const waistThreshold = idfWaistThresholdCm(sex, ethnicity);
  const c_abdominal = waist >= waistThreshold;

  const c_tg = tg >= 150 || onTgRx;
  const c_hdl =
    (sex === "male" ? hdl < 40 : hdl < 50) || onHdlRx;
  const c_bp = s >= 130 || d >= 85 || onBpRx;
  const c_glucose = fpg >= 100 || hasDiabetes;

  const otherCount =
    (c_tg ? 1 : 0) + (c_hdl ? 1 : 0) + (c_bp ? 1 : 0) + (c_glucose ? 1 : 0);

  const diagnosis = c_abdominal && otherCount >= 2;

  return {
    complete: true as const,
    requiredMet: c_abdominal,
    otherCount,
    diagnosis,
    details: {
      abdominalObesity: c_abdominal,
      tg: c_tg,
      hdl: c_hdl,
      bp: c_bp,
      glucose: c_glucose,
    },
  };
}
