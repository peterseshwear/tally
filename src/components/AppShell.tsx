"use client";

import { useTally, type Tab } from "@/state/tally";
import HomeScreen from "./screens/HomeScreen";
import PaymentsScreen from "./screens/PaymentsScreen";
import PayoutsScreen from "./screens/PayoutsScreen";
import DisputesScreen from "./screens/DisputesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DetailDrawer from "./DetailDrawer";
import ChargeModal from "./ChargeModal";

const NAV: { key: Tab; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "payments", label: "Payments" },
  { key: "payouts", label: "Payouts" },
  { key: "disputes", label: "Disputes" },
  { key: "settings", label: "Settings" },
];

const SCREENS: Record<Tab, React.ComponentType> = {
  home: HomeScreen,
  payments: PaymentsScreen,
  payouts: PayoutsScreen,
  disputes: DisputesScreen,
  settings: SettingsScreen,
};

export default function AppShell() {
  const { tab, go, dispSubmitted, openCharge, selId, chargeOpen } = useTally();
  const Screen = SCREENS[tab];

  return (
    <div className="shell">
      <div className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">T</div>
          <span className="brand-name">TALLY</span>
        </div>
        <div className="btn-new-charge" onClick={openCharge}>
          + New charge
        </div>
        {NAV.map((n) => (
          <div key={n.key} className={`nav-item${tab === n.key ? " nav-item--active" : ""}`} onClick={() => go(n.key)}>
            <span>{n.label}</span>
            {n.key === "disputes" && !dispSubmitted && <span className="nav-dot" />}
          </div>
        ))}
        <div className="account-card">
          <b>Oat &amp; Ivy Café</b>
          <br />
          Sandbox · payouts daily
        </div>
      </div>

      <div className="main">
        <Screen />
      </div>

      {selId !== null && <DetailDrawer />}
      {chargeOpen && <ChargeModal />}
    </div>
  );
}
