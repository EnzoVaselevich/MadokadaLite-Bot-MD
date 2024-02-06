import yts from 'yt-search'
import fg from 'api-dylux'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
let limit = 320
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  
    if (!text) throw `*Hace falta el título o enlace del video de YouTube* 🍁 ${mssg.example} *${usedPrefix + command}* Lil Peep hate my life`
  let chat = global.db.data.chats[m.chat]
  let res = await yts(text)
  //let vid = res.all.find(video => video.seconds < 3600)
  let vid = res.videos[0]
  if (!vid) throw ` *Tu Vídeo o audio no ha sido encontrado*🌬️`
  let isVideo = /vid$/.test(command)
  m.react('💖') 
  
  let play = `
		–  *Y O U T U B E   P L A Y*
°•°•°•°•°•°•°•°∞°•°•°•°•°•°•°•°
┌✧🥛 *ᴛɪᴛᴜʟᴏ ∙*: *${mssg.title}:* ${vid.title}
│✦🍧 *ᴘᴜʙʟɪᴄᴀᴅᴏ ∙*:  *${mssg.aploud}:* ${vid.ago}
│✦🧃 *ᴅᴜʀᴀᴄɪᴏ́ɴ ∙*:  *${mssg.duration}:* ${vid.timestamp}
│✧🍚 *ᴠɪsᴛᴀs ∙*: *${mssg.views}:* ${vid.views.toLocaleString()}
°•°•°•°•°•°•°•°∞°•°•°•°•°•°•°•°

*°•°•°•°•°•°•°•°∞°•°•°•°•°•°•°•°*

El pedido se esta enviando, Espere un momento🍃

*servicios proporcionado por MadokaLite-Bot-MD*` 
conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, rcanal)
  
  let q = isVideo ? '360p' : '128kbps' 
try {
  let yt = await (isVideo ? fg.ytv : fg.yta)(vid.url, q)
  let { title, dl_url, quality, size, sizeB } = yt
  let isLimit = limit * 1024 < sizeB 

     await conn.loadingMsg(m.chat, '📥 Descargando', ` ${isLimit ? `≡  *FG YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *🎞️${mssg.quality}*: ${quality}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ Descarga Completada' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m)
     
	  if(!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), `
  ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
  ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
 💬 *MadokaLitte-MD*
  
┌✧🥛 *ᴛɪᴛᴜʟᴏ ∙*: ${title}
│✦🍧 *calidad ∙*: ${quality}
│✧🍚 *peso ∙*: ${size}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
`.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
		m.react(done) 
  } catch {
  try {
//  let q = isVideo ? '360p' : '128kbps' 
  let yt = await (isVideo ? fg.ytmp4 : fg.ytmp3)(vid.url, q)
  let { title, dl_url, quality, size, sizeB } = yt
  let isLimit = limit * 1024 < sizeB 

     await conn.loadingMsg(m.chat, '📥 Descargando', ` ${isLimit ? `≡  *FG YTDL*\n\n▢ *⚖️${mssg.size}*: ${size}\n▢ *🎞️${mssg.quality}*: ${quality}\n\n▢ _${mssg.limitdl}_ *+${limit} MB*` : '✅ Descarga Completada' }`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m)
	  if(!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /2$/.test(command)), `
  ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
  ﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
  💬 *MadokaLite-MD* *two*
  
┌✧🥛 *ᴛɪᴛᴜʟᴏ ∙*: ${title}
│✦🍧 *calidad ∙*:  ${quality}
│✧🍚 *peso ∙*: ${size}
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘﹘
`.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
		m.react(done) 
		
		 } catch (error) {
        m.reply(`❎ ${mssg.error}`)
    }
}

}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'playvid']

export default handler