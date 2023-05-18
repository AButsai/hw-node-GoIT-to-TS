import { Request, Response } from 'express'
import {
  ErrorBadRequest,
  ErrorConfirmCode,
  ErrorVerificationCode,
  ErrorVerificationCodePassed,
} from '../../errors/ErrorProcessing.js'
import { sendEmail } from '../../services/emailService/emailService.js'
import { getUser, updateUser } from '../../services/userService/index.js'

export const verifyEmail = async (req: Request, res: Response) => {
  const { verificationCode } = req.body

  if (typeof verificationCode !== 'number') {
    throw new ErrorVerificationCode()
  }

  const candidate = await getUser('verificationCode', verificationCode)

  if (!candidate) {
    throw new ErrorBadRequest()
  }
  if (candidate.verificationCode !== verificationCode) {
    throw new ErrorConfirmCode()
  }

  const userUpdate = await updateUser(candidate.email, { verify: true, verificationCode: 0 })
  // const tokens = await generateTokens(userUpdate.email, userUpdate.id)
  // await updateToken(userUpdate.id, tokens.accessToken)

  res.status(200).json({ message: 'success' })
}

export const resendingEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const candidate = await getUser('email', email.toLowerCase().trim())
  if (candidate?.verificationCode === 0) {
    throw new ErrorVerificationCodePassed()
  }

  await sendEmail(candidate?.email, candidate?.verificationCode, 'Confirm your email')

  res.status(200).json({ message: 'success' })
}
