import prisma from "../config/prisma.js";

export const trackEvent = async (req, res) => {
  try {
    console.log("HEADERS:", req.headers);
    console.log("RAW BODY:", req.body);

    const feature_name = req.body?.feature_name;
    const userId = req.user?.userId;

    if (!feature_name) {
      return res.status(400).json({ message: "Valid feature name required" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const event = await prisma.featureClick.create({
      data: {
        user_id: userId,
        feature_name: feature_name
      }
    });

    console.log("TRACKED:", feature_name, "USER:", userId);

    res.status(201).json({
      message: "Tracked",
      event
    });

  } catch (error) {
    console.log("TRACK ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
