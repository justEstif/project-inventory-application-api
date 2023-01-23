import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

const getRandomItem = () => {
  return {
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    rating: faker.datatype.number({ max: 5 }),
    price: Number(faker.commerce.price()),
    inStock: faker.datatype.number(),
    image: faker.image.business(),
  };
};

const getRandomCategory = () => {
  return {
    name: faker.commerce.department(),
    image: faker.image.business(),
  };
};

const getRandomBrand = () => {
  return {
    name: faker.company.name(),
    image: faker.image.business(),
  };
};

const clearDb = async () => {
  await prisma.category.deleteMany({});
  await prisma.brand.deleteMany({});
  await prisma.item.deleteMany({});
};

const main = async () => {
  await clearDb();
  const category1 = await prisma.category.create({
    data: {
      ...getRandomCategory(),
    },
  });
  const category2 = await prisma.category.create({
    data: {
      ...getRandomCategory(),
    },
  });

  const category3 = await prisma.category.create({
    data: {
      ...getRandomCategory(),
    },
  });
  const brand1 = await prisma.brand.create({
    data: {
      ...getRandomBrand(),
    },
  });

  const brand2 = await prisma.brand.create({
    data: {
      ...getRandomBrand(),
    },
  });
  const brand3 = await prisma.brand.create({
    data: {
      ...getRandomBrand(),
    },
  });
  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category1.id } },
      brand: { connect: { id: brand1.id } },
    },
  });

  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category2.id } },
      brand: { connect: { id: brand1.id } },
    },
  });

  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category1.id } },
      brand: { connect: { id: brand2.id } },
    },
  });
  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category3.id } },
      brand: { connect: { id: brand2.id } },
    },
  });

  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category3.id } },
      brand: { connect: { id: brand3.id } },
    },
  });

  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category2.id } },
      brand: { connect: { id: brand3.id } },
    },
  });
  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category1.id } },
      brand: { connect: { id: brand3.id } },
    },
  });

  await prisma.item.create({
    data: {
      ...getRandomItem(),
      category: { connect: { id: category3.id } },
      brand: { connect: { id: brand2.id } },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
