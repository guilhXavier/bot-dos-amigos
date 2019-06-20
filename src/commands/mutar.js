// $mutar @NickBola#123 por ser inconveniente
exports.mutar = (msg) => {
  const args = msg.content.split(' ');

  const bin = args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  meliante.setMute(true, reason).catch(err => console.log(err));

  return msg.channel.send(`${bin[1]} foi mutado por ${reason}`);
};

exports.desmutar = (msg) => {
  const args = msg.content.split(' ');

  const bin = args.splice(0, 2);

  const reason = args.join(' ');

  const meliante = msg.mentions.members.first(1)[0];

  meliante.setMute(false, reason).catch(err => console.log(err));

  return msg.channel.send(`${bin[1]} foi desmutado por ${reason}`);
};
