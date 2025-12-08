"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeOstMale } from "./compute";

export default function OstMaleView() {
  const [weightKg, setWeightKg] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [precision, setPrecision] = useState("2");

  const result = useMemo(
    () =>
      computeOstMale({
        weightKg,
        ageYears,
        precision,
      }),
    [weightKg, ageYears, precision]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Osteoporosis Self Assessment Tool for Adult Males (OST)</div>
          <div className={styles.subtitle}>Quick screening using only weight (kg) and age.</div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="weight"
                  label="Weight"
                  value={weightKg}
                  onChange={setWeightKg}
                  placeholder="e.g. 74"
                  unit="kg"
                />
                <UnitNumberInput
                  id="age"
                  label="Age"
                  value={ageYears}
                  onChange={setAgeYears}
                  placeholder="e.g. 66"
                  unit="yr"
                />
              </div>

              <UnitNumberInput
                id="precision"
                label="Decimal precision"
                value={precision}
                onChange={setPrecision}
                placeholder="2"
                unit=""
              />
            </div>
          </SectionCard>

          {}
          <SectionCard title="Result">
            <div className={styles.stack}>
              {!result.complete && (
                <div className={styles.small} style={{ color: "#b45309" }}>
                  Important: Inputs must be complete to perform calculation.
                </div>
              )}

              {result.complete && (
                <>
                  <div
                    style={{
                      padding: 16,
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      background: "#fbfbff",
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 700,
                    }}
                  >
                    <span>OST score</span>
                    <span>{result.scoreText}</span>
                  </div>

                  <div
                    style={{
                      padding: 16,
                      border: "1px solid #e5e7eb",
                      borderRadius: 12,
                      background: "#fbfbff",
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 600,
                    }}
                  >
                    <span>Score band</span>
                    <span>{result.band}</span>
                  </div>
                </>
              )}

              <Collapsible title="Cutoffs">
                <div className={styles.small}>
                  −20 to −1: <strong>High Risk</strong><br />
                  −1 to 3: <strong>Moderate Risk</strong><br />
                  4 to 20: <strong>Low Risk</strong>
                </div>
              </Collapsible>

              <Collapsible title="Equation & Reference">
                <div className={styles.small}>
                  OST = 0.2 × (Weight − Age).<br />
                  Adler RA, Tran MT, Petkov VI. <em>Mayo Clin Proc.</em> 2003;78(6):723–7. PubMed: 12934782.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}