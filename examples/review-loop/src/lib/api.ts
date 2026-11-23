/**
 * Production API client. Listed in `guards.forbidRuntimeImports` so prototypes never reach the
 * network or drag live credentials into the review gallery.
 */
export async function submitReservation(payload: { stayId: string; nights: number }) {
  const response = await fetch("/api/reservations", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}
