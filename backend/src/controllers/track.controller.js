import prisma from "../config/prisma.js";

export const trackEvent = async (req, res) => {
  try {
    const { feature_name } = req.body;

    if (!feature_name) {
      return res.status(400).json({ message: "Feature name required" });
    }

    const userId = req.user.userId;

    const event = await prisma.featureClick.create({
      data: {
        user_id: userId,
        feature_name
      }
    });

    res.status(201).json({
      message: "Event tracked",
      event
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
