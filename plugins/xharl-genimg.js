import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Ingresa un texto';
    m.react(rwait);

    const apiVersions = [1, 2, 4, 5, 6];

    try {
        for (const version of apiVersions) {
            const res = await fetch(`https://aemt.me/v${version}/text2img?text=${encodeURIComponent(text)}`);
            const img = await res.buffer();
            const caption = `𝕮𝖗𝖊𝖆𝖉𝖆 𝖕𝖔𝖗: 𝖃𝖍𝖆𝖗𝖑-𝕭𝖔𝖙\n\n𝘝𝘦𝘳𝘴𝘪ó𝘯 𝘥𝘦 𝘭𝘢 𝘈𝘗𝘐: V${version}`;
            conn.sendFile(m.chat, img, `image.png`, caption, m);
        }

        m.react(done);
    } catch (e) {
        m.reply('Error');
        throw e;
    }
};

handler.help = ['genimgai <query>'];
handler.tags = ['AI'];
handler.command = /^genimg$/i;

export default handler;