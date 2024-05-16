let handler = async (m, { conn, args }) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`)
  m.reply('*✅ Descripción del grupo cambiada con éxito*')
}
handler.help = ['Setdesc <text>']
handler.tags = ['group']
handler.command = /^setdesk|setdesc$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
