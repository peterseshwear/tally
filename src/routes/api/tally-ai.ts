import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export const Route = createFileRoute("/api/tally-ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as {
          messages?: ChatMessage[];
          context?: { page?: string; route?: string };
        };
        if (!Array.isArray(body.messages)) {
          return new Response("messages required", { status: 400 });
        }

        const ctx = body.context ?? {};
        const system: ChatMessage = {
          role: "system",
          content: [
            "You are Tally AI — an ecommerce copilot inside the Tally payments platform.",
            "Tally helps Shopify, WooCommerce, Magento and BigCommerce merchants accept payments, manage customers, run analytics, and configure checkouts.",
            "Voice: warm, concise, expert. Use short paragraphs, bullet lists, and markdown. Never invent business data.",
            "The merchant account is brand new — assume no transactions, customers, or analytics exist yet. If they ask about their data, say so plainly and suggest the next setup step.",
            "When suggesting an action, name the exact page (Transactions, Customers, Checkout, Payments, Payouts, Integrations, Settings, Developers).",
            `Current page context: ${ctx.page ?? "unknown"} (${ctx.route ?? "/"}).`,
          ].join("\n"),
        };

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            stream: true,
            messages: [system, ...body.messages],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          return new Response(text || "Upstream error", { status: upstream.status });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      },
    },
  },
});
