import prisma from "../config/prisma.js";

export const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, age, gender } = req.query;

    const where = {};
    if (startDate && endDate) {
      where.timestamp = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }
    if (age || gender) {
      where.user = {};

      if (gender) {
        where.user.gender = gender;
      }

      if (age) {
        const [min, max] = age.split("-");
        where.user.age = {
          gte: Number(min),
          lte: Number(max)
        };
      }
    }
    const featureUsage = await prisma.featureClick.groupBy({
      by: ["feature_name"],
      where,
      _count: {
        feature_name: true
      }
    });
    const timeTrendRaw = await prisma.featureClick.findMany({
      where,
      select: {
        timestamp: true
      }
    });

    const timeMap = {};

    timeTrendRaw.forEach(item => {
      const date = item.timestamp.toISOString().split("T")[0];
      timeMap[date] = (timeMap[date] || 0) + 1;
    });

    const timeTrend = Object.entries(timeMap).map(([date, count]) => ({
      date,
      count
    }));

    res.json({
      featureUsage: featureUsage.map(f => ({
        feature: f.feature_name,
        count: f._count.feature_name
      })),
      timeTrend
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};