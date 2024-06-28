import { Router } from "express";
import { find_age } from "../../modules/dob/get_age.js";


const router = Router()

router.get( "/get-age", find_age );



export default router