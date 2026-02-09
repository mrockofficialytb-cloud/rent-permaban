"use client";

import { useEffect, useMemo, useState } from "react";

type Car = { id: string; name: string; plate: string };

export default function RezervacePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [carId, setCarId] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((d) => setCars(d.cars ?? []))
      .catch(() => setCars([]));
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(carId && startAt && endAt);
  }, [carId, startAt, endAt]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId, startAt, endAt, fullName, email, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Chyba serveru");
        return;
      }

      setStatus("ok");
      setMessage("✅ Rezervace vytvořena");
      setStartAt("");
      setEndAt("");
      setFullName("");
      setEmail("");
      setPhone("");
    } catch {
      setStatus("error");
      setMessage("Chyba serveru");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-extrabold tracking-[.22em] text-black/40">RENT.PERMABAN.CZ</div>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Rezervace</h1>
        <p className="mt-2 text-black/60">Vyber vozidlo a termín. Systém automaticky hlídá obsazenost.</p>
      </div>

      <section className="card p-8 md:p-10">
        <form onSubmit={submit} className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block">
              <div className="text-sm font-semibold text-black/70 mb-2">Vozidlo</div>
              <select
                className="w-full h-12 rounded-2xl border border-black/10 bg-white px-4 font-semibold"
                value={carId}
                onChange={(e) => setCarId(e.target.value)}
              >
                <option value="">— Vyber vozidlo —</option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (SPZ: {c.plate})
                  </option>
                ))}
              </select>
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <div className="text-sm font-semibold text-black/70 mb-2">Od</div>
                <input
                  className="w-full h-12 rounded-2xl border border-black/10 bg-white px-4 font-semibold"
                  type="datetime-local"
                  value={startAt}
                  onChange={(e) => setStartAt(e.target.value)}
                />
              </label>

              <label className="block">
                <div className="text-sm font-semibold text-black/70 mb-2">Do</div>
                <input
                  className="w-full h-12 rounded-2xl border border-black/10 bg-white px-4 font-semibold"
                  type="datetime-local"
                  value={endAt}
                  onChange={(e) => setEndAt(e.target.value)}
                />
              </label>
            </div>

            <div className="rounded-2xl border border-black/10 bg-black/[.02] p-4 text-sm text-black/70">
              Tip: pokud vyskočí <b>„Auto je v tomto termínu obsazené“</b>, tak je to správně – běží kontrola kolize.
            </div>
          </div>

          <div className="space-y-4">
            <label className="block">
              <div className="text-sm font-semibold text-black/70 mb-2">Jméno</div>
              <input
                className="w-full h-12 rounded-2xl border border-black/10 bg-white px-4 font-semibold"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jan Novák"
              />
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-black/70 mb-2">E-mail</div>
              <input
                className="w-full h-12 rounded-2xl border border-black/10 bg-white px-4 font-semibold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="novak@email.cz"
              />
            </label>

            <label className="block">
              <div className="text-sm font-semibold text-black/70 mb-2">Telefon</div>
              <input
                className="w-full h-12 rounded-2xl border border-black/10 bg-white px-4 font-semibold"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+420 777 000 000"
              />
            </label>

            <div className="pt-2 flex flex-col gap-3">
              <button className="btn" disabled={!canSubmit || status === "loading"}>
                {status === "loading" ? "Odesílám…" : "Rezervovat"}
              </button>

              {message ? (
                <div
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    status === "ok"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border-red-200 bg-red-50 text-red-900"
                  }`}
                >
                  {message}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
