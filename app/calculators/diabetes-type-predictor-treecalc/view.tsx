"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import Collapsible from "../components/Collapsible/Collapsible";

import { computeTypePredictor, type Inputs } from "./compute";

export default function DiabetesTypePredictorTreeView() {
  const [obese, setObese] = useState<Inputs["obese"]>("");
  const [ketosis, setKetosis] = useState<Inputs["ketosis"]>("");
  const [initialTx, setInitialTx] = useState<Inputs["initialTx"]>("");

  const result = useMemo(
    () => computeTypePredictor({ obese, ketosis, initialTx }),
    [obese, ketosis, initialTx]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Diabetes Type Predictor TreeCalc</div>
          <div className={styles.subtitle}>
            A tool that uses a decision tree style logic to suggest the likely
            diabetes type.
          </div>
        </div>

        <div className={styles.grid}>
          {/* INPUTS */}
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>
                    Is patient obese?
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

                <div>
                  <div style={{ fontWeight: 600, marginBottom: 8 }}>
                    Ketosis present
                  </div>
                  <RadioGroup
                    name="ketosis"
                    value={ketosis}
                    onChange={(v) => setKetosis(v as Inputs["ketosis"])}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                    columns={2}
                  />
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  Initial treatment
                </div>
                <RadioGroup
                  name="initialTx"
                  value={initialTx}
                  onChange={(v) => setInitialTx(v as Inputs["initialTx"])}
                  options={[
                    { value: "insulin", label: "Insulin" },
                    { value: "oral", label: "Oral agents" },
                    { value: "diet", label: "Diet/Lifestyle" },
                    { value: "none", label: "Not started yet" },
                  ]}
                  columns={1}
                />
              </div>
            </div>
          </SectionCard>

          {/* RESULTS */}
          <SectionCard title="Results">
            <div className={styles.stack}>
              {!result.complete && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Important: Inputs must be complete to perform calculation.
                </div>
              )}

              {/* Endpoint banner */}
              <div
                style={{
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  background: "#fff",
                  fontWeight: 600,
                }}
              >
                End Point: {result.endpoint}
              </div>

              {/* Predicted type + rationale */}
              {result.complete && (
                <>
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
                    <span>Prediction</span>
                    <span>{result.predicted}</span>
                  </div>

                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  >
                    <div className={styles.small}>{result.rationale}</div>
                  </div>
                </>
              )}

              {/* Decision Points summary */}
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
                    Is patient obese?:{" "}
                    <strong>
                      {obese === "yes" ? "Yes" : obese === "no" ? "No" : "—"}
                    </strong>
                  </div>
                  <div className={styles.small}>
                    Ketosis present:{" "}
                    <strong>
                      {ketosis === "yes"
                        ? "Yes"
                        : ketosis === "no"
                        ? "No"
                        : "—"}
                    </strong>
                  </div>
                  <div className={styles.small}>
                    Initial treatment:{" "}
                    <strong>
                      {initialTx
                        ? initialTx === "insulin"
                          ? "Insulin"
                          : initialTx === "oral"
                          ? "Oral agents"
                          : initialTx === "diet"
                          ? "Diet/Lifestyle"
                          : "Not started yet"
                        : "—"}
                    </strong>
                  </div>
                </div>

                <div />
              </div>

              <Collapsible title="References">
                <div className={styles.small}>
                  Service FJ, Rizza RA, Zimmerman BR, et al. The classification
                  of diabetes by clinical and C-peptide criteria. A prospective
                  population-based study.
                  <em> Diabetes Care.</em> 1997;20(2):198-201. PubMed ID:
                  9118774.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
