import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['5491168758497', 'Enzito Creator', true],
  ['14437013473', 'Jostin Owner', true],
  ['573107133321', '💖Diego Owner2💖', true],
] //Numeros de owner 

global.mods = [''] 
global.prems = ['5491168758497', '5491168758497']
global.APIs = { // API Prefix
  // name: 'https://website' 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.fgmods.xyz': 'DRLg5kY7' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'MadokadaLite┃ᴮᴼᵀ' 
global.author = '@fg98' 

//--info FG
global.botName = 'MadokadaLite-MD'
global.fgig = 'https://www.instagram.com/fg98_ff' 
global.fgsc = 'https://github.com/Enzito-Vase/MadokadaLite-Bot-MD' 
global.fgyt = 'https://youtube.com/fg98f'
global.fgpyp = 'https://paypal.me/fg98f'
global.fglog = 'https://i.ibb.co/1zdz2j3/logo.jpgs' 

//--- Grupos WA
global.fgcanal = 'https://chat.whatsapp.com/LVjCCRPBWJKGewIs2Htjq5'
global.bgp = 'https://chat.whatsapp.com/LVjCCRPBWJKGewIs2Htjq5'
global.bgp2 = 'https://chat.whatsapp.com/LVjCCRPBWJKGewIs2Htjq5'
global.bgp3 = 'https://chat.whatsapp.com/LVjCCRPBWJKGewIs2Htjq5' //--GP NSFW

global.wait = '⌛ _Cargando..._\n*▬▬▬▭*'
global.rwait = '🍁'
global.dmoji = '💧'
global.done = '🐢'
global.error = '⚠️' 
global.xmoji = '🦋' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
