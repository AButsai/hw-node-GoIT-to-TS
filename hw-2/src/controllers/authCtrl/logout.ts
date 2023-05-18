import { Request, Response } from 'express'
import { ErrorUnauthorized } from '../../errors/ErrorProcessing.js'
import { updateToken } from '../../services/tokenService/updateToken.js'
import { getUser } from '../../services/userService/index.js'

export const logout = async (req: Request, res: Response) => {
  const { email } = req.user

  const candidate = await getUser('email', email.toLowerCase().trim())
  if (!candidate) {
    throw new ErrorUnauthorized()
  }

  await updateToken(candidate._id, null)
  res.status(204).json({ message: 'Disconnect...' })
}
