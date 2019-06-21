const { prefix } = require('../config/config.json');

const { mutar, desmutar } = require('./commands/mutar');
const { execute, skip, stop } = require('./commands/music');
const { remindMe } = require('./commands/remindme');
const { kick } = require('./commands/kick');
const { ban } = require('./commands/ban');
const { addToRole, removeFromRole, createARole } = require('./commands/role');
const { help } = require('./commands/help');

exports.selector = async (msg) => {
  if (msg.author.bot) return;

  if (!msg.content.startsWith(prefix)) return;

  if (msg.content.startsWith(`${prefix}help`)) help(msg);

  const { queue } = msg.client;
  const serverQueue = queue.get(msg.guild.id);
  console.log(serverQueue);

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
};
