"use client";

import { useEffect, useMemo, useState } from "react";

type Car = { id: string; name: string; plate: string };

function toLocalInputValue(d: Date) {
  // yyyy-MM-ddTHH:mm (bez sekund) – pro datetime-local
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function ReservationPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [carId, setCarId] = useState("");
  const [loading, setLoading] = useState(false);

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const [status, setStatus] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const minStart = useMemo(() => toLocalInputValue(new Date()), []);
  const minEnd = startAt || minStart;

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/cars", { cache: "no-store" });
      const j = await r.json();
      const list: Car[] = j.cars ?? [];
      setCars(list);
      if (list[0]?.id) setCarId(list[0].id);
    })();
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    if (!carId) {
      setStatus({ kind: "err", text: "Vyberte vozidlo." });
      return;
    }
    if (!startAt || !endAt) {
      setStatus({ kind: "err", text: "Vyplňte termín od/do." });
      return;
    }
    if (new Date(startAt) >= new Date(endAt)) {
      setStatus({ kind: "err", text: "Termín „Do“ musí být později než „Od“." });
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          startAt,
          endAt,
          fullName: fd.get("fullName"),
          email: fd.get("email"),
          phone: fd.get("phone"),
        }),
      });

      if (res.ok) {
        setStatus({ kind: "ok", text: "Rezervace vytvořena. Ozveme se vám pro potvrzení." });
        form.reset();
        // po resetu si necháme vybraný carId a smažeme datumy
        setStartAt("");
        setEndAt("");
      } else {
        let message = "Chyba při odeslání rezervace.";
        try {
          const j = await res.json();
          message = j?.error ?? message;
        } catch {
          message = await res.text();
        }
        setStatus({ kind: "err", text: message });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-0px)] bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Rent • permaban.cz</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Rezervace vozidla</h1>
          <p className="mt-2 max-w-2xl text-zinc-300">
            Vyberte vozidlo a termín. Systém automaticky hlídá obsazenost – pokud je termín zabraný,
            rezervaci nepustí.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-sm">
            <h2 className="text-lg font-medium">Rezervační formulář</h2>
            <p className="mt-1 text-sm text-zinc-400">Vyplňte prosím údaje a odešlete rezervaci.</p>

            <form onSubmit={submit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-zinc-200">Vozidlo</label>
                <select
                  name="carId"
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  required
                  className="h-11 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-600"
                >
                  {cars.length === 0 ? (
                    <option value="">Načítám vozidla…</option>
                  ) : (
                    cars.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.plate})
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm text-zinc-200">Od</label>
                  <input
                    type="datetime-local"
                    name="startAt"
                    value={startAt}
                    min={minStart}
                    onChange={(e) => setStartAt(e.target.value)}
                    required
                    className="h-11 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-600"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-zinc-200">Do</label>
                  <input
                    type="datetime-local"
                    name="endAt"
                    value={endAt}
                    min={minEnd}
                    onChange={(e) => setEndAt(e.target.value)}
                    required
                    className="h-11 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-600"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm text-zinc-200">Jméno a příjmení</label>
                  <input
                    name="fullName"
                    required
                    className="h-11 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-600"
                    placeholder="Jan Novák"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-zinc-200">Telefon</label>
                  <input
                    name="phone"
                    required
                    className="h-11 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-600"
                    placeholder="+420 777 777 777"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-zinc-200">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="h-11 rounded-xl border border-zinc-800 bg-zinc-950 px-3 text-sm outline-none focus:border-zinc-600"
                  placeholder="jan@novak.cz"
                />
              </div>

              <button
                type="submit"
                disabled={loading || cars.length === 0}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-zinc-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Odesílám…" : "Rezervovat"}
              </button>

              {status && (
                <div
                  className={[
                    "rounded-xl border p-3 text-sm",
                    status.kind === "ok"
                      ? "border-emerald-900/60 bg-emerald-950/40 text-emerald-200"
                      : "border-red-900/60 bg-red-950/40 text-red-200",
                  ].join(" ")}
                >
                  {status.text}
                </div>
              )}
            </form>
          </div>

          {/* Side info */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">
            <h2 className="text-lg font-medium">Jak to funguje</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-400" />
                Vyberete vozidlo a termín.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-400" />
                Systém automaticky kontroluje překryv rezervací.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-400" />
                Pokud je termín obsazený, rezervace se nevytvoří.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-zinc-400" />
                Po odeslání vás kontaktujeme pro potvrzení.
              </li>
            </ul>

            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-xs uppercase tracking-widest text-zinc-500">Tip</p>
              <p className="mt-2 text-sm text-zinc-300">
                Další krok může být <b>kalendář dostupnosti</b> (zobrazení obsazených termínů) a
                <b> admin</b> pro správu aut a rezervací.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} rent.permaban.cz
        </p>
      </div>
    </main>
  );
}