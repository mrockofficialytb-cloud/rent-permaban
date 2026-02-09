import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-zinc-900">
      {/* TOP BAR */}
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-zinc-900" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">RENT</div>
              <div className="text-xs text-zinc-500">permaban.cz</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 md:flex">
            <Link href="/vozidla" className="hover:text-zinc-900">Vozidla</Link>
            <Link href="/rezervace" className="hover:text-zinc-900">Rezervace</Link>
            <a href="/api/cars" className="hover:text-zinc-900">API</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/rezervace"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              Rezervovat
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_20%,rgba(0,0,0,0.08),transparent_55%),radial-gradient(900px_circle_at_80%_10%,rgba(0,0,0,0.06),transparent_50%)]" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
              RENT.PERMABAN.CZ
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              online
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Pronájem vozidel
              <span className="block text-zinc-500">rychle, čistě, bez zmatku.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
              Vyberte si vozidlo, zkontrolujte dostupnost a odešlete rezervaci.
              Systém hlídá kolize termínů a potvrdí vytvoření rezervace.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/vozidla"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-black/10 hover:bg-zinc-50"
              >
                Zobrazit vozidla
              </Link>
              <Link
                href="/rezervace"
                className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Přejít na rezervaci
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <div className="text-xs text-zinc-500">Obsazenost</div>
                <div className="mt-1 font-semibold">automaticky</div>
              </div>
              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <div className="text-xs text-zinc-500">Databáze</div>
                <div className="mt-1 font-semibold">Neon / Postgres</div>
              </div>
              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <div className="text-xs text-zinc-500">Deploy</div>
                <div className="mt-1 font-semibold">Vercel</div>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative z-10">
            <div className="relative h-[360px] overflow-hidden rounded-[28px] bg-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:h-[440px]">
              <div className="absolute inset-0 opacity-90 bg-[radial-gradient(700px_circle_at_20%_30%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(900px_circle_at_70%_20%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="rounded-2xl bg-white/8 p-5 ring-1 ring-white/10 backdrop-blur">
                  <div className="text-xs font-semibold text-white/70">Rychlý start</div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    Vyber vozidlo → termín → potvrdit rezervaci
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    UI navazuje na styl vašich webů (čistá typografie, šedé plochy, výrazné CTA).
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-zinc-600">
              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">Vozidla</div>
              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">Detail</div>
              <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">Rezervace</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[26px] bg-white p-6 ring-1 ring-black/5">
            <div className="text-xs font-semibold text-zinc-500">01</div>
            <div className="mt-2 text-lg font-semibold">Přehled vozidel</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Karty vozidel, rychlý přechod na detail i rezervaci.
            </p>
            <Link href="/vozidla" className="mt-4 inline-flex text-sm font-semibold text-zinc-900 hover:underline">
              Otevřít vozidla →
            </Link>
          </div>

          <div className="rounded-[26px] bg-white p-6 ring-1 ring-black/5">
            <div className="text-xs font-semibold text-zinc-500">02</div>
            <div className="mt-2 text-lg font-semibold">Detail vozidla</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Připravené místo pro fotky, parametry, výbavu, depozit.
            </p>
            <Link href="/vozidla" className="mt-4 inline-flex text-sm font-semibold text-zinc-900 hover:underline">
              Zobrazit detail →
            </Link>
          </div>

          <div className="rounded-[26px] bg-white p-6 ring-1 ring-black/5">
            <div className="text-xs font-semibold text-zinc-500">03</div>
            <div className="mt-2 text-lg font-semibold">Rezervační formulář</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Kontrola kolizí a vytváření rezervací do DB.
            </p>
            <Link href="/rezervace" className="mt-4 inline-flex text-sm font-semibold text-zinc-900 hover:underline">
              Přejít na rezervaci →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-sm text-zinc-500">
          <div>© {new Date().getFullYear()} RENT • permaban.cz</div>
          <div className="flex gap-5">
            <Link href="/vozidla" className="hover:text-zinc-800">Vozidla</Link>
            <Link href="/rezervace" className="hover:text-zinc-800">Rezervace</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

