import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn }) => {
  let name = conn.getName(m.sender)
  let pp = await conn
    .profilePictureUrl(m.sender, 'image')
    .catch(_ => 'https://i.imgur.com/whjlJSf.jpg')
  let user = global.db.data.users[m.sender]
  let background = 'https://i.ibb.co/4YBNyvP/images-76.jpg' // Fixed background URL

  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let txt = `
┌───⊷ *NIVEL*
▢ Número: *${name}*
▢ Nivel: *${user.level}*
▢ XP: *${user.exp - min}/${xp}*
▢ Rol: *${user.role}*
└──────────────

¡Hola, ${name}! Aún no estás listo para subir de nivel. ¡Parece que necesitas farmear *${max - user.exp}* más XP para subir de nivel y alcanzar nuevas alturas! Sigue así, ¡y los bots no tardarán en cantar tus alabanzas! 🚀
`.trim()

    try {
      let imgg = `https://wecomeapi.onrender.com/rankup-image?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`
      conn.sendFile(m.chat, imgg, 'level.jpg', txt, m)
    } catch (e) {
      m.reply(txt)
    }
  } else {
    let str = `
┌─⊷ *SUBIR DE NIVEL*
▢ Nivel anterior: *${user.level - 1}*
▢ Nivel actual: *${user.level}*
▢ Rol: *${user.role}*
└──────────────

¡Woo-hoo, ${name}! ¡Has alcanzado nuevas alturas y has llegado al nivel ${user.level}! 🎉 ¡Es hora de celebrarlo! 🎊
Tu nuevo poder infundirá miedo en los corazones de los trolls, ¡y los bots se inclinarán ante tus órdenes! Sigue con el increíble trabajo, ¡y quién sabe qué aventuras épicas te esperan a continuación! 🌟
`.trim()

    try {
      let img = `https://wecomeapi.onrender.com/levelup-image?avatar=${encodeURIComponent(pp)}`
      conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
    } catch (e) {
      m.reply(str)
    }
  }
}

handler.help = ['levelup']
handler.tags = ['economy']
handler.command = ['lvl', 'levelup', 'level']

export default handler
