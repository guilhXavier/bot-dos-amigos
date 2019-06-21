// $ban @NickBola#233 ser inconveniente
exports.ban = (msg) => {
  const args = msg.content.split(' ');
  args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  if (!meliante.bannable) return msg.channel.send(`Nn consigo banir ${meliante.displayName}`);

  meliante.ban(reason).catch(err => console.log(err));

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'Ban',
      description: `${meliante.displayName} foi banido por ${reason || 'alguma razao'}`,
    },
  });
};
