/* import { xnxxSearch, xnxxdl } from '../lib/scraper.js'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat.nsfw)
    throw `🚫 Este grupo no soporta contenido NSFW.\n\nPara habilitarlo, usa: *${usedPrefix}enable* nsfw`
  let user = global.db.data.users[m.sender].age
  if (user < 18) throw `❎ Debes tener 18 años o más para usar este comando.`
  if (!text)
    throw `✳️ Qué quieres buscar?\n📌 Uso: *${usedPrefix + command} <search>*\n\nEjemplo: culona o tambien puedes ingresar un link\nExample: .xnxx link *`

  m.react('⌛')

  let url
  try {
    url = new URL(text)
  } catch (error) {
    url = null
  }

  if (url) {
    try {
      const files = await xnxxdl(url.href)
      if (files && files.high) {
        conn.sendFile(m.chat, files.high, 'video.mp4', 'Aquí está el vídeo', m)
        m.react('✅')
      } else {
        m.reply('🔴 Error: Falló al obtener la URL')
      }
    } catch (e) {
      console.error(e)
      m.reply('🔴 Error: Encontramos un problema al procesar tu petición.')
    }
  } else {
    try {
      const results = await xnxxSearch(text)
      if (results.length > 0) {
        const message = results.map((r, i) => `${i + 1}. [${r.title}](${r.link})`).join('\n')
        m.reply(message, null, {
          contextInfo: {
            mentionJid: conn.parseMention(message),
          },
        })
      } else {
        m.reply('🔴 Error: No se encontraron resultados')
      }
    } catch (e) {
      console.error(e)
      m.reply('🔴 Error: Encontramos un problema al procesar tu solicitud.')
    }
  }
}

handler.help = ['xnxx']
handler.tags = ['nsfw', 'premium']
handler.command = ['xnxxsearch', 'xnxxdl', 'xnxx']
handler.group = true
handler.premium = false
handler.register = true

export default handler */
