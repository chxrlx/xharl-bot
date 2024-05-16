import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime))
    throw `✳️ Responde al audio que quieras convertir a nota de voz:\n *${usedPrefix + command}*`
  let media = await q.download?.()
  if (!media) throw '❎ Failló al descargar el archivo'
  let audio = await toPTT(media, 'mp4')
  if (!audio.data) throw '❎ Error al convertir a nota de voz'
  conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['toav']
handler.tags = ['fun']

handler.command = ['toav', 'tovn']

export default handler
