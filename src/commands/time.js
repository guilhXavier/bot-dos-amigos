const { HLTV } = require('hltv');
const { emojify } = require('node-emoji');

// $team { name || id }
exports.run = async (msg) => {
  const args = msg.content.split(' ');
  const suffix = args[1];

  const index = {
    liquid: 5973,
    ence: 4869,
    mibr: 9215,
    navi: 4608,
    faze: 6667,
    nip: 4411,
    mousesports: 4494,
    furia: 8297,
    astralis: 6665,
    vitality: 9565,
  };

  const id = index[suffix] || suffix;

  const {
    name, location, players, recentResults, rank,
  } = await HLTV.getTeam({ id });

  return msg.channel.send({
    embed: {
      color: 9699539,
      author: {
        name: `Team Info | ${name}`,
      },
      fields: [
        {
          name: `Ranking ${emojify(':trophy:')}`,
          value: `${rank}`,
        },
        {
          name: `Local ${emojify(':map:')}`,
          value: `${location}`,
        },
        {
          name: 'Players ',
          value: `${players[0].name}\n
					${players[1].name}\n
					${players[2].name}\n
					${players[3].name}\n
					${players[4].name}`,
        },
        {
          name: 'Ultimos resultados',
          value: `${recentResults[0].result} | id ${recentResults[0].matchID}\n
					${recentResults[1].result} | id ${recentResults[1].matchID}\n
					${recentResults[2].result} | id ${recentResults[2].matchID}\n
					${recentResults[3].result} | id ${recentResults[3].matchID}`,
        },
      ],
      timestamp: new Date(),
      footer: { text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca` },
    },
  });
};
