export type BlogArticle = {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  content?: string;
  featured?: boolean;
  status?: "draft" | "published";
  coverImage?: string;
  createdAt?: number;
};

const STORAGE_KEY = "endopai_blogs_v1";

const safeParse = (value: string | null): BlogArticle[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed as BlogArticle[];
  } catch {
    return [];
  }
};

export const getStoredBlogs = (): BlogArticle[] => {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

export const saveStoredBlogs = (blogs: BlogArticle[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
};

export const addStoredBlog = (blog: BlogArticle) => {
  const current = getStoredBlogs();
  saveStoredBlogs([blog, ...current]);
};

export const upsertStoredBlog = (blog: BlogArticle) => {
  const current = getStoredBlogs();
  const index = current.findIndex((item) => item.id === blog.id);
  if (index === -1) {
    saveStoredBlogs([blog, ...current]);
    return;
  }
  const next = [...current];
  next[index] = blog;
  saveStoredBlogs(next);
};
