const Discord = require('discord.js');

module.exports = {
	name: 's',
	description: 'Dừng tất cả các bài hát trong hàng đợi!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('Bạn phải ở trong một kênh thoại để dừng âm nhạc!');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		message.react('🍎');
		message.react('🍊');
		return message.react('🍇');
	},
};