"use client";

import Link from "next/link";
import { FiEdit3, FiSearch } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { fetchPublishedBlogs, type ApiBlog } from "../lib/blogApi";
import { getStoredUser, getUserFromToken, isAdminUser } from "../lib/auth";
import PageLoader from "../Components/PageLoader/PageLoader";
import styles from "./page.module.scss";

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, query: string, className: string) => {
  const q = query.trim();
  if (!q) return text;
  const pattern = new RegExp(`(${escapeRegExp(q)})`, "ig");
  const parts = text.split(pattern);
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
  const [articles, setArticles] = useState<ApiBlog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPublishedBlogs()
      .then(setArticles)
      .catch((loadError) =>
        setError(loadError instanceof Error ? loadError.message : "Unable to load blogs.")
      )
      .finally(() => setIsLoading(false));
  }, []);

  const user = getStoredUser() ?? getUserFromToken();
  const categories = useMemo(
    () => ["All", ...new Set(articles.map((article) => article.category))],
    [articles]
  );
  const tags = useMemo(
    () => [...new Set(articles.flatMap((article) => article.tags))],
    [articles]
  );

  const featuredArticle = useMemo(() => {
    return (
      articles.find((article) => article.featured) ??
      articles[0] ??
      null
    );
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesTag = !activeTag || article.tags.includes(activeTag);
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [activeCategory, activeTag, articles, searchQuery]);

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div />
        <h2 className={styles.topTitle}>Articles</h2>
        <div className={styles.topActions}>
          {isAdminUser(user) && (
            <Link href="/admin" className={styles.writeButton}>
              <FiEdit3 className={styles.writeIcon} aria-hidden />
              Admin
            </Link>
          )}
        </div>
      </header>

      {featuredArticle && (
        <section className={styles.hero}>
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
              <span className={styles.heroPill}>{featuredArticle.category}</span>
              <span className={styles.heroTab}>Featured</span>
            </div>
            <h1 className={styles.heroTitle}>
              {highlightText(featuredArticle.title, searchQuery, styles.highlight)}
            </h1>
            <p className={styles.heroExcerpt}>
              {highlightText(featuredArticle.excerpt, searchQuery, styles.highlight)}
            </p>
            <div className={styles.heroMeta}>
              <div className={styles.avatar}>
                {featuredArticle.author
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
              <div>
                <div className={styles.metaName}>{featuredArticle.author}</div>
                <div className={styles.metaInfo}>
                  {featuredArticle.date} - {featuredArticle.readTime} read
                </div>
              </div>
            </div>
            <Link href={`/blogs/${featuredArticle.id}`} className={styles.readMore}>
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
              className={`${styles.tag} ${activeTag === tag ? styles.tagActive : ""}`}
              onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {error && <p>{error}</p>}
      {isLoading && <PageLoader compact minHeight="320px" />}
      <section className={styles.grid}>
        {filteredArticles.map((article) => (
          <Link key={article.id} href={`/blogs/${article.id}`} className={styles.cardLink}>
            <article className={styles.card}>
              <div
                className={styles.cardImage}
                style={
                  article.coverImage
                    ? { backgroundImage: `url(${article.coverImage})` }
                    : undefined
                }
              >
                <span className={styles.cardBadge}>{article.category}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span>{article.readTime}</span>
                </div>
                <h3 className={styles.cardTitle}>
                  {highlightText(article.title, searchQuery, styles.highlight)}
                </h3>
                <p className={styles.cardExcerpt}>{article.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
