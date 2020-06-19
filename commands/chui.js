const Discord = require('discord.js');

module.exports = {
	name: 'chui',
	description: 'Chửi nhau với bot!',
	execute(message) {
		var content = message.content.slice(6);
		message.channel.send("Hôm nay không muốn cãi nhau (đang phát triển T.T)!");
		return message.react('🍇');
	},
};