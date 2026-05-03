"use client";

import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import PageLoader from "@/app/Components/PageLoader/PageLoader";
import { fetchPublishedCalculatorBySlug, type ApiCalculator } from "@/app/lib/calculatorsApi";
import { registry } from "../registry";
import CustomCalculatorView from "./CustomCalculatorView";

export default function CalculatorSlugPageClient({ slug }: { slug: string }) {
  const entry = registry[slug];
  const [calculator, setCalculator] = useState<ApiCalculator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!entry);

  useEffect(() => {
    if (entry) return;

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    fetchPublishedCalculatorBySlug(slug)
      .then((response) => {
        if (!isCancelled) {
          setCalculator(response);
        }
      })
      .catch((loadError) => {
        if (!isCancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Calculator not found.",
          );
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [entry, slug]);

  const View = useMemo(() => (entry ? lazy(entry.load) : null), [entry]);

  if (View) {
    return (
      <main style={{ width: "100%" }}>
        <Suspense fallback={<PageLoader />}>
          <View />
        </Suspense>
      </main>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

  if (calculator) {
    return <CustomCalculatorView calculator={calculator} />;
  }

  return <div style={{ padding: 20 }}>{error ?? "Calculator not found"}</div>;
}
