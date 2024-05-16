import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*Este comando genera imágenes a partir de una descripción de texto*\n\n*𝙴jemplo de uso*\n*◉ ${usedPrefix + command} Beautiful anime girl*\n*◉ ${usedPrefix + command} Elon Musk in pink output*`

  try {
    m.reply('*Espera por favor, generando imágenes...*')

    const endpoint = `https://cute-tan-gorilla-yoke.cyclic.app/imagine?text=${encodeURIComponent(text)}`
    const response = await fetch(endpoint)

    if (response.ok) {
      const imageBuffer = await response.buffer()
      await conn.sendFile(m.chat, imageBuffer, 'image.png', null, m)
    } else {
      throw '*Falló al generar la imágen*'
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*'
  }
}

handler.help = ['dalle']
handler.tags = ['AI']
handler.command = ['dalle', 'gen', 'imagine', 'openai2']
export default handler
