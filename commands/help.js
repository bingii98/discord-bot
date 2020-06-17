const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'Liệt kê tất cả các lệnh có sẵn.',
	execute(message) {
		let str = '';
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			str += `Tên: ${command.name}, Mô tả: ${command.description} \n`;
		}

		message.channel.send(str);
	},
};