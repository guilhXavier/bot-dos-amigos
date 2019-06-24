exports.run = msg => msg.channel.send({
  embed: {
    color: 9699539,
    title: 'Comandos do bot',
    description:
				'Aqui esta tudo que sei fazer(por enquanto...) \n*voce precisa estar no canal pra usar comandos de musica*',
    fields: [
      {
        name: '$play { url | search | playlist }',
        value: 'Use esse comando pra tocar alguma coisa do youtube',
      },
      {
        name: '$pause',
        value: 'Use esse comando pra pausar a musica',
      },
      {
        name: '$resume',
        value: 'Use esse comando pra retomar a musica pausada',
      },
      {
        name: '$skip',
        value: 'Use esse comando pra pular a musica que esta tocando',
      },
      {
        name: '$remindme { *s | *m | *h } { nota }',
        value:
						'Esse comando vai te lembrar de qualquer coisa que voce escrever em *nota* no tempo que voce quiser',
      },
      {
        name: 'Para reportar problemas',
        value: 'Cria uma issue no [repo](https://github.com/guilhXavier/bot-dos-amigos) do bot',
      },
    ],
  },
});
