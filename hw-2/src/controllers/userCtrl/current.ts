import { Request, Response } from 'express'
import { ErrorNotFound, ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { getTokenByOwner } from '../../services/tokenService/getTokenByOwner.js'
import { getUser } from '../../services/userService/index.js'

export const current = async (req: Request, res: Response) => {
  const { email } = req.user

  const candidate = await getUser('email', email.toLowerCase().trim(), true)
  const accessToken = await getTokenByOwner(candidate?._id)
  if (!candidate) {
    throw new ErrorNotFound()
  }

  if (!accessToken) {
    throw new ErrorUnauthorized()
  }

  res.status(200).json({ data: { accessToken: accessToken, user: candidate } })
}
