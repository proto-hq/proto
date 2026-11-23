import { useState } from "react";
import { StayCheckout, type StayRoomTier } from "./components/stay-checkout";

const DEFAULT_TIERS: ReadonlyArray<StayRoomTier> = [
  {
    id: "cliffside",
    name: "Cliffside Villa Suite",
    description: "Private plunge pool, ocean terrace, late 13:00 checkout",
    nightlyDelta: 0,
  },
  {
    id: "penthouse",
    name: "Sunset Pavilion + Chef Kitchen",
    description: "Panoramic deck, private breakfast service each morning",
    nightlyDelta: 220,
  },
];

export function App() {
  const [selectedTierId, setSelectedTierId] = useState("cliffside");
  const [status, setStatus] = useState<"ready" | "confirmed">("ready");

  return (
    <StayCheckout
      stayName="Casa Mare"
      location="Lagoa da Conceicao, Florianopolis"
      rating="4.96"
      reviewsCount={128}
      dates="Oct 18 – 22 (4 nights)"
      guests="2 adults · 1 infant"
      nights={4}
      nightlyRate={680}
      cleaningFee={145}
      serviceFee={215}
      tiers={DEFAULT_TIERS}
      selectedTierId={selectedTierId}
      roleLabel="Guest"
      status={status}
      confirmationCode="#SL-4829"
      onSelectTier={setSelectedTierId}
      onSubmit={() => setStatus(prev => (prev === "confirmed" ? "ready" : "confirmed"))}
      onReset={() => setStatus("ready")}
    />
  );
}
