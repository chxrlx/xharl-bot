import axios from 'axios';
import fs from 'fs';
import path from 'path';

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Por favor proporciona una URL de Gist o múltiples URLs de Gist separadas por comas`;

    // Extraer IDs de Gist desde la(s) URL(s)
    const gistIds = text.split(',').map((url) => {
        const matches = url.match(/\/([a-f0-9]+)$/);
        return matches ? matches[1] : null;
    });

    // Filtrar IDs de Gist inválidos
    const validGistIds = gistIds.filter((id) => id !== null);

    if (validGistIds.length === 0) throw `URL(s) de Gist inválida(s)`;

    for (const gistId of validGistIds) {
        const gistURL = `https://api.github.com/gists/${gistId}`;

        try {
            const response = await axios.get(gistURL);
            const gistData = response.data;

            if (!gistData || !gistData.files) {
                throw `No se encontraron archivos válidos en el Gist con ID: ${gistId}`;
            }

            for (const file of Object.values(gistData.files)) {
                // Utilizar el nombre del archivo Gist como nombre del plugin
                const pluginName = file.filename;

                // Construir la ruta para guardar el plugin
                const pluginPath = path.join('plugins', `${pluginName}`);

                // Escribir el contenido del archivo Gist en el archivo del plugin
                await fs.promises.writeFile(pluginPath, file.content);
                m.reply(`Plugin instalado exitosamente desde el Gist ${gistId} en Xharl-Bot`);
            }
        } catch (error) {
            throw `Error al obtener o guardar el plugin desde el Gist ${gistId}: ${error.message}`;
        }
    }
};

handler.help = ['install'].map((v) => v + ' <URL(s) de Gist>');
handler.tags = ['plugin'];
handler.command = /^installv2$/i;

handler.owner = true;

export default handler;
