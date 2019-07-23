const { emojify, unemojify } = require('node-emoji');

// $capital :flag_fr:
exports.run = (msg) => {
  const args = msg.content.split(' ');

  const country = unemojify(args[1])
    .split('')
    .filter(val => val !== ':')
    .join('')
    .replace(/-/g, '_');

  const index = {
    flag_fr: 'Paris',
    flag_de: 'Berlin',
    flag_br: 'Rio de Janeiro',
    flag_pt: 'Portugal',
    flag_uk: 'London',
    flag_us: 'Washington D.C.',
    flag_be: 'Brussels',
    flag_al: 'Tirana',
    flag_gr: 'Athens',
    flag_cu: 'Havana',
    flag_ch: 'Zurich',
    flag_cn: 'Beijing',
    flag_ca: 'Ottawa',
    flag_cz: 'Prague',
    flag_ge: 'Tbilisi',
  };

  const title = emojify(':earth_americas: Capital');
  const icon = emojify(args[1]);

  return msg.channel.send({
    embed: {
      color: 9699539,
      title,
      description: `A capital d@ ${icon} : ${index[country]}`,
      timestamp: new Date(),
      footer: {
        text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca`,
      },
    },
  });
};
