import { Router } from "express";
import { generate_short_uri } from "../../modules/url/generate_short_url.js";
import { rediderct_uri } from "../../modules/url/redirect_to_base_url.js";
import { get_analytics } from "../../modules/url/get_analytics.js";



const router = Router()

router.post( '/generate-short-uri', generate_short_uri )
router.get( '/:shortid', rediderct_uri )
router.get('/analytics/:shortid', get_analytics)


export default router