const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const flavorOptions = [
    { id: 1, label: 'Laranja' },
    { id: 2, label: 'Morango' },
    { id: 3, label: 'Manga' },
    { id: 4, label: 'Abacaxi' },
    { id: 5, label: 'Acerola' },
    { id: 6, label: 'Maracujá' },
    { id: 7, label: 'Guaraná' },
    { id: 8, label: 'Açai' },
    { id: 9, label: 'Uva' },
    { id: 10, label: 'Melancia' },
  ];

  const placesOptions = [
    { id: 1, label: 'Avenida Paulista' },
    { id: 2, label: 'Mercadão Municipal' },
    { id: 3, label: 'Parque do Ibirapuera' },
    { id: 4, label: 'Estação da Luz' },
    { id: 5, label: 'Rua Augusta' },
    { id: 6, label: 'Liberdade' },
    { id: 7, label: 'Pinacoteca de São Paulo' },
    { id: 8, label: 'MASP' },
    { id: 9, label: 'Museu do Futebol' },
    { id: 10, label: 'Shopping Eldorado' },
  ];

  for (const flavor of flavorOptions) {
    await prisma.sabor.create({
      data: {
        id: flavor.id,
        nome: flavor.label,
      },
    });
  }

  for (const place of placesOptions) {
    await prisma.local.create({
      data: {
        id: place.id,
        endereco: place.label,
      },
    });
  }

  console.log('Seed data inserted successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
