"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client for auth. Both values are public by design
 * (the anon key is protected by Row Level Security server-side).
 * Returns null when Supabase isn't configured — callers fall back to
 * the local mock, mirroring the Stripe integration pattern.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;
if (url && anonKey && url.startsWith("https://")) {
  client = createClient(url, anonKey);
}

export function getSupabase(): SupabaseClient | null {
  return client;
}
