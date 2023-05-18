import { Request, Response } from 'express'
import { ErrorBadRequest } from '../../errors/ErrorProcessing.js'
import { getUser, updateUser } from '../../services/userService/index.js'

export const updateSubscription = async (req: Request, res: Response) => {
  const { email } = req.user
  const { subscription } = req.body
  const candidate = await getUser('email', email.toLowerCase().trim())
  if (!candidate) {
    throw new ErrorBadRequest()
  }
  await updateUser(candidate.email, { subscription })
  res.status(200).json({ message: 'success' })
}
