import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const car = await prisma.car.findUnique({
    where: { id },
    select: { id: true, name: true, plate: true, active: true, createdAt: true },
  });

  if (!car) {
    return NextResponse.json({ error: "Vozidlo nenalezeno" }, { status: 404 });
  }

  return NextResponse.json({ car });
}
