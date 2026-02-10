import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function carThumb(name: string) {
  const n = name.toLowerCase();
  if (n.includes("california")) return "/cars/california.webp";
  if (n.includes("multiva")) return "/cars/multivan.webp";
  if (n.includes("caravelle")) return "/cars/grandcalifornia.webp";
  return "";
}

export default async function VozidlaPage() {
  const cars = await prisma.car.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, plate: true },
  });

  return (
    <div className="min-h-screen bg-grid">
      {/* TOP NAV */}
      <header className="container pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <div className="kicker hidden sm:block">RENT.PERMABAN</div>
          </div>

          <nav className="flex items-center gap-3">
            <Link className="btn btn-ghost" href="/vozidla">
              Vozidla
            </Link>
            <Link className="btn btn-primary" href="/rezervace">
              Vytvořit rezervaci
            </Link>
          </nav>
        </div>
      </header>

      <main className="container pb-24 pt-10">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-2xl border bg-background/80 backdrop-blur">
          {/* jemný dekor */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/[0.06] via-transparent to-black/[0.06]" />
          <div className="pointer-events-none absolute -top-24 right-[-120px] h-64 w-64 rounded-full bg-black/[0.06] blur-3xl" />

          <div className="relative flex flex-col gap-6 p-7 sm:flex-row sm:items-end sm:justify-between sm:p-10">
            <div className="min-w-0 text-left">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-white/60 px-3 py-1 text-xs tracking-wide text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-black/70" />
                PŘEHLED
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Vozidla v nabídce
              </h1>

              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Vyberte si vůz, otevřete detail a rezervujte termín během chvíle.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Link className="btn btn-ghost" href="/vozidla">
                Zobrazit nabídku
              </Link>
              <Link className="btn btn-primary" href="/rezervace">
                Přejít na rezervaci
              </Link>
            </div>
          </div>

          <div className="h-px w-full bg-border/60" />

          {/* malé info pod hero */}
          <div className="flex flex-col gap-2 p-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              Celkem vozidel: <span className="font-medium text-foreground">{cars.length}</span>
            </div>
            <div className="hidden sm:block">Klikni na detail nebo rovnou rezervuj.</div>
          </div>
        </section>

        {/* GRID */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => {
            const src = carThumb(car.name);

            return (
              <article
                key={car.id}
                className="card group overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative h-48 w-full">
                  {src ? (
                    <Image
                      src={src}
                      alt={car.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      priority={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-black/10 to-transparent" />
                  )}

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* title */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-base font-semibold text-white">
                          {car.name}
                        </div>
                        <div className="text-xs text-zinc-200">
                          SPZ: <span className="font-medium">{car.plate}</span>
                        </div>
                      </div>

                      <span className="hidden rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white sm:inline-flex">
                        k dispozici
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <Link className="btn btn-ghost w-full" href={`/vozidla/${car.id}`}>
                      Detail
                    </Link>
                    <Link className="btn btn-primary w-full" href={`/rezervace?carId=${car.id}`}>
                      Rezervovat
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* MOBILE CTA */}
        <div className="mt-10 sm:hidden">
          <Link className="btn btn-primary w-full" href="/rezervace">
            Přejít na rezervaci
          </Link>
        </div>
      </main>
    </div>
  );
}

