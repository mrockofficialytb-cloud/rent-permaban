import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function carThumb(name: string) {
  const n = name.toLowerCase();

  // názvy dle tvých souborů v /public/cars
  if (n.includes("grand") && n.includes("california")) return "/cars/grandcalifornia.webp";
  if (n.includes("california")) return "/cars/california-m.webp";
  if (n.includes("multiva")) return "/cars/multivan-m.webp";
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
      <main className="container pb-24 pt-20">

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

                  {/* ✅ TADY byl průser – teď je to správně zavřené */}
                  <div className="absolute bottom-4 left-5 text-white">
                    <div className="text-base font-semibold text-shadow">
                      {car.name}
                    </div>

                    <div className="mt-1 inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs backdrop-blur">
                      SPZ: <span className="ml-1 font-semibold">{car.plate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <Link className="btn btn-ghost w-full" href={`/vozidla/${car.id}`}>
                      Detail vozidla
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



