export const dynamic = "force-dynamic";

async function getCars() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cars`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Nepodařilo se načíst auta");
  return res.json();
}

export default async function VozidlaPage() {
  const { cars } = await getCars();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dostupná vozidla</h1>

      <ul className="space-y-3">
        {cars.map((car: any) => (
          <li key={car.id} className="border p-4 rounded">
            <div className="font-semibold">{car.name}</div>
            <div className="text-sm text-gray-500">{car.plate}</div>

            <a
              href={`/vozidla/${car.id}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              Rezervovat
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
