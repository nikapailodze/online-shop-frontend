export type Inputs = {
  fxAfter50: boolean;
  maternalHipFxOver50: boolean;
  weightLt125lb: boolean;
  smoker: boolean;
  armAssistToStand: boolean;
  ageBand: "" | "lt65" | "65-69" | "70-74" | "75-79" | "80-85" | "ge85";
};

function agePoints(band: Inputs["ageBand"]) {
  switch (band) {
    case "lt65": return 0;
    case "65-69": return 1;
    case "70-74": return 2;
    case "75-79": return 3;
    case "80-85": return 4;
    case "ge85": return 5;
    default: return NaN;
  }
}

function fixedRiskByPoints(total: number) {
  if (total === 1) return { nonvertebral: 10.5, hip: 0.6, vertebral: 1.4 };
  if (total === 2) return { nonvertebral: 12.5, hip: 1.4, vertebral: 2.9 };
  if (total === 3) return { nonvertebral: 16.4, hip: 2.1, vertebral: 5.1 };
  if (total === 4) return { nonvertebral: 18.7, hip: 3.2, vertebral: 7.0 };
  if (total >= 5) return { nonvertebral: 26.1, hip: 8.2, vertebral: 9.9 };
  return null;
}

export function computeFractureIndexWithoutBmd(i: Inputs) {
  const base =
    (i.fxAfter50 ? 1 : 0) +
    (i.maternalHipFxOver50 ? 1 : 0) +
    (i.weightLt125lb ? 1 : 0) +
    (i.smoker ? 1 : 0) +
    (i.armAssistToStand ? 2 : 0);

  const aPts = agePoints(i.ageBand);
  const complete = Number.isFinite(aPts);

  if (!complete) {
    return {
      complete: false as const,
      totalPoints: null as number | null,
      risks: null as { nonvertebral: number; hip: number; vertebral: number } | null,
    };
  }

  const totalPoints = base + (aPts as number);
  const risks = fixedRiskByPoints(totalPoints);

  if (!risks) {
    return { complete: false as const, totalPoints, risks: null };
  }

  return { complete: true as const, totalPoints, risks };
}
