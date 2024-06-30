import shortid from "shortid";
import { Url } from "../../models/url.model.js";
import logger from "../../config/logger.js";



export const generate_short_uri = async ( req, res ) => {
    try {
      const { url } = req.body;
        if ( !url ) {
            return res.status( 400 ).json( { error: "URL is required" } )
        };
      // Regex for URL validation
    //   const urlRegex = /^(https:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    //   if (!urlRegex.test(url)) {
    //     return res.status(400).json({ error: "Invalid URL format" });
    //   }
      const short_id = shortid.generate();
      const response = await Url.create({
        shortId: short_id,
        baseUrl: url,
        visitHistory: [],
      });

      return res.status(201).json({ shorted_url: response.shortId });
    } catch (error) {
        logger.error( error )
        return res.status(500).json({error:error.message})
    }
}