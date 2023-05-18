import { Request, Response } from 'express'
import { ErrorNotFound } from '../../errors/ErrorProcessing.js'
import { getContactByIdDb, updateContactDb } from '../../services/contactsService/index.js'

export const updateStatusContact = async (req: Request, res: Response) => {
  const { id } = req.params
  const { favorite } = req.body

  const contact = await getContactByIdDb(id)
  if (!contact) {
    throw new ErrorNotFound()
  }

  const updateContact = await updateContactDb(id, { favorite })

  res.status(200).json({ contact: updateContact })
}
