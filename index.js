/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
/* eslint-disable no-use-before-define */
const Discord = require('discord.js');

const client = new Discord.Client();
const ytdl = require('ytdl-core');

const queue = new Map();
const ms = require('ms');
const auth = require('./auth/auth.json');

const { prefix, token } = auth;

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
  } else {
    msg.channel.send('Escreveu o bagulho errado irmao');
  }
});
// $mutar @NickBola#123 por ser inconveniente
function mutar(msg) {
  const args = msg.content.split(' ');

  const bin = args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  meliante.setMute(true, reason).catch(err => console.log(err));

  return msg.channel.send(`${bin[1]} foi mutado por ${reason}`);
}

function desmutar(msg) {
  const args = msg.content.split(' ');

  const bin = args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  meliante.setMute(false, reason).catch(err => console.log(err));

  return msg.channel.send(`${bin[1]} foi desmutado por ${reason}`);
}

// $remindme 5s mandar email
function remindMe(msg) {
  const args = msg.content.split(' ');
  msg.reply(`Ok, vou te lembrar em ${args[1]}`);

  args.splice(0, 1);

  const time = args[0];
  args.splice(0, 1);

  const note = args.join(' ');

  setTimeout(() => {
    msg.reply(note);
  }, ms(time));
}

async function execute(msg, serverQueue) {
  const args = msg.content.split(' ');

  const { voiceChannel } = msg.member;

  if (!voiceChannel) return msg.channel.send('Vc precisa estar no canal pra tocar musica');

  const permissions = voiceChannel.permissionsFor(msg.client.user);

  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return msg.channel.send('Eu preciso de permissao pra isso :(');
  }

  const songInfo = await ytdl.getInfo(args[1]);

  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
  };

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      const connection = await voiceChannel.join();

      queueConstruct.connection = connection;

      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.log(error);

      queue.delete(msg.guild.id);

      return msg.channel.send(error);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return msg.channel.send(`${song.title} foi adicionada a lista de espera`);
  }
}

function skip(msg, serverQueue) {
  if (!msg.member.voiceChannel) return msg.channel.send('Vc tem q ta no canal pra estragar a festa dos outros');
  if (!serverQueue) return msg.channel.send('N tem musica pra skipar');
  serverQueue.connection.dispatcher.end();
}

function stop(msg, serverQueue) {
  if (!msg.member.voiceChannel) return msg.channel.send('Vc tem que ta no canal pra parar a musica');
  serverQueue.songs = [];
  setTimeout(() => serverQueue.connection.dispatcher.end(), 60000);
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    setTimeout(() => serverQueue.voiceChannel.leave(), 60000);
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on('end', () => {
      console.log('cabo a musica');

      serverQueue.songs.shift();

      play(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => {
      console.error(error);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

client.login(token);
