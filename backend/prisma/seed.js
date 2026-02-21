import prisma from "../src/config/prisma.js";

const features = [
  "filter_apply",
  "date_filter",
  "age_filter",
  "gender_filter",
  "bar_chart_click",
  "line_chart",
  "export_csv"
];

const genders = ["male", "female"];

async function main() {
  console.log("Seeding started...");
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        username: `user${i}`,
        email: `user${i}@mail.com`,
        password: "123456",
        age: 18 + Math.floor(Math.random() * 20),
        gender: genders[Math.floor(Math.random() * 2)]
      }
    });
  }

  const users = await prisma.user.findMany();
  for (let i = 0; i < 300; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomFeature = features[Math.floor(Math.random() * features.length)];

    await prisma.featureClick.create({
      data: {
        user_id: randomUser.id,
        feature_name: randomFeature,
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        )
      }
    });
  }

  console.log("Seeding completed ✅");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
