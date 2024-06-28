import { Router } from "express";
import { register_user } from "../../modules/auth/user/register.js";
import { login_user } from "../../modules/auth/user/login.js";
import { verify_token } from "../../middlewares/verify_token.js";
import { get_user_details } from "../../modules/auth/user/get_user_profile.js";

const router = Router()


router.post( '/register', register_user )
router.post( '/login', login_user )
router.get("/details", verify_token, get_user_details);





export default router