import logger from "../../../config/logger.js";
import { generate_token } from "../../../helpers/generate_token.js";
import { User } from "../../../models/user.model.js";
import bcrypt from "bcrypt"


export const login_user = async ( req, res ) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email is required for login." });
      }
      //find the user
      const user = await User.findOne({
        $or: [{ email }],
      })
      //password check
      const isPasswordValid = await bcrypt.compare(password,user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid user credentials" });
        }
        const token = await generate_token( user )
        return res.status(200).json({message: 'User logged in successfully', data:token})
    } catch (error) {
        logger.error( error )
        return res.status(500).json({error:error.message})
    }
}