import fetch from "node-fetch"

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ Por favor envía el link de un vídeo de Facebook\n\n📌 Ejemplo:\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`
  }

  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  if (!urlRegex.test(args[0])) {
    throw '⚠️ POR FAVOR INGRESA UN LINK VÁLIDO'
  }

  let url = `https://api.guruapi.tech/fbvideo?url=${args[0]}`

  m.react(rwait)

  try {
    const result = await fetch(url)
    const tex = `
⊱ ─── {* GURU FBDL*} ─── ⊰
↳ *VIDEO TITLE:* ${result.result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`

    const response = await fetch(result.result.hd)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
    m.react(done)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ Ocurrió un error al procesar tu solicitud, inténtalo de nuevo más tarde')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
handler.diamond = true

export default handler
