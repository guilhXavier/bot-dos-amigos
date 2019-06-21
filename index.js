const Discord = require('discord.js');

const client = new Discord.Client();

client.music = require('discord.js-musicbot-addon');

const { devtoken } = require('./config/config.json');

const { prefix } = require('./config/config.json');

const { mutar, desmutar } = require('./src/commands/mutar');
const { remindMe } = require('./src/commands/remindme');
const { kick } = require('./src/commands/kick');
const { ban } = require('./src/commands/ban');
const { addToRole, removeFromRole, createARole } = require('./src/commands/role');
const { help } = require('./src/commands/help');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.music.start(client, {
  youtubeKey: 'AIzaSyCJFyG7pshOiu69z0ITXsO3GwgbT_Wmf7Q',
  anyoneCanSkip: true,
});

client.on('message', async (msg) => {
  const bin = msg.content.split(' ');
  bin.splice(0, 1);
  const suffix = bin.join(' ');

  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) return;

  if (msg.content.startsWith(`${prefix}help`)) help(msg);

  if (msg.content.startsWith(`${prefix}play`)) {
    client.music.bot.playFunction(msg, suffix);
  } else if (msg.content.startsWith(`${prefix}skip`)) {
    client.music.bot.skipFunction(msg, suffix);
  } else if (msg.content.startsWith(`${prefix}pause`)) {
    client.music.bot.pauseFunction(msg, suffix);
  } else if (msg.content.startsWith(`${prefix}resume`)) {
    client.music.bot.resumeFunction(msg, suffix);
  } else if (msg.content.startsWith(`${prefix}loop`)) {
    client.music.bot.loopFunction(msg, suffix);
  } else if (msg.content.startsWith(`${prefix}remindme`)) {
    remindMe(msg);
  } else if (msg.content.startsWith(`${prefix}mute`) && msg.member.hasPermission('MUTE_MEMBERS')) {
    mutar(msg);
  } else if (
    msg.content.startsWith(`${prefix}unmute`)
		&& msg.member.hasPermission('MUTE_MEMBERS')
  ) {
    desmutar(msg);
  } else if (msg.content.startsWith(`${prefix}kick`) && msg.member.hasPermission('KICK_MEMBERS')) {
    kick(msg);
  } else if (msg.content.startsWith(`${prefix}ban`) && msg.member.hasPermission('BAN_MEMBERS')) {
    ban(msg);
  } else if (
    msg.content.startsWith(`${prefix}addToRole`)
		&& msg.member.hasPermission('MANAGE_ROLES')
  ) {
    addToRole(msg);
  } else if (
    msg.content.startsWith(`${prefix}removeFromRole`)
		&& msg.member.hasPermission('MANAGE_ROLES')
  ) {
    removeFromRole(msg);
  } else if (
    msg.content.startsWith(`${prefix}createARole`)
		&& msg.member.hasPermission('MANAGE_ROLES')
  ) {
    createARole(msg);
  } else {
    msg.channel.send('Escreveu o bagulho errado irmao');
  }
});

client.login(devtoken).catch(err => console.log(err));
