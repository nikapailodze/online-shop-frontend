"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./ConsultationSection.module.css";
import { getStoredBlogs, type BlogArticle } from "@/app/lib/blogs";
import { staticArticles } from "@/app/lib/blogData";

const ConsultationSection = () => {
  const [storedBlogs, setStoredBlogs] = useState<BlogArticle[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    setStoredBlogs(getStoredBlogs().filter((blog) => blog.status !== "draft"));
  }, []);

  const featuredPool = useMemo(() => {
    const resolveTime = (article: BlogArticle) => {
      if (typeof article.createdAt === "number") return article.createdAt;
      const parsed = Date.parse(article.date);
      return Number.isNaN(parsed) ? 0 : parsed;
    };
    const combined = [...storedBlogs, ...staticArticles];
    const sorted = combined.sort((a, b) => resolveTime(b) - resolveTime(a));
    return sorted.slice(0, 5);
  }, [storedBlogs]);

  const featuredArticle = featuredPool[featuredIndex] ?? null;

  useEffect(() => {
    if (featuredPool.length <= 1) return;
    const interval = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredPool.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [featuredPool]);

  return (
    <section className={styles.section} id="consultation">
      <div className={styles.container}>
        <h2 className={styles.title}>Meet the Doctor</h2>
        <div className={styles.content}>
          <div className={styles.imageCard}>
            <Image
              src="/drPicture/drPic.JPG"
              alt="Doctor portrait"
              width={420}
              height={520}
              className={styles.image}
            />
          </div>
          <div className={styles.textBlock}>
            <h3 className={styles.name}>Dr. Mariami Pailodze</h3>
            <p className={styles.bio}>
              Dedicated to endocrine care and practical tools that help
              clinicians make confident decisions. EndoPail blends clinical
              expertise with approachable design so every calculator feels
              clear, fast, and trustworthy. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Sunt, cupiditate neque? Eius id
              facilis vero at voluptates consequatur corrupti, reprehenderit ut
              quasi consectetur unde sed! Libero veniam iure iste laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque vero beatae numquam provident nisi cupiditate necessitatibus, aspernatur incidunt sed iure consequuntur eligendi quidem eum veritatis repudiandae suscipit dolor inventore!
            </p>
            <Link href="/consultation" className={styles.primaryButton}>
              Schedule appointment with me
            </Link>
          </div>
        </div>

        {featuredArticle && (
          <>
            <div className={styles.blogHeader}>
              <h3 className={styles.blogHeaderTitle}>Articles</h3>
              <Link href="/blogs" className={styles.blogBrowse}>
                Explore all blogs
              </Link>
            </div>
            <div className={styles.blogSlider} key={featuredArticle.id}>
              <div className={styles.blogMedia}>
              <div
                className={styles.blogImage}
                style={
                  featuredArticle.coverImage
                    ? { backgroundImage: `url(${featuredArticle.coverImage})` }
                    : undefined
                }
              />
              </div>
              <div className={styles.blogContent}>
              <div className={styles.blogTags}>
                <span className={styles.blogPill}>
                  {featuredArticle.category}
                </span>
                <span className={styles.blogFeatured}>Featured</span>
              </div>
              <h3 className={styles.blogTitle}>{featuredArticle.title}</h3>
              <p className={styles.blogExcerpt}>{featuredArticle.excerpt}</p>
              <div className={styles.blogMeta}>
                <div className={styles.blogAvatar}>
                  {featuredArticle.author
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
                <div>
                  <div className={styles.blogAuthor}>
                    {featuredArticle.author}
                  </div>
                  <div className={styles.blogDate}>
                    {featuredArticle.date} - {featuredArticle.readTime} read
                  </div>
                </div>
              </div>
              <Link
                href={`/blogs/${featuredArticle.id}`}
                className={styles.blogRead}
              >
                Read article
              </Link>
            </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ConsultationSection;
