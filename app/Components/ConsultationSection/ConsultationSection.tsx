"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./ConsultationSection.module.css";
import { fetchPublishedBlogs, type ApiBlog } from "@/app/lib/blogApi";

const ConsultationSection = () => {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);

  useEffect(() => {
    fetchPublishedBlogs().then(setBlogs).catch(() => setBlogs([]));
  }, []);

  const featuredPool = useMemo(() => {
    return blogs.slice(0, 5);
  }, [blogs]);

  const featuredArticle = featuredPool[0] ?? null;

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
              Hi there! As a Medical Doctor and Endocrinology Resident at
              Caucasus Medical Center, I specialize in diagnosing and managing
              endocrine disorders while actively contributing to medical
              research. With expertise in drug safety, pharmacovigilance, and
              clinical trials, I ensure patient safety and evidence-based
              treatment approaches. As a Study Coordinator for a Phase III
              clinical trial, and member of the Endocrinology Association, I
              am committed to advancing healthcare through research,
              innovation, and multidisciplinary collaboration.
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
