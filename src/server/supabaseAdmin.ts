import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key (bypasses RLS).
 * Used by the Stripe webhook to record payments that no browser session
 * owns. Never import this from client code.
 */
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  if (!client) {
    client = createClient(url, serviceKey, { auth: { persistSession: false } });
  }
  return client;
}
