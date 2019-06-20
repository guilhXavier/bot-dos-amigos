const ytdl = require('ytdl-core');

const queue = new Map();

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

export const execute = async (msg, serverQueue) => {
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
};

export const skip = (msg, serverQueue) => {
  if (!msg.member.voiceChannel) return msg.channel.send('Vc tem q ta no canal pra estragar a festa dos outros');
  if (!serverQueue) return msg.channel.send('N tem musica pra skipar');
  serverQueue.connection.dispatcher.end();
};

export const stop = (msg, serverQueue) => {
  if (!msg.member.voiceChannel) return msg.channel.send('Vc tem que ta no canal pra parar a musica');
  serverQueue.songs = [];
  setTimeout(() => serverQueue.connection.dispatcher.end(), 60000);
};
