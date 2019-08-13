require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.music = require('discord.js-musicbot-addon');

client.music.start(client, {
  youtubeKey: process.env.GOOGLEAPI,
  anyoneCanSkip: true,
});

client.on('message', async (msg) => {
  const args = msg.content.split(' ');
  const aux = `${args.splice(0, 1)}`.split('');
  aux.shift();
  const cmd = aux.join('');

  const suffix = args.join(' ');

  if (msg.author.bot) return;

  if (!msg.content.startsWith(process.env.PREFIX)) return;

  try {
    switch (cmd) {
      case 'play':
        client.music.bot.playFunction(msg, suffix);
        break;
      case 'skip':
        client.music.bot.skipFunction(msg, suffix);
        break;
      case 'pause':
        client.music.bot.pauseFunction(msg, suffix);
        break;
      case 'resume':
        client.music.bot.resumeFunction(msg, suffix);
        break;
      case 'loop':
        client.music.bot.loopFunction(msg, suffix);
        break;
      default: {
        const cmdFile = require(`./src/commands/${cmd}.js`);
        cmdFile.run(msg);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

client.on('guildMemberAdd', async (guildMember) => {
  const role = guildMember.guild.roles.find(val => val === 'alcateia');

  await guildMember.addRole(role);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.BOT_TOKEN).catch(err => console.log(err));
