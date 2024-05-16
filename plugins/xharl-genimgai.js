import fetch from 'node-fetch';
import fs from 'fs/promises';

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Ingresa un texto'
    m.react(rwait)
    let msg = encodeURIComponent(text)
    try {
        let res = await fetch(`https://aemt.me/ai/text2img?text=${msg}`)
        let img = await res.buffer()
        let caption = `╚─━░★ Creado por: Xharl-Bot ★░━─╝`
        conn.sendFile(m.chat, img, 'image.png', caption, m)
        m.react(done)
    }
    catch (e) {
        m.reply('Error')
        throw e
    }
}
handler.help = ['genimgai <query>']
handler.tags = ['AI']
handler.command = /^genimgai$/i

export default handler