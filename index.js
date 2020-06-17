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

console.log(client.commands);

client.once('ready', () => {
	console.log('Ready!');
	isOnline = true;
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
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

	try {
		if (commandName == "p") {
			message.channel.send(`**${message.author.username}** " đã orther một món ăn tinh thần!"`)
		}
	} catch (error) {
		console.error(error);
	}

	//AUTO COMMENT
	if (message.content == 'Ok') {
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