"use client";

import Link from "next/link";
import { FiEdit3, FiSearch } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { getStoredBlogs, type BlogArticle } from "../lib/blogs";
import { staticArticles, type BlogCard } from "../lib/blogData";
import styles from "./page.module.scss";

const categories = [
  "All",
  "Endocrinology",
  "Diabetes Care",
  "Thyroid",
  "Metabolism",
  "Nutrition",
  "Clinical Research",
  "Patient Education",
];

const tags = [
  "endocrinology",
  "diabetes",
  "thyroid",
  "pcos",
  "obesity",
  "insulin",
  "hba1c",
  "metabolism",
  "hormones",
  "pituitary",
  "adrenal",
  "lipids",
  "cardio-risk",
  "nutrition",
  "exercise",
  "clinical-guidelines",
  "case-studies",
  "patient-education",
  "pregnancy",
  "pediatrics",
  "osteoporosis",
  "vitamin-d",
  "renal",
  "research",
];

const articles: BlogCard[] = staticArticles.map((article) => ({
  ...article,
  imageClass: styles[article.imageClass as keyof typeof styles] ?? "",
}));

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, query: string, className: string) => {
  const q = query.trim();
  if (!q) return text;

  const pattern = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = text.split(pattern);
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <span key={`${part}-${index}`} className={className}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [storedBlogs, setStoredBlogs] = useState<BlogArticle[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const stored = getStoredBlogs().filter(
      (blog) => blog.status !== "draft"
    );
    setStoredBlogs(stored);
  }, []);

  const allArticles = useMemo<BlogCard[]>(() => {
    const mappedStored = storedBlogs.map<BlogCard>((blog) => ({
      ...blog,
      imageClass: styles.cardImageUser,
    }));
    return [...mappedStored, ...articles];
  }, [storedBlogs]);

  const featuredPool = useMemo(() => {
    const resolveTime = (article: BlogCard) => {
      if (typeof article.createdAt === "number") return article.createdAt;
      const parsed = Date.parse(article.date);
      return Number.isNaN(parsed) ? 0 : parsed;
    };
    const sorted = [...allArticles].sort((a, b) => {
      const timeA = resolveTime(a);
      const timeB = resolveTime(b);
      return timeB - timeA;
    });
    return sorted.slice(0, 5);
  }, [allArticles]);

  const featuredFiltered = useMemo(() => {
    return featuredPool.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesTag = !activeTag || article.tags.includes(activeTag);
      return matchesCategory && matchesTag;
    });
  }, [featuredPool, activeCategory, activeTag]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesTag = !activeTag || article.tags.includes(activeTag);
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTag, allArticles, searchQuery]);

  const featuredArticle = useMemo(() => {
    return featuredFiltered[featuredIndex] ?? null;
  }, [featuredFiltered, featuredIndex]);

  useEffect(() => {
    setFeaturedIndex(0);
  }, [featuredFiltered]);

  useEffect(() => {
    if (featuredFiltered.length <= 1) return;
    const interval = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredFiltered.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [featuredFiltered]);

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div />
        <h2 className={styles.topTitle}>Articles</h2>
        <div className={styles.topActions}>
          <Link href="/blogs/write" className={styles.writeButton}>
            <FiEdit3 className={styles.writeIcon} aria-hidden />
            Write
          </Link>
        </div>
      </header>

      {featuredArticle && (
        <section className={styles.hero} key={featuredArticle.id}>
          <div className={styles.heroMedia}>
            <div
              className={styles.heroImage}
              style={
                featuredArticle.coverImage
                  ? { backgroundImage: `url(${featuredArticle.coverImage})` }
                  : undefined
              }
            />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroTags}>
              <span className={styles.heroPill}>
                {highlightText(
                  featuredArticle.category,
                  searchQuery,
                  styles.highlight
                )}
              </span>
              <span className={styles.heroTab}>Featured</span>
            </div>
            <h1 className={styles.heroTitle}>
              {highlightText(featuredArticle.title, searchQuery, styles.highlight)}
            </h1>
            <p className={styles.heroExcerpt}>
              {highlightText(
                featuredArticle.excerpt,
                searchQuery,
                styles.highlight
              )}
            </p>
            <div className={styles.heroMeta}>
              <div className={styles.avatar}>
                <span>
                  {featuredArticle.author
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
              </div>
              <div>
                <div className={styles.metaName}>
                  {highlightText(
                    featuredArticle.author,
                    searchQuery,
                    styles.highlight
                  )}
                </div>
                <div className={styles.metaInfo}>
                  {featuredArticle.date} - {featuredArticle.readTime} read
                </div>
              </div>
            </div>
            <Link
              href={`/blogs/${featuredArticle.id}`}
              className={styles.readMore}
            >
              Read article
            </Link>
          </div>
        </section>
      )}

      <section className={styles.filters}>
        <div className={styles.categoryRow}>
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`${styles.category} ${
                  category === activeCategory ? styles.categoryActive : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.search}>
            <FiSearch className={styles.searchIcon} aria-hidden />
            <input
              type="text"
              placeholder="Search articles..."
              className={styles.searchInput}
              aria-label="Search articles"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.tag} ${
                activeTag === tag ? styles.tagActive : ""
              }`}
              onClick={() =>
                setActiveTag((current) => (current === tag ? null : tag))
              }
            >
              #{tag}
            </button>
          ))}
        </div>
        <div className={styles.resultsRow}>
          <span className={styles.resultsText}>
            Showing {filteredArticles.length} results
          </span>
          {activeTag && (
            <button
              type="button"
              className={styles.activeTag}
              onClick={() => setActiveTag(null)}
            >
              #{activeTag} <span aria-hidden>×</span>
            </button>
          )}
        </div>
      </section>

      {filteredArticles.length > 0 ? (
        <section className={styles.grid}>
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blogs/${article.id}`}
              className={styles.cardLink}
            >
              <article className={styles.card}>
                <div
                  className={`${styles.cardImage} ${article.imageClass}`}
                  style={
                    article.coverImage
                      ? { backgroundImage: `url(${article.coverImage})` }
                      : undefined
                  }
                >
                  <span
                    className={`${styles.cardBadge} ${
                      styles[`badge${article.category.replace(/\s+/g, "")}`] ??
                      ""
                    }`}
                  >
                    {highlightText(article.category, searchQuery, styles.highlight)}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className={styles.cardTitle}>
                    {highlightText(article.title, searchQuery, styles.highlight)}
                  </h2>
                  <p className={styles.cardExcerpt}>
                    {highlightText(article.excerpt, searchQuery, styles.highlight)}
                  </p>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardAvatar}>
                      <span>
                        {article.author
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className={styles.cardAuthor}>
                        {highlightText(
                          article.author,
                          searchQuery,
                          styles.highlight
                        )}
                      </div>
                      <div className={styles.cardDate}>{article.date}</div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <section className={styles.emptyState}>
          <div className={styles.emptyIcon}>Doc</div>
          <h3>No articles found</h3>
          <p>
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>
        </section>
      )}

      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h3>Stay in the loop</h3>
          <p>
            Get the latest endocrine insights delivered to your inbox. No spam,
            just clear and practical updates.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="you@email.com"
              className={styles.newsletterInput}
              aria-label="Email address"
            />
            <button className={styles.newsletterButton} type="button">
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
