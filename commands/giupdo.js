const fs = require('fs')

module.exports = {
	name: 'giupdo',
	description: 'Danh sách câu lệnh có sẵn.',
	execute(message) {
		let str = '';
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			str += `Name: ${command.name}, Description: ${command.description} \n`;
		}

		message.channel.send(str);
	},
};