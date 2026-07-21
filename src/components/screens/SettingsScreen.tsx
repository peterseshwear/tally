"use client";

import { useTally, type RailKey, type StoreKey } from "@/state/tally";

const RAILS: { key: RailKey; name: string; initial: string; logoBg: string; detail: string }[] = [
  { key: "stripeOn", name: "Stripe", initial: "S", logoBg: "#635bff", detail: "US cards, tap-to-pay SDK" },
  { key: "adyenOn", name: "Adyen", initial: "A", logoBg: "#0abf53", detail: "EU cards, high volume" },
];

const STORES: {
  key: StoreKey;
  name: string;
  initial: string;
  logoBg: string;
  onDetail: string;
  offDetail: string;
}[] = [
  {
    key: "shopify",
    name: "Shopify",
    initial: "S",
    logoBg: "#95bf47",
    onDetail: "oatandivy.myshopify.com · syncing",
    offDetail: "Add Tally to your Shopify checkout",
  },
  {
    key: "woo",
    name: "WooCommerce",
    initial: "W",
    logoBg: "#7f54b3",
    onDetail: "oatandivycafe.com · syncing",
    offDetail: "Install the Tally plugin for WordPress",
  },
];

export default function SettingsScreen() {
  const tally = useTally();
  const { toggleRail, toggleStore } = tally;
  const railOn = { stripeOn: tally.stripeOn, adyenOn: tally.adyenOn };
  const storeOn = { shopify: tally.shopify, woo: tally.woo };

  return (
    <div className="page page--640">
      <h1>Settings</h1>

      <div className="settings-card">
        <div className="settings-head">
          <div className="settings-title">Processing rails</div>
          <div className="settings-sub">Tally routes each payment to the best rail automatically.</div>
        </div>
        {RAILS.map((r) => {
          const on = railOn[r.key];
          return (
            <div key={r.key} className={`rail${on ? "" : " rail--off"}`}>
              <div className="logo-tile" style={{ background: r.logoBg }}>
                {r.initial}
              </div>
              <div className="rail-text">
                <div className="rail-name-row">
                  <span className="rail-name">{r.name}</span>
                  <span className={`stat-pill${on ? " stat-pill--on" : ""}`}>{on ? "Active" : "Paused"}</span>
                </div>
                <span className="rail-detail">{r.detail}</span>
              </div>
              <div className={`toggle${on ? " toggle--on" : ""}`} onClick={() => toggleRail(r.key)}>
                <div className="toggle-knob" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="settings-card">
        <div className="settings-head">
          <div className="settings-title">Store integrations</div>
          <div className="settings-sub">Online orders land in the same dashboard as in-person sales.</div>
        </div>
        {STORES.map((s) => {
          const on = storeOn[s.key];
          return (
            <div key={s.key} className="rail">
              <div className="logo-tile" style={{ background: s.logoBg }}>
                {s.initial}
              </div>
              <div className="rail-text">
                <div className="rail-name-row">
                  <span className="rail-name">{s.name}</span>
                  <span className={`stat-pill${on ? " stat-pill--on" : ""}`}>
                    {on ? "Connected" : "Not connected"}
                  </span>
                </div>
                <span className="rail-detail">{on ? s.onDetail : s.offDetail}</span>
              </div>
              <div
                className={`btn-store ${on ? "btn-store--manage" : "btn-store--connect"}`}
                onClick={() => toggleStore(s.key)}
              >
                {on ? "Manage" : "Connect"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
