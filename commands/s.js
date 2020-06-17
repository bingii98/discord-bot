module.exports = {
	name: 's',
	description: 'Bỏ qua bài hát!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send('Bạn phải ở trong một kênh thoại để dừng âm nhạc!');
		if (!serverQueue) return message.channel.send('Không có bài hát nào để bỏ qua!');
		serverQueue.connection.dispatcher.end();
	},
};