import { Suspense, lazy } from "react";
import { registry, calculatorSlugs } from "../registry";
export const dynamicParams = false;
export const dynamic = "error";

export function generateStaticParams() {
  return calculatorSlugs.map((slug) => ({ slug }));
}

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

  const View = lazy(entry.load);

  return (
    <main style={{ width: "100%" }}>
      <Suspense fallback={<div style={{ padding: 20 }}>Loading calculator...</div>}>
        <View />
      </Suspense>
    </main>
  );
}
