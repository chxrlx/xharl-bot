import fetch from 'node-fetch'

let handler = async (m, { conn, args, text }) => {
  if (!text) throw '*Please provide a URL or link to shorten.*'

  let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()

  if (!shortUrl1) throw `*Error: No se puede acortar la URL*`

  let done =
    `*URL acortada creada*\n\n*Link original:*\n${text}\n*URL acortada:*\n${shortUrl1}`.trim()

  m.reply(done)
}

handler.help = ['tinyurl', 'shorten'].map(v => v + ' <link>')
handler.tags = ['tools']
handler.command = /^(tinyurl|short|acortar|corto)$/i
handler.fail = null

export default handler
