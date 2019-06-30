const ms = require('ms');
// $invite {*s | *h | *d}
exports.run = async (msg) => {
  const args = msg.content.split(' ');
  args.splice(0, 1);

  const invite = await msg.channel.createInvite({
    maxAge: args[0] ? ms(args[0]) : 86400,
    maxUses: 10,
  });

  return msg.channel.send(`${invite.url}`);
};
