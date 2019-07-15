// $strat
/**
 * estrutura do indice
 *
 * [mapas[lado[strat]]]
 *
 * */
exports.run = (msg) => {
  const index = [
    {
      name: 'Gladiador',
      author: '/u/hattt',
      desc: 'Só uma pessoa pode sair do spawn. Quando ela morrer, o próximo pode sair.',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'Headset Invertido',
      author: '/u/keekxy',
      desc: 'Inverta o seu headset',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'NiP Crabwalk',
      author: 'Ninjas in Pyjamas',
      desc: 'Todo mundo compra Dual Beretta e rusha um bomb',
      flags: ['all maps', 'tr'],
    },
    {
      name: 'Batata Quente',
      author: '/u/Emsalek',
      desc:
				'Tu não pode ficar com a bomba mais de 5 segundos no inventário, tem que passar pra alguém antes do tempo',
      flags: ['all maps', 'tr'],
    },
    {
      name: 'Spray Bom',
      author: '/u/Emsalek',
      desc: 'Quando você atira, tem que esvaziar a arma antes de poder parar de atirar',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'BRA71L',
      author: '/u/BasedStrelok',
      desc: 'Se teu time ganhar o pistol, vocês deixam o time inimigo ganhar os próximos 7 rounds',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'Nenhum passo para trás!',
      author: '/u/Mostdakka',
      desc: 'Vocês só podem ir pra frente, sem strafe nem voltar',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'Fila Indiana',
      author: '/u/FreakWolf',
      desc: 'Todos os jogadores tem que estar em fila, encostando no outro, o round inteiro. ',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'Malabarismo',
      author: '/u/SnooZyCS',
      desc:
				'Quando alguém do time pegar uma kill, ele tem que trocar de arma com a pessoa abaixo dele na tabela, o último colocado troca com o primeiro',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'Tanque',
      author: '/u/Krypticturd',
      desc:
				'O time deve formar um tanque: AWP na frente como canhão, e o resto com SMGs como armas secundárias',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'Ceguinho',
      author: '/u/salaci0us',
      desc:
				'Quando só sobrar um membro do time, este deve desligar o monitor e os outros 4 vão ter que guiá-lo',
      flags: ['all maps', 'tr', 'ct'],
    },
    {
      name: 'Pega-pega',
      author: '/u/RugFlipper',
      desc:
				'O time tem que brincar de pega-pega com a bomba, quem estiver com a bomba tem que dropá-la para outra pessoa',
      flags: ['all maps', 'tr'],
    },
    {
      name: 'Smoke Criminal',
      author: '/u/Flipping_Fish',
      desc: 'Stackem um bomb e se escondam na mesma smoke, tentem fazer ninja defuse',
      flags: ['all maps', 'ct'],
    },
    {
      name: 'Cirque du Soleil',
      author: '/u/barnyard303',
      desc:
				'Façam uma pirâmide(3 embaixo, 2 no topo) em algum lugar do mapa e fiquem assim até descobertos ou o round quase acabar, então rushem algum bomb',
      flags: ['all maps', 'tr', 'ct'],
    },
  ];

  const rng = Math.floor(Math.random() * index.length);

  try {
    const {
      name, author, desc, flags,
    } = index[rng];

    return msg.channel.send({
      embed: {
        color: 9699539,
        title: `${name} :thinking:`,
        author: {
          name: `${author}`,
        },
        description: desc,
        footer: { text: `${flags.toString()}` },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
