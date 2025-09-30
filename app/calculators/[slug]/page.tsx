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
import {
  a1cAvgGluMeta,
  diabetesRiskMeta,
  drsGriffinMeta,
  fractureWithBmdMeta,
  fractureWithoutBmdMeta,
  homaIrMeta,
  lpirMeta,
  metAACE2003Meta,
  metAHA2005Meta,
  metAtpIIIMeta,
  metEGIRMeta,
  metIDF2005Meta,
  metWHO1998Meta,
  quickiMeta,
  risk7p5Meta,
  screeningTreeMeta,
  sodiumEmmettMeta,
  sodiumHillierMeta,
  sodiumKatzMeta,
  typePredictorMeta,
} from "../meta";
import FractureIndexWithBmdView from "../fracture-index-with-bmd/view";
import FractureIndexWithoutBmdView from "../fracture-index-without-bmd/view";
import MetSyndromeAACE2003View from "../met-syndrome-aace-2003/view";
import MetSyndromeAHA2005View from "../met-syndrome-aha-2005/view";
import MetSyndromeAtpIIIView from "../met-syndrome-atp-iii/view";
import MetSyndromeEGIRView from "../met-syndrome-egir/view";
import MetSyndromeIDF2005View from "../met-syndrome-idf-2005/view";
import MetSyndromeWHO1998View from "../met-syndrome-who-1998/view";

import type { IconType } from "react-icons";

type RegistryEntry = {
  view: React.FC;
  meta: {
    slug: string;
    title: string;
    short: string;
    category: string;
    icon: IconType; 
  };
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
  "sodium-correction-emmett": {
    view: SodiumCorrectionEmmettView,
    meta: sodiumEmmettMeta,
  },
  "sodium-correction-hillier": {
    view: SodiumCorrectionHillierView,
    meta: sodiumHillierMeta,
  },
  "sodium-correction-katz": {
    view: SodiumCorrectionKatzView,
    meta: sodiumKatzMeta,
  },
  "fracture-index-with-bmd": {
    view: FractureIndexWithBmdView,
    meta: fractureWithBmdMeta,
  },
  "fracture-index-without-bmd": {
    view: FractureIndexWithoutBmdView,
    meta: fractureWithoutBmdMeta,
  },
  "metabolic-syndrome-aace-2003": {
    view: MetSyndromeAACE2003View,
    meta: metAACE2003Meta,
  },
  "metabolic-syndrome-aha-2005": {
    view: MetSyndromeAHA2005View,
    meta: metAHA2005Meta,
  },
  "metabolic-syndrome-atp-iii": {
    view: MetSyndromeAtpIIIView,
    meta: metAtpIIIMeta,
  },
  "metabolic-syndrome-egir": { view: MetSyndromeEGIRView, meta: metEGIRMeta },
  "metabolic-syndrome-idf-2005": {
    view: MetSyndromeIDF2005View,
    meta: metIDF2005Meta,
  },
    "metabolic-syndrome-who-1998": { view: MetSyndromeWHO1998View, meta: metWHO1998Meta },

};
export const dynamicParams = false; 
export const dynamic = "error";  

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }));
}


export default async function CalculatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
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
