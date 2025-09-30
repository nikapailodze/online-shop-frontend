"use client";
import { useMemo, useState } from "react";
import styles from "../page.module.scss";

import SectionCard from "../components/SectionCard/SectionCard";
import RadioGroup from "../components/RadioGroup/RadioGroup";
import UnitNumberInput from "../components/UnitNumberInput/UnitNumberInput";
import Collapsible from "../components/Collapsible/Collapsible";

import {
  computeOsteoporosisScore,
  type YesNo,
  type RaceVal,
  type FractureHistory,
} from "./compute";

export default function OsteoporosisScoreView() {
  const [race, setRace] = useState<RaceVal>("");
  const [raPresent, setRaPresent] = useState<YesNo>("");
  const [fxHistory, setFxHistory] = useState<FractureHistory>("");

  const [ageYears, setAgeYears] = useState("");
  const [estrogenPriorUse, setEstrogenPriorUse] = useState<YesNo>(""); // yes = prior use (0), no = no prior (1)
  const [weightLb, setWeightLb] = useState("");

  const [precision, setPrecision] = useState("0");

  const result = useMemo(
    () =>
      computeOsteoporosisScore({
        race,
        raPresent,
        fxHistory,
        ageYears,
        estrogenPriorUse,
        weightLb,
        precision,
      }),
    [
      race,
      raPresent,
      fxHistory,
      ageYears,
      estrogenPriorUse,
      weightLb,
      precision,
    ]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Osteoporosis Risk SCORE (Simple Calculated Osteoporosis Risk
            Estimation)
          </div>
          <div className={styles.subtitle}>
            SCORE = Race + RA + Fracture history + Estrogen + (3×Age/10) −
            (Weight/10).
          </div>
        </div>

        <div className={styles.grid}>
          {/* INPUTS */}
          <SectionCard title="Inputs">
            <div className={styles.stack}>
              <RadioGroup
                name="race"
                value={race}
                onChange={(v) => setRace(v as RaceVal)}
                options={[
                  {
                    value: "american_indian_alaska_native",
                    label: "American Indian or Alaska Native (5)",
                  },
                  { value: "asian", label: "Asian (5)" },
                  { value: "black", label: "Black or African American (0)" },
                  {
                    value: "native_hawaiian_pacific",
                    label: "Native Hawaiian or Other Pacific Islander (5)",
                  },
                  { value: "white", label: "White (5)" },
                ]}
                columns={1}
              />
              <RadioGroup
                name="ra"
                value={raPresent}
                onChange={(v) => setRaPresent(v as YesNo)}
                options={[
                  { value: "yes", label: "Rheumatoid Arthritis: Present (4)" },
                  { value: "no", label: "Rheumatoid Arthritis: Absent (0)" },
                ]}
                columns={2}
              />
              <RadioGroup
                name="fx"
                value={fxHistory}
                onChange={(v) => setFxHistory(v as FractureHistory)}
                options={[
                  { value: "none", label: "No nontraumatic fractures (0)" },
                  { value: "one", label: "1 nontraumatic (4)" },
                  { value: "two", label: "2 nontraumatic (8)" },
                  { value: "three_plus", label: "3+ nontraumatic (12)" },
                ]}
                columns={1}
              />

                <UnitNumberInput
                  id="age"
                  label="Age"
                  value={ageYears}
                  onChange={setAgeYears}
                  placeholder="e.g. 68"
                  unit="yr"
                />
                <RadioGroup
                  name="estrogen"
                  value={estrogenPriorUse}
                  onChange={(v) => setEstrogenPriorUse(v as YesNo)}
                  options={[
                    { value: "yes", label: "Estrogen: Prior use (0)" },
                    { value: "no", label: "Estrogen: NO prior use (1)" },
                  ]}
                  columns={2}
                />

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="weight"
                  label="Weight"
                  value={weightLb}
                  onChange={setWeightLb}
                  placeholder="e.g. 132"
                  unit="lb"
                />
                <UnitNumberInput
                  id="precision"
                  label="Decimal precision"
                  value={precision}
                  onChange={setPrecision}
                  placeholder="0"
                  unit=""
                />
              </div>
            </div>
          </SectionCard>

          {/* RESULT */}
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
                    <span>SCORE</span>
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
                    <span>Interpretation</span>
                    <span>{result.interpretation}</span>
                  </div>
                </>
              )}

              <Collapsible title="Interpretation bands">
                <div className={styles.small}>
                  16–50: <strong>High Risk</strong> • 7–15:{" "}
                  <strong>Moderate Risk</strong> • 0–6:{" "}
                  <strong>Low Risk</strong>
                </div>
              </Collapsible>

              <Collapsible title="Notes & References">
                <div className={styles.small}>
                  Nontraumatic fractures are of the spine, hip, or wrist only.
                  Lydick E, et&nbsp;al. <em>Am J Manag Care</em>.
                  1998;4(1):37–48. Geusens P, et&nbsp;al.{" "}
                  <em>Mayo Clin Proc</em>. 2002;77(7):629–37.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
