export type AgeBand =
  | ""
  | "<65"
  | "65-69"
  | "70-74"
  | "75-79"
  | "80-85"
  | "85+";

function num(s: string) {
  const n = Number((s ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function agePoints(band: AgeBand) {
  switch (band) {
    case "<65":   return 0;
    case "65-69": return 1;
    case "70-74": return 2;
    case "75-79": return 3;
    case "80-85": return 4;
    case "85+":   return 5;
    default:      return NaN;
  }
}

function riskFromTotal(total: number) {
  if (total === 1) {
    return { nonvertebralPct: 10.5, hipPct: 0.6, vertebralPct: 1.4 };
  }
  if (total === 2) {
    return { nonvertebralPct: 12.5, hipPct: 1.4, vertebralPct: 2.9 };
  }
  if (total === 3) {
    return { nonvertebralPct: 16.4, hipPct: 2.1, vertebralPct: 5.1 };
  }
  if (total === 4) {
    return { nonvertebralPct: 18.7, hipPct: 3.2, vertebralPct: 7.0 };
  }
  if (total >= 5 && total <= 9) {
    return { nonvertebralPct: 26.1, hipPct: 8.2, vertebralPct: 9.9 };
  }
  return { nonvertebralPct: null, hipPct: null, vertebralPct: null };
}

export function computeFractureWithoutBmd({
  ageBand,
  priorFractureAfter50,
  maternalHipFxOver50,
  weightLbs,
  smoker,
  chairStandArmAssist,
}: {
  ageBand: AgeBand;
  priorFractureAfter50: boolean;
  maternalHipFxOver50: boolean;
  weightLbs: string;
  smoker: boolean;
  chairStandArmAssist: boolean;
}) {
  const wt = num(weightLbs);
  const aPts = agePoints(ageBand);

  const complete =
    ageBand !== "" &&
    Number.isFinite(wt) &&
    Number.isFinite(aPts);

  if (!complete) {
    return {
      complete: false as const,
      totalPoints: null,
      risks: { nonvertebralPct: null, hipPct: null, vertebralPct: null },
      details: null,
    };
  }

  const lowWeight = wt < 125;

  const rfPts =
    (priorFractureAfter50 ? 1 : 0) +
    (maternalHipFxOver50 ? 1 : 0) +
    (lowWeight ? 1 : 0) +
    (smoker ? 1 : 0) +
    (chairStandArmAssist ? 2 : 0);

  const totalPoints = rfPts + aPts;

  const risks = riskFromTotal(totalPoints);

  return {
    complete: true as const,
    totalPoints,
    risks,
    details: {
      riskFactorPoints: rfPts,
      agePoints: aPts,
      breakdown: {
        priorFractureAfter50,
        maternalHipFxOver50,
        lowWeight,
        smoker,
        chairStandArmAssist,
      },
    },
  };
}
