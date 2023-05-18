import { Contact } from '../../model/schemasMongoose/contactsSchema.js'

export const getContactByIdDb = async (_id: string) => {
  return await Contact.findById({ _id })
}
