export type Inputs = {
  sex: "female" | "male" | "";
  rxHtn: "yes" | "no" | "";
  rxSteroids: "yes" | "no" | "";
  age: string;
  bmiBand: "lt25" | "25to27_49" | "27_5to29_99" | "ge30" | "";
  fmh: "none" | "parent_or_sibling" | "parent_and_sibling" | "";
  smoker: "non" | "former" | "current" | "";
};

const C = {
  sex: { female: -0.879, male: 0 },
  rxHtn: { yes: 1.222, no: 0 },
  rxSteroids: { yes: 2.191, no: 0 },
  bmiBand: {
    lt25: 0,
    "25to27_49": 0.699,
    "27_5to29_99": 1.97,
    ge30: 2.518,
  },
  fmh: {
    none: 0,
    parent_or_sibling: 0.728,
    parent_and_sibling: 0.753,
  },
  smoker: {
    non: 0,
    former: -0.218,
    current: 0.855,
  },
} as const;

export function computeGriffin(i: Inputs) {
  const ageNum = Number((i.age || "").toString().trim());
  const complete =
    i.sex &&
    i.rxHtn &&
    i.rxSteroids &&
    i.bmiBand &&
    i.fmh &&
    i.smoker &&
    Number.isFinite(ageNum) &&
    ageNum >= 0;

  if (!complete) {
    return {
      complete: false as const,
      terms: null as number | null,
      riskPct: null as number | null,
    };
  }

  const S = C.sex[i.sex as "female" | "male"];
  const H = C.rxHtn[i.rxHtn as "yes" | "no"];
  const St = C.rxSteroids[i.rxSteroids as "yes" | "no"];
  const B = C.bmiBand[i.bmiBand as keyof typeof C.bmiBand];
  const F = C.fmh[i.fmh as keyof typeof C.fmh];
  const Smk = C.smoker[i.smoker as keyof typeof C.smoker];

  const terms = 6.322 - S - H - St - 0.063 * ageNum - B - F - Smk;
  const riskPct = 100 / (1 + Math.exp(terms));

  return { complete: true as const, terms, riskPct };
}
