
import logger from "../../../config/logger.js";
import { User } from "../../../models/user.model.js";



export const get_user_details = async ( req, res ) => {
    try {
         const user = await User.findById(req.user?._id).select(
           "-password"
        )
        if ( !user ) {
            return res.status(400).json({error:'Please login first'})
        }
        return res.status(200).json({message:'User details fetched successfully', data:user})
    } catch (error) {
        logger.error( error )
        return res.status(500).json({error:error.message})
    }
}