import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function carThumb(name: string) {
  const n = name.toLowerCase();
  if (n.includes("california")) return "/cars/california-m.webp";
  if (n.includes("multiva")) return "/cars/multivan-m.webp";
  if (n.includes("caravelle")) return "/cars/grandcaliforinia-m.webp";
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
      <header className="container pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              RENT.PERMABAN.CZ
            </Link>
            <div className="kicker hidden sm:block">VOZIDLA</div>
          </div>
          <nav className="flex items-center gap-3">
            <Link className="btn btn-ghost" href="/vozidla">Vozidla</Link>
            <Link className="btn btn-primary" href="/rezervace">Rezervace</Link>
          </nav>
        </div>
      </header>

      <main className="container pb-24 pt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="kicker">PŘEHLED</div>
            <h1 className="h2 mt-3">Dostupná vozidla</h1>
            <p className="muted mt-2">Klikni na detail nebo rovnou vytvoř rezervaci.</p>
          </div>

          <Link className="btn btn-primary hidden sm:inline-flex" href="/rezervace">
            Přejít na rezervaci
          </Link>
        </div>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => {
            const src = carThumb(car.name);

            return (
              <article key={car.id} className="card overflow-hidden">
                <div className="relative h-44 w-full">
                  {src ? (
                    <Image
                      src={src}
                      alt={car.name}
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <div className="text-base font-semibold">{car.name}</div>
                    <div className="text-xs text-zinc-300">SPZ: {car.plate}</div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Link className="btn btn-ghost w-full" href={`/vozidla/${car.id}`}>
                      Detail vozidla →
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

        <div className="mt-10 sm:hidden">
          <Link className="btn btn-primary w-full" href="/rezervace">
            Přejít na rezervaci
          </Link>
        </div>
      </main>
    </div>
  );
}


