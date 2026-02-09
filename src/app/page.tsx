import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="card overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-10 md:p-12">
            <div className="text-xs font-extrabold tracking-[.22em] text-black/50">
              RENT.PERMABAN.CZ
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              Rezervace vozidel
            </h1>
            <p className="mt-4 text-black/60 leading-7 max-w-xl">
              Vyber vozidlo, zkontroluj dostupnost a vytvoř rezervaci během pár vteřin.
              Stylově, čistě, bez bordelu.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link className="btn" href="/vozidla">Zobrazit vozidla</Link>
              <Link className="btn btn-secondary" href="/rezervace">Přejít na rezervaci</Link>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-black/10 bg-black/[.02] p-4">
                <div className="font-bold">Dostupnost</div>
                <div className="text-black/60">Kontrola kolizí termínů</div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-black/[.02] p-4">
                <div className="font-bold">Vozidla</div>
                <div className="text-black/60">Seznam aktivních aut</div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-black/[.02] p-4">
                <div className="font-bold">API</div>
                <div className="text-black/60">Next + Prisma + Neon</div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] md:min-h-[520px] bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,.12),transparent_55%),linear-gradient(135deg,#ffffff,#e9e9e9)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-sm font-semibold text-black/50">
                  „Dealer“ vizuál jako bio.permaban.cz
                </div>
                <div className="mt-3 text-2xl font-extrabold tracking-tight">
                  Čisté karty • hodně prostoru • premium dojem
                </div>
                <div className="mt-4 text-black/60">
                  Další krok: fotky vozidel + detail + kalendář dostupnosti.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="card p-7">
          <div className="text-xs font-extrabold tracking-[.22em] text-black/40">01</div>
          <div className="mt-2 font-extrabold text-xl">Vozidla</div>
          <div className="mt-2 text-black/60">Přehled všech aut a rychlý přechod do detailu.</div>
          <div className="mt-6">
            <Link className="btn btn-secondary" href="/vozidla">Otevřít</Link>
          </div>
        </div>

        <div className="card p-7">
          <div className="text-xs font-extrabold tracking-[.22em] text-black/40">02</div>
          <div className="mt-2 font-extrabold text-xl">Rezervace</div>
          <div className="mt-2 text-black/60">Formulář, validace, obsazenost, potvrzení.</div>
          <div className="mt-6">
            <Link className="btn" href="/rezervace">Rezervovat</Link>
          </div>
        </div>

        <div className="card p-7">
          <div className="text-xs font-extrabold tracking-[.22em] text-black/40">03</div>
          <div className="mt-2 font-extrabold text-xl">Admin (později)</div>
          <div className="mt-2 text-black/60">Správa aut, rezervací, blokace termínů.</div>
          <div className="mt-6">
            <button className="btn btn-secondary" disabled>
              Coming soon
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

