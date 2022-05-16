//----------------------------------------------------------------
// Selam, Ben Lear Mert işinize yarıyacağını düşündüğüm bu tarz projeleri paylaşıyorum.
//----------------------------------------------------------------

// bu bölüm log bölümü. kayıt alındıktan sonra ve yeni bir kullanıcı geldiğinde belirlediğiniz kanala log atar

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
  let logkanal = await db.fetch(`hg_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(` hg kanalı zaten ayarlı değil.`);
    db.delete(`hg_${message.guild.id}`);
    message.channel.send(` hg kanalı başarıyla sıfırlandı.`);
    return;
  }

  if (!logk)
    return message.channel.send(
      `**Hata** hg kanalını oluşturmak için: ${prefix}hg #kanal`
    );

  db.set(`hg_${message.guild.id}`, logk.id);

  message.channel.send(` hg kanalı başarıyla ${logk} olarak ayarlandı.`);
  // message.react("607634966959882250");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hg"],
  permLevel: 4,
};

exports.help = {
  name: "hg",
  description: "- lear özel",
  usage: "hg",
};
