const Discord = require('discord.js');
const request = require('request');  // request kütüphanesini yüklediğinden emin ol
const dotenv = require('dotenv');
const express = require('express');




dotenv.config();




const client = new Discord.Client();
const kanalID = '1193509917722685480'; // Mesajın gönderileceği kanal ID'si
const sunucuIP = 'ruby.magmanode.com:30171';

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);
});

client.on('message', (message) => {
  if (message.content.toLowerCase() === '!ip') {
    const embed = new Discord.MessageEmbed()
      .setTitle('Codeman RP Sunucu IP')
      .setDescription(`IP: ${sunucuIP}`)
      .setColor('#0099ff');
    message.channel.send(embed);
  }
});

// Belirli aralıklarla sunucu durumunu kontrol et
setInterval(() => {
  kontrolEtVeMesajGonder();
}, 6000000); // 1 dakika

function kontrolEtVeMesajGonder() {
  request(`https://api.mcsrvstat.us/2/${sunucuIP}`, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);
      const durumMesaji = data.online ? 'açık' : 'kapalı';

      const embed = new Discord.MessageEmbed()
        .setTitle('Sunucu Durumu')
        .setDescription(`Sunucu şu anda ${durumMesaji}!\nIP: ${sunucuIP}`)
        .setColor(data.online ? '#00ff00' : '#ff0000');

      const kanal = client.channels.cache.get(kanalID);
      if (kanal) {
        kanal.send(embed);
      }
    } else {
      console.error('Sunucu durumu alınırken bir hata oluştu:', error);
    }
  });
}

client.login(process.env.BOT_TOKEN);

const app = express();
const port = 3000; // Kullanmak istediğin portu belirle

app.get('/', (req, res) => {
  res.send('Merhaba, dünya!'); // Tarayıcıya gönderilecek metni belirle
});

app.listen(port, () => {
  console.log(`Web server http://localhost:${port} adresinde çalışıyor.`);
});
