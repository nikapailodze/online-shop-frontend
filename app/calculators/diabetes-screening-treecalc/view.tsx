"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeScreeningTree, type Inputs } from "./compute";

export default function DiabetesScreeningTreeView() {
  const [sedentary, setSedentary] = useState<Inputs["sedentary"]>("");
  const [age, setAge] = useState("");
  const [obese, setObese] = useState<Inputs["obese"]>("");

  const result = useMemo(
    () => computeScreeningTree({ sedentary, age, obese }),
    [sedentary, age, obese]
  );

  const age45 = Number(age) >= 45;
  const age65 = Number(age) >= 65;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Diabetes Screening TreeCalc</div>
          <div className={styles.subtitle}>
            Identify individuals at increased risk for undiagnosed diabetes.
          </div>
        </div>

        <div className={styles.grid}>
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>
                    Sedentary with little or no exercise
                  </div>
                  <RadioGroup
                    name="sedentary"
                    value={sedentary}
                    onChange={(v) => setSedentary(v as Inputs["sedentary"])}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                    columns={2}
                  />
                </div>

                <UnitNumberInput
                  id="age"
                  label="Age"
                  value={age}
                  onChange={setAge}
                  placeholder="E.g. 50"
                  unit="yr"
                />
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Obesity (&gt;120% IBW)
                </div>
                <RadioGroup
                  name="obese"
                  value={obese}
                  onChange={(v) => setObese(v as Inputs["obese"])}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  columns={2}
                />
              </div>
            </div>
          </SectionCard>

          {}
          <SectionCard title="Results">
            <div className={styles.stack}>
              {!result.complete && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Important: Inputs must be complete to perform calculation.
                </div>
              )}

              {result.complete && result.recommendation && (
                <div
                  style={{
                    padding: "16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    background: "#fbfbff",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Recommendation</span>
                  <span>{result.recommendation}</span>
                </div>
              )}

              <div className={styles.inline2}>
                <div
                  style={{
                    padding: "12px 16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    background: "#fff",
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>
                    Decision Points
                  </div>
                  <div className={styles.small}>
                    Age 65 or older: <strong>{age65 ? "Yes" : "No"}</strong>
                  </div>
                  <div className={styles.small}>
                    Obesity (&gt;120% IBW):{" "}
                    <strong>{obese === "yes" ? "Yes" : "No"}</strong>
                  </div>
                  <div className={styles.small}>
                    Age 45 or older: <strong>{age45 ? "Yes" : "No"}</strong>
                  </div>
                </div>

                <div />
              </div>

              <Collapsible title="References">
                <div className={styles.small}>
                  Herman WH, Smith PJ, Thompson TJ, et al. A new and simple
                  questionnaire to identify people at increased risk for
                  undiagnosed diabetes. <em>Diabetes Care.</em> 1995 Mar;18(3):
                  382–387. PubMed ID: 7555482.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
