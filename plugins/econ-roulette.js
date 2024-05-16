let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let amount = parseInt(args[0])
  let color = args[1]?.toLowerCase()
  if (args.length < 2)
    throw `✳️ Uso del comando: ${usedPrefix + command} <cantidad> <color>\n\n Ejemplo: ${usedPrefix + command} 500 red`
  let colores = ['red', 'black']
  let colour = colores[Math.floor(Math.random() * colores.length)]
  let user = global.db.data.users[m.sender]
  if (isNaN(amount) || amount < 500) throw `✳️ El mínimo de apuesta es 500`
  if (!colores.includes(color)) throw '✳️ Debes apostar a un color válido (red/black)'
  if (user.credit < amount) throw '✳️ No tienes suficiente oro para apostar!'
  if (amount > 100000) throw `🟥 No puedes apostar más de 100000 de oro`
  let result = ''
  if (colour == color) {
    result = `${colour == 'red' ? 'La bola cayó en 🔴' : 'La bola cayó en ⚫'} \n\nGanaste ${amount * 2} de oro`
    user.credit += amount * 2
  } else {
    result = `${colour == 'red' ? 'La bola cayó en 🔴' : 'La bola cayó en ⚫'} \n\nPerdiste ${amount} de oro`
    user.credit -= amount
  }
  m.reply(result)
}
handler.help = ['roulette <amount> <color(red/black)>']
handler.tags = ['economy']
handler.command = ['roulette', 'rt']

handler.group = true

export default handler
