const { HLTV } = require('hltv');

// $live { id }
exports.run = async (msg) => {
  const args = msg.content.split(' ');
  const id = args[1];

  const { team1, team2 } = await HLTV.getMatch({ id });

  HLTV.connectToScorebot({
    id,
    onConnect: () => {
      msg.channel.send({
        embed: {
          color: 9699539,
          title: 'ScoreBot: Connection established',
        },
      });
    },
    onLogUpdate: (data) => {
      if (Object.keys(data.log[0])[0] === 'RoundEnd') {
        msg.channel.send({
          embed: {
            color: 9699539,
            title: `Match: ${team1.name} vs ${team2.name} | id: ${id}`,
            fields: [
              {
                name: 'Score',
                value: `(CT)${data.log[0].RoundEnd.counterTerroristScore}:${
                  data.log[0].RoundEnd.terroristScore
                }(TR)`,
              },
            ],
          },
        });
      }
    },
  });
};
