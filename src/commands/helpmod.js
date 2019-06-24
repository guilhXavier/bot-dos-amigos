exports.run = msg => msg.channel.send({
  embed: {
    color: 9699539,
    title: 'Comandos do bot para mods - *HIC SUNT DRACONES*',
    description: 'Alem dos comandos pra everyone, esses comandos podem te ajudar na moderacao',
    fields: [
      {
        name: '$kick { @membro } { razao }',
        value:
						'Esse comando vai kickar alguem (que possa ser kickado) do servidor, vc tbm tem que dar uma razao',
      },
      {
        name: '$ban { @membro } { razao }',
        value: 'Esse comando vai *banir* alguem do servidor',
      },
      {
        name: '$mute { @membro } { razao }',
        value: 'Esse comando vai mutar alguem nos canais de voz',
      },
      {
        name: '$unmute { @membro } { razao }',
        value: 'Esse comando vai desmutar alguem que esteja mutado',
      },
      {
        name: '$addToRole { @membro } { cargo }',
        value: 'Esse comando vai adicionar o usuario mencionado ao cargo mencionado',
      },
      {
        name: '$removeFromRole { @membro } { cargo }',
        value: 'Esse comando vai remover o usuario mencionado do cargo mencionado',
      },
      {
        name: '$createARole { nome-do-cargo } | { cor(string hex) } | { separado | mencionavel }',
        value: 'Esse comando vai criar um cargo com as opcoes que voce passou no comando',
      },
      {
        name: 'Para reportar problemas',
        value: 'Cria uma issue no [repo](https://github.com/guilhXavier/bot-dos-amigos) do bot',
      },
    ],
  },
});
