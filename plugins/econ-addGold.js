let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ etiqueta al usuario'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Ingresa la cantidad de Oro que deseas agregar'
  if (isNaN(txt)) throw '🔢 Sólo números'
  let dmt = parseInt(txt)
  let diamond = dmt

  if (diamond < 1) throw '✳️ Mínimo *1*'
  let users = global.db.data.users
  users[who].credit += dmt

  await m.reply(`≡ *Oro AÑADIDO*
┌──────────────
▢ *Total:* ${dmt}
└──────────────`)
  conn.fakeReply(m.chat, `▢ Recibiste \n\n *+${dmt}* Oro`, who, m.text)
}

handler.help = ['addgold <@user>']
handler.tags = ['economy']
handler.command = ['addgold']
handler.rowner = true

export default handler
