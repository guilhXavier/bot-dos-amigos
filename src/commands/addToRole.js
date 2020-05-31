// $addtr -m @NickBola#123 -c @cargoExistente

import { extractArgs, buildRichEmbed } from '../helpers'
import { COMMAND_FLAGS, EMBED_COLORS, EMBED_TYPES } from '../constants'

export const addToRole = async ({
  channel,
  content,
  createdTimestamp,
  guild,
  member,
  mentions: { members: mentionedMembers },
}) => {
  const { command, args } = extractArgs(content)

  const target = getMember(
    member,
    mentionedMembers.find(
      ({ displayName }) => displayName === args[COMMAND_FLAGS.MEMBER]
    )
  )

  const { cache: rolesList } = guild.roles

  const role = rolesList.find((elem) => elem.name === args[COMMAND_FLAGS.ROLE])

  try {
    await target.roles.add(role)

    const embed = buildRichEmbed({
      description: `${member} foi adicionado ao cargo ${role.name}`,
      footer: {
        text: `Eu demorei ${
          Date.now() - createdTimestamp
        } ms pra fazer essa busca`,
      },
      hexColor: EMBED_COLORS.PURPLE,
      title: command,
      type: EMBED_TYPES.RICH,
    })

    return channel.send('Sucesso!', { embed })
  } catch (error) {
    return channel.send('Ocorreu um erro! :(')
  }
}

const getMember = (member, mentionedMember) => {
  if (!mentionedMember) {
    return member
  }

  return mentionedMember
}
