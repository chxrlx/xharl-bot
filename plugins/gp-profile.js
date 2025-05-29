import { createHash } from 'crypto'

let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `✳️ El usuario no está registrado en la base de datos`
  let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg')
  let user = global.db.data.users[who]
  let about = ((await conn.fetchStatus(who).catch(console.error)) || {}).status || ''
  let { name, warn, registered, regTime, age } = global.db.data.users[who]
  let username = conn.getName(who)
  let str = `*🪪 Nombre:* ${username}${about ? '\n\n 🎌 *Bio:* ' + about : ''}

*⚠️ Warnings:* ${warn}

*📇 Registrado :* ${registered ? 'Yes' : 'No'}
`
  conn.sendFile(m.chat, pp, 'profil.jpg', str, m, false, { mentions: [who] })
  m.react('👍')
}
handler.help = ['profile']
handler.tags = ['group']
handler.command = ['profile']
handler.desc = 'View your profile or the profile of a tagged user'

export default handler
