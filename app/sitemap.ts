import type {MetadataRoute} from "next";
import {posts} from "@/lib/blog";

const BASE = "https://finpersona.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const blogPosts: MetadataRoute.Sitemap = posts.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [
    {url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0},
    {url: `${BASE}/events`, lastModified: now, changeFrequency: "daily", priority: 0.9},
    {url: `${BASE}/marketplace`, lastModified: now, changeFrequency: "daily", priority: 0.9},
    {url: `${BASE}/advisors`, lastModified: now, changeFrequency: "weekly", priority: 0.8},
    {url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85},
    ...blogPosts,
    {url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5},
    {url: `${BASE}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3},
    {url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3},
    {url: `${BASE}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.5},
  ];
}
