const { readFileSync } = require('fs')
require('dotenv').config({path: './mongo.env'});
require('dotenv').config({path: './owner.env'});
require('dotenv').config({path: './session.env'});
require('dotenv').config({path: './bot.env'});

module.exports = {
    /**
     * bot details and parameters
     */
    botname: process.env.BotName || "☯︎free✌︎💨",
    footer: process.env.Footer || "© 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐐𝐮𝐞𝐞𝐧 𝐀𝐧𝐲𝐚 𝐁𝐨𝐭",
    prefa: process.env.Prefix || "+",
    themeemoji: process.env.ThemeEmoji || "🎐",

    /**
     * owner details and parameters
     */
    ownername: process.env.Owner_Name || "☯︎free✌︎💨",
    ownernumber: process.env.Owner_Number || "2349164718113",
    instagramId: process.env.Insta || "3.69_pika",

    /**
     * other details and parameters
     */
    author: process.env.Author || "𝐏𝐢𝐤𝐚𝐁𝐨𝐭𝐳 🌚🌙",
    packname: process.env.PackName || "𝕼𝖚𝖊𝖊𝖓 𝕬𝖓𝖞𝖆 𝖁2 𝕾𝖙𝖎𝖈𝖐𝖊𝖗 𝕻𝖆𝖈𝖐 🪀",
    socialLink: process.env.Web || "https://github.com/PikaBotz",
    groupLink: process.env.GcLink || "https://chat.whatsapp.com/E490r0wSpSr89XkCWeGtnX",
    warns: Number(process.env.Warn_Limits) || 3,
    cooldown: Number(process.env.Cooldown_Timer_Seconds) || 5, // default cooldown time per command in seconds
    mongoUrl: process.env.MongoDB || "YOUR_MONGODB_URL",
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUt4SGJlbGlwQzBUNlNuVWhLNFhKU1ZLNGJDU0FUUmRFUDB3MWFLL0tFOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0ZacUJDc25meFo5cmRjRE5PT0dxVEcxY2ZEVDFjODRjMng4SmcxMGNFQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RlgvZ0ZHanQ5K1hYNk10QTFvYTYweEhIdEhjU0c4NXJoUnJhTTNSdFVFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2eTF5VHE4WWl2MW50VExsbGk4ODB4ZnpaUUx6Ylg3TWZ1Yzd6ZlJwVVVnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVFR0ROM3FJOUNhSk5tYzRDckxIb3IrN1F6eDhHQTNNUXo4MElYOHIyMUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9IcXNyajVoNXdxd0hFOStqZzV3YVBHUGNDTXkxYWIwaHVGcW1QK2lIVEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0UyeDFKc0VsbzR0TUpjdHhQVVZhRDR1UWxWTEpBNjlQVVR0bG0wK21uST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHluMms2S2RxdlNzcko1YkdZT1Rici81YkgxT21OMktYck5pRnRBcVoyTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBTYlJlM2oxYzlKbmVEVEFTNW5kNmphNU1Pdld3VFhNanl5QTM0L1hXL0FESDlkVFZXVmRRc1Z3VHBGZUhzdFV1Sm1wWWRIb2JkbXlTdTF2dnhhNENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzUsImFkdlNlY3JldEtleSI6IlNJbStVMnl2SzFjRzBWSVExeXBYN0o1OUh0WDJsMGNOVHlLbGdrUWFXK0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InZLUldudHlZUVJHb3NCSWp3MWFoZFEiLCJwaG9uZUlkIjoiMDYyODI1OWItZjY2Yi00ZWU2LWE3MjEtOWYyMDAxNTZmNzJhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJWWVZpSlpvbzhsSlFFMHhWbFl4alBEYlBHWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYS29PaWZhTHNHUGsyZlNiWWlQWTkwakQ1ajA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR1lOTEpQQzIiLCJtZSI6eyJpZCI6IjIzNDkxNjQ3MTgxMTM6MzFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoic2hpbmUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xPbDMvVUdFS2p3aUxrR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlE3bnM4c2poZ0daT2FyZllDVm12T3d2dlhBN1FHazBvT3BXemxkQ3hkalE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im9lQ2NEaUpWN1MvL3NxazZhTlVRMFRWM3dPVk5ZTmxRS3lOSVJ5Q1FrT3EybE92dDUyR0pZRlhmK3hnM2xmUVdVUFRKT1BiaUduMEw5ZFI5R0xDZERRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJyMTJIWTEvNFAxYmYrOE9XaTJHMXVUS2R4czZaNkM3UHRwV1FVUDhrR3JpOWlxZFBaWUFKQnBtTndpYllQQ3pPYVJJdzlSYWJSM2ZVUVQyeElCNHpBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkxNjQ3MTgxMTM6MzFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVU81N1BMSTRZQm1UbXEzMkFsWnJ6c0w3MXdPMEJwTktEcVZzNVhRc1hZMCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDI5NTg2Mn0=",

    /**
     * thumbnails and medias
     */
    image_1: readFileSync('./lib/Assets/image_1.jpg'), // primary image
    image_2: readFileSync('./lib/Assets/image_2.jpg'), // secondry image
    imageUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image url, to replace to your url upload your image to https://imgbb.com
    imageMentionUrl: "https://i.ibb.co/ZKKSZHT/Picsart-23-06-24-13-36-01-843.jpg", // image for mention reply audio media
    aliveMedia: readFileSync("./lib/Assets/aliveMedia.mp4"),
    menuMedia: readFileSync('./lib/Assets/menuMedia.mp4'),
    ownerMentionMp3: readFileSync('./lib/Assets/ownerMentionMp3.mp3'),  // audio for mention reply audio media

    /**
     * core parameters and values
     */
    ownercon: { key: { fromMe: false, participant: '0@s.whatsapp.net', ...({ remoteJid: 'status@broadcast' }), }, message: { contactMessage: { displayName: this.ownername, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${this.ownername},;;;\nFN:${this.ownername}\nitem1.TEL;waid=${this.ownernumber}:${this.ownernumber}\nitem1.X-ABLabel:Mobile\nEND:VCARD`, jpegThumbnail: this.image_2, thumbnail: this.image_2, sendEphemeral: true } } },
    fakeshop: { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" }, message: { orderMessage: { itemCount: 1234, status: 200, thumbnail: this.image_1, surface: 200, message: this.botname, orderTitle: this.ownername, sellerJid: '0@s.whatsapp.net'}}, contextInfo: { forwardingScore: 999, isForwarded: true}, sendEphemeral: true },
    message: {
        success: "✅ 𝚂𝚞𝚌𝚌𝚎𝚜𝚜! 𝙾𝚙𝚛𝚊𝚝𝚒𝚘𝚗 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍.",
        admin: "*👤 A𝙳𝙼𝙸𝙽 N𝙴𝙴𝙳𝙴𝙳!*\n\n- Dear, this command is only for Admins. You have to be a admin in this group to use this command.",
        botAdmin: "*🤖 B𝙾𝚃 A𝙳𝙼𝙸𝙽 N𝙴𝙴𝙳𝙴𝙳!*\n\n- I'm not an Admin, so I can't execute this command in this group. Please make me an Admin.",
        owner: "*👑 O𝚆𝙽𝙴𝚁 N𝙴𝙴𝙴𝙳𝙴𝙳!*\n\n- Bruh, this command is only made for this bot's owner. So you can't use this command.",
        group: "*👥 G𝚛𝚘𝚞𝚙 N𝚎𝚎𝚍𝚎𝚍!*\n\n- This command can only be executed in a group chat.",
        private: 'This command is only for private chats.',
        wait: '🔄 Processing request...',
        error: "❌ Oops! An error occurred while processing your request. Please try again later.",
        ban: `You're banned from using this bot!`,
        nsfw: 'This group is not *NSFW* enabled.',
        banChat: 'This group is banned from using this bot, please contact owner to get unbanned.'
    },
    Port: process.env.Port || "8080",

    /**
     * external APIs
     */
    api: {
        api1: "https://www.guruapi.tech" // Guru's API
    }
}

global.connectionMessageSent = false;
global.game = {
    tictactoe: {}
}
