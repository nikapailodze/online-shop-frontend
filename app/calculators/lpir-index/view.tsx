"use client";
import { useMemo, useState } from "react";
import styles from "@/app/calculators/page.module.scss";

import SectionCard from "@/app/calculators/components/SectionCard/SectionCard";
import UnitNumberInput from "@/app/calculators/components/UnitNumberInput/UnitNumberInput";
import Collapsible from "@/app/calculators/components/Collapsible/Collapsible";

import { computeLpir } from "./compute";

export default function LpirIndexView() {
  const [vldlSize, setVldlSize] = useState("");
  const [largeVldlP, setLargeVldlP] = useState("");
  const [ldlSize, setLdlSize] = useState("");
  const [smallLdlP, setSmallLdlP] = useState("");
  const [hdlSize, setHdlSize] = useState("");
  const [largeHdlP, setLargeHdlP] = useState("");

  const result = useMemo(
    () =>
      computeLpir({
        vldlSize,
        largeVldlP,
        ldlSize,
        smallLdlP,
        hdlSize,
        largeHdlP,
      }),
    [vldlSize, largeVldlP, ldlSize, smallLdlP, hdlSize, largeHdlP]
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            Lipoprotein Insulin Resistance Index (LPIR Index)
          </div>
          <div className={styles.subtitle}>
            Important: Inputs must be complete to perform calculation.
          </div>
        </div>

        <div className={styles.grid}>
          <SectionCard title="Input">
            <div className={styles.stack}>
              <div className={styles.inline2}>
                <UnitNumberInput
                  id="vldlSize"
                  label="VLDL Size"
                  value={vldlSize}
                  onChange={setVldlSize}
                  placeholder="e.g. 45.0"
                  unit="nm"
                />
                <UnitNumberInput
                  id="largeVldlP"
                  label="Large VLDL-P"
                  value={largeVldlP}
                  onChange={setLargeVldlP}
                  placeholder="e.g. 2.0"
                  unit="nmol/L"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="ldlSize"
                  label="LDL Size"
                  value={ldlSize}
                  onChange={setLdlSize}
                  placeholder="e.g. 21.0"
                  unit="nm"
                />
                <UnitNumberInput
                  id="smallLdlP"
                  label="Small LDL-P"
                  value={smallLdlP}
                  onChange={setSmallLdlP}
                  placeholder="e.g. 200"
                  unit="nmol/L"
                />
              </div>

              <div className={styles.inline2}>
                <UnitNumberInput
                  id="hdlSize"
                  label="HDL Size"
                  value={hdlSize}
                  onChange={setHdlSize}
                  placeholder="e.g. 9.0"
                  unit="nm"
                />
                <UnitNumberInput
                  id="largeHdlP"
                  label="Large HDL-P"
                  value={largeHdlP}
                  onChange={setLargeHdlP}
                  placeholder="e.g. 6.0"
                  unit="mcmol/L"
                />
              </div>
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
                    <span>LPIR Index</span>
                    <span>{result.lpir}</span>
                  </div>

                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 10,
                      background: "#fff",
                    }}
                  >
                    <div className={styles.small}>
                      <strong>Breakdown</strong>
                    </div>
                    <div className={styles.small}>
                      VLDL Size: {result.factors!.vldlSize} | Large VLDL-P:{" "}
                      {result.factors!.vldlP} | LDL Size:{" "}
                      {result.factors!.ldlSize}
                    </div>
                    <div className={styles.small}>
                      Small LDL-P: {result.factors!.smallLdlP} | HDL Size:{" "}
                      {result.factors!.hdlSize} | Large HDL-P:{" "}
                      {result.factors!.largeHdlP}
                    </div>
                  </div>
                </>
              )}

              <Collapsible title="Notes & Equations used">
                <div className={styles.small}>
                  <p>LPIR Index ranges from 0 to 100.</p>
                  <p>
                    LPIRIndex = VLDLSizeFactor + VLDLPFactor + LDLSizeFactor +
                    Small LDL-PFactor + HDLSizeFactor + Large HDL-PFactor
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
