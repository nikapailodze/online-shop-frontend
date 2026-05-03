import styles from "../page.module.css";
import type { Blog } from "../types";

export default function BlogListCard({
  blogs,
  onEdit,
}: {
  blogs: Blog[];
  onEdit: (blog: Blog) => void;
}) {
  return (
    <div className={styles.card}>
      <h2>Blog posts</h2>
      <div className={styles.list}>
        {blogs.map((blog) => (
          <div key={blog.id} className={styles.listItem}>
            <strong>{blog.title}</strong>
            <span>
              {blog.category} • {blog.status}
            </span>
            <button className={styles.secondaryButton} type="button" onClick={() => onEdit(blog)}>
              Edit
            </button>
          </div>
        ))}
        {blogs.length === 0 ? <p>No blogs yet.</p> : null}
      </div>
    </div>
  );
}
