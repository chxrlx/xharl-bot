import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'

const effects = ['jail', 'gay', 'glass', 'wasted', 'triggered', 'lolice', 'simpcard', 'horny']

let handler = async (m, { conn, usedPrefix, text, command }) => {
  let effect = text.trim().toLowerCase()
  if (!effects.includes(effect))
    throw `

┌─⊷ *EFFECTS*
${effects.map(effect => `▢ ${effect}`).join('\n')}
└───────────

📌 *Example:* 
${usedPrefix + command} wasted 
`.trim()
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw '✳️ Respondde a una imagen'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `✳️ Formato no soportado`
  let img = await q.download()
  let url = await uploadImage(img)
  let apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
    avatar: url,
  })
  try {
    let stiker = await sticker(null, apiUrl, global.packname, global.author)
    conn.sendFile(m.chat, stiker, null, { asSticker: true }, m)
  } catch (e) {
    m.reply('Error al convertir a sticker')
    await conn.sendFile(m.chat, apiUrl, 'smaker.png', null, m)
  }
}
handler.help = ['smaker']
handler.tags = ['sticker']
handler.command = ['stickmaker', 'stickermaker', 'smaker']
handler.diamond = false

export default handler
