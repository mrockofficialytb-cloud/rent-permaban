"use client";

import { useEffect, useState } from "react";

type Car = {
  id: string;
  name: string;
  plate: string;
};

export default function VozidlaPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data.cars ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Načítám vozidla…</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100 p-8">
      <h1 className="text-3xl font-bold mb-6">🚗 Vozidla k pronájmu</h1>

      <div className="grid gap-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="rounded-xl bg-white p-6 shadow"
          >
            <div className="text-xl font-semibold">{car.name}</div>
            <div className="text-zinc-500">{car.plate}</div>
            <div className="mt-4 text-sm text-green-600">
              Aktivní
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

