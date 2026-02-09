import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const car = await prisma.car.findUnique({
    where: { id },
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
