const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("xd", "Özelden işlemiyorum canım");
    return message.channel.send(ozelmesajuyari);
  }
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Yetersiz yetki**`)
    );

  let logk = message.mentions.channels.first();
  let logkanal = await db.fetch(`hgbb_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(` hgbb kanalı zaten ayarlı değil.`);
    db.delete(`hgbb_${message.guild.id}`);
    message.channel.send(` hgbb kanalı başarıyla sıfırlandı.`);
    return;
  }

  if (!logk)
    return message.channel.send(
      `**Hata** hgbb kanalını oluşturmak için: ${prefix}hg #kanal`
    );

  db.set(`hgbb_${message.guild.id}`, logk.id);

  message.channel.send(` hgbb kanalı başarıyla ${logk} olarak ayarlandı.`);
  // message.react("607634966959882250");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hgbb"],
  permLevel: 4,
};

exports.help = {
  name: "hgbb",
  description: "- lear özel",
  usage: "hgbb",
};
