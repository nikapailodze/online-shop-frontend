function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

export type Inputs = {
  age: string;
  heightIn: string;
  weightLb: string;
  sex: "male" | "female" | "";
  ma: "ma" | "nhw" | "";
  fmh: "yes" | "no" | "";
  fbs: string;
  sbp: string;
  hdl: string;
};

export function computeRisk7p5(i: Inputs) {
  const age = num(i.age);
  const hIn = num(i.heightIn);
  const wLb = num(i.weightLb);
  const fbs = num(i.fbs);
  const sbp = num(i.sbp);
  const hdl = num(i.hdl);

  const sexV = i.sex === "female" ? 1 : i.sex === "male" ? 0 : NaN;
  const maV = i.ma === "ma" ? 1 : i.ma === "nhw" ? 0 : NaN;
  const fmhV = i.fmh === "yes" ? 1 : i.fmh === "no" ? 0 : NaN;

  const kg = wLb / 2.205;
  const m = hIn / 39.37;
  const bmi = Number.isFinite(kg) && kg > 0 && Number.isFinite(m) && m > 0 ? kg / (m * m) : NaN;

  const complete =
    [age, hIn, wLb, fbs, sbp, hdl, sexV, maV, fmhV, bmi].every((v) => Number.isFinite(v));

  if (!complete) {
    return {
      complete: false as const,
      bmi: null as number | null,
      terms: null as number | null,
      riskPct: null as number | null,
    };
  }

  const terms =
    0.028 * age +
    0.661 * sexV +
    0.412 * maV +
    0.079 * fbs +
    0.018 * sbp -
    0.039 * hdl +
    0.07 * bmi +
    0.481 * fmhV -
    13.415;

  const riskPct = 100 / (1 + Math.exp(-1 * terms));

  return {
    complete: true as const,
    bmi,
    terms,
    riskPct,
  };
}
