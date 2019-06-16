const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth/auth.json');
const ytdl = require('ytdl-core');
const queue = new Map();
const { prefix, token } = auth;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async msg => {
	if (msg.author.bot) return;

	if (!msg.content.startsWith(prefix)) return;

	const serverQueue = queue.get(msg.guild.id);

	if (msg.content.startsWith(`${prefix}play`)) {
		execute(msg, serverQueue);
		return;
	} else if (msg.content.startsWith(`${prefix}skip`)) {
		skip(msg, serverQueue);
		return;
	} else if (msg.content.startsWith(`${prefix}stop`)) {
		stop(msg, serverQueue);
	} else {
		msg.channel.send('Escreveu o bagulho errado irmao');
	}
});

async function execute(msg, serverQueue) {
	const args = msg.content.split(' ');

	const voiceChannel = msg.member.voiceChannel;

	if (!voiceChannel)
		return msg.channel.send('Vc precisa estar no canal pra tocar musica');

	const permissions = voiceChannel.permissionsFor(msg.client.user);

	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return msg.channel.send('Eu preciso de permissao pra isso :(');
	}

	const songInfo = await ytdl.getInfo(args[1]);

	const song = {
		title: songInfo.title,
		url: songInfo.video_url
	};

	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};

		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();

			queueConstruct.connection = connection;

			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.log(error);

			queue.delete(msg.guild.id);

			return msg.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return msg.channel.send(`${song.title} foi adicionada a lista de espera`);
	}
}

function skip(msg, serverQueue) {
	if (!msg.member.voiceChannel)
		return msg.channel.send(
			'Vc tem q ta no canal pra estragar a festa dos outros'
		);
	if (!serverQueue) return msg.channel.send('N tem musica pra skipar');
	serverQueue.connection.dispatcher.end();
}

function stop(msg, serverQueue) {
	if (!msg.member.voiceChannel)
		return msg.channel.send('Vc tem que ta no canal pra parar a musica');
	serverQueue.songs = [];
	setTimeout(serverQueue.connection.dispatcher.end(), 60000);
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		setTimeout(serverQueue.voiceChannel.leave(), 60000);
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
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

client.login(token);
