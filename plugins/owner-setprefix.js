let handler = async (m, { conn, text }) => {
  if (!text) throw `No symbol detected ...`

  // Regular expression to check if the input contains exactly one symbol
  const symbolRegex = /^[^\w\s]{1}$/

  if (!symbolRegex.test(text)) {
    throw `Entrada de símbolo inválido. Por favor, usa solo un símbolo como prefijo.`
  }

  // If the input is valid (contains exactly one symbol), update the prefix
  global.prefix = new RegExp('^[' + text.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  await m.reply(`el prefijo ha sido cambiado a *${text}*`)
}
handler.help = ['.setprefix ', '.setprefix [symbol]']
handler.tags = ['owner']
handler.command = /^(setprefix)$/i
handler.desc = 'Set the prefix of the bot to a custom symbol'
handler.rowner = true

export default handler
