
export function computeQUICKI({
  insulin,
  glucose,
}: {
  insulin: string;
  glucose: string;
}) {
  const ins = Number((insulin || "").toString().replace(",", ".").trim());
  const glu = Number((glucose || "").toString().replace(",", ".").trim());

  const complete =
    Number.isFinite(ins) && ins > 0 &&
    Number.isFinite(glu) && glu > 0;

  if (!complete) return { complete: false as const, quicki: null as number | null };

  const quicki = 1 / (Math.log10(ins) + Math.log10(glu));
  return { complete: true as const, quicki };
}
