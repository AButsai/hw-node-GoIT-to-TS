import express from 'express'

import { current, updateSubscription, uploadAvatar } from '../../controllers/userCtrl/index.js'
import { controllerWrapper, upload, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { updateSubscriptionJoi } from '../../model/schemasJoi/index.js'
import { IUpdateSubscription } from '../../model/schemasJoi/interfaces.js'

const userRouter = express.Router()

userRouter.use(validationSuccessToken)

userRouter.get('/current', controllerWrapper(current))

userRouter.patch(
  '/subscription',
  validationBody<IUpdateSubscription>(updateSubscriptionJoi),
  controllerWrapper(updateSubscription),
)

userRouter.patch('/avatar', upload.single('image'), controllerWrapper(uploadAvatar))

export default userRouter
