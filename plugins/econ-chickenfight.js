let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  /*if (global.db.data.users[m.sender].level < 5) {
    return conn.reply(m.chat, 'You must be at least level 5 to use this command.', m);
  }*/

  let fa = `🟥 *Ingresa la cantidad de oro para apostar*

*Ejemplo:*
${usedPrefix + command} 1000`.trim()
  if (!args[0]) throw fa
  if (isNaN(args[0])) throw fa

  let users = global.db.data.users[m.sender]
  let credit = users.credit
  let amount =
    (args[0] && number(parseInt(args[0]))
      ? Math.max(parseInt(args[0]), 1)
      : /all/i.test(args[0])
        ? Math.floor(parseInt(users.credit))
        : 1) * 1

  let time = users.lastcf + 90000
  if (new Date() - users.lastcf < 90000)
    throw `Puedes jugar a la pelea de gallos en ${msToTime(time - new Date())}`
  if (amount < 100) throw `🟥 *No puedes apostar menos de 100 de oro*`
  if (users.credit < amount)
    throw `🟥 *No tienes suficiente oro para apostar.*\n*Actualmente tienes ${credit} de oro.*`
  if (users.chicken < 1) {
    throw `🟥 *No tienes ningún gallo para apostar* \nUsa el comando ${usedPrefix}buy-chicken`
  }
  //if (amount > 100000) throw `🟥 *You can't bet gold more than 100000*`

  let botScore = Math.ceil(Math.random() * 35) * 1 // Random score for the bot (1 to 51)
  let playerScore = Math.floor(Math.random() * 101) * 1 // Random score for the player (1 to 100)
  let status = `Your chicken died 🪦`

  if (botScore < playerScore) {
    users.credit += amount * 1
    status = `Tu gallo ganó la pelea, y te hizo ganar 🪙 ${amount * 2} de oro! 🐥`
  } else {
    users.credit -= amount * 1
    users.chicken -= 1
    users.lastcf = new Date() * 1
  }

  let result = `${status}
      `.trim()

  m.reply(result)
}

handler.help = ['cock-fight <amount>']
handler.tags = ['economy']
handler.command = ['cock-fight', 'cf']

handler.group = true

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '' + hours : hours
  minutes = minutes < 10 ? '' + minutes : minutes
  seconds = seconds < 10 ? '' + seconds : seconds

  return minutes + ' minutes ' + seconds + ' seconds'
}
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

/**
 * Detect if thats number
 * @param {Number} x
 * @returns Boolean
 */
function number(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}
