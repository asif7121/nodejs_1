import express from 'express'
import dotenv from 'dotenv'
import { db } from './src/config/database.js'
import logger from './src/config/logger.js'
dotenv.config( { path: '.env' } )
import user_routes from './src/routes/user/user.route.js'
import dob_routes from './src/routes/dob/get_age.route.js'


const app = express()
const port = process.env.PORT
//datbase connection
db()


app.use( express.json() )
app.use(express.urlencoded({extended:true}))
//Routes
app.use('/api/v1/user', user_routes)
app.use('/api/v1/dob', dob_routes)

app.listen( port, () => {
    logger.info(`Server is running on port: ${port}`)
})