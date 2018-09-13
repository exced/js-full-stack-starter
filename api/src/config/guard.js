/**
 * @flow
 */

import jwt from 'jwt-simple';

const jwtSecret: string = process.env.JWT_SECRET || 'ThisIsYourJWTSecretKey';

export type UserToken = {
  id: string
};

const tokenize = (data: UserToken): string => jwt.encode(data, jwtSecret);
const detokenize = (token: string): UserToken => jwt.decode(token, jwtSecret);

export type Guard = {
  tokenize: UserToken => string,
  detokenize: string => UserToken,
  getUserFromReq: Object => any
};

export const guard = {
  tokenize,
  detokenize,
  getUserFromReq: (req: Object) => {
    // Authorization: Bearer g1jipjgi1ifjioj
    const extractToken = req => {
      if (
        req &&
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      }
      return null;
    };
    const token = extractToken(req);
    if (!token) {
      return null;
    }
    return jwt.decode(token, jwtSecret);
  }
};
