const { HLTV } = require('hltv');
const { emojify } = require('node-emoji');

// $match { id }
exports.run = async (msg) => {
  const args = msg.content.split(' ');
  const id = args[1];

  const res = await HLTV.getMatch({ id });

  const {
    team1,
    team2,
    date,
    winnerTeam,
    format,
    additionalInfo,
    event,
    maps,
    highlightedPlayer,
    status,
  } = res;

  const checkFormat = (formato) => {
    if (formato === 'Best of 5') {
      return `${maps[0].name} => ${maps[0].result}\n
									${maps[1].name} => ${maps[1].result}\n
									${maps[2].name} => ${maps[2].result}\n
									${maps[3].name} => ${maps[3].result}\n
									${maps[4].name} => ${maps[4].result}`;
    }
    if (formato === 'Best of 3') {
      return `${maps[0].name} => ${maps[0].result}\n
									${maps[1].name} => ${maps[1].result}\n
									${maps[2].name} => ${maps[2].result}\n`;
    }
    return `${maps[0].name} => ${maps[0].result}`;
  };

  return msg.channel.send({
    embed: {
      color: 9699539,
      title: `Info. da partida id: ${id}`,
      description:
				`${additionalInfo} - ${new Date(date).toLocaleDateString()} - ${status}`
				|| `${new Date(date).toLocaleDateString('pt')} - ${status}`,
      fields: [
        {
          name: `Times ${emojify(':crossed_flags:')}`,
          value: `${team1.name} vs ${team2.name}`,
        },
        {
          name: `Vencedor ${emojify(':crown:')}`,
          value: `${winnerTeam.name}`,
        },
        {
          name: `Formato ${emojify(':straight_ruler:')}`,
          value: `${format}`,
        },
        {
          name: `Evento ${emojify(':trophy:')}`,
          value: `${event.name}`,
        },
        {
          name: 'Maps',
          value: `${checkFormat(format)}`,
        },
        {
          name: `MVP ${emojify(':medal:')}`,
          value: `${highlightedPlayer.name}`,
        },
      ],
      timestamp: new Date(),
      footer: { text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca` },
    },
  });
};
