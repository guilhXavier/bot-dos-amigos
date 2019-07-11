// $delete alcateia
exports.run = async (msg) => {
  const { member, guild, channel } = msg;
  const args = msg.content.split(' ');
  const roleName = args[1];
  args.splice(0, 2);

  if (member.hasPermission('MANAGE_ROLES')) {
    const role = guild.roles.find(item => item.name === roleName);
    const reason = args.join(' ') || 'alguma razao';

    const res = await role.delete(reason);

    return channel.send({
      embed: {
        color: 9699539,
        title: 'deleteRole',
        description: `O cargo **${res.name}** foi removido por ${reason}`,
      },
    });
  }
  return channel.send({
    embed: {
      color: 9699539,
      title: 'deleteRole',
      description: 'Ocorreu algum erro',
    },
  });
};
