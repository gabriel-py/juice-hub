import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const flavors = await prisma.sabor.findMany({
      select: {
        id: true,
        nome: true,
      },
    });

    const flavorOptions = flavors.map((flavor) => ({
      id: flavor.id,
      label: flavor.nome,
    }));

    return NextResponse.json(flavorOptions);
  } catch (error) {
    console.error('Erro ao buscar sabores:', error);
    return NextResponse.json({ error: 'Erro ao buscar sabores' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
