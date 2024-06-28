
import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength:[5,'Password must contain atleast 5 characters'],
        maxLength:[12,'Password cannot exceed 12 characters']
    }
}, { timestamps: true, versionKey: false } )


userSchema.pre( 'save', async function ( next ) {
    if ( this.isModified( 'password' ) ) {
        this.password = await bcrypt.hash(this.password,10)
    }
    return next()
} )



export const User = model('User',userSchema)