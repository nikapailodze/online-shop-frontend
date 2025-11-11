export type YesNo = "" | "yes" | "no";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function clampPrecision(p: number) {
  if (!Number.isFinite(p)) return 2;
  return Math.min(6, Math.max(0, Math.floor(p)));
}

export function computeOracle({
  ageYears,
  bmi,
  hrTx,
  hxFx,
  ubpi,
  precision,
}: {
  ageYears: string;
  bmi: string;
  hrTx: YesNo;
  hxFx: YesNo;
  ubpi: string;
  precision: string;
}) {
  const age = num(ageYears);
  const bmiNum = num(bmi);
  const ubpiNum = num(ubpi);
  const prec = clampPrecision(num(precision));

  const hr = hrTx === "yes" ? 1 : hrTx === "no" ? 0 : NaN;
  const fx = hxFx === "yes" ? 1 : hxFx === "no" ? 0 : NaN;

  const complete =
    [age, bmiNum, ubpiNum, hr, fx, prec].every((v) => Number.isFinite(v));

  if (!complete) {
    return {
      complete: false as const,
      score: null as number | null,
      scoreText: null as string | null,
      category: null as string | null,
      details: null as
        | {
            denominator: number;
          }
        | null,
    };
  }

  const denom = (0.02 * age) - (0.13 * bmiNum) - (0.39 * hr) + (0.74 * fx) - (3 * ubpiNum);

  let score = Number.NaN;
  if (denom !== 0) {
    score = -1 / denom;
  }

  const scoreRounded =
    Number.isFinite(score) ? Number(score.toFixed(prec)) : Number.NaN;

  let category = "Lower Risk";
  if (Number.isFinite(score)) {
    if (score > 0.32) category = "High Risk (Sens 76%)";
    else if (score > 0.26 && score <= 0.32) category = "High Risk (50% specificity)";
    else if (score >= 0 && score <= 0.26) category = "Lower Risk";
    else category = "Out of validated range";
  } else {
    category = "Cannot compute (division by zero)";
  }

  return {
    complete: true as const,
    score: scoreRounded,
    scoreText: Number.isFinite(scoreRounded) ? scoreRounded.toFixed(prec) : "—",
    category,
    details: {
      denominator: denom,
    },
  };
}
