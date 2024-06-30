import logger from "../../config/logger.js";
import { Url } from "../../models/url.model.js";

export const rediderct_uri = async (req, res) => {
  try {
    const { shortid } = req.params;
    if (!shortid) return res.status(400).json({ error: "Provide short uri" });
    const data = await Url.findOneAndUpdate(
      { shortId: shortid },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );
    return res.redirect(data.baseUrl);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
};
