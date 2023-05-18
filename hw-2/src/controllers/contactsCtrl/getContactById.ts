import { Request, Response } from 'express'
import { ErrorNotFound } from '../../errors/ErrorProcessing.js'
import { getContactByIdDb } from '../../services/contactsService/index.js'

export const getContactById = async (req: Request, res: Response) => {
  const { id } = req.params

  const contact = await getContactByIdDb(id)
  if (!contact) {
    throw new ErrorNotFound()
  }
  res.status(200).json({ contact })
}
