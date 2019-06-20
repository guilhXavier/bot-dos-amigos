// $kick @NickBola#233 dar mto e o cu
exports.kick = (msg) => {
  const args = msg.content.split(' ');
  args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  if (!meliante.kickable) return msg.channel.send(`Nn consigo kickar ${meliante.displayName}`);

  meliante.kick(reason).catch(err => console.log(err));

  return msg.channel.send(`${meliante.displayName} foi kickado por ${reason}`);
};
