exports.run = (msg) => {
  const args = msg.content.split(' ');
  args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  meliante.setMute(false, reason).catch(err => console.log(err));

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'Unmute',
      description: `${meliante.displayName} foi desmutado por ${reason || 'alguma razao'}`,
    },
  });
};
