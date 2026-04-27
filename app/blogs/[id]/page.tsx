"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchBlogById, type ApiBlog } from "@/app/lib/blogApi";
import PageLoader from "@/app/Components/PageLoader/PageLoader";
import styles from "./page.module.scss";

const renderContent = (content?: string) => {
  if (!content) return null;
  const lines = content.split(/\r?\n/);
  return lines.map((line, index) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className={styles.heading}>
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className={styles.subheading}>
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={index} className={styles.paragraph}>
          {line.replace("- ", "")}
        </li>
      );
    }
    if (!line.trim()) {
      return <div key={index} className={styles.spacer} />;
    }
    return (
      <p key={index} className={styles.paragraph}>
        {line}
      </p>
    );
  });
};

export default function BlogDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [article, setArticle] = useState<ApiBlog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchBlogById(id)
      .then(setArticle)
      .catch((loadError) =>
        setError(loadError instanceof Error ? loadError.message : "Unable to load blog.")
      );
  }, [id]);

  if (error) {
    return (
      <div className={styles.page}>
        <Link href="/blogs" className={styles.backLink}>
          {"<- Back to articles"}
        </Link>
        <div className={styles.notFound}>{error}</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={styles.page}>
        <Link href="/blogs" className={styles.backLink}>
          {"<- Back to articles"}
        </Link>
        <PageLoader compact minHeight="320px" />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/blogs" className={styles.backLink}>
        {"<- Back to articles"}
      </Link>
      <div className={styles.metaRow}>
        <span className={styles.category}>{article.category}</span>
        <span className={styles.readTime}>{article.readTime} read</span>
      </div>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <div className={styles.authorRow}>
        <div className={styles.authorLeft}>
          <div className={styles.avatar}>
            {article.author
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>
          <div>
            <div className={styles.authorName}>{article.author}</div>
            <div className={styles.date}>{article.date}</div>
          </div>
        </div>
      </div>
      <div
        className={styles.cover}
        style={
          article.coverImage
            ? { backgroundImage: `url(${article.coverImage})` }
            : undefined
        }
      />
      <div className={styles.content}>{renderContent(article.content)}</div>
      {!!article.tags?.length && (
        <div className={styles.tagsSection}>
          <div className={styles.tagsTitle}>Tags</div>
          <div className={styles.tags}>
            {article.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
