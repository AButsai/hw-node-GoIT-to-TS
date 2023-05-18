const { v4 } = require('uuid')
const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

type TContact = {
  id: string
  name: string
  email: string
  phone: string
}

const listContacts = async (): Promise<TContact[] | null> => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const allContacts = JSON.parse(data)
    if (allContacts.length !== 0) {
      return allContacts
    }
    return null
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getContactById = async (contactId: string): Promise<TContact[] | null | undefined> => {
  try {
    const allContacts = await listContacts()
    if (allContacts?.length !== 0 && allContacts) {
      return [...allContacts].filter(({ id }) => id === contactId)
    }
    return null
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (contactId: string): Promise<TContact[] | null | undefined> => {
  try {
    const allContacts = await listContacts()
    if (allContacts?.length !== 0 && allContacts) {
      const filterContact = [...allContacts].filter(({ id }) => id !== contactId)
      const updateContacts = JSON.stringify(filterContact)
      await fs.writeFile(contactsPath, updateContacts)
      return filterContact
    }
    return null
  } catch (error) {
    console.error(error)
  }
}

const addContact = async (name: string, email: string, phone: string): Promise<TContact[] | null | undefined> => {
  const id = v4()

  try {
    const allContacts = await listContacts()
    const duplicateContact = allContacts?.some((contact) => contact.name === name || contact.email === email)
    if (allContacts?.length !== 0 && allContacts) {
      if (duplicateContact) {
        throw new Error('Contact exists')
      }

      const updateContacts = [...allContacts, { id, name, email, phone }]
      const updateContactsJSONStringify = JSON.stringify(updateContacts)
      await fs.writeFile(contactsPath, updateContactsJSONStringify)
      return updateContacts
    }
    return null
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
