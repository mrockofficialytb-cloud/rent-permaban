import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function carThumb(name: string) {
  const n = name.toLowerCase();
  if (n.includes("california")) return "/cars/california-m.webp";
  if (n.includes("multiva")) return "/cars/multivan-m.webp";
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
      <main className="container pb-24 pt-16">
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => {
            const src = carThumb(car.name);

            return (
              <article
                key={car.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <div className="relative h-52 w-full">
                  {src ? (
                    <Image
                      src={src}
                      alt={car.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 to-transparent" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="text-base font-semibold">{car.name}</div>
                    <div className="mt-2 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                      SPZ: <span className="ml-1 font-semibold">{car.plate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/vozidla/${car.id}`}
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Detail
                    </Link>
                    <Link
                      href={`/rezervace?carId=${car.id}`}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-zinc-200"
                    >
                      Rezervovat
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}



