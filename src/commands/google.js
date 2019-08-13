require('dotenv').config();

const axios = require('axios');

exports.run = async (msg) => {
  const args = msg.content.split(' ');
  args.splice(0, 1);

  const suffix = args.join(' ');

  try {
    const res = await axios(
      `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLEAPI}&cx=${
        process.env.CSEID
      }&q=${suffix}&lr=lang_pt&num=1`,
    );

    const { data } = res;
    const { title, snippet, link } = data.items[0];

    return msg.channel.send({
      embed: {
        color: 9699539,
        author: {
          name: `Resultado para "${suffix}"`,
          icon_url:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2000px-Google_%22G%22_Logo.svg.png',
        },
        description: `**Link**: [${title}](${link})\n**Desc**: ${snippet}`,
        timestamp: new Date(),
        footer: { text: `Eu demorei ${Date.now() - msg.createdTimestamp} ms pra fazer essa busca` },
      },
    });
  } catch (error) {
    console.log(error);
  }
};
