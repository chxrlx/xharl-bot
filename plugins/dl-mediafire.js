import fetch from 'node-fetch'
import { mediafiredl } from '@bochilteam/scraper'

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
  var limit
  if (isOwner || isPrems) limit = 1200
  else limit = 100
  if (!args[0]) throw `✳️ Ingresa el link de Mediafire`
  if (!args[0].match(/mediafire/gi)) throw `❎ Link incorrecto`
  m.react(rwait)
  let full = /f$/i.test(command)
  let u = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = await (await fetch(`https://image.thum.io/get/fullpage/${u}`)).buffer()
  let res = await mediafiredl(args[0])
  let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
  let isLimit = (isPrems || isOwner ? limit : limit) * 1012 < filesize
  let caption = `
   ≡ *MEDIAFIRE*

▢ *Number:* ${filename}
▢ *Size:* ${filesizeH}
▢ *Extension:* ${ext}
▢ *Uploaded:* ${aploud}
${isLimit ? `\n▢ El archivo excede el límite de descarga *+${limit} MB*\nActualiza a Premium para poder descargar archivos de más de *900 MB*` : ''} 
`.trim()
  await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m)

  if (!isLimit)
    await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
  m.react(done)
}
handler.help = ['mediafire <url>']
handler.tags = ['downloader', 'premium']
handler.command = ['mediafire', 'mfire']
handler.credit = true
handler.premium = false

export default handler
