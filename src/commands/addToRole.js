// $addtr -m @NickBola#123 -c @cargoExistente

import { extractArgs } from '../helpers'
import { COMMAND_FLAGS } from '../constants/commands'

export const addToRole = ({ guild, content, member, mentions }) => {
  const { args } = extractArgs(content)

  if (!mentions.members.size) {
    const { cache: rolesList } = guild.roles

    const role = rolesList.find(
      (elem) => elem.name === args[COMMAND_FLAGS.ROLE]
    )

    member.roles.add(role)

    return msg.channel.send({
      embed: {
        color: 9699539,
        title: 'AddToRole',
        description: `${msg.member} foi adicionado ao cargo ${role.name}`,
        timestamp: new Date(),
        footer: {
          text: `Eu demorei ${
            Date.now() - msg.createdTimestamp
          } ms pra fazer essa busca`,
        },
      },
    })
  }

  args.splice(0, 2)

  const role = server.roles.find((val) => val.name === args.join(' '))

  const alvo = msg.mentions.members.first(1)[0]

  alvo.addRole(role)

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: 'AddToRole',
      description: `**${alvo.displayName}** foi adicionado ao cargo **${role.name}**`,
      timestamp: new Date(),
      footer: {
        text: `Eu demorei ${
          Date.now() - msg.createdTimestamp
        } ms pra fazer essa busca`,
      },
    },
  })
}
