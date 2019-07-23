// $mutar @NickBola#123 por ser inconveniente
exports.run = (msg) => {
  const args = msg.content.split(' ');
  args.splice(0, 2);
  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  meliante.setMute(true, reason).catch(err => console.log(err));

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'Mute',
      description: `${meliante.displayName} foi mutado por ${reason || 'alguma razao'}`,
      timestamp: new Date(),
      footer: {
        text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca`,
      },
    },
  });
};
