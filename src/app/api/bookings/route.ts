import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { carId, startAt, endAt, fullName, email, phone } = body;

    if (!carId || !startAt || !endAt) {
      return NextResponse.json(
        { error: "Chybí povinná data" },
        { status: 400 }
      );
    }

    const start = new Date(startAt);
    const end = new Date(endAt);

    if (start >= end) {
      return NextResponse.json(
        { error: "Neplatný termín" },
        { status: 400 }
      );
    }

    // 🔴 KONTROLA OBSAZENOSTI
    const conflict = await prisma.booking.findFirst({
      where: {
        carId,
        status: { not: "CANCELLED" },
        AND: [
          { startAt: { lt: end } },
          { endAt: { gt: start } },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json(
        { error: "Auto je v tomto termínu obsazené" },
        { status: 409 }
      );
    }

    // ✅ VYTVOŘENÍ REZERVACE
    const booking = await prisma.booking.create({
      data: {
        carId,
        startAt: start,
        endAt: end,
        fullName,
        email,
        phone,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Chyba serveru" },
      { status: 500 }
    );
  }
}
