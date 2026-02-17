type Sex = "female" | "male";
type ActivityLevel = "sedentary" | "low_active" | "active" | "very_active";

function num(value: string) {
  const parsed = Number((value ?? "").toString().replace(",", ".").trim());
  return Number.isFinite(parsed) ? parsed : NaN;
}

function bmiClass(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

const paBySex: Record<Sex, Record<ActivityLevel, number>> = {
  female: {
    sedentary: 1.0,
    low_active: 1.12,
    active: 1.27,
    very_active: 1.45,
  },
  male: {
    sedentary: 1.0,
    low_active: 1.11,
    active: 1.25,
    very_active: 1.48,
  },
};

export function computeDriUsda(input: {
  ageYears: string;
  sex: Sex;
  weightKg: string;
  heightCm: string;
  activityLevel: ActivityLevel;
}) {
  const age = num(input.ageYears);
  const weight = num(input.weightKg);
  const heightCm = num(input.heightCm);

  const complete =
    Number.isFinite(age) &&
    Number.isFinite(weight) &&
    Number.isFinite(heightCm) &&
    age > 0 &&
    weight > 0 &&
    heightCm > 0;

  if (!complete) {
    return {
      complete: false as const,
      supportedAge: false,
      bmi: null as number | null,
      bmiBand: null as string | null,
      eerKcal: null as number | null,
      carbRangeG: null as { min: number; max: number } | null,
      proteinRangeG: null as { min: number; max: number } | null,
      fatRangeG: null as { min: number; max: number } | null,
      waterLiters: null as number | null,
    };
  }

  const supportedAge = age >= 19;
  const hM = heightCm / 100;
  const bmi = weight / (hM * hM);
  const pa = paBySex[input.sex][input.activityLevel];

  const eer =
    input.sex === "male"
      ? 662 - 9.53 * age + pa * (15.91 * weight + 539.6 * hM)
      : 354 - 6.91 * age + pa * (9.36 * weight + 726 * hM);

  const carbRangeG = { min: (0.45 * eer) / 4, max: (0.65 * eer) / 4 };
  const proteinRangeG = { min: (0.1 * eer) / 4, max: (0.35 * eer) / 4 };
  const fatRangeG = { min: (0.2 * eer) / 9, max: (0.35 * eer) / 9 };
  const waterLiters = input.sex === "male" ? 3.7 : 2.7;

  return {
    complete: true as const,
    supportedAge,
    bmi,
    bmiBand: bmiClass(bmi),
    eerKcal: eer,
    carbRangeG,
    proteinRangeG,
    fatRangeG,
    waterLiters,
  };
}

