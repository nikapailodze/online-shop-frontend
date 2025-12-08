"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import RadioGroup from "@/app/calculators/components/RadioGroup/RadioGroup";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import CheckboxRow from "@/app/calculators/components/CheckboxRow/CheckboxRow";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeFractureWithoutBmd, type AgeBand } from "./compute";

export default function FractureIndexWithoutBmdView() {
  const [ageBand, setAgeBand] = useState<AgeBand>("");

  const [priorFractureAfter50, setPriorFractureAfter50] = useState(false);
  const [maternalHipFxOver50, setMaternalHipFxOver50] = useState(false);
  const [weightLbs, setWeightLbs] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [chairStandArmAssist, setChairStandArmAssist] = useState(false);

  const result = useMemo(
    () =>
      computeFractureWithoutBmd({
        ageBand,
        priorFractureAfter50,
        maternalHipFxOver50,
        weightLbs,
        smoker,
        chairStandArmAssist,
      }),
    [ageBand, priorFractureAfter50, maternalHipFxOver50, weightLbs, smoker, chairStandArmAssist]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Fracture Index WITHOUT Known Bone Mineral Density (BMD)
          </div>
          <div className={styles.subtitle}>
            Add points from risk factors + age band. Map the total to 5-year fracture risks.
          </div>
        </div>

        <div className={styles.grid}>
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
            </div>
          </SectionCard>

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

                  <div style={{ padding: 12, border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff" }}>
                    <div className={styles.small}><strong>5-Year Fracture Risks</strong></div>
                    {result.risks.nonvertebralPct ? (
                      <div className={styles.small}>
                        Nonvertebral {result.risks.nonvertebralPct}% • Hip {result.risks.hipPct}% • Vertebral {result.risks.vertebralPct}%
                      </div>
                    ) : (
                      <div className={styles.small}>
                        Total falls outside validated groups (1–9). Consider clinical context.
                      </div>
                    )}
                  </div>
                </>
              )}

              <Collapsible title="Notes">
                <div className={styles.small}>
                  Fracture Index WITHOUT BMD estimates risk based on age and clinical risk factors, without requiring a bone density test.
                </div>
              </Collapsible>

              <Collapsible title="References">
                <div className={styles.small}>
                  Black DM, Steinbuch M, Palermo L, et&nbsp;al. An assessment tool for predicting fracture risk in postmenopausal women. <em>Osteoporos Int.</em> 2001;12(7):519-28.
                  CrossRef: Fracture Index WITH BMD.
                </div>
              </Collapsible>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  );
}
