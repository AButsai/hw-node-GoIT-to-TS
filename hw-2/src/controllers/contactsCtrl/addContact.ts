import { Request, Response } from 'express'
import { ErrorContactExist } from '../../errors/ErrorProcessing.js'
import { addContactDb, getContactByOwnerDb } from '../../services/contactsService/index.js'

export const addContact = async (req: Request, res: Response) => {
  const { id } = req.user
  const { name, email, phone } = req.body
  const candidate = await getContactByOwnerDb(email.toLowerCase().trim(), id)
  if (candidate) {
    throw new ErrorContactExist()
  }
  const newContact = await addContactDb(id, { name, email, phone })
  res.status(200).json({ contact: newContact })
}
