import fetch from 'node-fetch'

let itunesHandler = async (m, { conn, text }) => {
  if (!text) throw 'Por favor ingresa un número de canción'

  try {
    let res = await fetch(`https://api.popcat.xyz/itunes?q=${encodeURIComponent(text)}`)

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }

    let json = await res.json()

    console.log('JSON response:', json)

    let songInfo = `*Información de la canción:*\n
     • *Nombre:* ${json.name}\n
     • *Artista:* ${json.artist}\n
     • *Album:* ${json.album}\n
     • *Fecha de lanzamiento:* ${json.release_date}\n
     • *Precio:* ${json.price}\n
     • *Duración:* ${json.length}\n
     • *Genero:* ${json.genre}\n
     • *URL:* ${json.url}`

    // Check if thumbnail is present, then send it with songInfo as caption
    if (json.thumbnail) {
      await conn.sendFile(m.chat, json.thumbnail, 'thumbnail.jpg', songInfo, m)
    } else {
      m.reply(songInfo)
    }
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
}

itunesHandler.help = ['itunes']
itunesHandler.tags = ['tools']
itunesHandler.command = /^(itunes)$/i

export default itunesHandler
