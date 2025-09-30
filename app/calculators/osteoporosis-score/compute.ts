export type YesNo = "" | "yes" | "no";
export type RaceVal =
  | ""
  | "american_indian_alaska_native" // 5
  | "asian"                         // 5
  | "black"                         // 0
  | "native_hawaiian_pacific"       // 5
  | "white";                        // 5

export type FractureHistory =
  | ""
  | "none"   // 0
  | "one"    // 4
  | "two"    // 8
  | "three_plus"; // 12

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function clampPrecision(p: number) {
  if (!Number.isFinite(p)) return 0;
  return Math.min(6, Math.max(0, Math.floor(p)));
}

function racePoints(r: RaceVal) {
  if (!r) return NaN;
  if (r === "black") return 0;
  return 5; // all others (AI/AN, Asian, NH/PI, White) = 5
}

function raPoints(ra: YesNo) {
  if (ra === "yes") return 4;
  if (ra === "no") return 0;
  return NaN;
}

function fxPoints(h: FractureHistory) {
  switch (h) {
    case "none": return 0;
    case "one": return 4;
    case "two": return 8;
    case "three_plus": return 12;
    default: return NaN;
  }
}

function estrogenPoints(est: YesNo) {
  // Estrogen: prior use = 0; NO prior use = 1
  if (est === "yes") return 0;
  if (est === "no") return 1;
  return NaN;
}

export function computeOsteoporosisScore({
  race,
  raPresent,
  fxHistory,
  ageYears,
  estrogenPriorUse,
  weightLb,
  precision,
}: {
  race: RaceVal;
  raPresent: YesNo;
  fxHistory: FractureHistory;
  ageYears: string;
  estrogenPriorUse: YesNo; // "yes" = prior use; "no" = no prior use
  weightLb: string;
  precision: string; // integer string, e.g. "0"
}) {
  const age = num(ageYears);
  const wtLb = num(weightLb);
  const prec = clampPrecision(num(precision));

  const rp = racePoints(race);
  const ra = raPoints(raPresent);
  const fx = fxPoints(fxHistory);
  const est = estrogenPoints(estrogenPriorUse);

  const complete =
    [age, wtLb, rp, ra, fx, est, prec].every((v) => Number.isFinite(v));

  if (!complete) {
    return {
      complete: false as const,
      score: null as number | null,
      scoreText: null as string | null,
      interpretation: null as string | null,
      details: null as
        | {
            racePts: number;
            raPts: number;
            fxPts: number;
            estrogenPts: number;
            ageTerm: number;
            weightTerm: number;
          }
        | null,
    };
  }

  const ageTerm = (3 * age) / 10;
  const weightTerm = wtLb / 10;

  const raw =
    rp + ra + fx + est + ageTerm - weightTerm;

  const score = Number(raw.toFixed(prec));

  let interpretation: string;
  if (score >= 16 && score <= 50) interpretation = "High Risk";
  else if (score >= 7 && score <= 15) interpretation = "Moderate Risk";
  else if (score >= 0 && score <= 6) interpretation = "Low Risk";
  else interpretation = "Out of validated range";

  return {
    complete: true as const,
    score,
    scoreText: score.toFixed(prec),
    interpretation,
    details: {
      racePts: rp,
      raPts: ra,
      fxPts: fx,
      estrogenPts: est,
      ageTerm,
      weightTerm,
    },
  };
}
