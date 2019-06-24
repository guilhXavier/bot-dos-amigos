// $removeRole @NickBola#233 bott
exports.run = (msg) => {
  const server = msg.guild;
  const args = msg.content.split(' ');

  if (msg.mentions.members.size === 0) {
    args.splice(0, 1);

    const role = server.roles.find(val => val.name === args.join(' '));

    msg.member.removeRole(role);

    return msg.channel.send({
      embed: {
        color: 9699539,
        title: 'RemoveFromRole',
        description: `${msg.member} foi removido do cargo ${role.name}`,
      },
    });
  }

  args.splice(0, 2);

  const role = server.roles.find(val => val.name === args.join(' '));

  const alvo = msg.mentions.members.first(1)[0];

  alvo.removeRole(role);

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'RemoveFromRole',
      description: `${alvo.displayName} foi adicionado ao cargo ${role.name}`,
    },
  });
};
