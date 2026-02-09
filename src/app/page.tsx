import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cars = await prisma.car.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, plate: true },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-zinc-400">
            RENT.PERMABAN.CZ
          </div>
          <h1 className="mt-2 text-3xl font-semibold">Půjčovna vozidel</h1>
          <p className="mt-2 text-zinc-400">
            Vyber vozidlo a pokračuj na detail nebo rezervaci.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/vozidla"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Zobrazit vozidla
          </Link>
          <Link
            href="/rezervace"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900"
          >
            Vytvořit rezervaci
          </Link>
        </div>

        <h2 className="mb-4 text-lg font-semibold">Aktivní vozidla</h2>

        {cars.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
            Zatím tu nejsou žádná aktivní vozidla.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <div className="text-lg font-semibold">{c.name}</div>
                <div className="mt-1 text-sm text-zinc-400">SPZ: {c.plate}</div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/vozidla/${c.id}`}
                    className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-black hover:opacity-90"
                  >
                    Detail
                  </Link>
                  <Link
                    href={`/rezervace?carId=${c.id}`}
                    className="rounded-xl border border-zinc-700 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-900"
                  >
                    Rezervovat
                  </Link>
                </div>

                <div className="mt-3 select-all break-all text-[11px] text-zinc-600">
                  {c.id}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
