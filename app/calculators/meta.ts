import { GiFamilyTree } from "react-icons/gi";
import {
  FaHeartbeat,
  FaClipboardCheck,
  FaChartLine,
  FaVials,
  FaBalanceScale,
} from "react-icons/fa";
import { MdTimeline, MdDeviceHub } from "react-icons/md";
import { AiOutlineCalculator, AiOutlineFieldNumber } from "react-icons/ai";
import { RiTestTubeLine } from "react-icons/ri";
import { BiCalculator } from "react-icons/bi";

// Sodium Corrections
export const sodiumKatzMeta = {
  slug: "sodium-correction-katz",
  title: "Sodium Correction in Hyperglycemia (Katz 1973)",
  short:
    "Correct serum sodium for hyperglycemia using Katz (1973): Na + 0.016 × (glucose − 100).",
  category: "Diabetes",
  icon: FaVials,
};

export const sodiumHillierMeta = {
  slug: "sodium-correction-hillier",
  title: "Sodium Correction in Hyperglycemia (Hillier 1999)",
  short:
    "Correct serum sodium for hyperglycemia using Hillier (1999): Na + 0.024 × (glucose − 100).",
  category: "Diabetes",
  icon: FaBalanceScale,
};

export const sodiumEmmettMeta = {
  slug: "sodium-correction-emmett",
  title: "Hyperglycemia (Emmett 2013) — Sodium Correction",
  short:
    "Correct serum sodium for hyperglycemia using Emmett (2013). Supports mg/dL or mmol/L glucose.",
  category: "Diabetes",
  icon: BiCalculator,
};

// Risk
export const risk7p5Meta = {
  slug: "risk-7p5y",
  title: "Risk of Acquiring Diabetes Mellitus (7.5-year)",
  short:
    "Estimate 7.5-year diabetes risk from age, BMI (via height/weight), labs, BP, sex, ethnicity, and family history.",
  category: "Diabetes",
  icon: FaChartLine,
};

// Formulas
export const quickiMeta = {
  slug: "quicki",
  title: "QUICKI Formula for Insulin Resistance",
  short:
    "Estimate insulin sensitivity from fasting insulin (μIU/mL) and glucose (mg/dL).",
  category: "Diabetes",
  icon: AiOutlineFieldNumber,
};

export const lpirMeta = {
  slug: "lpir-index",
  title: "Lipoprotein Insulin Resistance Index (LPIR Index)",
  short:
    "Compute LPIR (0–100) from NMR lipoprotein measures: VLDL size/particles, LDL size/small LDL-P, HDL size/large HDL-P.",
  category: "Diabetes",
  icon: RiTestTubeLine,
};

export const homaIrMeta = {
  slug: "homa-ir",
  title: "HOMA Formula: Homeostasis Model Assessment of Insulin Resistance",
  short:
    "Estimate insulin resistance from fasting insulin (mIU/L) and fasting glucose (mmol/L).",
  category: "Diabetes",
  icon: AiOutlineCalculator,
};

// Decision trees
export const typePredictorMeta = {
  slug: "diabetes-type-predictor-treecalc",
  title: "Diabetes Type Predictor TreeCalc",
  short:
    "A decision-tree style helper that suggests the likely diabetes type based on obesity, ketosis, and initial treatment.",
  category: "Diabetes",
  icon: GiFamilyTree,
};

export const screeningTreeMeta = {
  slug: "diabetes-screening-treecalc",
  title: "Diabetes Screening TreeCalc",
  short:
    "A tool to assess diabetes risk and provide screening recommendations.",
  category: "Diabetes",
  icon: MdDeviceHub,
};

// Risk Scores
export const drsGriffinMeta = {
  slug: "diabetes-risk-griffin-2000",
  title: "Diabetes Risk Score (Type 2)",
  short:
    "A tool that calculates the likelihood of developing type 2 diabetes based on various risk factors.",
  category: "Diabetes",
  icon: FaHeartbeat,
};

export const diabetesRiskMeta = {
  slug: "diabetes-risk",
  title: "Diabetes Risk Calculator",
  short: "Assess your diabetes risk with this screening tool",
  category: "Diabetes",
  icon: FaClipboardCheck,
};

// A1C
export const a1cAvgGluMeta = {
  slug: "a1c-to-average-glucose",
  title: "Glycemic Assessment: A1C to Average Glucose Conversions",
  short:
    "Convert between A1C (DCCT/IFCC) and estimated average glucose (mg/dL / mmol/L). Type any one value; the rest auto-calc.",
  category: "Diabetes",
  icon: MdTimeline,
};
