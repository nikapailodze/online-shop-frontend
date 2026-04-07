"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { toApiUrl } from "../lib/api";
import { getStoredToken, getStoredUser, getUserFromToken, isAdminUser } from "../lib/auth";

type Consultation = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  idNumber?: string;
  reason: string;
  date: string;
  time: string;
  createdAtUtc: string;
};

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  tags: string[];
  status: "draft" | "published";
  featured?: boolean;
  coverImage?: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  colors: string[];
};

const authHeaders = (): Record<string, string> => {
  const token = getStoredToken();
  if (!token) {
    return {};
  }

  return { Authorization: `Bearer ${token}` };
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const fileToOptimizedDataUrl = async (file: File) => {
  const originalDataUrl = await readFileAsDataUrl(file);

  if (!file.type.startsWith("image/")) {
    return originalDataUrl;
  }

  const image = await loadImage(originalDataUrl);
  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const targetWidth = Math.max(1, Math.round(image.width * scale));
  const targetHeight = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");
  if (!context) {
    return originalDataUrl;
  }

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const optimizedDataUrl =
    mimeType === "image/png"
      ? canvas.toDataURL(mimeType)
      : canvas.toDataURL(mimeType, 0.82);

  return optimizedDataUrl.length < originalDataUrl.length
    ? optimizedDataUrl
    : originalDataUrl;
};

export default function AdminPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isProductImageProcessing, setIsProductImageProcessing] = useState(false);
  const [productImageError, setProductImageError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);

  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    category: "Endocrinology",
    author: "",
    readTime: "5 min",
    content: "",
    tags: "",
    status: "published" as "draft" | "published",
    featured: false,
    coverImage: "",
  });

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    sizes: "S,M,L,XL",
    colors: "black,white",
  });

  const adminUser = useMemo(() => {
    return getStoredUser() ?? getUserFromToken();
  }, []);

  useEffect(() => {
    if (!isAdminUser(adminUser)) {
      router.push("/login");
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [consultationResponse, blogResponse, productResponse] = await Promise.all([
          fetch(toApiUrl("/api/Consultations/admin/all"), {
            headers: authHeaders(),
          }),
          fetch(toApiUrl("/api/Blogs/admin/all"), {
            headers: authHeaders(),
          }),
          fetch(toApiUrl("/api/Products")),
        ]);

        if (!consultationResponse.ok || !blogResponse.ok || !productResponse.ok) {
          throw new Error("Unable to load admin data.");
        }

        const [consultationBody, blogBody, productBody] = await Promise.all([
          consultationResponse.json(),
          blogResponse.json(),
          productResponse.json(),
        ]);

        setConsultations(Array.isArray(consultationBody) ? consultationBody : []);
        setBlogs(Array.isArray(blogBody) ? blogBody : []);
        setProducts(Array.isArray(productBody) ? productBody : []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load admin data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [adminUser, router]);

  const resetBlogForm = useCallback(() => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      excerpt: "",
      category: "Endocrinology",
      author: adminUser?.Name ? `${adminUser.Name} ${adminUser.Surname ?? ""}`.trim() : "",
      readTime: "5 min",
      content: "",
      tags: "",
      status: "published",
      featured: false,
      coverImage: "",
    });
  }, [adminUser?.Name, adminUser?.Surname]);

  useEffect(() => {
    resetBlogForm();
  }, [adminUser?.Email, resetBlogForm]);

  const handleBlogSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const endpoint = editingBlogId
      ? toApiUrl(`/api/Blogs/admin/${editingBlogId}`)
      : toApiUrl("/api/Blogs/admin");
    const method = editingBlogId ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({
        ...blogForm,
        tags: blogForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });

    const body = await response.json().catch(() => null);
    if (!response.ok) {
      setError(body?.message ?? "Unable to save blog.");
      return;
    }

    const refresh = await fetch(toApiUrl("/api/Blogs/admin/all"), {
      headers: authHeaders(),
    });
    setBlogs(await refresh.json());
    resetBlogForm();
  };

  const startEditBlog = (blog: Blog) => {
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      content: blog.content,
      tags: blog.tags.join(", "),
      status: blog.status,
      featured: Boolean(blog.featured),
      coverImage: blog.coverImage ?? "",
    });
  };

  const handleProductSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setProductError(null);
    setProductImageError(null);

    if (isProductImageProcessing) {
      setProductError("Image upload is still processing. Wait a moment and submit again.");
      return;
    }

    if (!productForm.imageUrl) {
      setProductError("Upload a product image before creating the product.");
      return;
    }

    setIsSubmittingProduct(true);

    try {
      const response = await fetch(toApiUrl("/api/Products/admin"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          name: productForm.name,
          description: productForm.description,
          price: Number(productForm.price),
          imageUrl: productForm.imageUrl,
          sizes: productForm.sizes.split(",").map((value) => value.trim()).filter(Boolean),
          colors: productForm.colors.split(",").map((value) => value.trim()).filter(Boolean),
        }),
      });

      const body = await response.json().catch(() => null);
      if (!response.ok) {
        const message = Array.isArray(body?.message)
          ? body.message.join(", ")
          : body?.message ?? "Unable to create product.";
        setProductError(message);
        return;
      }

      const refreshedProducts = await fetch(toApiUrl("/api/Products"));
      setProducts(await refreshedProducts.json());
      setProductForm({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        sizes: "S,M,L,XL",
        colors: "black,white",
      });
    } catch (submitError) {
      setProductError(
        submitError instanceof Error ? submitError.message : "Unable to create product.",
      );
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  if (!isAdminUser(adminUser)) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Admin</p>
          <h1 className={styles.title}>Dashboard</h1>
        </div>
        <Link className={styles.link} href="/blogs">
          View blogs
        </Link>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {loading ? <p className={styles.card}>Loading admin data...</p> : null}

      {!loading && (
        <>
          <section className={styles.grid}>
            <div className={styles.card}>
              <h2>Consultations</h2>
              <div className={styles.list}>
                {consultations.map((consultation) => (
                  <div key={consultation.id} className={styles.listItem}>
                    <strong>
                      {consultation.name} {consultation.surname}
                    </strong>
                    <span>{consultation.email}</span>
                    <span>{consultation.phoneNumber}</span>
                    <span>
                      {consultation.date} at {consultation.time}
                    </span>
                    <span>{consultation.reason}</span>
                  </div>
                ))}
                {consultations.length === 0 && <p>No consultations yet.</p>}
              </div>
            </div>

            <div className={styles.card}>
              <h2>{editingBlogId ? "Edit blog" : "Create blog"}</h2>
              <form className={styles.form} onSubmit={handleBlogSubmit}>
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
                  {editingBlogId && (
                    <button className={styles.secondaryButton} type="button" onClick={resetBlogForm}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          <section className={styles.grid}>
            <div className={styles.card}>
              <h2>Blog posts</h2>
              <div className={styles.list}>
                {blogs.map((blog) => (
                  <div key={blog.id} className={styles.listItem}>
                    <strong>{blog.title}</strong>
                    <span>
                      {blog.category} • {blog.status}
                    </span>
                    <button className={styles.secondaryButton} type="button" onClick={() => startEditBlog(blog)}>
                      Edit
                    </button>
                  </div>
                ))}
                {blogs.length === 0 && <p>No blogs yet.</p>}
              </div>
            </div>

            <div className={styles.card}>
              <h2>Create product</h2>
              <form className={styles.form} onSubmit={handleProductSubmit}>
                <input
                  className={styles.input}
                  placeholder="Name"
                  required
                  value={productForm.name}
                  onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                />
                <textarea
                  className={styles.textarea}
                  placeholder="Description"
                  required
                  value={productForm.description}
                  onChange={(event) => setProductForm((current) => ({ ...current, description: event.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="Price"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={productForm.price}
                  onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="Sizes: S,M,L"
                  value={productForm.sizes}
                  onChange={(event) => setProductForm((current) => ({ ...current, sizes: event.target.value }))}
                />
                <input
                  className={styles.input}
                  placeholder="Colors: black,white"
                  value={productForm.colors}
                  onChange={(event) => setProductForm((current) => ({ ...current, colors: event.target.value }))}
                />
                <label className={styles.upload}>
                  <span>Upload product image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      setProductImageError(null);

                      if (!file) {
                        setProductForm((current) => ({ ...current, imageUrl: "" }));
                        return;
                      }

                      setIsProductImageProcessing(true);
                      try {
                        const dataUrl = await fileToOptimizedDataUrl(file);
                        setProductForm((current) => ({ ...current, imageUrl: dataUrl }));
                      } catch {
                        setProductForm((current) => ({ ...current, imageUrl: "" }));
                        setProductImageError("Unable to process that image. Try a JPG or PNG file.");
                      } finally {
                        setIsProductImageProcessing(false);
                      }
                    }}
                  />
                </label>
                {isProductImageProcessing ? <p className={styles.info}>Processing image...</p> : null}
                {productImageError ? <p className={styles.error}>{productImageError}</p> : null}
                {productError ? <p className={styles.error}>{productError}</p> : null}
                {productForm.imageUrl ? (
                  <Image
                    src={productForm.imageUrl}
                    alt="Product preview"
                    width={240}
                    height={240}
                    unoptimized
                    style={{
                      width: "100%",
                      maxWidth: "240px",
                      height: "auto",
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                  />
                ) : null}
                <button
                  className={styles.button}
                  type="submit"
                  disabled={isProductImageProcessing || isSubmittingProduct}
                >
                  {isSubmittingProduct ? "Creating..." : "Create product"}
                </button>
              </form>
            </div>
          </section>

          <section className={styles.card}>
            <h2>Products</h2>
            <div className={styles.list}>
              {products.map((product) => (
                <div key={product.id} className={styles.listItem}>
                  <strong>{product.name}</strong>
                  <span>{product.price.toFixed(2)} GEL</span>
                  <span>{product.description}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
