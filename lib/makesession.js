import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { BufferJSON } from '@whiskeysockets/baileys';
import PastebinAPI from 'pastebin-js';
import util from 'util';

let pastebin = new PastebinAPI('bR1GcMw175fegaIFV2PfignYVtF0b_Bl');

async function processTxtAndSaveCredentials(txt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pasteId = txt.replace('GuruBot~', '');

  try {
    let decodedData = await pastebin.getPaste(pasteId);

    const sessionDir = path.join(__dirname, '..', 'session');
    const credsPath = path.join(sessionDir, 'creds.json');

    // Verificar si existe el directorio 'session' y crearlo si no existe
    if (!existsSync(sessionDir)) {
      mkdirSync(sessionDir);
    }

    // Escribir las credenciales en el archivo
    writeFileSync(credsPath, decodedData.toString());
    console.log('Las credenciales se guardaron en', credsPath);
  } catch (pastebinError) {
    console.error('Error obteniendo o guardando datos de Pastebin:', pastebinError);
  }
}

export default processTxtAndSaveCredentials;
