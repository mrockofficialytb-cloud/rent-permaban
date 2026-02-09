export const dynamic = "force-dynamic";

async function getCar(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cars/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Auto nenalezeno");
  return res.json();
}

export default async function VozidloDetail({
  params,
}: {
  params: { id: string };
}) {
  const { car } = await getCar(params.id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{car.name}</h1>
      <p className="text-gray-600">{car.plate}</p>

      <hr className="my-6" />

      <p className="italic text-sm">
        Rezervační formulář doplníme v dalším kroku
      </p>
    </main>
  );
}
