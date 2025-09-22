import { diabetesRiskMeta } from "../diabetes-risk/meta";
import DiabetesRiskView from "../diabetes-risk/view";

import { drsGriffinMeta } from "../diabetes-risk-griffin-2000/meta";
import DiabetesRiskGriffinView from "../diabetes-risk-griffin-2000/view";

type RegistryEntry = {
  view: React.FC;
  meta: { slug: string; title: string; short: string; category: string };
};

const registry: Record<string, RegistryEntry> = {
  "diabetes-risk": { view: DiabetesRiskView, meta: diabetesRiskMeta },
  "diabetes-risk-griffin-2000": { view: DiabetesRiskGriffinView, meta: drsGriffinMeta },
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
    <main>
      {/* <h1>{entry.meta.title}</h1> */}
      {/* <p style={{ color: "#666" }}>{entry.meta.short}</p> */}
      <View />
    </main>
  );
}
