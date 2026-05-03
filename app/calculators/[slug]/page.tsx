import CalculatorSlugPageClient from "./pageClient";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CalculatorSlugPageClient slug={slug} />;
}
