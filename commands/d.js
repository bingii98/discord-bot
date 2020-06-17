module.exports = {
	name: 'd',
	description: 'Tuân lệnh, đã xóa hết hàng chờ!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('Bạn phải ở trong một kênh thoại để dừng âm nhạc!');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
	},
};