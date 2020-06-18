const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all available commands.',
	execute(message) {
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#f0a500')
			.setTitle("Danh sách câu lệnh hỗ trợ")
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			exampleEmbed.addField("." + command.name,command.description)
		}
		message.channel.send(exampleEmbed);
	},
};