"use client";

import styles from "../page.module.css";
import type { BlogFormState } from "../types";
import { fileToOptimizedDataUrl } from "../helpers";

type Props = {
  editingBlogId: string | null;
  blogForm: BlogFormState;
  setBlogForm: React.Dispatch<React.SetStateAction<BlogFormState>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function BlogEditorCard({
  editingBlogId,
  blogForm,
  setBlogForm,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className={styles.card}>
      <h2>{editingBlogId ? "Edit blog" : "Create blog"}</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={styles.input}
          placeholder="Title"
          value={blogForm.title}
          onChange={(event) => setBlogForm((current) => ({ ...current, title: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Excerpt"
          value={blogForm.excerpt}
          onChange={(event) => setBlogForm((current) => ({ ...current, excerpt: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Category"
          value={blogForm.category}
          onChange={(event) => setBlogForm((current) => ({ ...current, category: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Author"
          value={blogForm.author}
          onChange={(event) => setBlogForm((current) => ({ ...current, author: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Read time"
          value={blogForm.readTime}
          onChange={(event) => setBlogForm((current) => ({ ...current, readTime: event.target.value }))}
        />
        <input
          className={styles.input}
          placeholder="Tags, comma separated"
          value={blogForm.tags}
          onChange={(event) => setBlogForm((current) => ({ ...current, tags: event.target.value }))}
        />
        <textarea
          className={styles.textarea}
          placeholder="Content"
          value={blogForm.content}
          onChange={(event) => setBlogForm((current) => ({ ...current, content: event.target.value }))}
        />
        <select
          className={styles.input}
          value={blogForm.status}
          onChange={(event) =>
            setBlogForm((current) => ({
              ...current,
              status: event.target.value as "draft" | "published",
            }))
          }
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={blogForm.featured}
            onChange={(event) =>
              setBlogForm((current) => ({ ...current, featured: event.target.checked }))
            }
          />
          Featured article
        </label>
        <label className={styles.upload}>
          <span>Upload cover image</span>
          <input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              const dataUrl = await fileToOptimizedDataUrl(file);
              setBlogForm((current) => ({ ...current, coverImage: dataUrl }));
            }}
          />
        </label>
        <div className={styles.actions}>
          <button className={styles.button} type="submit">
            {editingBlogId ? "Update blog" : "Create blog"}
          </button>
          {editingBlogId ? (
            <button className={styles.secondaryButton} type="button" onClick={onCancel}>
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
