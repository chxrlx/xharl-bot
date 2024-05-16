//import db from '../lib/database.js'

let handler = async (m, { text, conn }) => {
  let user = global.db.data.users[m.sender]
  user.afk = +new Date()
  user.afkReason = text
  m.reply(`
  😴 *AFK* 
Ahora estás AFK hasta que envíes un mensaje 
▢ *Usuario:* ${conn.getName(m.sender)} 
▢ *Razón:* ${text ? text : ''}
  `)
}
handler.help = ['afk <razón>']
handler.tags = ['fun']
handler.command = ['afk']
handler.group = true

export default handler
