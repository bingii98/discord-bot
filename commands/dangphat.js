module.exports = {
	name: 'dangphat',
	description: 'Danh sách bài hát đang phát.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Không có bài hát nào.');
		return message.channel.send(`Đang phát: ${serverQueue.songs[0].title}`);
	},
};