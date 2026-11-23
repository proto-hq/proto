import type { TripInboxProps } from "./trip-inbox";

export const TRIP_MESSAGES: TripInboxProps["messages"] = [
  {
    id: "m1",
    author: "Camila (Host)",
    senderRole: "host",
    sentAt: "Yesterday · 18:14",
    body: "Welcome to Casa Mare. The gate PIN activates at 15:00 and fresh fruit will be waiting on the terrace.",
  },
  {
    id: "m2",
    author: "Marina (Guest)",
    senderRole: "guest",
    sentAt: "Today · 09:40",
    body: "Thank you! Our flight lands at 13:45 — would it be possible to drop our bags an hour early?",
  },
];

export const BASE_TRIP: Omit<TripInboxProps, "role"> = {
  stayName: "Casa Mare",
  confirmationCode: "#SL-4829",
  dates: "Oct 18 – 22 (4 nights)",
  checkInCode: "4829#",
  status: "upcoming",
  messages: TRIP_MESSAGES,
};
