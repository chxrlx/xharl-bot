let handler = async (m, { conn, args, groupMetadata }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `✳️ El usuario no está registrado en la base de datos`
  let warn = global.db.data.users[who].warn
  let name = conn.getName(who)
  m.reply(`
 *ADVERTENCIAS*

▢ *Nombre:* ${name} 
▢ *Advertencias:* ${warn}`)
}

handler.help = ['warns']
handler.tags = ['group']
handler.command = ['warns']
handler.desc = 'Check the number of warnings of a user'
handler.group = true

export default handler
