import yts from 'yt-search'
let handler = async (m, { conn, command, text, usedPrefix }) => {
	
  if (!text) throw `✳️ ${mssg.example} *${usedPrefix + command}* Lil Peep hate my life`
	let res = await yts(text)
	let vid = res.videos[0]
	if (!vid) throw `✳️ Vídeo/Audio no encontrado`
	let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
	//const url = 'https://www.youtube.com/watch?v=' + videoId
	m.react('🧊') 
	let play = `
	–  *Y O U T U B E   P L A Y*
	
┌✧🥛 *ᴛɪᴛᴜʟᴏ ∙*: *${mssg.title()}* : ${title}
│✦🍧 *ᴘᴜʙʟɪᴄᴀᴅᴏ ∙* *${mssg.uploud()}:* ${ago}
│✦🧃 *ᴅᴜʀᴀᴄɪoɴ ∙* *${mssg.duration}:* ${timestamp}
│✧🍚 *ᴠɪsᴛᴀs ∙* *${mssg.views}:* ${views}
└──────────────

*⊱ ──── 《.⋅ 🔥 ⋅.》 ──── ⊰*

El pedido se esta enviando, Espere un momento.🍃

*servicios proporcionado por FLAMI BOT-MD*`
 await conn.sendButton(m.chat, play, mssg.ig, thumbnail, [
    ['🎶 MP3', `${usedPrefix}fgmp3 ${url}`],
    ['🎥 MP4', `${usedPrefix}fgmp4 ${url}`]
  ], m, rpl)
}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play', 'playvid']
handler.disabled = true

export default handler