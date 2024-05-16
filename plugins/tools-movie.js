import fetch from 'node-fetch'

let imdbHandler = async (m, { conn, text }) => {
  if (!text) throw 'Please provide a movie title'

  try {
    let res = await fetch(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(text)}`)

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`)
    }

    let json = await res.json()

    console.log('JSON response:', json)

    let ratings = json.ratings.map(rating => `• *${rating.source}:* ${rating.value}`).join('\n')

    let movieInfo = `*Información de la Película:*\n
     • *Título:* ${json.title}\n
     • *Año:* ${json.year}\n
     • *Temporadas:* ${json.totalseasons}\n
     • *Calificación:* ${json.rated}\n
     • *Lanzamiento:* ${json.released}\n
     • *Runtime:* ${json.runtime}\n
     • *Generos:* ${json.genres}\n
     • *Director:* ${json.director}\n
     • *Escritor:* ${json.writer}\n
     • *Actores:* ${json.actors}\n
     • *Plot:* ${json.plot}\n
     • *Languajes:* ${json.languages}\n
     • *País:* ${json.country}\n
     • *Premios:* ${json.awards}\n
     • *Metascore:* ${json.metascore}\n
     • *Rating:* ${json.rating}\n
     • *Votos:* ${json.votes}\n
     • *IMDB ID:* ${json.imdbid}\n
     • *Tipo:* ${json.type}\n
     • *DVD:* ${json.dvd}\n
     • *Box Office:* ${json.boxoffice}\n
     • *Producción:* ${json.production}\n
     • *Website:* ${json.website}\n\n
     *Calificaciones:*\n${ratings}`

    // send the movie poster along with the movie information as caption
    await conn.sendFile(m.chat, json.poster, 'poster.jpg', movieInfo, m)
  } catch (error) {
    console.error(error)
    // Handle the error appropriately
  }
}

imdbHandler.help = ['imdb']
imdbHandler.tags = ['tools']
imdbHandler.command = /^(imdb|movie)$/i

export default imdbHandler
