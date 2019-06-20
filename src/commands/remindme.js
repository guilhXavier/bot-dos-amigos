const ms = require('ms');

// $remindme 5s mandar email
const remindMe = (msg) => {
  const args = msg.content.split(' ');
  msg.reply(`Ok, vou te lembrar em ${args[1]}`);

  args.splice(0, 1);

  const time = args[0];
  args.splice(0, 1);

  const note = args.join(' ');

  setTimeout(() => {
    msg.reply(note);
  }, ms(time));
};

export default remindMe;
