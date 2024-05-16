//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text
    m.reply('✅ El mensaje de bienvenida se ha establecido con éxito')
  } else
    throw `✳️ Ingresa el mensaje de bienvenida\n\n@user (mención)\n@group (nombre del grupo)\n@desc (descripción del grupo)`
}
handler.help = ['setwelcome <text>']
handler.tags = ['group']
handler.command = ['setwelcome']
handler.admin = true
handler.owner = false

export default handler
