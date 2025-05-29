let war = global.maxwarn
let handler = async (m, { conn, text, args, groupMetadata, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ Etiqueta o responde a alguien\n\n📌 Exjemplo: ${usedPrefix + command} @user`
  if (!(who in global.db.data.users)) throw `✳️ El usuario no está registrado en la base de datos`
  let name = conn.getName(m.sender)
  let warn = global.db.data.users[who].warn
  if (warn < war) {
    global.db.data.users[who].warn += 1
    m.reply(
      `
⚠️ *Usuario Advertido* ⚠️

▢ *Admin:* ${name}
▢ *Usuario:* @${who.split`@`[0]}
▢ *Advertencias:* ${warn + 1}/${war}
▢ *Razón:* ${text}`,
      null,
      { mentions: [who] }
    )
    m.reply(
      `
⚠️ *Precaución* ⚠️
Has recibido una advertencia del administrador

▢ *Advertencias:* ${warn + 1}/${war} 
Si recibes *${war}* advertencias, serás eliminado automáticamente del grupo`,
      who
    )
  } else if (warn == war) {
    global.db.data.users[who].warn = 0
    m.reply(`⛔ El usuario excedio las *${war}* advertencias será eliminado del grupo`)
    await time(3000)
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
    m.reply(
      `♻️ Fuiste eliminado del grupo *${groupMetadata.subject}* porque has sido advertido *${war}* veces`,
      who
    )
  }
}
handler.help = ['warn @user']
handler.tags = ['group']
handler.command = ['warn']
handler.desc = 'Warn a user'
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

const time = async ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
