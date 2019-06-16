const streng = '$remindme 5d mandar email';

const args = streng.split(' ');

const command = args[0];
args.splice(0, 1);

const time = args[0];
args.splice(0, 1);

console.log(command);
console.log(time);
console.log(args.join(' '));
