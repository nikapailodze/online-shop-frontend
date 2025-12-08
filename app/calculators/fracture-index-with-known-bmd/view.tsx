"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "@/app/calculators/components/CheckboxRow/CheckboxRow";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeFractureWithBmd, type AgeBand } from "./compute";

export default function FractureIndexWithBmdView() {
  const [ageBand, setAgeBand] = useState<AgeBand>("");

  const [priorFractureAfter50, setPriorFractureAfter50] = useState(false);
  const [maternalHipFxOver50, setMaternalHipFxOver50] = useState(false);
  const [weightLbs, setWeightLbs] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [chairStandArmAssist, setChairStandArmAssist] = useState(false);

  const [tScore, setTScore] = useState("");

  const result = useMemo(
    () =>
      computeFractureWithBmd({
        ageBand,
        priorFractureAfter50,
        maternalHipFxOver50,
        weightLbs,
        smoker,
        chairStandArmAssist,
        tScore,
      }),
    [
      ageBand,
      priorFractureAfter50,
      maternalHipFxOver50,
      weightLbs,
      smoker,
      chairStandArmAssist,
      tScore,
    ]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Osteoporosis Fracture Index (WITH BMD)</div>
          <div className={styles.subtitle}>
            Add points from risk factors + age band + BMD T-score. Map the total to 5-year fracture risks.
          </div>
        </div>

        <div className={styles.grid}>
          {}
          <SectionCard title="Age">
            <RadioGroup
              name="ageBand"
              value={ageBand}
              onChange={(v) => setAgeBand(v as AgeBand)}
              options={[
                { value: "<65", label: "Less than 65 (0 points)" },
                { value: "65-69", label: "65–69 (1 point)" },
                { value: "70-74", label: "70–74 (2 points)" },
                { value: "75-79", label: "75–79 (3 points)" },
                { value: "80-85", label: "80–85 (4 points)" },
                { value: "85+", label: "85+ (5 points)" },
              ]}
              columns={3}
            />
          </SectionCard>

          <SectionCard title="BMD T-score">
            <div className={styles.stack}>
              <UnitNumberInput
                id="tScore"
                label="T-score"
                value={tScore}
                onChange={setTScore}
                placeholder="e.g. -2.3"
                unit=""
              />
              <div className={styles.small}>
                Points: ≥−1 (0), −1 to −2 (2), −2 to −2.5 (3), &lt;−2.5 (4).
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Risk Factors">
            <div className={styles.stack}>
              <CheckboxRow
                id="fx50"
                label="Fracture after age 50"
                checked={priorFractureAfter50}
                onChange={setPriorFractureAfter50}
              />
              <CheckboxRow
                id="matHip"
                label="Maternal hip fracture over age 50"
                checked={maternalHipFxOver50}
                onChange={setMaternalHipFxOver50}
              />
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="weight"
                  label="Body weight"
                  value={weightLbs}
                  onChange={setWeightLbs}
                  placeholder="e.g. 118"
                  unit="lbs"
                />
                <CheckboxRow
                  id="smoker"
                  label="Smoker"
                  checked={smoker}
                  onChange={setSmoker}
                />
              </div>
              <CheckboxRow
                id="chairAssist"
                label="Needs arm assistance to stand from a chair"
                checked={chairStandArmAssist}
                onChange={setChairStandArmAssist}
              />
              <div className={styles.small}>
                Scoring: fracture ≥50 (1), maternal hip fx ≥50 (1), weight &lt;125 lb (1), smoker (1), chair arm assist (2).
              </div>
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
                  <div style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fbfbff", display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span>Total Criteria Point Count</span>
                    <span>{result.totalPoints}</span>
                  </div>

                  <div
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  >
                    <div className={styles.small}><strong>5-Year Fracture Risks</strong></div>
                    {result.risks.group ? (
                      <div className={styles.small}>
                        Group {result.risks.group}: Nonvertebral {result.risks.nonvertebralPct}% • Hip {result.risks.hipPct}% • Vertebral {result.risks.vertebralPct}%
                      </div>
                    ) : (
                      <div className={styles.small}>
                        Total of 0 points falls outside validated groupings (1–15). Consider clinical context.
                      </div>
                    )}
                  </div>

                  {}
                  <div
                    style={{
                      padding: 12,
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  >
                    <div className={styles.small}><strong>Point Breakdown</strong></div>
                    <div className={styles.small}>
                      Risk factors: {result.details!.riskFactorPoints} • Age band: {result.details!.agePoints} • BMD: {result.details!.bmdPoints}
                    </div>
                  </div>
                </>
              )}

              <Collapsible title="Notes">
                <div className={styles.small}>
                  Fracture Index (WITH BMD) incorporates clinical risk factors, age, and BMD T-score to estimate 5-year risk of nonvertebral, hip, and vertebral fractures.
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  Black DM, Steinbuch M, Palermo L, et&nbsp;al. An assessment tool for predicting fracture risk in postmenopausal women. <em>Osteoporos Int.</em> 2001;12(7):519-28.
                  CrossRef: Fracture Index WITHOUT BMD.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
