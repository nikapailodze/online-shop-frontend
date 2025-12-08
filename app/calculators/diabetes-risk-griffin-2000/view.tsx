"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeGriffin, type Inputs } from "./compute";

export default function DiabetesRiskGriffinView() {
  const [sex, setSex] = useState<Inputs["sex"]>("");
  const [rxHtn, setRxHtn] = useState<Inputs["rxHtn"]>("");
  const [rxSteroids, setRxSteroids] = useState<Inputs["rxSteroids"]>("");
  const [age, setAge] = useState("");
  const [bmiBand, setBmiBand] = useState<Inputs["bmiBand"]>("");
  const [fmh, setFmh] = useState<Inputs["fmh"]>("");
  const [smoker, setSmoker] = useState<Inputs["smoker"]>("");
  const [precision, setPrecision] = useState<0 | 1 | 2 | 3 | 4>(2);

  const result = useMemo(
    () => computeGriffin({ sex, rxHtn, rxSteroids, age, bmiBand, fmh, smoker }),
    [sex, rxHtn, rxSteroids, age, bmiBand, fmh, smoker]
  );

  const termsStr =
    result.complete && result.terms != null
      ? result.terms.toFixed(precision)
      : "—";
  const riskStr =
    result.complete && result.riskPct != null
      ? result.riskPct.toFixed(precision) + "%"
      : "—";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Diabetes Risk Score (Type 2)</div>
          <div className={styles.subtitle}>
            A tool that calculates the likelihood of developing type 2 diabetes
            based on various risk factors.
          </div>
        </div>

        <div className={styles.grid}>
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Sex</div>
                  <RadioGroup
                    name="sex"
                    value={sex}
                    onChange={(v) => setSex(v as Inputs["sex"])}
                    options={[
                      { value: "female", label: "Female (−0.879)" },
                      { value: "male", label: "Male (0)" },
                    ]}
                    columns={2}
                  />
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>Rx HTN</div>
                  <RadioGroup
                    name="rxHtn"
                    value={rxHtn}
                    onChange={(v) => setRxHtn(v as Inputs["rxHtn"])}
                    options={[
                      { value: "yes", label: "On HTN meds (1.222)" },
                      { value: "no", label: "No HTN meds (0)" },
                    ]}
                    columns={1}
                  />
                </div>
              </div>

              <div className={styles.inline2}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>
                    Rx Steroids
                  </div>
                  <RadioGroup
                    name="rxSteroids"
                    value={rxSteroids}
                    onChange={(v) => setRxSteroids(v as Inputs["rxSteroids"])}
                    options={[
                      { value: "yes", label: "On steroids (2.191)" },
                      { value: "no", label: "Not on steroids (0)" },
                    ]}
                    columns={1}
                  />
                </div>

                <UnitNumberInput
                  id="age"
                  label="Age"
                  value={age}
                  onChange={setAge}
                  placeholder="E.g. 45"
                  unit="yr"
                />
              </div>

              <div className={styles.inline2}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>BMI</div>
                  <RadioGroup
                    name="bmiBand"
                    value={bmiBand}
                    onChange={(v) => setBmiBand(v as Inputs["bmiBand"])}
                    options={[
                      { value: "lt25", label: "< 25 (0)" },
                      { value: "25to27_49", label: "25 – 27.49 (0.699)" },
                      { value: "27_5to29_99", label: "27.5 – 29.99 (1.97)" },
                      { value: "ge30", label: "≥ 30 (2.518)" },
                    ]}
                    columns={1}
                  />
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>FMH</div>
                  <RadioGroup
                    name="fmh"
                    value={fmh}
                    onChange={(v) => setFmh(v as Inputs["fmh"])}
                    options={[
                      {
                        value: "none",
                        label: "No 1st-degree family with DM (0)",
                      },
                      {
                        value: "parent_or_sibling",
                        label: "Parent OR sibling (0.728)",
                      },
                      {
                        value: "parent_and_sibling",
                        label: "Parent AND sibling (0.753)",
                      },
                    ]}
                    columns={1}
                  />
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Smoker</div>
                <RadioGroup
                  name="smoker"
                  value={smoker}
                  onChange={(v) => setSmoker(v as Inputs["smoker"])}
                  options={[
                    { value: "non", label: "Non-smoker (0)" },
                    { value: "former", label: "Used to smoke (−0.218)" },
                    { value: "current", label: "Smoker (0.855)" },
                  ]}
                  columns={1}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Results">
            <div className={styles.stack}>
              {!result.complete && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Important: Inputs must be complete to perform calculation.
                </div>
              )}

              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  background: "#fbfbff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontWeight: 600,
                }}
              >
                <span>Terms</span>
                <span>{termsStr}</span>
              </div>

              <div
                style={{
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  background: "#fbfbff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontWeight: 600,
                }}
              >
                <span>Risk</span>
                <span>{riskStr}</span>
              </div>

              <div className={styles.inline2}>
                <div className={styles.small}>Decimal Precision</div>
                <select
                  value={precision}
                  onChange={(e) => setPrecision(Number(e.target.value) as 0 | 1 | 2 | 3 | 4)}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>

              <Collapsible title="Equations used">
                <div className={styles.small}>
                  <p>
                    <strong>Terms</strong> = 6.322 − Sex − RxHTN − RxSteroids −
                    (0.063 × Age) − BMI − FMH − Smoker
                  </p>
                  <p>
                    <strong>Risk</strong> = 100 / (1 + e^(Terms))
                  </p>
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
