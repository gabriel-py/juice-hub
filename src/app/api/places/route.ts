import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const places = await prisma.local.findMany({
      select: {
        id: true,
        endereco: true,
      },
    });

    const placesOptions = places.map((place) => ({
      id: place.id,
      label: place.endereco,
    }));

    return NextResponse.json(placesOptions);
  } catch (error) {
    console.error('Erro ao buscar lugares:', error);
    return NextResponse.json({ error: 'Erro ao buscar lugares' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
