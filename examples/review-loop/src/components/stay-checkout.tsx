export interface StayRoomTier {
  id: string;
  name: string;
  description: string;
  nightlyDelta: number;
}

export interface StayCheckoutProps {
  stayName: string;
  location: string;
  rating: string;
  reviewsCount: number;
  dates: string;
  guests: string;
  nights: number;
  nightlyRate: number;
  cleaningFee: number;
  serviceFee: number;
  memberCredit?: number;
  tiers: ReadonlyArray<StayRoomTier>;
  selectedTierId: string;
  roleLabel: string;
  status: "ready" | "loading" | "empty" | "error" | "confirmed";
  errorMessage?: string;
  confirmationCode?: string;
  mobile?: boolean;
  onSelectTier?: (tierId: string) => void;
  onSubmit?: () => void;
  onReset?: () => void;
}

function VillaIllustration() {
  return (
    <div className="sol-property-art" aria-hidden="true">
      <svg viewBox="0 0 640 280" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sol-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5dfca" />
            <stop offset="52%" stopColor="#f7eadb" />
            <stop offset="100%" stopColor="#e5edf0" />
          </linearGradient>
          <linearGradient id="sol-sea" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6c96a4" />
            <stop offset="100%" stopColor="#4f7c8c" />
          </linearGradient>
        </defs>
        <rect width="640" height="280" fill="url(#sol-sky)" />
        <circle cx="515" cy="68" r="34" fill="#e99a69" opacity="0.88" />
        <path d="M0 176 Q170 156 350 170 T640 164 L640 280 L0 280 Z" fill="url(#sol-sea)" />
        <path d="M0 218 Q210 198 420 216 T640 208 L640 280 L0 280 Z" fill="#d9cab6" />
        {/* Modern white coastal villa */}
        <rect x="78" y="102" width="248" height="104" rx="4" fill="#fbf8f2" stroke="#d9cfc0" />
        <rect x="64" y="94" width="276" height="14" rx="2" fill="#e5d8c5" />
        <rect x="100" y="122" width="92" height="74" rx="2" fill="#2c3e45" />
        <rect x="206" y="122" width="96" height="52" rx="2" fill="#3a525c" />
        <rect x="114" y="132" width="28" height="64" fill="#f3cfa8" opacity="0.22" />
        {/* Infinity pool deck */}
        <rect x="326" y="156" width="166" height="50" rx="3" fill="#eee4d5" stroke="#d9cfc0" />
        <rect x="340" y="170" width="136" height="24" rx="3" fill="#5e9fb0" />
        {/* Coastal palms */}
        <path d="M46 218 L54 114" stroke="#6d5947" strokeWidth="5" strokeLinecap="round" />
        <path d="M54 114 Q30 100 18 118" stroke="#476c52" strokeWidth="5" fill="none" />
        <path d="M54 114 Q78 96 92 112" stroke="#476c52" strokeWidth="5" fill="none" />
        <path d="M54 114 Q52 84 68 88" stroke="#5b8467" strokeWidth="4" fill="none" />
        <rect x="22" y="20" width="128" height="26" rx="13" fill="rgba(26,24,22,0.72)" />
        <text x="38" y="37" fill="#faf8f4" fontSize="11.5" fontFamily="sans-serif" fontWeight="600">
          Oceanfront · 4 BR
        </text>
      </svg>
    </div>
  );
}

function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function StayCheckout({
  stayName,
  location,
  rating,
  reviewsCount,
  dates,
  guests,
  nights,
  nightlyRate,
  cleaningFee,
  serviceFee,
  memberCredit = 0,
  tiers,
  selectedTierId,
  roleLabel,
  status,
  errorMessage,
  confirmationCode,
  mobile = false,
  onSelectTier,
  onSubmit,
  onReset,
}: StayCheckoutProps) {
  const activeTier = tiers.find(tier => tier.id === selectedTierId) ?? tiers[0];
  const effectiveNightly = nightlyRate + (activeTier?.nightlyDelta ?? 0);
  const accommodationTotal = effectiveNightly * nights;
  const grandTotal = accommodationTotal + cleaningFee + serviceFee - memberCredit;

  return (
    <div className="sol-page">
      <header className="sol-topbar">
        <div className="sol-brand">
          <span className="sol-brand-mark" aria-hidden="true">
            S
          </span>
          <span>Solstice</span>
        </div>

        {!mobile ? (
          <nav className="sol-nav-links" aria-label="Primary">
            <span>Stays</span>
            <span className="sol-nav-active">Checkout</span>
            <span>Trips</span>
          </nav>
        ) : null}

        <span className="sol-role-chip">
          <span className="sol-role-dot" aria-hidden="true" />
          <span>{roleLabel}</span>
        </span>
      </header>

      <main className={`sol-container ${mobile ? "sol-container-mobile" : ""}`}>
        {status === "empty" ? (
          <section className="sol-card sol-empty">
            <p className="sol-section-label">Reservation hold expired</p>
            <h1 className="sol-heading">Pick new dates for {stayName}</h1>
            <p className="sol-subheading">
              Your 15-minute checkout hold ended. Check live availability to start a fresh booking.
            </p>
            <button type="button" className="sol-primary-btn" onClick={onReset}>
              Choose dates
            </button>
          </section>
        ) : (
          <>
            <p className="sol-breadcrumb">Stays / Florianopolis / {stayName}</p>
            <h1 className="sol-heading">
              {status === "confirmed" ? "Your stay is confirmed" : "Confirm and pay"}
            </h1>
            <p className="sol-subheading">
              {status === "confirmed"
                ? `Confirmation ${confirmationCode ?? "#SL-4829"} sent to your inbox. Check-in starts at 15:00.`
                : "Free cancellation for 48 hours. Instant confirmation with your host."}
            </p>

            {status === "error" && errorMessage ? (
              <div className="sol-banner-error" role="alert">
                <strong>Payment declined:</strong>
                <span>{errorMessage}</span>
              </div>
            ) : null}

            {status === "confirmed" ? (
              <div className="sol-banner-success" role="status">
                <strong>Reserved ({confirmationCode ?? "#SL-4829"}):</strong>
                <span>
                  {stayName} for {dates} · Total charged {formatUsd(grandTotal)}.
                </span>
              </div>
            ) : null}

            <div className={`sol-grid ${mobile ? "sol-grid-mobile" : ""}`}>
              <div>
                <section className="sol-card">
                  <p className="sol-section-label">Your trip</p>
                  <div className="sol-trip-row">
                    <div>
                      <p className="sol-trip-key">Dates</p>
                      <p className="sol-trip-val">{dates}</p>
                    </div>
                    <button type="button" className="sol-link-btn" onClick={onReset}>
                      Edit
                    </button>
                  </div>
                  <div className="sol-trip-row">
                    <div>
                      <p className="sol-trip-key">Guests</p>
                      <p className="sol-trip-val">{guests}</p>
                    </div>
                    <button type="button" className="sol-link-btn" onClick={onReset}>
                      Edit
                    </button>
                  </div>
                </section>

                <section className="sol-card">
                  <p className="sol-section-label">Suite selection</p>
                  <h2 className="sol-card-title">Choose your space</h2>
                  <div className="sol-tier-list">
                    {tiers.map(tier => {
                      const active = tier.id === activeTier?.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => onSelectTier?.(tier.id)}
                          aria-pressed={active}
                          className={`sol-tier ${active ? "sol-tier-active" : ""}`}
                        >
                          <div>
                            <p className="sol-tier-name">{tier.name}</p>
                            <p className="sol-tier-desc">{tier.description}</p>
                          </div>
                          <span className="sol-tier-price">
                            {tier.nightlyDelta === 0
                              ? "Included"
                              : `+${formatUsd(tier.nightlyDelta)}/nt`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="sol-card">
                  <p className="sol-section-label">Payment</p>
                  <h2 className="sol-card-title">Card details</h2>
                  {status === "loading" ? (
                    <div className="sol-tier-list">
                      <div className="sol-skeleton-block" style={{ width: "68%" }} />
                      <div className="sol-skeleton-block" style={{ width: "100%", height: 40 }} />
                      <div className="sol-skeleton-block" style={{ width: "84%", height: 40 }} />
                    </div>
                  ) : (
                    <div className="sol-field-grid">
                      <label className="sol-field sol-field-full">
                        <span className="sol-label">Card number</span>
                        <input
                          readOnly
                          className={`sol-input ${status === "error" ? "sol-input-error" : ""}`}
                          value={
                            status === "error"
                              ? "4000 •••• •••• 0002 (declined)"
                              : "4242 •••• •••• 4242"
                          }
                        />
                      </label>
                      <label className="sol-field">
                        <span className="sol-label">Expiration</span>
                        <input readOnly className="sol-input" value="09 / 29" />
                      </label>
                      <label className="sol-field">
                        <span className="sol-label">Postal code</span>
                        <input readOnly className="sol-input" value="88015-200" />
                      </label>
                    </div>
                  )}
                </section>
              </div>

              <aside className="sol-card">
                <VillaIllustration />
                <div className="sol-property-meta">
                  <h2 className="sol-property-name">{stayName}</h2>
                  <span className="sol-rating">
                    ★ {rating} ({reviewsCount})
                  </span>
                </div>
                <p className="sol-property-loc">{location}</p>

                {memberCredit > 0 ? (
                  <div className="sol-banner-member">
                    <span>Solstice Member credit applied</span>
                    <span>-{formatUsd(memberCredit)}</span>
                  </div>
                ) : null}

                <div className="sol-line-items">
                  <div className="sol-line">
                    <span>
                      {formatUsd(effectiveNightly)} × {nights} nights
                    </span>
                    <span>{formatUsd(accommodationTotal)}</span>
                  </div>
                  <div className="sol-line">
                    <span>Cleaning &amp; linen prep</span>
                    <span>{formatUsd(cleaningFee)}</span>
                  </div>
                  <div className="sol-line">
                    <span>Solstice service fee</span>
                    <span>{formatUsd(serviceFee)}</span>
                  </div>
                  {memberCredit > 0 ? (
                    <div className="sol-line sol-line-discount">
                      <span>Member credit</span>
                      <span>-{formatUsd(memberCredit)}</span>
                    </div>
                  ) : null}
                </div>

                <div className="sol-total">
                  <span>Total (USD)</span>
                  <span>{formatUsd(grandTotal)}</span>
                </div>

                <button
                  type="button"
                  className="sol-primary-btn"
                  disabled={status === "loading"}
                  onClick={onSubmit}
                >
                  {status === "loading"
                    ? "Verifying availability…"
                    : status === "confirmed"
                      ? "View trip itinerary"
                      : `Reserve stay · ${formatUsd(grandTotal)}`}
                </button>
                <p className="sol-footnote">
                  You will not be charged until your dates and suite are locked in.
                </p>
              </aside>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
