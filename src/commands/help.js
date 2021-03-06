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
        name: '$google { termo de busca }',
        value: 'Esse comando vai pesquisar um termo no google e retornar o primeiro link',
      },
      {
        name: '$invite { *s | *m | *h }',
        value:
						'Esse comando vai criar um invite que pode ser usado ate 10 vezes, e vc tbm pode especificar quanto tempo ele vai ser valido',
      },
      {
        name: '$tempo { lat } { long } { a | d }',
        value:
						'Esse comando vai retornar a previsao do tempo atual ou diaria default: Sapucaia do Sul',
      },
      {
        name: '$strat',
        value:
						'Esse comando vai retornar uma strat aleatoria pra usar no game Counter-Strike: Global Offensive',
      },
      {
        name: '$time { nome | id }',
        value:
						'Esse comando vai retornar infos da HLTV sobre um time particular mencionado pelo nome ou id',
      },
      {
        name: '$ranking',
        value: 'Esse comando retorna os top 5 times do ranking da HLTV',
      },
      {
        name: '$partidasAoVivo',
        value:
						'Esse comando retorna o link e o ID das partidas ao vivo na HLTV, caso voce nao queira acessar o site pra pegar o id',
      },
      {
        name: '$partida { id }',
        value: 'Esse comando retorna infos sobre uma partida especifica da HLTV',
      },
      {
        name: '$aoVivo { id }',
        value:
						'Acompanhe o score de uma partida da HLTV ao vivo (a partida tem que estar acontecendo no momento)',
      },
      {
        name: 'Para reportar problemas',
        value: 'Cria uma issue no [repo](https://github.com/guilhXavier/bot-dos-amigos) do bot',
      },
    ],
    timestamp: new Date(),
  },
});
