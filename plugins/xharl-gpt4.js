import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Ingresa un texto'
    m.react(rwait)
    let msg = encodeURIComponent(text)
    let res = await fetch(`https://aemt.me/v2/gpt4?text=${msg}`)
    let data = await res.json()
    let buffer = data.result
    conn.reply(m.chat, buffer, m)
    m.react(done)
}

handler.help = ['gpt4 <query>']
handler.tags = ['AI']
handler.command = /^gpt4$/i

export default handler
