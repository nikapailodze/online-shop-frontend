"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeOrai, type YesNo, type WeightUnit } from "./compute";

export default function OraiView() {
  const [ageYears, setAgeYears] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [onEstrogen, setOnEstrogen] = useState<YesNo>("");

  const result = useMemo(
    () =>
      computeOrai({
        ageYears,
        weight,
        weightUnit,
        onEstrogen,
      }),
    [ageYears, weight, weightUnit, onEstrogen]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Osteoporosis Risk Assessment Instrument (ORAI)
          </div>
          <div className={styles.subtitle}>
            Uses age, weight, and estrogen status to estimate osteoporosis risk.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Inputs">
            <div className={styles.stack}>
              <UnitNumberInput
                id="age"
                label="Age"
                value={ageYears}
                onChange={setAgeYears}
                placeholder="e.g. 67"
                unit="yr"
              />

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="weight"
                  label="Weight"
                  value={weight}
                  onChange={setWeight}
                  placeholder="e.g. 132"
                  unit={weightUnit}
                />
                <RadioGroup
                  name="weightUnit"
                  value={weightUnit}
                  onChange={(v) => setWeightUnit(v as WeightUnit)}
                  options={[
                    { value: "kg", label: "kg" },
                    { value: "lb", label: "lb" },
                  ]}
                  columns={2}
                />
              </div>

              <RadioGroup
                name="estrogen"
                value={onEstrogen}
                onChange={(v) => setOnEstrogen(v as YesNo)}
                options={[
                  { value: "yes", label: "On Estrogen: Yes (0 points)" },
                  { value: "no", label: "On Estrogen: No (2 points)" },
                ]}
                columns={2}
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
                    <span>ORAI Score</span>
                    <span>{result.score}</span>
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

              <Collapsible title="Scoring">
                <div className={styles.small}>
                  Age ≥75 → 15 pts, ≥65 → 9 pts, ≥55 → 5 pts, else 0.<br />
                  Weight &lt;60 kg → 9 pts, &lt;70 kg → 3 pts, else 0.<br />
                  On estrogen → 0 pts; Not on estrogen → 2 pts.
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  Cadarette SM, Jaglal SB, Kreiger N, et al. CMAJ. 2000;162(9):1289–94.
                  Reginster J. ACP J Club. 2001;134:37.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
