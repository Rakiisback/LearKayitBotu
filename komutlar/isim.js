const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("xd", "Özelden işlemiyorum canım");
    return message.channel.send(ozelmesajuyari);
  }
  if (!message.member.roles.cache.has("970431273619324938"))
    return message.channel.send(`Yetersiz yetki`);
  //------------------------------------------------ROL-KANAL-EMOJİ-----------------------------------------------\\       STG

  const log = message.guild.channels.cache.find(
    (c) => c.id === "967958461163929702"
  );

  //------------------------------------------------ROL-KANAL-EMOJİ-----------------------------------------------\\       STG

  //------------------------------------------------İŞLEM-----------------------------------------------\\

  let member =
    message.mentions.users.first() || client.users.cache.get(args.join(" "));
  if (!member) return message.channel.send("Bir kullanıcı girin.");
  const c = message.guild.member(member);
  const nick = args[1];
  const yas = args[2];
  if (!nick) return message.channel.send("Bir isim girin.");
  if (!yas) return message.channel.send("Bir yaş girin.");
  c.setNickname(`${nick} | ${yas}`);

  //------------------------------------------------İŞLEM-----------------------------------------------\\
  //------------------------------------------------MESAJ-----------------------------------------------\\

  const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(
      `**<@${c.user.id}> adlı üyenin adı ${nick} | ${yas} Olarak Değiştirildi.**`
    )
    .setColor("RED");
  message.channel.send(embed);
  //log.send(embed);
  message.react("<:onay:970242056100392970>");

  //------------------------------------------------MESAJ-----------------------------------------------\\
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isim"],
  permLevel: 0,
};
exports.help = {
  name: "nick",
  description: "İsim değiştir",
  usage: "nick <yeni nick>",
};
