//import db from '../lib/database.js'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text
    m.reply('✅ El mensaje de despedida se ha establecido con éxito')
  } else throw `✳️ ingresa el mensaje\n@user (mención)`
}
handler.help = ['setbye <text>']
handler.tags = ['group']
handler.command = ['setbye']
handler.desc = 'Set the farewell message for the group'
handler.admin = true
handler.owner = false

export default handler
