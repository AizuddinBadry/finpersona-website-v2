export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  updatedAt?: string;
  author: {name: string; role: string};
  coverGradient: string;
  coverIcon: string;
  tags: string[];
}

export const posts: BlogPost[] = [
  {
    slug: "maximize-lhdn-tax-relief",
    title: "How to Maximize Your LHDN Tax Relief in 2026: A Complete Guide for Malaysians",
    description: "A practical walkthrough of every major LHDN tax relief category available to Malaysian residents — Lifestyle, Medical, Sports, Skills, SSPN, EPF, and more. Learn exactly what qualifies, the caps, and how to keep receipts organised so you never leave money on the table.",
    category: "Tax Guide",
    readingTime: "9 min read",
    publishedAt: "2026-04-15",
    author: {name: "Finpersona Team", role: "Tax & Finance"},
    coverGradient: "linear-gradient(140deg,#2A1758 0%,#5837C9 60%,#8E73F0 100%)",
    coverIcon: "tax",
    tags: ["LHDN", "tax relief", "Borang BE", "tax savings", "Malaysia tax 2026"],
  },
  {
    slug: "emergency-fund-malaysia",
    title: "Building an Emergency Fund in Malaysia: How Much Is Enough and Where to Keep It",
    description: "Most Malaysians carry less than 3 months of expenses in liquid savings — dangerously thin when the unexpected hits. This guide covers the right target, where to park it (high-yield accounts, ASNB, Money Market funds), and a simple plan to build it without touching your lifestyle.",
    category: "Personal Finance",
    readingTime: "7 min read",
    publishedAt: "2026-05-02",
    author: {name: "Finpersona Team", role: "Tax & Finance"},
    coverGradient: "linear-gradient(140deg,#064E3B 0%,#047857 60%,#34D399 100%)",
    coverIcon: "savings",
    tags: ["emergency fund", "savings Malaysia", "ASNB", "money market fund", "personal finance"],
  },
  {
    slug: "track-expenses-ai",
    title: "Why Manual Budgeting Fails — and How AI-Powered Expense Tracking Changes the Game",
    description: "Spreadsheets, banking apps, notebooks — most people try all three and still feel confused about where their money goes. Here's why traditional methods fail, what AI-powered tracking does differently, and how automatic receipt capture and smart categorisation can cut the time you spend on personal finance to under 5 minutes a week.",
    category: "Personal Finance",
    readingTime: "6 min read",
    publishedAt: "2026-05-10",
    author: {name: "Finpersona Team", role: "Tax & Finance"},
    coverGradient: "linear-gradient(140deg,#1A1530 0%,#6E4CE6 60%,#C9BAFB 100%)",
    coverIcon: "ai",
    tags: ["expense tracking", "AI finance", "budgeting", "receipt scanning", "personal finance app Malaysia"],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-MY", {
    day: "numeric", month: "long", year: "numeric",
  });
}
