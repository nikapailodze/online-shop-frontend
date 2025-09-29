function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

export type Inputs = {
  age: string;          // years
  heightIn: string;     // inches
  weightLb: string;     // pounds
  sex: "male" | "female" | "";                 // female=1, male=0
  ma: "ma" | "nhw" | "";                       // Mexican American=1, Non-Hispanic white=0
  fmh: "yes" | "no" | "";                      // family history of DM: yes=1, no=0
  fbs: string;          // mg/dL
  sbp: string;          // mmHg
  hdl: string;          // mg/dL
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

  // BMI = (Weight/2.205) / (Height/39.37)^2
  // Convert lb→kg and in→m via given constants
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

  // Terms = (0.028 * Age) + (0.661 * Sex) + (0.412 * MA) + (0.079 * FBS)
  //       + (0.018 * SystolicBP) - (0.039 * HDL) + (0.07 * BMI)
  //       + (0.481 * FMH_DM) - 13.415
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

  // Risk = 100 / (1 + e^(−1 * Terms))
  const riskPct = 100 / (1 + Math.exp(-1 * terms));

  return {
    complete: true as const,
    bmi,
    terms,
    riskPct,
  };
}
