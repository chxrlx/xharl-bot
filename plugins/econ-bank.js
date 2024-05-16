let handler = async (m, { conn, usedPrefix }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  let user = global.db.data.users[who]
  let username = conn.getName(who)
  //let { wealth } = global.db.data.users[who]
  if (!(who in global.db.data.users)) throw `✳️ El usuario no está registrado en la base de datos.`

  var wealth = 'En quiebra😭'
  if (`${user.bank}` <= 3000) {
    wealth = 'En quiebra😭'
  } else if (`${user.bank}` <= 6000) {
    wealth = 'Pobre😢'
  } else if (`${user.bank}` <= 100000) {
    wealth = 'Promedio💸'
  } else if (`${user.bank}` <= 1000000) {
    wealth = 'Rico💸💰'
  } else if (`${user.bank}` <= 10000000) {
    wealth = 'Millonario🤑'
  } else if (`${user.bank}` <= 1000000000) {
    wealth = 'Multi-Millonario🤑'
  } else if (`${user.bank}` <= 10000000000) {
    wealth = 'Billonario🤑🤑'
  }

  conn.reply(
    m.chat,
    `🏦 *Banco | ${username}*

*🪙 Oro* : ${user.bank}

*Riqueza:* ${wealth}

`,
    m,
    { mentions: [who] }
  ) //${user.chicken}
}
handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['bank', 'vault']

export default handler
