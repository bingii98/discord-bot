const Discord = require('discord.js');

module.exports = {
	name: 'n',
	description: 'Cho biết bài hát nào đang chạy.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Không tồn tại bài hát nào.');
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor(('#222831'))
			.setDescription(`Đang phát [**${serverQueue.songs[0].title}**](${serverQueue.songs[0].url})`)
		return message.channel.send(exampleEmbed);
	},
};