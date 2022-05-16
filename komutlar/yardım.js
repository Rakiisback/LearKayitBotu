const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("xd", "Özelden işlemiyorum canım");
    return message.channel.send(ozelmesajuyari);
  }
  var prefix = ayarlar.prefix;

  //GENEL KOMUTU
  if (args[0] === "Kayıt" || args[0] === "kayıt") {
    let Genel = new Discord.MessageEmbed()
      .setAuthor("Kayıt", message.author.displayAvatarURL())
      .setColor("#2667FF")
      .setDescription(
        client.commands
          .filter((cmd) => cmd.conf.kategori === "Kayıt")
          .map((cmd) => `**${prefix}${cmd.help.name}** ${cmd.help.description}`)
          .join("\n ")
      );

    return message.channel.send(Genel);

    return;
  }

  let embed = new Discord.MessageEmbed()
    .setAuthor("Komutlar", message.author.displayAvatarURL())
    .setThumbnail(client.user.avatarURL())
    .setColor("#3e046b")
    .addField(
      "Kategoriler:",
      `
  **${prefix}yardım kayıt** 
  `
    );

  message.channel.send(embed);
};

exports.conf = {
  aliases: ["yardım", "y"],
  permLevel: 0,
  kategori: "Genel",
};

exports.help = {
  name: "yardım",
  description: "Komutlar hakkında bilgi verir.",
  usage: "yardım",
};
