import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, phone_number, takeOutLocal, flavors } = req.body;

    if (!name || !email || !phone_number || !takeOutLocal || !flavors || !Array.isArray(flavors)) {
        return res.status(400).json({ message: 'Invalid request data' });
    }

    try {
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

        // Create the order
        const newOrder = await prisma.pedido.create({
            data: {
                user_id: user.id,
                local_id: takeOutLocal,
                scheduled_to: new Date(),
                rastrear: '',
                sabores: {
                    create: flavors.map((flavorId: number) => ({
                        sabor_id: flavorId,
                    })),
                },
            },
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}
