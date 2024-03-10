process.on('uncaughtException', console.error);

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
    if (Object.keys(Handler || {}).length) handler = Handler;
  } catch (e) {
    console.error(e);
  }
  if (restatConn) {
    const oldChats = global.conn.chats;
    try {
      global.conn.ws.close();
    } catch { }
    conn.ev.removeAllListeners();
    global.conn = makeWASocket(connectionOptions, {chats: oldChats});
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler);
    conn.ev.off('group-participants.update', conn.participantsUpdate);
    conn.ev.off('groups.update', conn.groupsUpdate);
    conn.ev.off('message.delete', conn.onDelete);
    conn.ev.off('call', conn.onCall);
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }

  conn.welcome = '*╔═══❖•ೋ° °ೋ•❖═══╗*\n*┃ඬ⃟ ✨️ @subject*\n*╠══════════════*\n*┃ඬ⃟ ✨️ @user*\n*┃ඬ⃟ ✨️ 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰* \n*┃*\n*┃ඬ⃟ ✨️ 𝘓𝘦𝘦 𝘓𝘢 𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪𝘰́𝘯 𝘋𝘦𝘭 𝘎𝘳𝘶𝘱𝘰:*\n\n@desc\n\n*┃*\n*┃ 𝘋𝘪𝘧𝘳𝘶𝘵𝘢 𝘛𝘶 𝘌𝘴𝘵𝘢𝘥𝘪𝘢!!*\n*╚═══❖•ೋ° °ೋ•❖═══╝*';
  conn.bye = '*╔═══❖•ೋ° °ೋ•❖═══╗*\n*┃ @user*\n*┃ඬ⃟ 👋𝙰𝚂𝚃𝙰 𝙿𝚁𝙾𝙽𝚃𝙾 𝙵𝙰𝙽𝚂 𝙳𝙴 𝙱𝚃𝚂* \n*╚═══❖•ೋ° °ೋ•❖═══╝*';
  conn.spromote = '*@user 𝘉𝘪𝘦𝘯𝘷𝘦𝘯𝘪𝘥𝘰 𝘠𝘢 𝘌𝘳𝘦𝘴 𝘗𝘢𝘳𝘵𝘦 𝘋𝘦𝘭 𝘚𝘵𝘢𝘧𝘧🥳!!*';
  conn.sdemote = '*@user 𝘑𝘰𝘥𝘦𝘳𝘵𝘦 𝘠𝘢 𝘕𝘰 𝘛𝘪𝘦𝘯𝘦𝘴 𝘌𝘭 𝘗𝘰𝘥𝘦𝘳 𝘋𝘦 𝘔𝘢𝘯𝘦𝘫𝘢𝘳 𝘌𝘯 𝘌𝘭 𝘎𝘳𝘶𝘱𝘰😆!!*';
  conn.sDesc = '*𝘚𝘦 𝘏𝘢 𝘊𝘰𝘯𝘧𝘪𝘨𝘶𝘳𝘢𝘥𝘰 𝘜𝘯𝘢 𝘕𝘶𝘦𝘷𝘢 𝘋𝘦𝘴𝘤𝘳𝘪𝘱𝘤𝘪𝘰́𝘯 𝘋𝘦𝘭 𝘎𝘳𝘶𝘱𝘰*\n\n*Nueva Descripción:* @desc';
  conn.sSubject = '*𝘚𝘦 𝘏𝘢 𝘏𝘦𝘤𝘩𝘰 𝘜𝘯 𝘊𝘢𝘮𝘣𝘪𝘰 𝘌𝘯 𝘌𝘭 𝘕𝘰𝘮𝘣𝘳𝘦 𝘋𝘦𝘭 𝘎𝘳𝘶𝘱𝘰*\n*Nuevo Nombre:* @subject';
  conn.sIcon = '*𝘚𝘦 𝘏𝘢 𝘊𝘢𝘮𝘣𝘪𝘢𝘥𝘰 𝘓𝘢 𝘍𝘰𝘵𝘰 𝘋𝘦 𝘗𝘦𝘳𝘧𝘪𝘭 𝘋𝘦𝘭 𝘎𝘳𝘶𝘱𝘰🧸!!*';
  conn.sRevoke = '*𝘚𝘦 𝘏𝘢 𝘙𝘦𝘴𝘵𝘢𝘣𝘭𝘦𝘤𝘪𝘥𝘰 𝘌𝘭 𝘓𝘪𝘯𝘬 𝘋𝘦𝘭 𝘎𝘳𝘶𝘱𝘰!!*\n*Link Actualizado:* @revoke';

  conn.handler = handler.handler.bind(global.conn);
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
  conn.onDelete = handler.deleteUpdate.bind(global.conn);
  conn.onCall = handler.callUpdate.bind(global.conn);
  conn.connectionUpdate = connectionUpdate.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  const currentDateTime = new Date();
  const messageDateTime = new Date(conn.ev);
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
  } else {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
  }

  conn.ev.on('messages.upsert', conn.handler);
  conn.ev.on('group-participants.update', conn.participantsUpdate);
  conn.ev.on('groups.update', conn.groupsUpdate);
  conn.ev.on('message.delete', conn.onDelete);
  conn.ev.on('call', conn.onCall);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  isInit = false;
  return true;
};

/*

const pluginFolder = join(__dirname, './plugins');
const pluginFilter = filename => /\.js$/.test(filename);
global.plugins = {};

async function filesInit(folder) {
  for (let filename of readdirSync(folder).filter(pluginFilter)) {
    try {
      let file = join(folder, filename);
      const module = await import(file);
      global.plugins[file] = module.default || module;
    } catch (e) {
      console.error(e);
      delete global.plugins[filename];
    }
  }

  for (let subfolder of readdirSync(folder)) {
    const subfolderPath = join(folder, subfolder);
    if (statSync(subfolderPath).isDirectory()) {
      await filesInit(subfolderPath);
    }
  }
}

await filesInit(pluginFolder).then(_ => Object.keys(global.plugins)).catch(console.error);

*/

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`new plugin - '${filename}'`);
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`);
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => {
    return Promise.race([
      new Promise((resolve) => {
        p.on('close', (code) => {
          resolve(code !== 127);
        });
      }),
      new Promise((resolve) => {
        p.on('error', (_) => resolve(false));
      })]);
  }));
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
  Object.freeze(global.support);
}
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  const a = await clearTmp();
console.log(chalk.cyanBright(`\n▣───────────[ 𝙰𝚄𝚃𝙾𝙲𝙻𝙴𝙰𝚁TMP ]──────────────···\n│\n▣─❧ 𝙰𝚁𝙲𝙷𝙸𝚅𝙾𝚂 𝙴𝙻𝙸𝙼𝙸𝙽𝙰𝙳𝙾𝚂 ✅\n│\n▣───────────────────────────────────────···\n`));
}, 180000);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSession();
console.log(chalk.cyanBright(`\n▣────────[ AUTOPURGESESSIONS ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSessionSB();
console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_SESSIONS_SUB-BOTS ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeOldFiles();
console.log(chalk.cyanBright(`\n▣────────[ AUTO_PURGE_OLDFILES ]───────────···\n│\n▣─❧ ARCHIVOS ELIMINADOS ✅\n│\n▣────────────────────────────────────···\n`));
}, 1000 * 60 * 60);
setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const bio = `🧸 𝗦𝗮𝗸𝘂𝗿𝗮𝗕𝗼𝘁𝗟𝗶𝘁𝗲-𝗠𝗗 | By: Diego📍 ⏰️Tiempo Activa: ${uptime}`;
  await conn.updateProfileStatus(bio).catch((_) => _);
}, 60000);
function clockString(ms) {
  const d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, 'd ️', h, 'h ', m, 'm ', s, 's '].map((v) => v.toString().padStart(2, 0)).join('');
}
_quickTest().catch(console.error);