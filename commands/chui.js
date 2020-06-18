const Discord = require('discord.js');

module.exports = {
	name: 'chui',
	description: 'Dừng tất cả các bài hát trong hàng đợi!',
	execute(message) {
		var content = message.content.slice(6);
		message.channel.send("Hôm nay không muốn cãi nhau (đang phát triển T.T)!");
		return message.react('🍇');
	},
};