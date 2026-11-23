import type { StayCheckoutProps } from "./stay-checkout";

export const STAY_TIERS: StayCheckoutProps["tiers"] = [
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

export const BASE_CHECKOUT: Omit<StayCheckoutProps, "roleLabel"> = {
  stayName: "Casa Mare",
  location: "Lagoa da Conceicao, Florianopolis",
  rating: "4.96",
  reviewsCount: 128,
  dates: "Oct 18 – 22 (4 nights)",
  guests: "2 adults · 1 infant",
  nights: 4,
  nightlyRate: 680,
  cleaningFee: 145,
  serviceFee: 215,
  tiers: STAY_TIERS,
  selectedTierId: "cliffside",
  status: "ready",
};
