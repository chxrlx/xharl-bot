import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Por favor ingresa una palabra para buscar en el diccionario.'

  const url = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(text)}`

  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    throw `An error occurred: ${json.message}`
  }

  if (!json.list.length) {
    throw 'No se encontraron definiciones para la palabra ingresada.'
  }

  const firstEntry = json.list[0]
  const definition = firstEntry.definition
  const example = firstEntry.example ? `*Ejemplo:* ${firstEntry.example}` : ''

  const message = `*Palabra:* ${text}\n*Definición:* ${definition}\n${example}`
  conn.sendMessage(m.chat, { text: message }, 'extendedTextMessage', { quoted: m })
}

handler.help = ['define <word>']
handler.tags = ['tools']
handler.command = /^define/i

export default handler
