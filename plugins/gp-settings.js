let handler = async (m, { conn, args, usedPrefix, command }) => {
  let isClose = {
    // Switch Case Like :v
    open: 'not_announcement',
    close: 'announcement',
  }[args[0] || '']
  if (isClose === undefined)
    throw `
*✳️ Escoge una opción:*
  *▢ ${usedPrefix + command} cerrado*
  *▢ ${usedPrefix + command} abierto*
`.trim()
  await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group *open/close*']
handler.tags = ['group']
handler.command = ['group', 'grupo']
handler.desc = 'Open or close the group'
handler.admin = true
handler.botAdmin = true

export default handler
