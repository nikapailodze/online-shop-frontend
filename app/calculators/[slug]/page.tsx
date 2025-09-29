import DiabetesRiskView from "../diabetes-risk/view";
import DiabetesRiskGriffinView from "../diabetes-risk-griffin-2000/view";
import DiabetesScreeningTreeView from "../diabetes-screening-treecalc/view";
import DiabetesTypePredictorTreeView from "../diabetes-type-predictor-treecalc/view";
import A1cToAverageGlucoseView from "../a1c-to-average-glucose/view";
import HomaIrView from "../homa-ir/view";
import LpirIndexView from "../lpir-index/view";
import QuickiView from "../quicki/view";
import Risk7p5yView from "../risk-7p5y/view";
import SodiumCorrectionEmmettView from "../sodium-correction-emmett/view";
import SodiumCorrectionHillierView from "../sodium-correction-hillier/view";
import SodiumCorrectionKatzView from "../sodium-correction-katz/view";
import { a1cAvgGluMeta, diabetesRiskMeta, drsGriffinMeta, homaIrMeta, lpirMeta, quickiMeta, risk7p5Meta, screeningTreeMeta, sodiumEmmettMeta, sodiumHillierMeta, sodiumKatzMeta, typePredictorMeta } from "../meta";

type RegistryEntry = {
  view: React.FC;
  meta: { slug: string; title: string; short: string; category: string };
};

const registry: Record<string, RegistryEntry> = {
  "diabetes-risk": { view: DiabetesRiskView, meta: diabetesRiskMeta },
  "diabetes-risk-griffin-2000": {
    view: DiabetesRiskGriffinView,
    meta: drsGriffinMeta,
  },
  "diabetes-screening-treecalc": {
    view: DiabetesScreeningTreeView,
    meta: screeningTreeMeta,
  },
  "diabetes-type-predictor-treecalc": {
    view: DiabetesTypePredictorTreeView,
    meta: typePredictorMeta,
  },
  "a1c-to-average-glucose": {
    view: A1cToAverageGlucoseView,
    meta: a1cAvgGluMeta,
  },
  "homa-ir": { view: HomaIrView, meta: homaIrMeta },
  "lpir-index": { view: LpirIndexView, meta: lpirMeta },
  "quicki": { view: QuickiView, meta: quickiMeta },
  "risk-7p5y": { view: Risk7p5yView, meta: risk7p5Meta },
  "sodium-correction-emmett": { view: SodiumCorrectionEmmettView, meta: sodiumEmmettMeta },
  "sodium-correction-hillier": { view: SodiumCorrectionHillierView, meta: sodiumHillierMeta },
  "sodium-correction-katz": { view: SodiumCorrectionKatzView, meta: sodiumKatzMeta },
};

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = registry[slug];

  if (!entry) {
    return <div style={{ padding: 20 }}>Calculator not found</div>;
  }

  const View = entry.view;
  return (
    <main style={{ width: "100%" }}>
      <View />
    </main>
  );
}
