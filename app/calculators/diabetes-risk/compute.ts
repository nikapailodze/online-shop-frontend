export function computeDiabetesRisk({
  age,
  sex,
  weight,
  height,
  physicallyActive,
  hypertension,
  familyHistory,
}: {
  age: string;
  sex: string;
  weight: string;
  height: string;
  physicallyActive: boolean;
  hypertension: boolean;
  familyHistory: boolean;
}) {
  function bmiPointsFrom(b: number) {
    if (b < 25) return 0;
    if (b < 30) return 1;
    if (b < 35) return 2;
    if (b < 40) return 3;
    return 4;
  }

  const w = parseFloat(weight || "0");
  const h = parseFloat(height || "0");
  const bmi = w > 0 && h > 0 ? w / Math.pow(h / 100, 2) : null;
  const bmiPts = bmi == null ? 0 : bmiPointsFrom(bmi);

  const riskScore =
    (parseInt(age) || 0) +
    (parseInt(sex) || 0) +
    (physicallyActive ? -1 : 0) +
    (hypertension ? 1 : 0) +
    (familyHistory ? 1 : 0) +
    bmiPts;

  return { bmi, bmiPts, riskScore };
}
