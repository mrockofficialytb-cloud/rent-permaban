import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const car = await prisma.car.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      plate: true,
      active: true,
      createdAt: true,
    },
  });

  if (!car) {
    return NextResponse.json(
      { error: "Vozidlo nenalezeno" },
      { status: 404 }
    );
  }

  return NextResponse.json({ car });
}
