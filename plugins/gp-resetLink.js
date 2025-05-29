let handler = async (m, { conn }) => {
  let res = await conn.groupRevokeInvite(m.chat)
  m.reply(
    '✅ El link del grupo se ha reiniciado con éxito\n\n📌 nuevo link:\nhttps://chat.whatsapp.com/' + res
  )
}
handler.help = ['resetlink']
handler.tags = ['group']
handler.command = ['revoke', 'resetlink', 'anularlink']
handler.desc = 'Reset the group link and send the new one'
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
