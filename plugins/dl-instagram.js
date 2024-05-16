import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `Necesias ingresar el link de cualquier video, post, reel o imagen de Instagram`
  m.reply(wait)

  let res
  try {
    res = await fetch(`${gurubot}/igdlv1?url=${text}`)
  } catch (error) {
    throw `Ocurrió un error: ${error.message}`
  }

  let api_response = await res.json()

  if (!api_response || !api_response.data) {
    throw `No se encontró algún video o imagen, o no se obtuvo una respuesta de la API`
  }

  const mediaArray = api_response.data

  for (const mediaData of mediaArray) {
    const mediaType = mediaData.type
    const mediaURL = mediaData.url_download

    let cap = `Aquí está ${mediaType.toUpperCase()} .|.`

    if (mediaType === 'video') {
      conn.sendFile(m.chat, mediaURL, 'instagram.mp4', cap, m)
    } else if (mediaType === 'image') {
      conn.sendFile(m.chat, mediaURL, 'instagram.jpg', cap, m)
    }
  }
}

handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(instagram|igdl|ig|insta)$/i

export default handler
