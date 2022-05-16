const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("xd", "Özelden işlemiyorum canım");
    return message.channel.send(ozelmesajuyari);
  }
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    message.channel.send("Yetersiz yetki");
    return;
  }
  if (args[0] === "kapat") {
    if (db.has(`tag_${message.guild.id}`) === true) {
      db.delete(`tag_${message.guild.id}`);

      message.channel.send("Otomatik tag kaldırıldı.");
      return;
    }
    message.channel.send(`Otomatik tag ayarlanmamış.`);
    return;
  }

  let tag = args.slice(0).join(" ");
  let xtag = db.fetch(`tag_${message.guild.id}`);

  if (!tag)
    return message.channel.send(
      `HATA: Örnek kullanım: \`${prefix}ototag <tag> | \``
    );

  db.set(`tag_${message.guild.id}`, tag);
  message.channel.send(`Sunucu Tagı Başarıyla **${tag}** Olarak Ayarlandı.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ototag"],
  permLevel: 4,
  kategori: "Kayıt",
};

exports.help = {
  name: "ototag",
  description: "Sunucuya katılan üyeye otomatik tag verir",
  usage: "ototag <tag>",
};
