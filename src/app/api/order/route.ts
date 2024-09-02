import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone_number, takeOutLocal, flavors, scheduledDate, scheduledTime } = await req.json();

        if (!name || !email || !phone_number || !takeOutLocal || !flavors || !Array.isArray(flavors) || !scheduledDate || !scheduledTime) {
            return NextResponse.json({ message: 'Invalid request data' }, { status: 400 });
        }

        // Find or create the user
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    nome: name,
                    email,
                    phone: phone_number,
                },
            });
        }

        const scheduledTo = new Date(`${scheduledDate}T${scheduledTime}:00.000Z`);

        // Create the order
        const newOrder = await prisma.pedido.create({
            data: {
                user_id: user.id,
                local_id: takeOutLocal,
                scheduled_to: scheduledTo,
                rastrear: '',
                sabores: {
                    create: flavors.map((flavorId: number) => ({
                        sabor_id: flavorId,
                    })),
                },
            },
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
