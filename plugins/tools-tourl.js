import uploadtoimgur from '../lib/imgur.js'
import fs from 'fs'
import path from 'path'

let handler = async m => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!mime) {
    throw '✳️ Responde a una imagen o video.'
  }
  let mediaBuffer = await q.download()

  if (mediaBuffer.length > 10 * 1024 * 1024) {
    throw '✴️ El tamaño del archivo excede el límite de 10 MB.'
  }

  let currentModuleDirectory = path.dirname(new URL(import.meta.url).pathname)

  let tmpDir = path.join(currentModuleDirectory, '../tmp')
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }

  let mediaPath = path.join(tmpDir, `media_${Date.now()}.${mime.split('/')[1]}`)
  fs.writeFileSync(mediaPath, mediaBuffer)

  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)

  if (isTele) {
    let link = await uploadtoimgur(mediaPath)

    const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2)

    m.reply(`✅ *Se subió el archivo correctamente*\n♕ *Tamaño del archivo:* ${fileSizeMB} MB\n♕ *URL:* ${link}`)
  } else {
    m.reply(`♕ ${mediaBuffer.length} Byte(s) 
    ♕ (Unknown)`)
  }

  fs.unlinkSync(mediaPath)
}

handler.help = ['tourl']
handler.tags = ['tools']
handler.command = ['url', 'tourl']

export default handler
