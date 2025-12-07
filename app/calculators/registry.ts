import type { ComponentType } from "react";

type RegistryEntry = {
  load: () => Promise<{ default: ComponentType }>;
};

export const registry: Record<string, RegistryEntry> = {
  "diabetes-risk": { load: () => import("./diabetes-risk/view") },
  "diabetes-risk-griffin-2000": {
    load: () => import("./diabetes-risk-griffin-2000/view"),
  },
  "diabetes-screening-treecalc": {
    load: () => import("./diabetes-screening-treecalc/view"),
  },
  "diabetes-type-predictor-treecalc": {
    load: () => import("./diabetes-type-predictor-treecalc/view"),
  },
  "a1c-to-average-glucose": { load: () => import("./a1c-to-average-glucose/view") },
  "homa-ir": { load: () => import("./homa-ir/view") },
  "lpir-index": { load: () => import("./lpir-index/view") },
  quicki: { load: () => import("./quicki/view") },
  "risk-7p5y": { load: () => import("./risk-7p5y/view") },
  "sodium-correction-emmett": { load: () => import("./sodium-correction-emmett/view") },
  "sodium-correction-hillier": { load: () => import("./sodium-correction-hillier/view") },
  "sodium-correction-katz": { load: () => import("./sodium-correction-katz/view") },
  "fracture-index-with-bmd": { load: () => import("./fracture-index-with-bmd/view") },
  "fracture-index-without-bmd": { load: () => import("./fracture-index-without-bmd/view") },
  "metabolic-syndrome-aace-2003": { load: () => import("./met-syndrome-aace-2003/view") },
  "metabolic-syndrome-aha-2005": { load: () => import("./met-syndrome-aha-2005/view") },
  "metabolic-syndrome-atp-iii": { load: () => import("./met-syndrome-atp-iii/view") },
  "metabolic-syndrome-egir": { load: () => import("./met-syndrome-egir/view") },
  "metabolic-syndrome-idf-2005": { load: () => import("./met-syndrome-idf-2005/view") },
  "metabolic-syndrome-who-1998": { load: () => import("./met-syndrome-who-1998/view") },
  "fracture-index-with-known-bmd": { load: () => import("./fracture-index-with-bmd/view") },
  "fracture-index-without-known-bmd": { load: () => import("./fracture-index-without-bmd/view") },
  "oracle-osteoporosis": { load: () => import("./oracle-osteoporosis/view") },
  "osteoporosis-orai": { load: () => import("./orai/view") },
  "osteoporosis-score": { load: () => import("./osteoporosis-score/veiw") },
  "ost-male": { load: () => import("./ost-male/view") },
  "ost-female": { load: () => import("./ost-female/view") },
};

export const calculatorSlugs = Object.keys(registry);
