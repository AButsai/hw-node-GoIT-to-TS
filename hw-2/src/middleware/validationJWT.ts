import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { ErrorTokenTypeInvalid, ErrorUnauthorized, factoryErrorJWT } from '../errors/ErrorProcessing.js'
import { getTokenByOwner } from '../services/tokenService/index.js'
import { getUser } from '../services/userService/index.js'

const { ACCESS_TOKEN_PRIVATE_KEY } = process.env

const decodedToken = async (token: string, secret: string, next: NextFunction) => {
  try {
    const decoded: JwtPayload = jwt.verify(token, secret) as JwtPayload
    const user = await getUser('email', decoded.email)
    const accessToken = await getTokenByOwner(user?._id)
    if (!user || token !== accessToken) {
      next(new ErrorUnauthorized())
      return
    }
    return user
  } catch (error) {
    next(factoryErrorJWT(error))
  }
}

export const validationSuccessToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization === undefined || req.headers.authorization === null) {
    next(new ErrorUnauthorized())
    return
  }
  const [typeToken, token] = req.headers.authorization?.split(' ') as string[]
  if (typeToken.toLowerCase() !== 'bearer') {
    next(new ErrorTokenTypeInvalid(typeToken))
    return
  }

  const user = await decodedToken(token, ACCESS_TOKEN_PRIVATE_KEY as string, next)

  req.user = user
  next()
}
