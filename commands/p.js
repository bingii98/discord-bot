const ytdl = require("ytdl-core");
const Discord = require('discord.js');

module.exports = {
  name: "p",
  description: "Phát một bài hát trong kênh của bạn!",
  async execute(message) {
    try {
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(
          "Bạn cần ở trong một kênh thoại để phát nhạc!"
        );
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          "Tôi cần quyền để tham gia và nói trong kênh thoại của bạn!"
        );
      }

      //HANDLE URL
      var expression = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
      var regex = new RegExp(expression);
      var url = message.content.slice(3);
      //Replace utf-8
      url = url.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      url = url.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      url = url.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      url = url.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      url = url.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      url = url.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      url = url.replace(/đ/g, "d");
      if (!url.match(regex)) {
        const YouTube = require("discord-youtube-api");
        const youtube = new YouTube("AIzaSyAoFPMOBzK6BFCJAdRabzucVpQhCi1DKFY");
        const video = await youtube.searchVideos(url);
        url = "https://www.youtube.com/watch?v=" + video.id;
      }

      console.log(url);

      //SONG INFO
      const songInfo = await ytdl.getInfo(url);

      const song = {
        title: songInfo.title,
        url: songInfo.video_url
      };

      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor('#000000')
          .setDescription(`Đã thêm :label: [**${song.title}**](${song.url}) vào hàng đợi \n:small_orange_diamond:bởi ${message.author.toString()}`)
        message.channel.send(exampleEmbed);
        return message.delete();
      }
    } catch (error) {
      message.channel.send(error.message);
    }
  },

  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#f0a500')
      .setTitle("Đang phát")
      .setDescription(`[**${song.title}**](${song.url}) \n:small_orange_diamond:bởi ${message.author.toString()}`)
    message.channel.send(exampleEmbed);
    return message.delete();
  }
};
