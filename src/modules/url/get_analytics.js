import logger from "../../config/logger.js"
import { Url } from "../../models/url.model.js"


export const get_analytics = async( req, res ) => {
    try {
        const { shortid } = req.params
        if ( !shortid ) return res.status( 400 ).json( { error: 'Provide short uri' } )
        const result = await Url.findOne( { shortId: shortid } )
        return res.status(200).json({total_clicks: result.visitHistory.length, analytics: result.visitHistory})
    } catch (error) {
        logger.error( error )
        return res.status(500).json({error: error.message})
    }
    
}