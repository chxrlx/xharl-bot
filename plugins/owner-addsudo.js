let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
  } else {
    who = m.chat
  }
  let name = await conn.getName(m.quoted.sender)
  if (!who) throw 'Etiqueta a la persona que quieras que sea dueño!'
  if (global.owner.includes(who.split('@')[0])) throw 'Esta persona ya es dueño!'
  global.owner.push([who.split('@')[0], name, true])
  const caption = `Now @${who.split('@')[0]} se ha convertido en dueño!`
  await conn.reply(m.chat, caption, m, {
    mentions: conn.parseMention(caption),
  })
}
handler.help = ['addowner @user']
handler.tags = ['owner']
handler.command = /^(add|give|-)(owner|sudo)$/i
handler.desc = 'Add a user as an owner'
handler.owner = true

export default handler
