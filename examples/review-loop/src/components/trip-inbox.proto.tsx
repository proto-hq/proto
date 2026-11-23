import { definePrototype, setParam, type PrototypeProps } from "@protohq/cli";

import { TripInbox, type TripInboxProps } from "./trip-inbox";
import { BASE_TRIP } from "./trip-inbox.fixtures";

export const meta = definePrototype({
  title: "Trip inbox",
  spec: "booking",
  route: "/trips/SL-4829",
  roles: ["guest", "host"],
  surface: "Post-booking itinerary, smart-lock check-in code and host messaging",
  blocks: ["Host conversation", "Check-in details", "Host approval"],
  states: [
    { id: "upcoming", label: "Upcoming confirmed trip" },
    { id: "host-request", label: "Host approval request" },
    { id: "canceled", label: "Canceled & refunded" },
    { id: "empty", label: "No upcoming trips" },
  ],
});

export default function Prototype({ state, role }: PrototypeProps) {
  const activeRole: TripInboxProps["role"] =
    role === "host" || state === "host-request" ? "host" : "guest";
  const status: TripInboxProps["status"] =
    state === "empty" || state === "host-request" || state === "canceled" ? state : "upcoming";

  return (
    <TripInbox
      {...BASE_TRIP}
      role={activeRole}
      status={status}
      onApprove={() => setParam("state", "upcoming")}
      onDecline={() => setParam("state", "canceled")}
      onExplore={() => setParam("state", "upcoming")}
    />
  );
}
