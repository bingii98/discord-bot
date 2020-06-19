const Discord = require('discord.js');

module.exports = {
	name: 'sk',
	description: 'Bỏ qua bài hát hiện tại!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('Bạn phải ở trong một kênh thoại để dừng âm nhạc!');
		if (!serverQueue) return message.channel.send('Không có bài hát nào tôi có thể bỏ qua!');
		serverQueue.connection.dispatcher.end();
		message.react('🍎');
		message.react('🍊');
		return message.react('🍇');
	},
};