"use client";

import Link from "next/link";
import { FiEdit3 } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { getStoredBlogs, type BlogArticle } from "../lib/blogs";
import { staticArticles, type BlogCard } from "../lib/blogData";
import styles from "./page.module.scss";

const categories = [
  "All",
  "Technology",
  "Design",
  "Business",
  "Lifestyle",
  "Science",
  "Culture",
];

const tags = [
  "ai",
  "architecture",
  "automation",
  "books",
  "cloud",
  "community",
  "computing",
  "culture",
  "design-systems",
  "devops",
  "focus",
  "innovation",
  "microservices",
  "minimalism",
  "pricing",
  "productivity",
  "psychology",
  "quantum",
  "research",
  "retail",
  "saas",
  "strategy",
  "ux",
  "wellness",
];

const articles: BlogCard[] = staticArticles.map((article) => ({
  ...article,
  imageClass: styles[article.imageClass as keyof typeof styles] ?? "",
}));

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);
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
    return allArticles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;
      const matchesTag = !activeTag || article.tags.includes(activeTag);
      return matchesCategory && matchesTag;
    });
  }, [activeCategory, activeTag, allArticles]);

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
            <div className={styles.heroOrbit} />
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroTags}>
              <span className={styles.heroPill}>
                {featuredArticle.category}
              </span>
              <span className={styles.heroTab}>Featured</span>
            </div>
            <h1 className={styles.heroTitle}>{featuredArticle.title}</h1>
            <p className={styles.heroExcerpt}>{featuredArticle.excerpt}</p>
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
                  {featuredArticle.author}
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
              Read article <span aria-hidden>-></span>
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
            <span className={styles.searchIcon} aria-hidden>
              Search
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              className={styles.searchInput}
              aria-label="Search articles"
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
                  <span className={styles.cardBadge}>{article.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span>{article.readTime}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
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
                      <div className={styles.cardAuthor}>{article.author}</div>
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
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </section>
      )}
    </div>
  );
}
