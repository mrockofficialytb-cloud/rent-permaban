"use client";

import { useState } from "react";

export default function ReservationPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        carId: data.carId,
        startAt: data.startAt,
        endAt: data.endAt,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setStatus("✅ Rezervace vytvořena");
      form.reset();
    } else {
      const msg = await res.text();
      setStatus("⛔ " + msg);
    }
  }

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", color: "white" }}>
      <h1>Rezervace vozidla</h1>

      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <input type="hidden" name="carId" value="cmlf8awxm0000uf88lemz5175" />

        <label>
          Od:
          <input type="datetime-local" name="startAt" required />
        </label>

        <label>
          Do:
          <input type="datetime-local" name="endAt" required />
        </label>

        <label>
          Jméno:
          <input name="fullName" required />
        </label>

        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Telefon:
          <input name="phone" required />
        </label>

        <button disabled={loading}>
          {loading ? "Odesílám…" : "Rezervovat"}
        </button>

        {status && <p>{status}</p>}
      </form>
    </main>
  );
}