const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client/Client');
const {
	prefix,
	token,
} = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

var isOnline = false;

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setStatus("Listening to !gáy-đi");
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		if (commandName == "ban" || commandName == "userinfo") {
			command.execute(message, client);
		} else {
			command.execute(message);
		}
	} catch (error) {
		message.reply('There was an error trying to execute that command 1!');
	}

	//AUTO COMMENT
	if (message.content.s == 'Ok') {
		const embed = new MessageEmbed()
			.setTitle('? ? :D ? ?')
			.setColor(0xff0000)
			.setDescription('Oke cl gì vậy bạn!');
		message.channel.send(embed);
	}
});


client.login(token).then(() => {
	client.user.setS
});