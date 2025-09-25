import { diabetesRiskMeta } from "../diabetes-risk/meta";
import DiabetesRiskView from "../diabetes-risk/view";

import { drsGriffinMeta } from "../diabetes-risk-griffin-2000/meta";
import DiabetesRiskGriffinView from "../diabetes-risk-griffin-2000/view";
import DiabetesScreeningTreeView from "../diabetes-screening-treecalc/view";
import { screeningTreeMeta } from "../diabetes-screening-treecalc/meta";
import DiabetesTypePredictorTreeView from "../diabetes-type-predictor-treecalc/view";
import { typePredictorMeta } from "../diabetes-type-predictor-treecalc/meta";

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
