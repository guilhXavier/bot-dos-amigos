const Discord = require('discord.js');

const client = new Discord.Client();

const { devtoken } = require('./config/config.json');
const { selector } = require('./src/selector');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => selector(msg));

client.login(devtoken).catch(err => console.log(err));
