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

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setPresence(
		{
			activity:
			{
				name: '.help',
				type: "LISTENING"
			}, 
			status: 'online'
		})
		.then(console.log("Server running ..."))
		.catch(console.error);
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
		} else if (commandName == "help" || commandName == "h") {
			command.execute(message, client);
		} else {
			command.execute(message);
		}
	} catch (error) {
		message.reply(`\`Bạn đang thực hiện lệnh không được hỗ trợ!\``);
	}
});


client.login(token);