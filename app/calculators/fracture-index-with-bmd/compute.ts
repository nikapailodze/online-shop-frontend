export type Inputs = {
  fxAfter50: boolean;
  maternalHipFxOver50: boolean;
  wtLt125: boolean;
  smoker: boolean;
  armAssistStand: boolean;
  ageBand: "lt65"|"65_69"|"70_74"|"75_79"|"80_85"|"ge85"|"";
  bmdBand: "ge_-1"|"m1_to_m2"|"m2_to_m2_5"|"lt_m2_5"|"";
};

export type Result = {
  complete: boolean;
  totalPoints: number | null;
  risks: {
    nonvertebral: string | null;
    hip: string | null;
    vertebral: string | null;
  };
};

function agePoints(a: Inputs["ageBand"]) {
  switch (a) {
    case "lt65":   return 0;
    case "65_69":  return 1;
    case "70_74":  return 2;
    case "75_79":  return 3;
    case "80_85":  return 4;
    case "ge85":   return 5;
    default:       return NaN;
  }
}

function bmdPoints(b: Inputs["bmdBand"]) {
  switch (b) {
    case "ge_-1":        return 0;
    case "m1_to_m2":     return 2;
    case "m2_to_m2_5":   return 3;
    case "lt_m2_5":      return 4;
    default:             return NaN;
  }
}

function riskBands(total: number) {
  if (total < 1) return { nonvertebral: null, hip: null, vertebral: null };
  if (total <= 2)  return { nonvertebral: "8.6%",  hip: "0.4%", vertebral: "1.2%" };
  if (total <= 4)  return { nonvertebral: "13.1%", hip: "0.9%", vertebral: "2.5%" };
  if (total === 5) return { nonvertebral: "16.5%", hip: "1.9%", vertebral: "5.3%" };
  if (total <= 7)  return { nonvertebral: "19.8%", hip: "3.9%", vertebral: "7.1%" };
  return               { nonvertebral: "27.5%", hip: "8.7%", vertebral: "11.2%" };
}

export function computeFractureWithBmd(i: Inputs): Result {
  const ap = agePoints(i.ageBand);
  const bp = bmdPoints(i.bmdBand);

  const basicsOk = Number.isFinite(ap) && Number.isFinite(bp);
  if (!basicsOk) {
    return { complete: false, totalPoints: null, risks: { nonvertebral: null, hip: null, vertebral: null } };
  }

  const total =
    (i.fxAfter50 ? 1 : 0) +
    (i.maternalHipFxOver50 ? 1 : 0) +
    (i.wtLt125 ? 1 : 0) +
    (i.smoker ? 1 : 0) +
    (i.armAssistStand ? 2 : 0) +
    ap + bp;

  const risks = riskBands(total);

  return {
    complete: true,
    totalPoints: total,
    risks,
  };
}
