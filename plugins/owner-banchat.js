//import db from '../lib/database.js'

let handler = async (m, { conn, isOwner, isAdmin, isROwner }) => {
  if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
  global.db.data.chats[m.chat].isBanned = true
  m.reply('✅ El bot ha sido desactivado en este grupo')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = ['banchat', 'chatoff']

export default handler
