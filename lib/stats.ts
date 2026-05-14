import {unstable_cache} from "next/cache";
import {createServiceClient} from "./supabase/service";

export interface PlatformStats {
  receiptsTotal: number;
  receiptsToday: number;
  trackedSpendMyr: number;
  spendThisWeek: number;
  lhdnReliefsMyr: number;
  lhdnAvgPerUser: number;
  activeUsers: number;
}

async function fetchPlatformStats(): Promise<PlatformStats> {
  const sb = createServiceClient();
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const weekAgo = new Date(now.getTime() - 7 * 86400000);

  const [{data: receipts}, {count: userCount}] = await Promise.all([
    sb.from("receipts").select("total_amount,is_claimable,created_at"),
    sb.from("profiles").select("id", {count: "exact", head: true}),
  ]);

  const all = (receipts ?? []) as {total_amount: number | null; is_claimable: boolean; created_at: string}[];
  const todayR = all.filter(r => new Date(r.created_at) >= todayStart);
  const weekR = all.filter(r => new Date(r.created_at) >= weekAgo);
  const claimable = all.filter(r => r.is_claimable);

  const trackedSpend = all.reduce((s, r) => s + (r.total_amount ?? 0), 0);
  const weekSpend = weekR.reduce((s, r) => s + (r.total_amount ?? 0), 0);
  const lhdnTotal = claimable.reduce((s, r) => s + (r.total_amount ?? 0), 0);
  const users = userCount ?? 0;

  return {
    receiptsTotal: all.length,
    receiptsToday: todayR.length,
    trackedSpendMyr: trackedSpend,
    spendThisWeek: weekSpend,
    lhdnReliefsMyr: lhdnTotal,
    lhdnAvgPerUser: users > 0 ? Math.round(lhdnTotal / users) : 0,
    activeUsers: users,
  };
}

export const getPlatformStats = unstable_cache(
  fetchPlatformStats,
  ["platform-stats"],
  {revalidate: 300}
);

export function fmtCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return n.toLocaleString("en-MY");
  return n.toString();
}

export function fmtCurrency(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return Math.round(n).toLocaleString("en-MY");
}
