//import db from '../lib/database.js'

let handler = async (m, { text, usedPrefix, command }) => {
  global.db.data.sticker = global.db.data.sticker || {}
  if (!m.quoted) throw `✳️Responde al mensaje con*${usedPrefix + command}*`
  if (!m.quoted.fileSha256) throw '⚠️ Menciona el mensaje'
  if (!text) throw `✳️ no se encuentra el comando`
  let sticker = global.db.data.sticker
  let hash = m.quoted.fileSha256.toString('base64')
  if (sticker[hash] && sticker[hash].locked)
    throw '⚠️ No tienes permiso para cambiar este comando de sticker'
  sticker[hash] = {
    text,
    mentionedJid: m.mentionedJid,
    creator: m.sender,
    at: +new Date(),
    locked: false,
  }
  m.reply(`✅ comando guardado con éxito`)
}

handler.help = ['cmd'].map(v => 'set' + v + ' <txt>')
handler.tags = ['cmd']
handler.command = ['setcmd']
handler.owner = true

export default handler
