export type Consultation = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  idNumber?: string;
  reason: string;
  date: string;
  time: string;
  createdAtUtc: string;
};

export type Blog = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  tags: string[];
  status: "draft" | "published";
  featured?: boolean;
  coverImage?: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  colors: string[];
};

export type CalculatorField = {
  name: string;
  label: string;
  unit: string;
  placeholder: string;
  defaultValue: string;
};

export type CalculatorApiField = {
  name: string;
  label: string;
  unit?: string;
  placeholder?: string;
  defaultValue?: number | null;
};

export type Calculator = {
  id: number;
  slug: string;
  title: string;
  short: string;
  category: string;
  description?: string;
  fields: CalculatorApiField[];
  formula: string;
  resultLabel: string;
  status: "draft" | "published";
};

export type BlogFormState = {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  tags: string;
  status: "draft" | "published";
  featured: boolean;
  coverImage: string;
};

export type ProductFormState = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  sizes: string;
  colors: string;
};

export type CalculatorFormState = {
  title: string;
  slug: string;
  short: string;
  category: string;
  description: string;
  resultLabel: string;
  status: "draft" | "published";
  formula: string;
  fields: CalculatorField[];
};

export const calculatorCategoryOptions = [
  "Diabetes",
  "Fracture Risk",
  "Metabolic Syndrome",
  "Osteoporosis",
  "General",
] as const;

export const createEmptyCalculatorField = (): CalculatorField => ({
  name: "",
  label: "",
  unit: "",
  placeholder: "",
  defaultValue: "",
});
