exports.run = (msg) =>
  msg.channel.send({
    embed: {
      color: 9699539,
      title: 'Comandos do bot',
      description:
        'Aqui esta tudo que sei fazer(por enquanto...) \n*voce precisa estar no canal pra usar comandos de musica*',
      fields: [
        {
          name: '$invite',
          value:
            'Esse comando vai criar um invite que pode ser usado ate 10 vezes, e vc tbm pode especificar quanto tempo ele vai ser valido',
        },
      ],
      timestamp: new Date(),
    },
  })
