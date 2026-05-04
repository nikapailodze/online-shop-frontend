import { toApiUrl } from "./api";

export type ApiCalculatorField = {
  name: string;
  label: string;
  type?: "number" | "select" | "boolean";
  unit?: string;
  placeholder?: string;
  defaultValue?: number | null;
  options?: Array<{
    label: string;
    value: number;
  }>;
};

export type ApiCalculator = {
  id: number;
  slug: string;
  title: string;
  short: string;
  category: string;
  description?: string;
  fields: ApiCalculatorField[];
  formula: string;
  resultLabel: string;
  status: "draft" | "published";
  createdAtUtc?: string;
  updatedAtUtc?: string;
  isCustom?: boolean;
};

export const fetchPublishedCalculators = async (): Promise<ApiCalculator[]> => {
  const response = await fetch(toApiUrl("/api/Calculators"), { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load calculators.");
  }
  return response.json();
};

export const fetchPublishedCalculatorBySlug = async (
  slug: string,
): Promise<ApiCalculator> => {
  const response = await fetch(toApiUrl(`/api/Calculators/${slug}`), {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Unable to load calculator.");
  }
  return response.json();
};
