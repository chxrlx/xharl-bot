let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  // Split the message text using the '|' character and slice the array to remove the first element.
  let a = text.split('|').slice(1)
  if (!a[1]) throw 'Formato\n' + usedPrefix + command + ' hola |sí|no'
  if (a[12]) throw 'Demasiadas opciones, Formato\n' + usedPrefix + command + ' hola |sí|no'
  // Check for duplicate options in the poll.
  if (checkDuplicate(a)) throw '¡Opciones duplicadas!'
  let cap = '*Solicitud de encuesta por* ' + m.name + '\n*Mensaje:* ' + text.split('|')[0]

  const pollMessage = {
    name: cap,
    values: a,
    multiselect: false,
    selectableCount: 1,
  }

  await conn.sendMessage(m.chat, {
    poll: pollMessage,
  })
}

handler.help = ['encuesta pregunta|opcion|opcion']
handler.tags = ['group']
handler.command = /^en(c((c?uesta|cs)|c)|cs?)$/i;
handler.desc = 'Create a poll in the group chat. Format: question|option1|option2|...'

export default handler

// Function to check for duplicate elements in an array.
function checkDuplicate(arr) {
  return new Set(arr).size !== arr.length
}
