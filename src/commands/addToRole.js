// $addToRole @NickBola#233 bott
exports.run = (msg) => {
  const server = msg.guild;
  const args = msg.content.split(' ');

  if (msg.mentions.members.size === 0) {
    args.splice(0, 1);

    const role = server.roles.find(val => val.name === args.join(' '));

    msg.member.addRole(role);

    return msg.channel.send({
      embed: {
        color: 9699539,
        title: 'AddToRole',
        description: `${msg.member} foi adicionado ao cargo ${role.name}`,
        timestamp: new Date(),
        footer: {
          text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca`,
        },
      },
    });
  }

  args.splice(0, 2);

  const role = server.roles.find(val => val.name === args.join(' '));

  const alvo = msg.mentions.members.first(1)[0];

  alvo.addRole(role);

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'AddToRole',
      description: `**${alvo.displayName}** foi adicionado ao cargo **${role.name}**`,
      timestamp: new Date(),
      footer: {
        text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca`,
      },
    },
  });
};
