import { Request, Response } from 'express'
import { ErrorNotFound } from '../../errors/ErrorProcessing.js'
import { getAllContactsDb } from '../../services/contactsService/index.js'

export const getAllContacts = async (req: Request, res: Response) => {
  const { id } = req.user
  const { favorite = false } = req.query
  let page = parseInt(req.query.page as string, 10)
  let limit = parseInt(req.query.limit as string, 10)

  if (isNaN(page) || (page === undefined && isNaN(limit)) || limit === undefined) {
    page = 0
    limit = 10
  }

  const allContacts = await getAllContactsDb(id, page, limit)
  if (!allContacts) {
    throw new ErrorNotFound()
  }

  if (favorite === 'true') {
    const contacts = [...allContacts].filter((contact) => contact.favorite === !!favorite)
    return res.status(200).json({ contacts, page, limit })
  }

  res.status(200).json({ contacts: allContacts, page, limit })
}
