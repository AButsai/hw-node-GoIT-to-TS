import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import { ErrorEmailNotValid, ErrorEmailSend } from '../../errors/ErrorProcessing.js'
import { generateEmail } from '../../html/generateEmail.js'
import { IMail } from './interfaces.js'

dotenv.config()
const { SENDGRID_API_KEY, FROM_EMAIL } = process.env
sgMail.setApiKey(`SG.${SENDGRID_API_KEY}`)

const isValidEmail = (email: string) => {
  const reEmail =
    /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
  if (!email.match(reEmail)) {
    return false
  }
  return true
}

export const sendEmail = async (email = '', verificationCode = 0, title = '') => {
  if (!isValidEmail(email)) {
    throw new ErrorEmailNotValid()
  }

  const emailBody = generateEmail('Company name', title, verificationCode)

  const mail: IMail = {
    to: email,
    from: FROM_EMAIL as string,
    subject: title,
    html: emailBody,
  }

  try {
    await sgMail.send(mail)
    return true
  } catch (error) {
    throw new ErrorEmailSend()
  }
}
