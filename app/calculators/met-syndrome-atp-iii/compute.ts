export type Sex = "female" | "male" | "";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

export function computeMetAtpIII({
  sex,
  waistIn,
  tgMgdl,
  hdlMgdl,
  sbp, dbp,
  fpgMgdl,
}: {
  sex: Sex;
  waistIn: string;
  tgMgdl: string;
  hdlMgdl: string;
  sbp: string;
  dbp: string;
  fpgMgdl: string;
}) {
  const waist = num(waistIn);
  const tg = num(tgMgdl);
  const hdl = num(hdlMgdl);
  const s = num(sbp);
  const d = num(dbp);
  const fpg = num(fpgMgdl);

  const complete =
    sex !== "" &&
    [waist, tg, hdl, s, d, fpg].every((v) => Number.isFinite(v));

  if (!complete) {
    return {
      complete: false as const,
      points: null as number | null,
      met: null as boolean | null,
      breakdown: null as {
        waist: boolean; tg: boolean; hdl: boolean; bp: boolean; glu: boolean;
      } | null,
    };
  }

  const c_waist = sex === "male" ? waist > 40 : waist > 35;
  const c_tg = tg >= 150;
  const c_hdl = sex === "male" ? hdl < 40 : hdl < 50;
  const c_bp = s >= 130 || d >= 85;
  const c_glu = fpg >= 110;

  const points = [c_waist, c_tg, c_hdl, c_bp, c_glu].reduce((a, b) => a + (b ? 1 : 0), 0);
  const met = points >= 3;

  return {
    complete: true as const,
    points,
    met,
    breakdown: { waist: c_waist, tg: c_tg, hdl: c_hdl, bp: c_bp, glu: c_glu },
  };
}
