"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getStoredBlogs, type BlogArticle } from "@/app/lib/blogs";
import { staticArticles } from "@/app/lib/blogData";
import styles from "./page.module.scss";

const formatDate = (value: string) => {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const renderContent = (content?: string) => {
  if (!content) return null;
  const lines = content.split(/\r?\n/);
  const blocks: Array<JSX.Element> = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`list-${blocks.length}`} className={styles.list}>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    if (line.startsWith("- ")) {
      listItems.push(line.replace("- ", ""));
      return;
    }

    flushList();

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${index}`} className={styles.subheading}>
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${index}`} className={styles.heading}>
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }

    if (line.trim().length === 0) {
      blocks.push(<div key={`space-${index}`} className={styles.spacer} />);
      return;
    }

    blocks.push(
      <p key={`p-${index}`} className={styles.paragraph}>
        {line}
      </p>
    );
  });

  flushList();
  return blocks;
};

export default function BlogDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [storedBlogs, setStoredBlogs] = useState<BlogArticle[]>([]);

  useEffect(() => {
    setStoredBlogs(getStoredBlogs());
  }, []);

  const article = useMemo(() => {
    const combined = [...storedBlogs, ...staticArticles];
    return combined.find((item) => item.id === id) ?? null;
  }, [storedBlogs, id]);

  if (!article) {
    return (
      <div className={styles.page}>
        <Link href="/blogs" className={styles.backLink}>
          {"<- Back to articles"}
        </Link>
        <div className={styles.notFound}>Article not found.</div>
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
            <div className={styles.date}>{formatDate(article.date)}</div>
          </div>
        </div>
        <button className={styles.shareButton} type="button">
          Share
        </button>
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

      {article.tags?.length ? (
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
      ) : null}
    </div>
  );
}
