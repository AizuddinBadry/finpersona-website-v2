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

const PAGE_SIZE = 1000;

type ReceiptRow = {total_amount: number | null; is_claimable: boolean; created_at: string};

async function fetchAllReceipts(sb: ReturnType<typeof createServiceClient>): Promise<ReceiptRow[]> {
  const all: ReceiptRow[] = [];
  let from = 0;
  while (true) {
    const {data, error} = await sb
      .from("receipts")
      .select("total_amount,is_claimable,created_at")
      .range(from, from + PAGE_SIZE - 1);
    if (error || !data || data.length === 0) break;
    all.push(...(data as ReceiptRow[]));
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all;
}

async function fetchPlatformStats(): Promise<PlatformStats> {
  const sb = createServiceClient();
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const weekAgo = new Date(now.getTime() - 7 * 86400000);

  const [{count: userCount}, receipts] = await Promise.all([
    sb.from("profiles").select("id", {count: "exact", head: true}),
    fetchAllReceipts(sb),
  ]);

  const todayR = receipts.filter(r => new Date(r.created_at) >= todayStart);
  const weekR = receipts.filter(r => new Date(r.created_at) >= weekAgo);
  const claimable = receipts.filter(r => r.is_claimable);

  const trackedSpend = receipts.reduce((s, r) => s + (r.total_amount ?? 0), 0);
  const weekSpend = weekR.reduce((s, r) => s + (r.total_amount ?? 0), 0);
  const lhdnTotal = claimable.reduce((s, r) => s + (r.total_amount ?? 0), 0);
  const users = userCount ?? 0;

  return {
    receiptsTotal: receipts.length,
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
