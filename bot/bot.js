const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('../auth/auth.json');
const ytdl = require('ytdl-core');

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
}

client.login(token);
