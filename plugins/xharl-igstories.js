import fetch from 'node-fetch';

async function downloadMedia(url) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    return buffer;
}

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Ingresa un texto';
    let msg = encodeURIComponent(text);
    
    try {
        let res = await fetch(`https://aemt.me/download/igstalk?username=${msg}`);
        let json = await res.json();
        let username = json.result.user_info.username;
        let stories = json.result.stories;

        let errorMsg = '';

        if (stories === null || stories.length === 0) {
            errorMsg = 'No hay historias para mostrar';
        } else {
            stories.forEach(async (story, index) => {
                let mediaSource = story.source;
                let takenAt = story.taken_at;
                let mentions = story.mentions;
                let link = story.link;
                let mediaType = story.media_type;

                let media = await downloadMedia(mediaSource);

                let caption = `*Historia de Instagram #${index + 1}*\n\n👤 *Usuario:* ${username}\n📅 *Publicada hace:* ${takenAt}`;

                // Agregar menciones si están presentes
                if (mentions && mentions.length > 0) {
                    caption += `\n*Menciones:* ${mentions.join(', ')}`;
                }

                // Agregar enlace si está presente
                if (link) {
                    caption += `\n🔗 *Link:* ${link}`;
                }

                caption += `\n\n*Créditos: Xharl - Bot*`;

                // Verificar el tipo de media y guardar adecuadamente
                if (mediaType === 'image') {
                    conn.sendFile(m.chat, media, 'igstorie.jpeg', caption, m);
                } else if (mediaType === 'video') {
                    conn.sendFile(m.chat, media, 'igstorie.mp4', caption, m);
                }
            });
        }

        if (errorMsg) {
            throw errorMsg;
        }
    } catch (e) {
        throw e;
    }
};

handler.help = ['igstory <username>'];
handler.tags = ['Social'];
handler.command = /^igstory$/i;

export default handler;