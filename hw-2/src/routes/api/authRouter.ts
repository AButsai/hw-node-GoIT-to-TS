import express from 'express'

import { login, logout, register, resendingEmail, verifyEmail } from '../../controllers/authCtrl/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { authenticationJoiSchema, resendingEmailJoi, verifyEmailJoi } from '../../model/schemasJoi/index.js'
import { IResendingEmail, IUser, IVerifyEmail } from '../../model/schemasJoi/interfaces.js'

const authRouter = express.Router()

authRouter.get('/logout', validationSuccessToken, controllerWrapper(logout))

authRouter.post('/register', validationBody<IUser>(authenticationJoiSchema), controllerWrapper(register))

authRouter.post('/login', validationBody<IUser>(authenticationJoiSchema), controllerWrapper(login))

authRouter.post('/verify-email', validationBody<IVerifyEmail>(verifyEmailJoi), controllerWrapper(verifyEmail))

authRouter.post('/resend-email', validationBody<IResendingEmail>(resendingEmailJoi), controllerWrapper(resendingEmail))

export default authRouter
