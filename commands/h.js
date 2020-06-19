const fs = require('fs');
const Discord = require('discord.js');

module.exports = {
	name: 'h',
	description: 'List all available commands.',
	execute(message, client) {
		try {
			const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
			var a = [];

			for (let i = 0; i < commandFiles.length; i++) {
				const command = require(`./${commandFiles[i]}`);
					a.push(command.description);
			}
			
			a = new Set(a);
			
			const exampleEmbed = new Discord.MessageEmbed()
				.setAuthor(client.user.username, `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`)
				.setColor('#f0a500')
				.setTitle("Danh sách câu lệnh hỗ trợ")

			a.forEach(item => {
				let title = "";
				for(const file of commandFiles){
					const command = require(`./${file}`);
					if(command.description === item){
						title = title + `**\`.${command.name}\`** `;
					}
				}
				exampleEmbed.addField(`${title}`, `${item}`, true)
			})
			exampleEmbed.addField(`\u200B`,`\`Theo yêu cầu của \`[${message.author.toString()}]`);
			message.channel.send(exampleEmbed);
			return message.delete();
			
		} catch (error) {
			console.error(error);
		}
	},
};