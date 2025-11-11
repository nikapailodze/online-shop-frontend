export function computeHomaIr({
  insulin,
  glucose,
}: {
  insulin: string;
  glucose: string;
}) {
  const ins = Number((insulin || "").toString().replace(",", ".").trim());
  const glu = Number((glucose || "").toString().replace(",", ".").trim());

  const complete =
    Number.isFinite(ins) && ins >= 0 &&
    Number.isFinite(glu) && glu >= 0;

  if (!complete) return { complete: false as const, homaIr: null as number | null };

  const homaIr = (ins * glu) / 22.5;
  return { complete: true as const, homaIr };
}
