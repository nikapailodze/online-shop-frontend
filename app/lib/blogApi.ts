import { toApiUrl } from "./api";

export type ApiBlog = {
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
  createdAtUtc?: string;
  updatedAtUtc?: string;
};

export const fetchPublishedBlogs = async (): Promise<ApiBlog[]> => {
  const response = await fetch(toApiUrl("/api/Blogs"), { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load blogs.");
  }
  return response.json();
};

export const fetchBlogById = async (id: string): Promise<ApiBlog> => {
  const response = await fetch(toApiUrl(`/api/Blogs/${id}`), {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Unable to load blog.");
  }
  return response.json();
};
