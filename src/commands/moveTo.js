// $moveTo @NickBola#2333 VariosCanaisMasSóUsamosEsse
exports.run = async (msg) => {
  const {
    content, guild, mentions, member,
  } = msg;

  const { channels } = guild;
  const { members } = mentions;
  const args = content.split(' ');

  if (members.size !== 0) {
    args.splice(0, 2);
    const alvo = members.first(1)[0];

    const canal = channels.find(val => val.name === args[0]);

    await alvo.setVoiceChannel(canal);

    return msg.channel.send({
      embed: {
        color: 9699539,
        title: 'Move To',
        description: `${alvo} foi movido ao canal ${canal.name}`,
        timestamp: new Date(),
      },
    });
  }

  const alvo = member;

  const canal = channels.find(val => val.name === args[1]);

  await alvo.setVoiceChannel(canal);

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'Move To',
      description: `${alvo} foi movido ao canal ${canal.name}`,
      timestamp: new Date(),
    },
  });
};
