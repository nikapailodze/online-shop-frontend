// Equations (per your spec):
// IFCC mmol/mol  = 10.929 * (A1C% - 2.15)
// eAG mg/dL      = (28.7 * A1C%) - 46.7
// eAG mmol/L     = (eAG mg/dL) / 18.015
//
// Reverse forms used as needed.

export type Fields = "a1cPct" | "a1cIfcc" | "eagMg" | "eagMmol";

export type Inputs = {
  a1cPct: string;
  a1cIfcc: string;
  eagMg: string;
  eagMmol: string;
  active: Fields | ""; 
};

function num(x: string) {
  if (!x) return NaN;
  const s = x.replace(",", ".").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function fromA1cPct(a1cPct: number) {
  const a1cIfcc = 10.929 * (a1cPct - 2.15);
  const eagMg = 28.7 * a1cPct - 46.7;
  const eagMmol = eagMg / 18.015;
  return { a1cPct, a1cIfcc, eagMg, eagMmol };
}

function fromA1cIfcc(a1cIfcc: number) {
  const a1cPct = a1cIfcc / 10.929 + 2.15;
  return fromA1cPct(a1cPct);
}

function fromEagMg(eagMg: number) {
  const a1cPct = (eagMg + 46.7) / 28.7;
  return fromA1cPct(a1cPct);
}

function fromEagMmol(eagMmol: number) {
  const eagMg = eagMmol * 18.015;
  return fromEagMg(eagMg);
}

export function computeConversions(i: Inputs) {
  const a1cPctN = num(i.a1cPct);
  const a1cIfccN = num(i.a1cIfcc);
  const eagMgN = num(i.eagMg);
  const eagMmolN = num(i.eagMmol);

  let res:
    | { a1cPct: number; a1cIfcc: number; eagMg: number; eagMmol: number }
    | null = null;

  switch (i.active) {
    case "a1cPct":
      if (Number.isFinite(a1cPctN)) res = fromA1cPct(a1cPctN);
      break;
    case "a1cIfcc":
      if (Number.isFinite(a1cIfccN)) res = fromA1cIfcc(a1cIfccN);
      break;
    case "eagMg":
      if (Number.isFinite(eagMgN)) res = fromEagMg(eagMgN);
      break;
    case "eagMmol":
      if (Number.isFinite(eagMmolN)) res = fromEagMmol(eagMmolN);
      break;
    default:
      res = null;
  }

  return res;
}
