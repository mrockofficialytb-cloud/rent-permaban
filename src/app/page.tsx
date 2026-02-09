import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-grid">
      <header className="container pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <div className="text-lg font-semibold tracking-tight">RENT.PERMABAN.CZ</div>
            <div className="kicker hidden sm:block">REZERVACE VOZIDEL</div>
          </div>
          <nav className="flex items-center gap-3">
            <Link className="btn btn-ghost" href="/vozidla">Vozidla</Link>
            <Link className="btn btn-primary" href="/rezervace">Rezervace</Link>
          </nav>
        </div>
      </header>

      <main className="container pb-24 pt-16">
        <section className="card overflow-hidden">
          <div className="grid gap-10 p-10 sm:grid-cols-2 sm:items-center">
            <div>
              <div className="kicker">RENT</div>
              <h1 className="h1 mt-4">
                Rezervace dodávek a obytných vozů.
              </h1>
              <p className="muted mt-4 max-w-xl leading-relaxed">
                Vyber vozidlo, zkontroluj dostupnost a vytvoř rezervaci během chvíle.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link className="btn btn-primary" href="/vozidla">
                  Zobrazit vozidla
                </Link>
                <Link className="btn btn-ghost" href="/rezervace">
                  Přejít na rezervaci
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="card p-6">
                <div className="text-sm font-semibold">Rychlý start</div>
                <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                  <li>• Přehled vozidel (thumbnail + detail)</li>
                  <li>• Kontrola obsazenosti (už máš hotovo)</li>
                  <li>• Potvrzení rezervace</li>
                </ul>
                <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-400">
                  Tip: další krok = detail vozidla + galerie + parametry.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

