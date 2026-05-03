"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CardComponent from "../Components/CalculatorSection/CardComponent/CardComponent";
import styles from "./page.module.scss";
import { useLanguage } from "../Context/LanguageContext";
import { translateText } from "../lib/translate";
import {
  fetchPublishedCalculators,
  type ApiCalculator,
} from "../lib/calculatorsApi";
import {
  diabetesRiskMeta,
  drsGriffinMeta,
  screeningTreeMeta,
  typePredictorMeta,
  a1cAvgGluMeta,
  driUsdaMeta,
  homaIrMeta,
  lpirMeta,
  quickiMeta,
  risk7p5Meta,
  sodiumEmmettMeta,
  sodiumHillierMeta,
  sodiumKatzMeta,
  fractureWithBmdMeta,
  fractureWithoutBmdMeta,
  metAACE2003Meta,
  metAHA2005Meta,
  metAtpIIIMeta,
  metEGIRMeta,
  metIDF2005Meta,
  metWHO1998Meta,
  fractureWithKnownBmdMeta,
  fractureWithoutKnownBmdMeta,
  oracleOsteoporosisMeta,
  oraiMeta,
  osteoporosisScoreMeta,
  ostMaleMeta,
  ostFemaleMeta
} from "./meta";

const calculators = [
  diabetesRiskMeta,
  drsGriffinMeta,
  screeningTreeMeta,
  typePredictorMeta,
  a1cAvgGluMeta,
  driUsdaMeta,
  homaIrMeta,
  lpirMeta,
  quickiMeta,
  risk7p5Meta,
  sodiumEmmettMeta,
  sodiumHillierMeta,
  sodiumKatzMeta,
  fractureWithBmdMeta,
  fractureWithoutBmdMeta,
  metAACE2003Meta,
  metAHA2005Meta,
  metAtpIIIMeta,
  metEGIRMeta,
  metIDF2005Meta,
  metWHO1998Meta,
  fractureWithKnownBmdMeta,
  fractureWithoutKnownBmdMeta,
  oracleOsteoporosisMeta,
  oraiMeta,
  osteoporosisScoreMeta,
  ostMaleMeta,
  ostFemaleMeta,

];

type BuiltInCalculator = (typeof calculators)[number];

type DisplayCalculator = {
  slug: string;
  title: string;
  short: string;
  category: string;
  icon?: BuiltInCalculator["icon"];
  isCustom?: boolean;
};

const kaBySlug: Record<string, { title: string; short: string }> = {
  "diabetes-risk": {
    title: "დიაბეტის რისკის კალკულატორი",
    short: "შეაფასეთ დიაბეტის რისკი სკრინინგული ინსტრუმენტის დახმარებით.",
  },
  "diabetes-risk-griffin-2000": {
    title: "დიაბეტის რისკის ქულა (ტიპი 2)",
    short: "ტიპი 2 დიაბეტის განვითარების ალბათობის შეფასება რისკ-ფაქტორებით.",
  },
  "diabetes-screening-treecalc": {
    title: "დიაბეტის სკრინინგის TreeCalc",
    short: "დიაბეტის რისკის შეფასება და სკრინინგის რეკომენდაციები.",
  },
  "diabetes-type-predictor-treecalc": {
    title: "დიაბეტის ტიპის პროგნოზირების TreeCalc",
    short: "გადაწყვეტის ხეზე დაფუძნებული დამხმარე დიაბეტის სავარაუდო ტიპის განსასაზღვრად.",
  },
  "a1c-to-average-glucose": {
    title: "გლიკემიური შეფასება: A1C-დან საშუალო გლუკოზამდე",
    short: "A1C-სა და საშუალო გლუკოზას შორის კონვერსია (mg/dL / mmol/L).",
  },
  "dri-usda": {
    title: "USDA DRI კალკულატორი (მოზრდილები)",
    short: "დღიური ენერგიის, AMDR მაკრო დიაპაზონებისა და წყლის მიზნის შეფასება DRI ფორმულებით.",
  },
  "homa-ir": {
    title: "HOMA ფორმულა: ინსულინრეზისტენტობის შეფასება",
    short: "ინსულინრეზისტენტობის შეფასება უზმოზე ინსულინითა და გლუკოზით.",
  },
  "lpir-index": {
    title: "ლიპოპროტეინული ინსულინრეზისტენტობის ინდექსი (LPIR)",
    short: "LPIR (0-100) გამოთვლა NMR ლიპოპროტეინული მაჩვენებლებით.",
  },
  quicki: {
    title: "QUICKI ფორმულა ინსულინრეზისტენტობისთვის",
    short: "ინსულინის მგრძნობელობის შეფასება უზმოზე ინსულინითა და გლუკოზით.",
  },
  "risk-7p5y": {
    title: "დიაბეტის განვითარების რისკი (7.5 წელი)",
    short: "7.5-წლიანი რისკის შეფასება ასაკის, BMI-ს, ლაბორატორიული და სხვა მონაცემებით.",
  },
  "sodium-correction-emmett": {
    title: "ჰიპერგლიკემია (Emmett 2013) - ნატრიუმის კორექცია",
    short: "ნატრიუმის კორექცია ჰიპერგლიკემიაში Emmett (2013)-ის მიხედვით.",
  },
  "sodium-correction-hillier": {
    title: "ნატრიუმის კორექცია ჰიპერგლიკემიაში (Hillier 1999)",
    short: "შრატის ნატრიუმის კორექცია Hillier (1999)-ის ფორმულით.",
  },
  "sodium-correction-katz": {
    title: "ნატრიუმის კორექცია ჰიპერგლიკემიაში (Katz 1973)",
    short: "შრატის ნატრიუმის კორექცია Katz (1973)-ის ფორმულით.",
  },
  "fracture-index-with-bmd": {
    title: "მოტეხილობის ინდექსი BMD-ით",
    short: "5-წლიანი მოტეხილობის რისკის შეფასება კლინიკური ფაქტორებით და BMD T-score-ით.",
  },
  "fracture-index-without-bmd": {
    title: "მოტეხილობის ინდექსი BMD-ის გარეშე",
    short: "5-წლიანი მოტეხილობის რისკის შეფასება BMD-ის გარეშე.",
  },
  "metabolic-syndrome-aace-2003": {
    title: "მეტაბოლური სინდრომის კრიტერიუმები (AACE 2003)",
    short: "AACE 2003 კრიტერიუმებით მეტაბოლური სინდრომის შეფასება.",
  },
  "metabolic-syndrome-aha-2005": {
    title: "მეტაბოლური სინდრომის კრიტერიუმები (AHA/NHLBI 2005)",
    short: "AHA/NHLBI 2005 კრიტერიუმებით მეტაბოლური სინდრომის შეფასება.",
  },
  "metabolic-syndrome-atp-iii": {
    title: "მეტაბოლური სინდრომის კრიტერიუმები (ATP III)",
    short: "ATP III კრიტერიუმებით მეტაბოლური სინდრომის შეფასება.",
  },
  "metabolic-syndrome-egir": {
    title: "მეტაბოლური სინდრომის კრიტერიუმები (EGIR)",
    short: "EGIR კრიტერიუმებით მეტაბოლური სინდრომის შეფასება.",
  },
  "metabolic-syndrome-idf-2005": {
    title: "მეტაბოლური სინდრომის კრიტერიუმები (IDF 2005)",
    short: "IDF 2005 კრიტერიუმებით მეტაბოლური სინდრომის შეფასება.",
  },
  "metabolic-syndrome-who-1998": {
    title: "მეტაბოლური სინდრომის კრიტერიუმები (WHO 1998)",
    short: "WHO 1998 კრიტერიუმებით მეტაბოლური სინდრომის შეფასება.",
  },
  "oracle-osteoporosis": {
    title: "ოსტეოპოროზის რისკის ORACLE შეფასება",
    short: "ORACLE ქულის გამოთვლა ოსტეოპოროზის რისკის შესაფასებლად.",
  },
  "osteoporosis-orai": {
    title: "ოსტეოპოროზის რისკის შეფასების ინსტრუმენტი (ORAI)",
    short: "ORAI ქულის გამოყენება ოსტეოდენსიტომეტრიის საჭიროების შესაფასებლად.",
  },
  "osteoporosis-score": {
    title: "ოსტეოპოროზის რისკის SCORE",
    short: "SCORE ფორმულით ოსტეოპოროზის რისკის შეფასება.",
  },
  "ost-male": {
    title: "ოსტეოპოროზის თვითშეფასების ინსტრუმენტი კაცებისთვის (OST)",
    short: "OST ქულა ზრდასრული კაცებისთვის.",
  },
  "ost-female": {
    title: "ოსტეოპოროზის თვითშეფასების ინსტრუმენტი ქალებისთვის (OST)",
    short: "OST ქულა ზრდასრული ქალებისთვის.",
  },
};

export default function CalculatorsIndex() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [customCalculators, setCustomCalculators] = useState<ApiCalculator[]>([]);

  useEffect(() => {
    fetchPublishedCalculators()
      .then((items) => setCustomCalculators(items))
      .catch(() => setCustomCalculators([]));
  }, []);

  const localizeCard = useCallback(
    (slug: string, title: string, short: string) => {
      if (language === "ka" && kaBySlug[slug]) {
        return kaBySlug[slug];
      }
      return {
        title: translateText(title, language),
        short: translateText(short, language),
      };
    },
    [language]
  );

  const filteredCalculators = useMemo(() => {
    const mergedCalculators: DisplayCalculator[] = [
      ...calculators,
      ...customCalculators.map((calculator) => ({
        slug: calculator.slug,
        title: calculator.title,
        short: calculator.short,
        category: calculator.category,
        isCustom: true,
      })),
    ];

    const query = searchQuery.trim().toLowerCase();
    if (!query) return mergedCalculators;

    return mergedCalculators.filter((c) => {
      const localized = localizeCard(c.slug, c.title, c.short);
      return (
        localized.title.toLowerCase().includes(query) ||
        localized.short.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
    });
  }, [customCalculators, searchQuery, localizeCard]);

  const hasResults = filteredCalculators.length > 0;
  const categories = useMemo(
    () =>
      Array.from(new Set(filteredCalculators.map((calculator) => calculator.category))),
    [filteredCalculators],
  );

  return (
    <main className={styles.main}>
      <div className={styles.titlesWrapper}>
        <h1 className={styles.heading}>
          {translateText("All Endocrinology Calculators", language)}
        </h1>
        <p className={styles.subTitle}>
          {translateText(
            "Tools for assessing hormone levels, medication dosages, and other endocrine parameters.",
            language
          )}
        </p>
        <div className={styles.searchWrap}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={translateText("Search calculators...", language)}
            aria-label={translateText("Search calculators...", language)}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>
      {hasResults ? (
        <div className={styles.cardsMain}>
          {categories.map((category) => {
            const items = filteredCalculators.filter((c) => c.category === category);
            if (items.length === 0) return null;

            return (
              <div className={styles.cardsWrapper} key={category}>
                <h3 className={styles.categoryTitle}>
                  {translateText(category, language)}
                </h3>
                <div className={styles.cardsContainer}>
                  {items.map((c) => {
                    const localized = localizeCard(c.slug, c.title, c.short);
                    return (
                      <CardComponent
                        key={c.slug}
                        title={localized.title}
                        subTitle={localized.short}
                        slug={c.slug}
                        icon={c.icon}
                        highlightQuery={searchQuery}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className={styles.emptyState}>
          {translateText("No calculators found", language)}
        </p>
      )}
    </main>
  );
}
