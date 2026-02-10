"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  addStoredBlog,
  getStoredBlogs,
  upsertStoredBlog,
  type BlogArticle,
} from "@/app/lib/blogs";
import styles from "./page.module.scss";

type FormValues = {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: number;
  content: string;
  featured: boolean;
};

export default function WriteArticlePage() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      category: "technology",
      readTime: 5,
      featured: false,
    },
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<BlogArticle[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [draftCreatedAt, setDraftCreatedAt] = useState<number | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [coverError, setCoverError] = useState<string | null>(null);

  const normalizedTags = useMemo(
    () => tags.map((tag) => tag.toLowerCase()),
    [tags]
  );

  useEffect(() => {
    const storedDrafts = getStoredBlogs().filter(
      (blog) => blog.status === "draft"
    );
    setDrafts(storedDrafts);
  }, []);

  const addTag = () => {
    const next = tagInput.trim().replace(/^#/, "");
    if (!next) return;
    if (tags.includes(next)) return;
    setTags((prev) => [...prev, next]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((item) => item !== tag));
  };

  const buildPayload = (values: FormValues, status: "draft" | "published") => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return {
      id: draftId ?? `${Date.now()}`,
      title: values.title,
      excerpt: values.excerpt,
      category:
        values.category.charAt(0).toUpperCase() +
        values.category.slice(1),
      author: values.author,
      readTime: `${values.readTime} min`,
      date,
      tags: normalizedTags.length ? normalizedTags : [values.category],
      content: values.content,
      featured: values.featured,
      status,
      coverImage: coverImage ?? undefined,
      createdAt: draftCreatedAt ?? Date.now(),
    };
  };

  const isQuotaError = (error: unknown) => {
    return (
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED")
    );
  };

  const handlePublish = (values: FormValues) => {
    try {
      const payload = buildPayload(values, "published");
      if (draftId) {
        upsertStoredBlog(payload);
      } else {
        addStoredBlog(payload);
      }

      const storedDrafts = getStoredBlogs().filter(
        (blog) => blog.status === "draft"
      );
      setDrafts(storedDrafts);

      reset();
      setTags([]);
      setTagInput("");
      setCoverImage(null);
      setDraftId(null);
      setDraftCreatedAt(null);
      setStorageError(null);
      router.push("/blogs");
    } catch (error) {
      if (isQuotaError(error)) {
        setStorageError(
          "Storage is full. Try removing the cover image or using a smaller file."
        );
      } else {
        setStorageError("Unable to save. Please try again.");
      }
    }
  };

  const handleSaveDraft = (values: FormValues) => {
    try {
      const payload = buildPayload(values, "draft");
      upsertStoredBlog(payload);
    setDraftId(payload.id);
    setDraftCreatedAt(payload.createdAt ?? Date.now());
      const storedDrafts = getStoredBlogs().filter(
        (blog) => blog.status === "draft"
      );
      setDrafts(storedDrafts);
      setStorageError(null);
    } catch (error) {
      if (isQuotaError(error)) {
        setStorageError(
          "Storage is full. Try removing the cover image or using a smaller file."
        );
      } else {
        setStorageError("Unable to save. Please try again.");
      }
    }
  };

  const loadDraft = (draft: BlogArticle) => {
    setDraftId(draft.id);
    setDraftCreatedAt(draft.createdAt ?? null);
    reset({
      title: draft.title,
      excerpt: draft.excerpt,
      category: draft.category.toLowerCase(),
      author: draft.author,
      readTime: Number(draft.readTime.replace(" min", "")) || 5,
      content: draft.content ?? "",
      featured: Boolean(draft.featured),
    });
    setTags(draft.tags ?? []);
    setTagInput("");
    setCoverImage(draft.coverImage ?? null);
    setStorageError(null);
    setCoverError(null);
  };

  const compressImage = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxSize = 1200;
          let { width, height } = img;
          if (width > maxSize || height > maxSize) {
            const scale = Math.min(maxSize / width, maxSize / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(reader.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleCoverChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImage(file);
      setCoverImage(dataUrl);
      setCoverError(null);
    } catch {
      setCoverError("Failed to process the image. Try another file.");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.leftGroup}>
          <Link href="/blogs" className={styles.backLink}>
            {"<- Back to articles"}
          </Link>
          <h1 className={styles.title}>Write new article</h1>
        </div>
      </header>

      <form className={styles.card} onSubmit={handleSubmit(handlePublish)}>
        <div className={styles.field}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Your article title"
            className={styles.input}
            {...register("title", { required: true })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Excerpt</label>
          <textarea
            placeholder="A brief summary for previews and SEO..."
            className={`${styles.input} ${styles.textarea}`}
            {...register("excerpt", { required: true })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Cover Image</label>
          <label className={styles.uploadBox}>
            {coverImage ? (
              <div
                className={styles.uploadPreview}
                style={{ backgroundImage: `url(${coverImage})` }}
              />
            ) : (
              <>
                <div className={styles.uploadIcon}>Image</div>
                <div>Click to upload cover image</div>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleCoverChange}
            />
          </label>
          {coverError && <p className={styles.errorText}>{coverError}</p>}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select className={styles.input} {...register("category")}>
              <option value="technology">technology</option>
              <option value="design">design</option>
              <option value="business">business</option>
              <option value="lifestyle">lifestyle</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Author Name</label>
            <input
              type="text"
              placeholder="Author"
              className={styles.input}
              {...register("author", { required: true })}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Reading Time (min)</label>
            <input
              type="number"
              placeholder="5"
              className={styles.input}
              {...register("readTime", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Tags</label>
          <div className={styles.tagRow}>
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              className={styles.input}
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTag();
                }
              }}
            />
            <button
              className={styles.tagButton}
              type="button"
              onClick={addTag}
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className={styles.tagList}>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={styles.tagChip}
                  onClick={() => removeTag(tag)}
                >
                  #{tag} ×
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Content (Markdown)</label>
          <textarea
            placeholder="Write your article content in Markdown..."
            className={`${styles.input} ${styles.content}`}
            {...register("content")}
          />
        </div>

        <label className={styles.checkboxRow}>
          <input type="checkbox" {...register("featured")} />
          <span>Mark as featured article</span>
        </label>

        <div className={styles.footer}>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={handleSubmit(handleSaveDraft)}
          >
            Save Draft
          </button>
          <button className={styles.primaryButton} type="submit">
            Publish
          </button>
        </div>
        {storageError && <p className={styles.errorText}>{storageError}</p>}
      </form>

      <section className={styles.drafts}>
        <div className={styles.draftsHeader}>
          <h2>Drafts</h2>
          <p>Drafts are saved locally on this device.</p>
        </div>
        {drafts.length === 0 ? (
          <div className={styles.draftsEmpty}>No drafts yet.</div>
        ) : (
          <div className={styles.draftsList}>
            {drafts.map((draft) => (
              <button
                key={draft.id}
                type="button"
                className={styles.draftCard}
                onClick={() => loadDraft(draft)}
              >
                <div>
                  <div className={styles.draftTitle}>{draft.title}</div>
                  <div className={styles.draftMeta}>
                    {draft.category} · {draft.date}
                  </div>
                </div>
                <span className={styles.draftBadge}>Draft</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
