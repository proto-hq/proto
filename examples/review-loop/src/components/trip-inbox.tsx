export interface TripMessage {
  id: string;
  author: string;
  senderRole: "host" | "guest";
  sentAt: string;
  body: string;
}

export interface TripInboxProps {
  stayName: string;
  confirmationCode: string;
  dates: string;
  checkInCode: string;
  status: "upcoming" | "empty" | "host-request" | "canceled";
  role: "guest" | "host";
  messages: ReadonlyArray<TripMessage>;
  onApprove?: () => void;
  onDecline?: () => void;
  onExplore?: () => void;
}

export function TripInbox({
  stayName,
  confirmationCode,
  dates,
  checkInCode,
  status,
  role,
  messages,
  onApprove,
  onDecline,
  onExplore,
}: TripInboxProps) {
  return (
    <div className="sol-page">
      <header className="sol-topbar">
        <div className="sol-brand">
          <span className="sol-brand-mark" aria-hidden="true">
            S
          </span>
          <span>Solstice</span>
        </div>
        <nav className="sol-nav-links" aria-label="Primary">
          <span>Stays</span>
          <span>Checkout</span>
          <span className="sol-nav-active">Trips</span>
        </nav>
        <span className="sol-role-chip">
          <span className="sol-role-dot" aria-hidden="true" />
          <span>{role === "host" ? "Host · Camila" : "Guest · Marina"}</span>
        </span>
      </header>

      <main className="sol-container">
        {status === "empty" ? (
          <section className="sol-card sol-empty">
            <p className="sol-section-label">Trips</p>
            <h1 className="sol-heading">No upcoming stays yet</h1>
            <p className="sol-subheading">
              Save coastal villas and mountain cabins, then book with instant host messaging.
            </p>
            <button type="button" className="sol-primary-btn" onClick={onExplore}>
              Browse coastal stays
            </button>
          </section>
        ) : (
          <>
            <p className="sol-breadcrumb">Trips / {confirmationCode}</p>
            <h1 className="sol-heading">{stayName}</h1>
            <p className="sol-subheading">
              {dates} · Confirmation {confirmationCode}
            </p>

            <div className="sol-grid">
              <section className="sol-card">
                <div className="sol-property-meta">
                  <p className="sol-section-label" style={{ margin: 0 }}>
                    Host conversation
                  </p>
                  <span
                    className={`sol-pill ${
                      status === "upcoming"
                        ? "sol-pill-sage"
                        : status === "host-request"
                          ? "sol-pill-amber"
                          : "sol-pill-muted"
                    }`}
                  >
                    {status === "upcoming"
                      ? "Confirmed"
                      : status === "host-request"
                        ? "Awaiting host approval"
                        : "Canceled · Refunded"}
                  </span>
                </div>

                <div className="sol-message-list">
                  {messages.map(msg => (
                    <article
                      key={msg.id}
                      className={`sol-message ${msg.senderRole === "host" ? "sol-message-host" : ""}`}
                    >
                      <div className="sol-message-head">
                        <span className="sol-message-author">{msg.author}</span>
                        <span>{msg.sentAt}</span>
                      </div>
                      <p className="sol-trip-val" style={{ color: "var(--sol-ink)" }}>
                        {msg.body}
                      </p>
                    </article>
                  ))}
                </div>

                {role === "host" && status === "host-request" ? (
                  <div className="sol-action-row">
                    <button
                      type="button"
                      className="sol-primary-btn"
                      style={{ marginTop: 0, width: "auto", padding: "0 20px" }}
                      onClick={onApprove}
                    >
                      Accept reservation
                    </button>
                    <button type="button" className="sol-secondary-btn" onClick={onDecline}>
                      Decline
                    </button>
                  </div>
                ) : null}
              </section>

              <aside className="sol-card">
                <p className="sol-section-label">Check-in details</p>
                <div className="sol-trip-row">
                  <div>
                    <p className="sol-trip-key">Smart lock PIN</p>
                    <p className="sol-trip-val">
                      {status === "upcoming" ? checkInCode : "Issued after confirmation"}
                    </p>
                  </div>
                </div>
                <div className="sol-trip-row">
                  <div>
                    <p className="sol-trip-key">Arrival window</p>
                    <p className="sol-trip-val">15:00 – 21:00 BRT</p>
                  </div>
                </div>
                <div className="sol-trip-row">
                  <div>
                    <p className="sol-trip-key">Concierge</p>
                    <p className="sol-trip-val">Airport transfer arranged for 14:15</p>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
