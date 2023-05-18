import jwt from 'jsonwebtoken'

import { jwtConfig } from '../config/tokenConfig.js'

interface IBody {
  id: string
  email: string
}

const { secretAccess, tokens } = jwtConfig

const generateAccessToken = async (body: IBody) => {
  const { email, id } = body
  const payload = {
    email: email.trim().toLowerCase(),
    userId: id,
    type: tokens.access.type,
  }
  const signInOptions: jwt.SignOptions = {
    expiresIn: tokens.access.expiresIn,
  }

  return jwt.sign(payload, secretAccess, signInOptions)
}

export const generateTokens = async (email: string, id: string) => {
  const accessToken = await generateAccessToken({ email, id })

  return {
    accessToken,
  }
}
