export type Inputs = {
  obese: "yes" | "no" | "";
  ketosis: "yes" | "no" | "";
  initialTx: "insulin" | "oral" | "diet" | "none" | "";
};

export type Output = {
  complete: boolean;
  predicted: "Likely Type 1" | "Likely Type 2" | "Indeterminate";
  rationale: string;
  endpoint: string; // banner text
};

export function computeTypePredictor(i: Inputs): Output {
  const complete = !!(i.obese && i.ketosis && i.initialTx);
  const endpoint = "Physician review required for individual assessment";

  if (!complete) {
    return {
      complete: false,
      predicted: "Indeterminate",
      rationale: "Complete all inputs to generate a suggestion.",
      endpoint,
    };
  }

  // Very conservative, simple decision hints based on classic patterns:
  // - Ketosis present → suggest Type 1
  // - Obese + no ketosis + non-insulin initial tx → suggest Type 2
  // - Everything else → Indeterminate (needs clinical review)

  if (i.ketosis === "yes") {
    return {
      complete: true,
      predicted: "Likely Type 1",
      rationale:
        "Ketosis is present, which commonly accompanies absolute insulin deficiency.",
      endpoint,
    };
  }

  if (i.obese === "yes" && i.ketosis === "no" && i.initialTx !== "insulin") {
    return {
      complete: true,
      predicted: "Likely Type 2",
      rationale:
        "Obesity without ketosis and initial management not requiring insulin suggests insulin resistance predominance.",
      endpoint,
    };
  }

  // Edge cases (e.g., obese but started on insulin, or non-obese without ketosis but insulin started)
  return {
    complete: true,
    predicted: "Indeterminate",
    rationale:
      "The combination of features does not clearly distinguish type; clinical review and labs (e.g., C-peptide, autoantibodies) are warranted.",
    endpoint,
  };
}
