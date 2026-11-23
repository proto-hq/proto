import { defineFlow } from "@protohq/cli/flow";

export const flow = defineFlow({
  title: "Stay booking",
  spec: "booking",
  description: "Reserve Casa Mare from checkout through card retry, confirmation and trip inbox.",
  start: ["ready"],
  nodes: {
    ready: { proto: "stay-checkout", state: "ready" },
    member: { proto: "stay-checkout", state: "member-discount" },
    verifying: { proto: "stay-checkout", state: "loading" },
    declined: { proto: "stay-checkout", state: "card-error" },
    confirmed: { proto: "stay-checkout", state: "confirmed" },
    itinerary: { proto: "trip-inbox", state: "upcoming", end: true },
  },
  edges: [
    ["ready", "member", { on: "Upgrade suite / member credit" }],
    ["ready", "verifying", { on: "Reserve stay" }],
    ["member", "verifying", { on: "Reserve stay" }],
    ["verifying", "declined", { on: "Issuer declined" }],
    ["declined", "verifying", { on: "Retry payment" }],
    ["verifying", "confirmed", { on: "Payment authorized" }],
    ["confirmed", "itinerary", { on: "Open trip itinerary" }],
  ],
});
