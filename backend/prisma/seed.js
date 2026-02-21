import prisma from "../src/config/prisma.js";

export const trackEvent = async (req, res) => {
  try {
    const { feature_name } = req.body;
    const userId = req.user?.userId;

    if (!feature_name || typeof feature_name !== "string") {
      return res.status(400).json({ message: "Valid feature name required" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const normalizedFeature = feature_name.trim().toLowerCase();

    const event = await prisma.featureClick.create({
      data: {
        user_id: userId,
        feature_name: normalizedFeature
      }
    });

    res.status(201).json({
      message: "Event tracked successfully",
      event
    });

  } catch (error) {
    console.error("TRACK ERROR:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};