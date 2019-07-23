const { HLTV } = require('hltv');
const { emojify } = require('node-emoji');

// $ranking
exports.run = async (msg) => {
  const res = await HLTV.getTeamRanking();

  return msg.channel.send({
    embed: {
      color: 9699539,
      author: {
        name: 'HLTV Ranking',
      },
      description: `1. ${res[0].team.name} - ${res[0].points} points ${emojify(':first_place:')}\n
										2. ${res[1].team.name} - ${res[1].points} points ${emojify(':second_place:')}\n
										3. ${res[2].team.name} - ${res[2].points} points ${emojify(':third_place:')}\n
										4. ${res[3].team.name} - ${res[3].points} points\n
										5. ${res[4].team.name} - ${res[4].points} points\n`,
      timestamp: new Date(),
      footer: { text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca` },
    },
  });
};
