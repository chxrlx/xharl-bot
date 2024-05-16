//import db from '../lib/database.js'

export function before(m) {
  let user = global.db.data.users[m.sender]
  if (user.afk > -1) {
    m.reply(
      `
  ✅ Paraste de estar AFK
${user.afkReason ? ' \n▢ *Razón:* ' + user.afkReason : ''}
▢ *Hace:* ${(new Date() - user.afk).toTimeString()}
  `.trim()
    )
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let user = global.db.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    m.reply(
      `
💤 El pendejo que has mencionado está AFK 

${reason ? '▢ *Razón*: ' + reason : '▢ *Razón* : sin razón'}
▢ *Hace:* ${(new Date() - afkTime).toTimeString()}
  `.trim()
    )
  }
  return true
}
