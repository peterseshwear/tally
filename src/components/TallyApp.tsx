"use client";

import { TallyProvider, useTally } from "@/state/tally";
import Onboarding from "./Onboarding";
import AppShell from "./AppShell";

function Root() {
  const { entered } = useTally();
  return entered ? <AppShell /> : <Onboarding />;
}

export default function TallyApp() {
  return (
    <TallyProvider>
      <Root />
    </TallyProvider>
  );
}
