const puppeteer = require('puppeteer');
const $ = require('cheerio');

// $liveMatches
exports.run = (msg) => {
  const url = 'https://www.hltv.org/';

  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => page.goto(url).then(() => page.content()))
    .then((html) => {
      const { children } = $('.top-border-hide', html)['0'];
      const liveMatches = children.filter(val => val.attribs['data-livescore-match'] !== undefined);

      const fields = [];

      liveMatches.forEach((val) => {
        fields.push({
          name: 'Partida',
          value: `${val.attribs.href}\n
					${val.attribs['data-livescore-match']}`,
        });
      });

      msg.channel.send({
        embed: {
          color: 9699539,
          title: 'Partidas ao vivo na HLTV',
          fields,
          timestamp: new Date(),
          footer: {
            text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca`,
          },
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
