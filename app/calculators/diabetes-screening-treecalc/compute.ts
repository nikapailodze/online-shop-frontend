export type Inputs = {
  sedentary: "yes" | "no" | "";
  age: string;
  obese: "yes" | "no" | "";
};

export function computeScreeningTree(i: Inputs) {
  const ageNum = Number(i.age);
  const complete =
    i.sedentary && i.obese && !isNaN(ageNum);

  if (!complete) {
    return { complete: false, recommendation: null };
  }

  let recommendation = "Screening not indicated";

  if (ageNum >= 65) {
    recommendation = "Screening indicated (Age ≥65)";
  } else if (i.obese === "yes") {
    recommendation = "Screening indicated (Obesity)";
  } else if (ageNum >= 45 && i.sedentary === "yes") {
    recommendation = "Screening indicated (Age ≥45 and sedentary)";
  }

  return { complete: true, recommendation };
}
