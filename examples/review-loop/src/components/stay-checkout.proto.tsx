import { definePrototype, setParam, type PrototypeProps } from "@protohq/cli";

import { StayCheckout, type StayCheckoutProps } from "./stay-checkout";
import { BASE_CHECKOUT } from "./stay-checkout.fixtures";

export const meta = definePrototype({
  title: "Stay checkout",
  spec: "booking",
  route: "/stays/casa-mare/checkout",
  roles: ["guest", "member"],
  surface: "Boutique stay booking checkout with room tiers, member credit and payment validation",
  blocks: ["Trip summary", "Suite selection", "Card form", "Price breakdown"],
  states: [
    { id: "ready", label: "Ready to reserve" },
    { id: "member-discount", label: "Member credit applied" },
    { id: "loading", label: "Verifying availability" },
    { id: "card-error", label: "Card declined" },
    { id: "confirmed", label: "Booking confirmed" },
    { id: "empty", label: "Hold expired" },
    { id: "mobile", label: "Mobile viewport" },
  ],
});

const ROLE_LABELS: Record<string, string> = {
  guest: "Guest",
  member: "Solstice Member",
};

export default function Prototype({ state, role }: PrototypeProps) {
  const activeRole = role ?? (state === "member-discount" ? "member" : "guest");
  const roleLabel = ROLE_LABELS[activeRole] ?? "Guest";

  const overrides: Record<string, Partial<StayCheckoutProps>> = {
    ready: {
      status: "ready",
      memberCredit: activeRole === "member" ? 180 : 0,
    },
    "member-discount": {
      status: "ready",
      selectedTierId: "penthouse",
      memberCredit: 240,
    },
    loading: {
      status: "loading",
    },
    "card-error": {
      status: "error",
      errorMessage:
        "Your issuer declined the authorization. Try another card or confirm 3-D Secure in your banking app.",
    },
    confirmed: {
      status: "confirmed",
      confirmationCode: "#SL-4829",
      memberCredit: activeRole === "member" ? 180 : 0,
    },
    empty: {
      status: "empty",
    },
    mobile: {
      status: "ready",
      mobile: true,
    },
  };

  const current = overrides[state] ?? overrides.ready;

  return (
    <StayCheckout
      {...BASE_CHECKOUT}
      {...current}
      roleLabel={roleLabel}
      onSelectTier={() => setParam("state", "member-discount")}
      onSubmit={() => setParam("state", state === "confirmed" ? "ready" : "confirmed")}
      onReset={() => setParam("state", "ready")}
    />
  );
}
