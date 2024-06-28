import logger from "../../../config/logger.js";
import { generate_token } from "../../../helpers/generate_token.js";
import { User } from "../../../models/user.model.js";



export const register_user = async ( req, res ) => {
 try {
   const { username, email, password } = req.body;
   // validation - not empty
   if ([username, email, password].some((field) => field?.trim() === "")) {
     return res.status(400).json({ error: "Fields should not be empty" });
   }
   // check if user already exists: username, email
   const existedUser = await User.findOne({
     $or: [{ username }, { email }],
   });
   if (existedUser) {
     return res
       .status(400)
       .json({ error: "User with same email or username already exists" });
   }
   // create user object - create entry in db
   const user = await User.create({
     username,
     email,
     password,
   });

   // remove password and refresh token field from response
   const createdUser = await User.findById(user._id).select(
     "-password"
     );
     if ( !createdUser ) {
         return res
           .status(400)
           .json({ error: "Something went wrong while registering the user!" });
     }
     logger.info(createdUser)
     const token = await generate_token( createdUser )
     return res.status(201).json({message: 'User registered successfully', data:{createdUser,token}})
 } catch (error) {
     logger.error( error )
     return res.status(500).json({error: error.message})
 }
}