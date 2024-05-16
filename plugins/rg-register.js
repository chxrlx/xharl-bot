//import db from '../lib/database.js'

import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true)
    throw `✳️ Ya estás registrado\n\n¿Quieres re-registrarte?\n\n 📌 Usa este comando para eliminar tu registro \n*${usedPrefix}unreg* <número de serie>`
  if (!Reg.test(text))
    throw `⚠️ Formato incorrecto\n\n ✳️ Uso del comando: *${usedPrefix + command} nombre.edad*\n📌Ejemplo: *${usedPrefix + command}* ${name2}.16`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '✳️ El nombre no puede estar vacío'
  if (!age) throw '✳️ la edad no puede estar vacía'
  if (name.length >= 30) throw '✳️ El nombre es demasiado largo'
  age = parseInt(age)
  if (age > 100) throw '👴🏻 a la verga un anciano'
  if (age < 5) throw '🚼  Y este puto bebé qué?'
  user.name = name.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(
    `
┌─「 *REGISTRADO* 」─
▢ *NÚMERO:* ${name}
▢ *EDAD* : ${age} años
▢ *NÚMERO DE SERIE* :
${sn}
└──────────────

 *${usedPrefix}help* para ver el menú
`.trim()
  )
}
handler.help = ['reg'].map(v => v + ' <name.age>')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar']

export default handler
