const { HLTV } = require('hltv');

// $live { id }
exports.run = (msg) => {
  const args = msg.content.split(' ');
  const id = args[1];

  HLTV.connectToScorebot({
    id,
    onScoreboardUpdate: (data) => {
      msg.channel.send({
        embed: {
          color: 9699539,
          title: `Match: ${data.terroristTeamName} vs ${data.ctTeamName}`,
          fields: [
            {
              name: 'Score',
              value: `${data.ctTeamScore}:${data.tTeamScore}`,
            },
          ],
        },
      });
    },
  });
};
