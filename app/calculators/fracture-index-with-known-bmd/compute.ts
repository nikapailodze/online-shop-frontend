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

function bmdPoints(tScore: number) {
  if (tScore >= -1) return 0;
  if (tScore < -1 && tScore > -2) return 2;
  if (tScore <= -2 && tScore > -2.5) return 3;
  return 4;
}

function riskFromTotal(total: number) {
  if (total >= 1 && total <= 2) {
    return {
      group: "1–2",
      nonvertebralPct: 8.6,
      hipPct: 0.4,
      vertebralPct: 1.2,
    };
  }
  if (total >= 3 && total <= 4) {
    return {
      group: "3–4",
      nonvertebralPct: 13.1,
      hipPct: 0.9,
      vertebralPct: 2.5,
    };
  }
  if (total === 5) {
    return {
      group: "5",
      nonvertebralPct: 16.5,
      hipPct: 1.9,
      vertebralPct: 5.3,
    };
  }
  if (total >= 6 && total <= 7) {
    return {
      group: "6–7",
      nonvertebralPct: 19.8,
      hipPct: 3.9,
      vertebralPct: 7.1,
    };
  }
  if (total >= 8 && total <= 15) {
    return {
      group: "8–15",
      nonvertebralPct: 27.5,
      hipPct: 8.7,
      vertebralPct: 11.2,
    };
  }
  return {
    group: null,
    nonvertebralPct: null,
    hipPct: null,
    vertebralPct: null,
  };
}

export function computeFractureWithBmd({
  ageBand,
  priorFractureAfter50,
  maternalHipFxOver50,
  weightLbs,
  smoker,
  chairStandArmAssist,
  tScore,
}: {
  ageBand: AgeBand;
  priorFractureAfter50: boolean;
  maternalHipFxOver50: boolean;
  weightLbs: string;
  smoker: boolean;
  chairStandArmAssist: boolean;
  tScore: string;
}) {
  const wt = num(weightLbs);
  const t = num(tScore);
  const aPts = agePoints(ageBand);

  const complete =
    ageBand !== "" &&
    [wt, t, aPts].every((v) => Number.isFinite(v));

  if (!complete) {
    return {
      complete: false as const,
      totalPoints: null as number | null,
      risks: {
        group: null as string | null,
        nonvertebralPct: null as number | null,
        hipPct: null as number | null,
        vertebralPct: null as number | null,
      },
      details: null as
        | {
            riskFactorPoints: number;
            agePoints: number;
            bmdPoints: number;
            breakdown: {
              priorFractureAfter50: boolean;
              maternalHipFxOver50: boolean;
              lowWeight: boolean;
              smoker: boolean;
              chairStandArmAssist: boolean;
            };
          }
        | null,
    };
  }

  const lowWeight = wt < 125;

  const rfPts =
    (priorFractureAfter50 ? 1 : 0) +
    (maternalHipFxOver50 ? 1 : 0) +
    (lowWeight ? 1 : 0) +
    (smoker ? 1 : 0) +
    (chairStandArmAssist ? 2 : 0);

  const bPts = bmdPoints(t);
  const totalPoints = rfPts + aPts + bPts;

  const risks = riskFromTotal(totalPoints);

  return {
    complete: true as const,
    totalPoints,
    risks,
    details: {
      riskFactorPoints: rfPts,
      agePoints: aPts,
      bmdPoints: bPts,
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
