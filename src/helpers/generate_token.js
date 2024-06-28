import jwt from 'jsonwebtoken'



const expire = process.env.JWT_EXPIRE
export const generate_token = async (payload) => {
    const token = jwt.sign(
      { _id: payload._id },
      process.env.JWT_SECRET,
      expire
    );
    return token;
}