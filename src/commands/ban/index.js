// $ban -m @NickBola#233 -t 7

import { COMMAND_FLAGS, EMBED_COLORS, EMBED_TYPES } from '../../constants'
import { buildRichEmbed } from '../../helpers'

export const ban = async ({ channel, content, createdTimestamp, mentions }) => {
  const { command, args } = extractArgs(content)

  const toBan = mentions.members.find(
    ({ displayName }) => displayName === args[COMMAND_FLAGS.MEMBER]
  )

  if (!toBan.bannable) {
    return msg.channel.send(`Nao eh possivel banir ${toBan.displayName}`)
  }

  try {
    const days = args[COMMAND_FLAGS.TIME]

    await toBan.ban({ days })

    const embed = buildRichEmbed({
      description: `**${toBan.displayName}** foi banido por ${days} dias!`,
      footer: {
        text: `Eu demorei ${
          Date.now() - msg.createdTimestamp
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
