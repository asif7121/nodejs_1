import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';



export const verify_token = async (req,res,next) => {
    try {
      const token = req.headers?.authorization?.split(" ")[1];

      if (!token) {
        return res.status(400).json({error:'Invalid token'})
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedToken?._id).lean()

      if (!user) {
        return res.status(400).json({error: 'Invalid user'})
      }

      req.user = user;
      next();
    } catch (error) {
        console.log( error )
        return res.status(500).json({error: error.message})
    }

}