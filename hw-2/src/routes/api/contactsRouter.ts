import express from 'express'

import {
  addContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
  updateStatusContact,
} from '../../controllers/contactsCtrl/index.js'
import { controllerWrapper, validationBody, validationSuccessToken } from '../../middleware/index.js'
import { contactJoiSchema, updateStatusContactJoi } from '../../model/schemasJoi/index.js'
import { IContact, IUpdateStatusContact } from '../../model/schemasJoi/interfaces.js'
const contactRouter = express.Router()

contactRouter.use(validationSuccessToken)

contactRouter.get('/', controllerWrapper(getAllContacts))
contactRouter.get('/:id', controllerWrapper(getContactById))
contactRouter.post('/', validationBody<IContact>(contactJoiSchema), controllerWrapper(addContact))
contactRouter.delete('/:id', controllerWrapper(deleteContact))
contactRouter.put('/:id', validationBody<IContact>(contactJoiSchema), controllerWrapper(updateContact))
contactRouter.patch(
  '/:id/favorite',
  validationBody<IUpdateStatusContact>(updateStatusContactJoi),
  controllerWrapper(updateStatusContact),
)

export default contactRouter
