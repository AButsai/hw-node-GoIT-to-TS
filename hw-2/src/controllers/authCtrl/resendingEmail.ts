import { Request, Response } from 'express'
import { ErrorVerificationCodePassed } from '../../errors/ErrorProcessing.js'
import { sendEmail } from '../../services/emailService/emailService.js'
import { getUser } from '../../services/userService/getUser.js'

export const resendingEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const candidate = await getUser('email', email.toLowerCase().trim())
  if (candidate?.verificationCode === 0) {
    throw new ErrorVerificationCodePassed()
  }

  await sendEmail(candidate?.email, candidate?.verificationCode, 'Confirm your email')

  res.status(200).json({ message: 'success' })
}
