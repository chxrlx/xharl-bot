import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Por favor ingresa el texto, Ejemplo de uso ${usedPrefix}img sunnyleone`
  }
  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text
  }

  const match = text.match(/(\d+)/)
  const numberOfImages = match ? parseInt(match[1]) : 1

  try {
    m.reply('*Please wait*')

    const images = []

    for (let i = 0; i < numberOfImages; i++) {
      const endpoint = `https://api.guruapi.tech/api/googleimage?text=${encodeURIComponent(text)}`
      const response = await fetch(endpoint)

      if (response.ok) {
        const imageBuffer = await response.buffer()
        images.push(imageBuffer)
      } else {
        throw '*Falló al generar imagen*'
      }
    }

    for (let i = 0; i < images.length; i++) {
      await conn.sendFile(m.chat, images[i], `image_${i + 1}.png`, null, m)
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*'
  }
}

handler.help = ['image']
handler.tags = ['fun']
handler.command = ['img', 'gimage']

export default handler
