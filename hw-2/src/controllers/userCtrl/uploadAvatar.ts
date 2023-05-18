import { Request, Response } from 'express'
import fs from 'fs/promises'
import { MulterError } from 'multer'
import path from 'path'
import { v4 } from 'uuid'
import { ErrorBadRequest, ErrorFileProvided, ErrorMulter } from '../../errors/ErrorProcessing.js'
import { photoProcessing } from '../../helpers/index.js'
import { updateUser } from '../../services/userService/index.js'
import { getDirname } from '../../utils/utils.js'

const __dirname = getDirname(import.meta.url)

const avatarsDir = path.join(__dirname, '../../', 'public', 'images', 'avatars')

export const uploadAvatar = async (req: Request, res: Response) => {
  const { email } = req.user
  const file = req.file
  if (!file) {
    throw new ErrorFileProvided()
  }
  const { path: tempUpload, originalname } = file

  const avatarName = `${v4()}_${originalname}`
  const resultPath = path.join(avatarsDir, avatarName)

  try {
    await photoProcessing(tempUpload, 250)
    await fs.rename(tempUpload, resultPath)
    const avatarURL = path.join('images', 'avatars', avatarName)
    await updateUser(email, { avatarURL })
    res.status(200).json({ avatarUrl: avatarURL })
  } catch (error) {
    await fs.unlink(tempUpload)
    if (error instanceof MulterError) {
      throw new ErrorMulter(error.message)
    } else {
      throw new ErrorBadRequest()
    }
  }
}
