import * as jwt from 'koa-jwt';

export const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}
const tokenSecret = process.env.TOKEN_SECRET;

export const verifyToken = () => {
  jwt({
    secret: tokenSecret,
    getToken: getTokenFromHeader,
  })
}
