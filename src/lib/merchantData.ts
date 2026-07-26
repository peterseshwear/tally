"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Payment, PaymentStatus } from "@/state/tally";

interface PaymentRow {
  id: string;
  cents: number;
  description: string;
  method: string;
  status: PaymentStatus;
  processor_id: string | null;
  created_at: string;
}

/** "Just now", "9:41 AM" (today), "Yesterday", or "Jul 26". */
export function formatTime(iso: string): string {
  const then = new Date(iso);
  const now = new Date();
  if (now.getTime() - then.getTime() < 60_000) return "Just now";
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (then >= startOfToday) {
    return then.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  if (then >= startOfYesterday) return "Yesterday";
  return then.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function mapRow(row: PaymentRow): Payment {
  return {
    id: row.id,
    cents: row.cents,
    desc: row.description,
    method: row.method,
    status: row.status,
    time: formatTime(row.created_at),
    createdAt: row.created_at,
    processorId: row.processor_id ?? undefined,
  };
}

export async function loadMerchant(
  supabase: SupabaseClient,
  uid: string,
): Promise<{ businessName: string; bizType: number } | null> {
  const { data, error } = await supabase
    .from("merchants")
    .select("business_name, biz_type")
    .eq("id", uid)
    .maybeSingle();
  if (error || !data) return null;
  return { businessName: data.business_name, bizType: data.biz_type };
}

export async function saveMerchant(
  supabase: SupabaseClient,
  uid: string,
  email: string,
  businessName: string,
  bizType: number,
): Promise<void> {
  await supabase
    .from("merchants")
    .upsert({ id: uid, email, business_name: businessName, biz_type: bizType });
}

export async function loadPayments(supabase: SupabaseClient): Promise<Payment[] | null> {
  const { data, error } = await supabase
    .from("payments")
    .select("id, cents, description, method, status, processor_id, created_at")
    .order("created_at", { ascending: false });
  if (error || !data) return null;
  return (data as PaymentRow[]).map(mapRow);
}

/** Inserts a payment and returns the stored row (with DB id), or null. */
export async function insertPayment(
  supabase: SupabaseClient,
  uid: string,
  p: { cents: number; description: string; method: string; processorId?: string },
): Promise<Payment | null> {
  const { data, error } = await supabase
    .from("payments")
    .insert({
      merchant_id: uid,
      cents: p.cents,
      description: p.description,
      method: p.method,
      status: "Paid",
      processor_id: p.processorId ?? null,
    })
    .select("id, cents, description, method, status, processor_id, created_at")
    .single();
  if (error || !data) return null;
  return mapRow(data as PaymentRow);
}

export async function updatePaymentStatus(
  supabase: SupabaseClient,
  id: string,
  status: PaymentStatus,
): Promise<void> {
  await supabase.from("payments").update({ status }).eq("id", id);
}
