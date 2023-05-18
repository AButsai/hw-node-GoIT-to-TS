import { Request, Response } from 'express'
import { ErrorEmailExist } from '../../errors/ErrorProcessing.js'
import { createHashPassport, getRandomInRange } from '../../helpers/index.js'
import { generateTokens } from '../../helpers/jwt.js'
import { sendEmail } from '../../services/emailService/emailService.js'
import { addToken } from '../../services/tokenService/addToken.js'
import { addNewUser, getUser } from '../../services/userService/index.js'

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const candidate = await getUser('email', email.toLowerCase().trim())
  console.log('candidate', candidate)
  if (candidate) {
    throw new ErrorEmailExist()
  }

  const verificationCode = getRandomInRange()
  const hasPassword = createHashPassport(password)
  await sendEmail(email.trim(), verificationCode, 'Confirm your email')

  const user = await addNewUser({ email: email.toLowerCase().trim(), password: hasPassword, verificationCode })

  const tokens = await generateTokens(user.email, user._id)
  await addToken({ accessToken: tokens.accessToken, owner: user._id })

  res.status(201).json({ message: 'Success', accessToken: tokens.accessToken })
}
