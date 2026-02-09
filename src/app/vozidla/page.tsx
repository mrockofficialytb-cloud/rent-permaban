import Link from "next/link";

type Car = {
  id: string;
  name: string;
  plate: string;
};

async function getCars(): Promise<Car[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Nepodařilo se načíst vozidla");
  }

  const data = await res.json();
  return data.cars;
}

export default async function VozidlaPage() {
  const cars = await getCars();

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-16">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Nabídka vozidel
      </h1>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-xl"
          >
            <div className="mb-4 h-40 w-full rounded-lg bg-zinc-200 flex items-center justify-center text-zinc-500">
              FOTO VOZU
            </div>

            <h2 className="text-xl font-semibold">{car.name}</h2>
            <p className="text-sm text-zinc-500">SPZ: {car.plate}</p>

            <Link
              href={`/vozidla/${car.id}`}
              className="mt-4 inline-block w-full rounded-lg bg-black py-3 text-center text-white transition hover:bg-zinc-800"
            >
              Zobrazit detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


