const Discord = require('discord.js');

module.exports = {
	name: 'c',
	description: 'Chửi nhau với bot!',
	execute(message) {
		return a(message);
	},
};

async function a(message){
	try {	
		var content = await message.content.slice(3);
		await message.react('🍇');

		//NOISE FUCKING FIRST CODE
		var a = await content.match(/f[A-Z][A-Za-z0-9]{1,}/g);
		if (a != null) {
			message.channel.send("dit 3` m thang " + a[0].slice(1) + " nhe");
			return message.delete();
		}

		return message.channel.send("Hôm nay không muốn cãi nhau (đang phát triển T.T)!");
	} catch (error) {
		return false;
	}
}