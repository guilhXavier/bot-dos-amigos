// $cr -aaaaaaan super cool -c 9400D3 -s -
exports.run = async (msg) => {
  const server = msg.guild

  const args = msg.content.split(' | ')

  const bin = args[0].split(' ')
  bin.splice(0, 1)

  const name = bin.join(' ')
  const color = args[1]
  const hoist = args[2] === 'separado'
  const mentionable = args[3] === 'mencionavel'

  try {
    await server.createRole({
      name,
      color,
      hoist,
      mentionable,
    })

    return msg.channel.send({
      embed: {
        color: 9699539,
        title: 'CreateARole',
        description: `Cargo **${name}** criado`,
        timestamp: new Date(),
        footer: {
          text: `Eu demorei ${
            Date.now() - msg.createdTimestamp
          } ms pra fazer essa busca`,
        },
      },
    })
  } catch (error) {
    return console.log(error)
  }
}
