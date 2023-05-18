import { Document, Schema, Types, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

interface IContact extends Document {
  name: string
  email: string
  phone: string
  favorite: boolean
  owner: Types.ObjectId
}

const contact = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Invalid email format',
      },
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

contact.plugin(uniqueValidator)

export const Contact = model<IContact>('contact', contact)
