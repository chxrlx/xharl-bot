let handler = async (m, { conn, args, groupMetadata }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat
  if (!who) throw `✳️ Etiqueta o responde al usuario que quieras quitarle una advertencia`
  if (!(who in global.db.data.users)) throw `✳️ El usuario no está registrado en la base de datos`
  let warn = global.db.data.users[who].warn
  if (warn > 0) {
    global.db.data.users[who].warn -= 1
    m.reply(`⚠️ *ADVERTENCIA*
         
▢ Advertencias: *-1*
▢ Advertencias en total: *${warn - 1}*`)
    m.reply(`✳️ Un administrador redujo tu advertencia. *${warn - 1}*`, who)
  } else if (warn == 0) {
    m.reply('✳️ El usuario no tiene advertencias')
  }
}
handler.help = ['delwarn @user']
handler.tags = ['group']
handler.command = ['delwarn', 'unwarn']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
