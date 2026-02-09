// src/app/page.tsx
import Link from "next/link";

type Car = { id: string; name: string; plate: string };

async function getCars(): Promise<Car[]> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  const res = await fetch(`${base}/api/cars`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as { cars?: Car[] };
  return data.cars ?? [];
}

export default async function Home() {
  const cars = await getCars();

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* TOP BAR */}
      <div className="border-b border-white/10 bg-zinc-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs text-zinc-300">
          <div className="flex items-center gap-4">
            <span className="opacity-80">RENT.PERMABAN.CZ</span>
            <span className="hidden sm:inline opacity-60">|</span>
            <span className="hidden sm:inline">+420 XXX XXX XXX</span>
            <span className="hidden sm:inline">info@permaban.cz</span>
          </div>
          <div className="flex items-center gap-3">
            <Link className="hover:text-white" href="/vozidla">
              Vozidla
            </Link>
            <Link className="hover:text-white" href="/rezervace">
              Rezervace
            </Link>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/10" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">PERMABAN RENT</div>
              <div className="text-xs text-zinc-400">Půjčovna vozidel</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <Link className="hover:text-white" href="/vozidla">
              Nabídka vozidel
            </Link>
            <Link className="hover:text-white" href="/rezervace">
              Rezervace
            </Link>
            <a className="hover:text-white" href="/api/cars" target="_blank" rel="noreferrer">
              API
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/vozidla"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Zobrazit vozidla
            </Link>
            <Link
              href="/rezervace"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Rezervovat
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_20%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(900px_circle_at_80%_40%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
          <div className="relative z-10">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Půjčovna vozidel{" "}
              <span className="text-zinc-300">s rychlou online rezervací</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300">
              Vyberte si vůz, zkontrolujte dostupnost a rezervujte během minuty.
              Přesně, jednoduše, bez zbytečných keců.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/rezervace"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
              >
                Vytvořit rezervaci
              </Link>
              <Link
                href="/vozidla"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm text-white hover:bg-white/10"
              >
                Prohlédnout nabídku
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-zinc-400">Rezervace</div>
                <div className="mt-1 text-sm font-semibold">online</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-zinc-400">Dostupnost</div>
                <div className="mt-1 text-sm font-semibold">okamžitě</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-zinc-400">Vozidla</div>
                <div className="mt-1 text-sm font-semibold">ověřená</div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className="text-sm font-semibold">Rychlá dostupnost</div>
              <div className="mt-1 text-sm text-zinc-300">
                Klikni na vozidlo a rezervuj termín.
              </div>

              <div className="mt-6 grid gap-3">
                {cars.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
                    Žádná vozidla k zobrazení (ověř /api/cars).
                  </div>
                ) : (
                  cars.slice(0, 6).map((c) => (
                    <Link
                      key={c.id}
                      href={`/vozidla/${c.id}`}
                      className="group rounded-2xl border border-white/10 bg-black/30 p-4 hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">{c.name}</div>
                          <div className="mt-1 text-xs text-zinc-400">SPZ: {c.plate}</div>
                        </div>
                        <span className="text-xs text-zinc-400 group-hover:text-white">
                          Detail →
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href="/vozidla"
                  className="w-full rounded-full border border-white/15 px-4 py-2 text-center text-sm hover:bg-white/10"
                >
                  Všechna vozidla
                </Link>
                <Link
                  href="/rezervace"
                  className="w-full rounded-full bg-white px-4 py-2 text-center text-sm font-semibold text-black hover:bg-zinc-200"
                >
                  Rezervovat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Jednoduchá rezervace",
              text: "Vybereš termín → odešleš formulář → hotovo. Konflikty termínů hlídá API.",
            },
            {
              title: "Přehledná nabídka",
              text: "Seznam vozidel a detail každého vozu (SPZ, aktivní stav, datum).",
            },
            {
              title: "Připraveno na růst",
              text: "Další krok: ceník, fotky, výbava, depozit, platební brána, admin.",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-lg font-semibold">{b.title}</div>
              <p className="mt-2 text-sm leading-6 text-zinc-300">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/10 bg-zinc-950/40">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-2xl font-semibold">Jak to funguje</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["1", "Vyber vozidlo", "Otevři nabídku a vyber konkrétní vůz."],
              ["2", "Zvol termín", "Od–Do, systém ověří dostupnost."],
              ["3", "Odešli rezervaci", "Dostaneš potvrzení, termín je bloknutý."],
            ].map(([n, t, d]) => (
              <div
                key={n}
                className="rounded-3xl border border-white/10 bg-black/30 p-6"
              >
                <div className="text-xs text-zinc-400">Krok {n}</div>
                <div className="mt-1 text-lg font-semibold">{t}</div>
                <div className="mt-2 text-sm text-zinc-300">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/rezervace"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-zinc-200"
            >
              Jdu rezervovat
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold">PERMABAN RENT</div>
              <div className="mt-2 text-sm text-zinc-400">
                Rezervační systém pro půjčovnu vozidel.
              </div>
            </div>
            <div className="text-sm text-zinc-300">
              <div className="font-semibold text-white">Kontakt</div>
              <div className="mt-2">+420 XXX XXX XXX</div>
              <div>info@permaban.cz</div>
            </div>
            <div className="text-sm text-zinc-300">
              <div className="font-semibold text-white">Odkazy</div>
              <div className="mt-2 flex flex-col gap-1">
                <Link className="hover:text-white" href="/vozidla">
                  Vozidla
                </Link>
                <Link className="hover:text-white" href="/rezervace">
                  Rezervace
                </Link>
                <a className="hover:text-white" href="/api/cars">
                  /api/cars
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-zinc-500">
            © {new Date().getFullYear()} permaban.cz
          </div>
        </div>
      </footer>
    </div>
  );
}
