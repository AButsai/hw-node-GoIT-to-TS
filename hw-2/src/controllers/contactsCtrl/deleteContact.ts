import { Request, Response } from 'express'
import { ErrorNotFound } from '../../errors/ErrorProcessing.js'
import { deleteContactDb, getContactByIdDb } from '../../services/contactsService/index.js'

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params
  const candidate = await getContactByIdDb(id)
  if (!candidate) {
    throw new ErrorNotFound()
  }

  await deleteContactDb(id)

  res.status(200).json({ message: 'contact deleted' })
}
