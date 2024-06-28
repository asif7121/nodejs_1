import mongoose from "mongoose";
import logger from "./logger.js";


export const db = async() => {
   try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
       logger.info(
         `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
       );
   } catch (error) {
      logger.error("Database connection FAILED ", error);
      process.exit(1);
   }

}