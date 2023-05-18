import { Contact } from '../../model/schemasMongoose/contactsSchema.js'

export const deleteContactDb = async (_id: string) => {
  return await Contact.findByIdAndDelete({ _id })
}
