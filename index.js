import express from 'express'
import dotenv from 'dotenv'
import { db } from './src/config/database.js'
import logger from './src/config/logger.js'
dotenv.config( { path: '.env' } )
import morgan from 'morgan'
import user_routes from './src/routes/user/user.route.js'
import dob_routes from './src/routes/dob/get_age.route.js'
import url_routes from './src/routes/url/url.route.js'


const app = express()
const port = process.env.PORT
//datbase connection
db()

const stream = {
    write: (message)=> logger.info(message.trim())
}
app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use(morgan('dev', {stream}))
//Routes
app.use('/api/v1/user', user_routes)
app.use('/api/v1/dob', dob_routes)
app.use('/api/v1/url', url_routes)

app.listen( port, () => {
    logger.info(`Server is running on port: ${port}`)
})