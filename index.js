const Discord = require('discord.js');

const client = new Discord.Client();
const queue = new Map();

const config = require('./config/config.json');

const { prefix, devtoken } = config;

const { mutar, desmutar } = require('./src/commands/mutar');
const { execute, skip, stop } = require('./src/commands/music');
const { remindMe } = require('./src/commands/remindme');
const { kick } = require('./src/commands/kick');
const { ban } = require('./src/commands/ban');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (msg) => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) return;

  const serverQueue = queue.get(msg.guild.id);

  if (msg.content.startsWith(`${prefix}play`)) {
    execute(msg, serverQueue);
  } else if (msg.content.startsWith(`${prefix}skip`)) {
    skip(msg, serverQueue);
  } else if (msg.content.startsWith(`${prefix}stop`)) {
    stop(msg, serverQueue);
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
  } else {
    msg.channel.send('Escreveu o bagulho errado irmao');
  }
});

client.login(devtoken).catch(err => console.log(err));
