const ms = require('ms');

const { RichEmbed } = require('discord.js');

// $remindme 5s mandar email
exports.run = (msg) => {
  const args = msg.content.split(' ');

  const embed = new RichEmbed()
    .setTitle('Remind Me | ⏲ ')
    .setColor('#9400D3')
    .setDescription(`Vou te lembrar em ${args[1]}`)
    .setTimestamp();

  msg.reply(embed);

  args.splice(0, 1);

  const time = args[0];
  args.splice(0, 1);

  const note = args.join(' ');

  const embed1 = new RichEmbed()
    .setTitle('Remind Me | ⏲')
    .setColor('#9400D3')
    .setDescription(`${note}`)
    .setTimestamp();

  setTimeout(() => {
    msg.reply(embed1);
  }, ms(time));
};
