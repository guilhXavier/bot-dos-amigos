// $addToRole @NickBola#233 bott
exports.addToRole = (msg) => {
  const server = msg.guild;
  const args = msg.content.split(' ');

  if (msg.mentions.members.size === 0) {
    args.splice(0, 1);

    const role = server.roles.find(val => val.name === args.join(' '));

    msg.member.addRole(role);

    return msg.channel.send(`${msg.member} foi adicionado ao cargo ${role.name}`);
  }

  args.splice(0, 2);

  const role = server.roles.find(val => val.name === args.join(' '));

  const alvo = msg.mentions.members.first(1)[0];

  alvo.addRole(role);

  return msg.channel.send(`${alvo.displayName} foi adicionado ao cargo ${role.name}`);
};

// $removeRole @NickBola#233 bott
exports.removeFromRole = (msg) => {
  const server = msg.guild;
  const args = msg.content.split(' ');

  if (msg.mentions.members.size === 0) {
    args.splice(0, 1);

    const role = server.roles.find(val => val.name === args.join(' '));

    msg.member.removeRole(role);

    return msg.channel.send(`${msg.member} foi removido do cargo ${role.name}`);
  }

  args.splice(0, 2);

  const role = server.roles.find(val => val.name === args.join(' '));

  const alvo = msg.mentions.members.first(1)[0];

  alvo.removeRole(role);

  return msg.channel.send(`${alvo.displayName} foi removido do cargo ${role.name}`);
};

// $createRole super cool | 9400D3 | separado | mencionavel
exports.createARole = async (msg) => {
  const server = msg.guild;

  const args = msg.content.split(' | ');

  const bin = args[0].split(' ');
  bin.splice(0, 1);

  const name = bin.join(' ');
  const color = args[1];
  const hoist = args[2] === 'separado';
  const mentionable = args[3] === 'mencionavel';

  try {
    await server.createRole({
      name,
      color,
      hoist,
      mentionable,
    });

    return msg.channel.send(`Novo cargo ${name} criado`);
  } catch (error) {
    return console.log(error);
  }
};
