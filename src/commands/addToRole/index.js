// $addtr -m @NickBola#123 -c @cargoExistente

import { extractArgs, buildRichEmbed } from '../../helpers'
import {
  COMMAND_FLAGS,
  EMBED_COLORS,
  EMBED_TYPES,
  PREFIX,
} from '../../constants'

export const addToRole = async ({
  channel,
  content,
  createdTimestamp,
  guild,
  member,
  mentions,
}) => {
  const { command, args } = extractArgs(content)

  const memberId = Array.from(mentions.members)[0][0]
  const roleId = Array.from(mentions.roles)[0][0]

  const msgSenderId = member.user.id

  const target = getMember(member, mentions.members.first())

  const role = mentions.roles.first()

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
    console.log(error)
    return channel.send('Ocorreu um erro! :(')
  }
}

const getMember = (member, mentionedMember) => {
  if (!mentionedMember) {
    return member
  }

  return mentionedMember
}
