/** $tempo -30.2494 -50.0293 a
 * -29.8197,-51.1609
 */
const axios = require('axios');
const fs = require('fs');

const checkConfig = fs.existsSync('./config/config.json');

const { DARKSKYAPI } = checkConfig ? require('../../config/config.json') : process.env;

exports.run = async (msg) => {
  const args = msg.content.split(' ');

  const param = args[3] || args[1];

  const lat = (args[1] !== 'a' && 'd') || '-29.8197';
  const long = args[2] || '-51.1609';

  function checkParams(param) {
    switch (param) {
      case 'a':
        return '?exclude=minutely,hourly,daily,alerts,flags';
      case 'd':
        return '?exclude=currently,minutely,hourly,alerts,flags';
      default:
    }
  }

  const callURL = `https://api.darksky.net/forecast/${DARKSKYAPI}/${lat},${long}${checkParams(
    param,
  )}&lang=pt&units=auto`;

  try {
    const res = await axios(callURL);

    const { data } = res;

    if (param === 'a') {
      const { summary, temperature, apparentTemperature } = data.currently;

      return msg.channel.send({
        embed: {
          color: 9699539,
          title: 'Previsao do tempo atual :thermometer:',
          description: `${summary}`,
          fields: [
            {
              name: `**${temperature.toFixed(1)}°C**`,
              value: 'Temperatura atual',
            },
            {
              name: `**${apparentTemperature.toFixed(1)}°C**`,
              value: 'Sensacao Termica Atual',
            },
          ],
          footer: { text: 'Leva um casaco bro' },
        },
      });
    }
    const { summary, temperatureMin, temperatureMax } = data.daily.data[0];

    return msg.channel.send({
      embed: {
        color: 9699539,
        title: 'Previsao do tempo para o dia :thermometer:',
        description: `${summary}`,
        fields: [
          {
            name: `**${temperatureMax.toFixed(1)}°C**`,
            value: 'Maxima',
          },
          {
            name: `**${temperatureMin.toFixed(1)}°C**`,
            value: 'Minima',
          },
        ],
        footer: { text: 'Leva um casaco bro' },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
