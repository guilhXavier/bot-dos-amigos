// $kick @NickBola#233 dar mto e o cu
exports.run = (msg) => {
  const args = msg.content.split(' ');
  args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  if (!meliante.kickable) return msg.channel.send(`Nn consigo kickar ${meliante.displayName}`);

  meliante.kick(reason).catch(err => console.log(err));

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'Kick',
      description: `**${meliante.displayName}** foi kickado por ${reason || 'alguma razao'}`,
      timestamp: new Date(),
      footer: {
        text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca`,
      },
    },
  });
};
