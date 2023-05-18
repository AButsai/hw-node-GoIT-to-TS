import { Contact } from '../../model/schemasMongoose/contactsSchema.js'

export interface IUpdateContact {
  name?: string
  email?: string
  phone?: string
  favorite?: boolean
}

export const updateContactDb = async (_id: string, body: IUpdateContact) => {
  return await Contact.findByIdAndUpdate({ _id }, body, { new: true })
}
