let handler = async (m, { conn, command, args, usedPrefix }) => {
  let user = global.db.data.users[m.sender]

  if (user.chicken > 0) return m.reply('Ya tienes esto en tu inventario!')
  if (user.credit < 500)
    return m.reply(`🟥 *No tienes la cantidad suficiente para comprar un pollo*`)

  user.credit -= 1000
  user.chicken += 1
  m.reply(
    `🎉 Has comprado una pelea de gallos! Usa el comando ${usedPrefix}cock-fight <cantidad>`
  )
}

handler.help = ['buych']
handler.tags = ['economy']
handler.command = ['buy-chicken', 'buych']

handler.group = true

export default handler
