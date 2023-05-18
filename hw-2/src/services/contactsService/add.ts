import { Contact } from '../../model/schemasMongoose/contactsSchema.js'

export interface IAddContact {
  name: string
  email: string
  phone: string
}

export const addContactDb = async (userId: string, body: IAddContact) => {
  return Contact.create({ ...body, owner: userId })
}
