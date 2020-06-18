const Discord = require('discord.js');

module.exports = {
	name: 'nowplaying',
	description: 'Get the song that is playing.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Không tồn tại bài hát nào.');
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#f0a500')
			.setTitle("Đang phát")
			.setDescription(`[**${serverQueue.songs[0].title}**](${serverQueue.songs[0].url})`)
		message.channel.send(exampleEmbed).delete();
		return message.channel.send(`Đang phát: ${serverQueue.songs[0].title}`);
	},
};