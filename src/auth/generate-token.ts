import * as jwt from 'jsonwebtoken'

export async function  generateToken(user, expiration = '6h') {
  const data =  {
    _id: user._id,
    name: user.name,
    email: user.email
  };
  const tokenSecret = process.env.TOKEN_SECRET;

  return jwt.sign({ data, }, tokenSecret, { expiresIn: expiration });
}
